const express = require("express");
const router = express.Router()
const pool = require("../db");
const authorization = require("../middleware/authorization.js");
const multiparty = require('multiparty');
const aws = require('aws-sdk');
const fs = require('fs');
const Stripe=require('stripe');
const stripe = Stripe(process.env.STRIPE_SK)
if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

aws.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_KEY,
});
const s3 = new aws.S3();

router.use(authorization);

router.get('/self/profile/:id',  async(req,res)=>{
  try{
    const {id} = req.params;
    const info = await pool.query(
      "SELECT * FROM f_get_profile_info($1)",
      [id]
  );
  var data = info.rows[0];
  if(data.stripe_id){
    const account = await stripe.accounts.retrieve(data.stripe_id);
    if(account.charges_enabled){
      const link = await stripe.accounts.createLoginLink(data.stripe_id);
      data.link=link;
    }
  }
  res.status(200).json(data);
  }catch(e){
    console.log(e);
  }
})

router.get('/other/profile/:id',  async(req,res)=>{
  try{
    const {id} = req.params;
    const info = await pool.query(
      "SELECT * FROM f_get_other_profile($1)",
      [id]
    );
    res.status(200).json(info.rows[0]);
  }catch(e){
    console.log(e);
  }
})

router.get('/type/:id',  async(req,res)=>{
  try {
    console.log("hit");
    const {id} = req.params;
    const type = await pool.query("select user_type_id from users where id=$1", [id]);
    res.json(type.rows[0]);
  } catch (e) {
    console.error(e);
    res.Status(500);
  }
})

router.put('/self/profile/update',  async(req,res)=>{
  try {
    console.log("hit");
    const {
      firstName,
      lastName,
      email,
      phone,
      bio,
      id
    } = req.body;
    const updated = await pool.query(
      "SELECT * FROM F_UPDATE_PROFILE($1,$2,$3,$4,$5,$6)",
      [firstName, lastName, email, phone, bio, id]
    )
    return res.status(200).end();
  } catch (e) {
        console.log(e);
  }

});

router.put('/self/uploadProfilePic',  async (req, res) => {
  const form = new multiparty.Form();
  form.parse(req, async (error, fields, files) => {
    if (error) {
      console.log(error);
      return res.status(500).send(error);
    };
    try {
      const id=fields.id[0]
      const buffer = fs.readFileSync(files.photo[0].path);
      const fileName = `${Date.now().toString()}`;
      const fileType = files.photo[0].path.substring(files.photo[0].path.lastIndexOf(".") + 1);
      console.log(fileType);
      const params = {
        Body: buffer,
        Bucket: process.env.AWS_S3_BUCKET,
        Key: `${fileName}.${fileType}`,
      };
     console.log(params);
      const data= await s3.upload(params).promise();
      const url=data.Location
      console.log(url);
      const newPhoto = await pool.query(
        "SELECT * FROM f_upload_profile_pic($1,$2)",
        [url,id]
      );
      res.status(200);
      return res.json(data.Location);
    } catch (err) {
      return res.status(500);
    }
  });
});

module.exports = router;
