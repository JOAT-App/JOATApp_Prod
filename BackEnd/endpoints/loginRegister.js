const express = require("express");
const router = express.Router()
const pool = require("../db");
const bcrypt = require("bcrypt");
const validInfo = require("../middleware/validInfo.js");
const authorization = require("../middleware/authorization.js");
const jwtGenerator = require("../utils/jwtGenerator.js");
const Stripe=require('stripe');
const stripe = Stripe(process.env.STRIPE_SK)
const sendEmail = require('../utils/email')
const jwt = require('jsonwebtoken')
const lessThanOneHourAgo = (date) => {
    const HOUR = 1000 * 60 * 60;
    const anHourAgo = Date.now() - HOUR;

    return date > anHourAgo;
}
const randomString = (length=64)=>Math.random().toString(20).substr(2, length)
if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}


router.post('/verifyToken', async(req,res)=>{
  const {token} = req.body;
  try{
    const decoded = jwt.verify(token, process.env.jwtSecret)
    const newToken = jwtGenerator(decoded.id);
    res.json({newToken}).status(200).end();
  }catch(e){
    console.log(e);
    res.status(401).end();
  }
})

router.post("/register", validInfo, async (req, res) => {
  const { firstName, lastName, email, password, phone, dateString, type } = req.body;
  const dob = dateString
  console.log(dob);
  try {
    const user = await pool.query("SELECT email FROM users WHERE email = $1", [
      email.toLowerCase(),
    ]);

    if (user.rows.length > 0) {
      return res.status(401).json("User exists! Please login");
    }

    const salt = await bcrypt.genSalt(10);
    const bcryptPassword = await bcrypt.hash(password, salt);


    let stripeAccount =  null;
    if(type==1){
      stripeAccount = await stripe.accounts.create({
        type: 'express',
        country: 'US',
        email: email,
        capabilities: {
          transfers: {requested: true},
       },
       business_type: 'individual'
      })
    }

    const stripeId = stripeAccount ? stripeAccount.id : null
    console.log(dob);
    const newUser = await pool.query(
      "SELECT * FROM f_add_user($1,$2,$3,$4,$5, $6, $7, $8)",
      [firstName, lastName, email.toLowerCase(), bcryptPassword, phone, dob, type, stripeId]
    );
    const id = newUser.rows[0].f_add_user
    const rand = randomString();
    await pool.query(
      "select * from f_add_confirmation_hash($1,$2)",
      [email.toLowerCase(), rand]
    );
    const html = 'Press <a href='+process.env.API_URL+'/logister/verify/'+rand+'>here</a> to verify your account'
    await sendEmail(email,"Confirm Your JOAT Account" , html);

    const userData = 'Name: '+firstName + ' ' + lastName +'<br/>' + 'Email' + email;
    await sendEmail('michael@joatapp.com', "New User", userData);

    const ret = {
      success: 1,
      message: "Great Success!",
      id: id
    }

    res.status(200);
    return res.json(ret);
  } catch (err) {
    console.error(err.message);
    return res.status(500).json("Server error");
  }
});

router.post("/login", validInfo, async (req, res) => {
  const { email, password } = req.body;
  const lowerEmail = email.toLowerCase();

  try {
    const checkUser = await pool.query("SELECT * FROM users WHERE email = $1", [
      lowerEmail,
    ]);

    if (checkUser.rows.length === 0) {
      res.status(401).json("Invalid Credential");
    } else {
      const id = checkUser.rows[0].id;
      const encryptedPassword = await pool.query(
        "SELECT * FROM user_auth WHERE ua_user_id = $1",
        [id]
      );


      // check current password in req.body vs the encrypted password in the database returns: boolean
      const validPassword = await bcrypt.compare(
        password,
        encryptedPassword.rows[0].pass_hash
      );
      console.log(  encryptedPassword.rows[0].pass_hash);
      const user = await pool.query(
        "SELECT * FROM users WHERE id= $1",
        [id]
      );
      console.log(user.rows[0]);
      const fname = user.rows[0].first_name
      const lname = user.rows[0].last_name
      const type = user.rows[0].user_type_id
      const image_url = user.rows[0].photo_url
      const stripe_id = user.rows[0].stripe_id
      var stripeVerified = null;
      if(stripe_id){
        const account = await stripe.accounts.retrieve(stripe_id);
        console.log(account);
        stripeVerified=account.charges_enabled
      }
      if (!validPassword) {
        res.status(403).json("Invalid Password!");
      }
      const token = jwtGenerator(id);
      return res.json({ token,  id, fname, lname, type, image_url, stripeVerified }); // named token: "eyj.....ahw"
    }
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Login error");
  }
});

router.post("/password/forgot", async (req, res) => {
  const { email } = req.body;
  console.log(email);

  try {
    const checkUser = await pool.query("SELECT * FROM users WHERE email = $1", [
      email.toLowerCase(),
    ]);

    if (checkUser.rows.length === 0) {
      res.status(401).json("Email not found");
    } else {
      const id = checkUser.rows[0].id;
      const email= checkUser.rows[0].email;
      const token = require('crypto').randomBytes(32).toString('hex');
      await pool.query("SELECT * FROM F_insert_forgot_password($1,$2)",[token, id]);
      const html=`Your Confirmation code for password reset is below. If you did not expect this email please ignore.
      <br/>
        <big> <strong>${token}</strong></big>
      <br/>
        Thanks for choosing JOAT`
      sendEmail(email, "Reset Your JOAT App Password", html);
      res.status(200).end();
    }
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Forgot Password Error");
  }
});

router.put("/password/change", async (req, res)=>{
  const {id, email, password, token} = req.body;
  console.log(req.body);
  const salt = await bcrypt.genSalt(10);
  const bcryptPassword = await bcrypt.hash(password, salt);
  try {
    const info = await pool.query("SELECT * FROM f_validate_forgot_password($1, $2)",[token, email.toLowerCase()])
    if(info.rows[0].length===0){
      console.log("No rows");
      res.status(500).json("Invalid Token")
    }
    else{
      await pool.query("UPDATE USER_AUTH SET pass_hash=$1 where ua_user_id=$2",[bcryptPassword, id])
      await pool.query("DELETE FROM FORGOT_PASSWORD WHERE user_id=$1",[id]);
      res.status(200).end();
    }
  } catch (e) {
    console.error(e);
    res.status(500).end();
  }
})

router.post("/password/verifyToken", async (req, res) => {
  const { email, token } = req.body;

  try {
    const info = await pool.query("SELECT * FROM f_validate_forgot_password($1, $2)", [
      token, email.toLowerCase()
    ]);

    if (info.rows.length === 0) {
      return res.status(401).json("Invalid Token");
    } else {
      const {id, created} = info.rows[0]
      if(lessThanOneHourAgo(created)){
        return res.status(401).json("Expired Token");
      }else{
          return res.json(info.rows[0]).status(200).end();
      }
    }
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Forgot Password Error");
  }
});

router.post("/email/check", async (req, res) => {
  const { email } = req.body;
  console.log("here");

  try {
    const info = await pool.query("SELECT email from users where email=$1", [
      email.toLowerCase()
    ]);

    if (info.rows.length === 0) {
      return res.status(200).end();
    } else {
      return res.status(418).end()
    }
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Email Check Error");
  }
});

router.post("/resendConfirmation", authorization,  async (req,res) =>{
  try{
    const {id} = req.body;
    const user = await pool.query("SELECT EMAIL FROM USERS WHERE ID=$1", [id] );
    const email = user.rows[0].email;
    const rand = randomString();
    await pool.query(
      "select * from f_add_confirmation_hash($1,$2)",
      [email.toLowerCase(), rand]
    );
    const html = 'Press <a href='+process.env.API_URL+'/logister/verify/'+rand+'>here</a> to verify your account'
    await sendEmail(email,"Confirm Your JOAT Account" , html);
    res.status(200).end();
  }catch(e){console.error(e); res.status(500).end()}

})

router.get('/verify/:hash', async(req,res)=>{
    try{
    const {hash} = req.params;
    const user = await pool.query(
      'select * from users inner join user_auth ua on ua.ua_user_id =users.id where confirmation_hash =$1',
      [hash]
    );
    if(user.rows.length==0){
      throw 'User not found'
    }
    const confirmed = await pool.query(
      'SELECT * FROM f_confirm_account($1)',
      [hash]
    );
    res.redirect('/confirmed.html');
  }catch(err){
    console.log(err);
    res.redirect('/confirmedError.html');
  }

})

router.get('/stripe-onboarding/:id', authorization,  async (req,res)=>{

  console.log("hit");
  const {id} = req.params;
  console.log(id);
  try {
    const stripeId = await pool.query(
      "SELECT stripe_id from users where id =$1",
      [id]
    );
    const accountLink = await stripe.accountLinks.create({
      account: stripeId.rows[0].stripe_id,
      refresh_url: 'https://www.joatapp.com',
      return_url: 'https://www.joatapp.com',
      type: 'account_onboarding'
    });
    res.json(accountLink);
    console.log(stripeId);
  } catch (e) {
    console.error(e);
    res.status(500).end()
  }
});

router.get('/stripe/verified/:id', authorization, async(req,res)=>{
    const {id} = req.params;
    try{
      const stripeId = await pool.query(
        "SELECT stripe_id from users where id =$1",
        [id]
      );
      const account = await stripe.accounts.retrieve(stripeId.rows[0].stripe_id);
      stripeVerified=account.charges_enabled
      res.json({stripeVerified});
    }catch(e){
      console.error(e);
      res.status(500).end();
    }
})

module.exports = router;
