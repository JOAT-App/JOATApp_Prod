const jobRoutes = require('./endpoints/jobs.js');
const loginRegister = require('./endpoints/loginRegister.js');
const userRoutes = require('./endpoints/users.js');
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const pool = require("./db");

const Stripe=require('stripe');
const sendEmail = require('./utils/email')

const stripe = Stripe(process.env.STRIPE_SK)

//streamchat
const StreamChat = require('stream-chat').StreamChat
const appID = process.env.STREAM_APP_ID;
const secret = process.env.STREAM_SECRET;
const client = new StreamChat(appID, secret, { timeout: 6000 });


//Auth

const authorization = require("./middleware/authorization.js");


const { config } = require("dotenv");
if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}
const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use( express.static('public'));

//File Upload

app.use('/jobs', jobRoutes);

app.use('/logister', loginRegister);

app.use('/users', userRoutes);

app.get("/", (req, res) => {
  res.send({ company: "JOAT Corporation 2021 Inc." });
});

app.post('/contactUs', authorization, async(req,res)=>{
  try {
    const {email, subject, message} = req.body
    await sendEmail('admin@joatapp.com', subject, message, email);
    res.status(200).end();
  } catch (e) {
    console.error(e);
    res.status(500).end();
  }
})

app.post("/payments/checkout", authorization, async (req, res) => {
  console.log("stripe-routes.js 9 | route reached", req.body);
  const { jobID, workerID } = req.body;
  const custIDResp = await pool.query(
    "select * from f_get_payment_info($1)",
    [jobID]
  );
  const workerInfo = await pool.query(
    "select * from f_users_id_name($1)",
    [workerID]
  );

  const {custid, homeownerID, cost, title} =custIDResp.rows[0];
  const { first_name, last_name} = workerInfo.rows[0];

  let customer;

  if(custid == null){
    customer = await stripe.customers.create();
    await pool.query(
      'select * from f_add_stripe_cust_id($1, $2)',
      [customer.id, homeownerID])
  }
  else{
    customer = await stripe.customers.retrieve(custID);
  }


  const ephemeralKey = await stripe.ephemeralKeys.create(
    {customer: customer.id},
    {apiVersion: '2020-08-27'}
  );

  console.log("Here: ",customer.id);

  console.log((Number(cost)));
  const paymentIntent = await stripe.paymentIntents.create({
  amount: Number(cost)*100,
  currency: "usd",
  customer: customer.id,
  payment_method_types: ['card'],
});

res.json({
    publishableKey: process.env.publishable_key, // https://stripe.com/docs/keys#obtain-api-keys
    paymentIntent: paymentIntent.client_secret,
    customer: customer.id,
    ephemeralKey: ephemeralKey.secret,
    cost: cost,
    title: title,
    workerFirst:first_name,
    workerLast: last_name
  });
})

app.post("/stream-token", (req,res) =>{
  const { input } = req.body;
  console.log('stream-token route id: ',input);
  if (input)
   {
     const token = client.createToken(input);
     return res.json(token);
    }
  else
   {
    return res.json("Could not generate token");
   }
})

app.listen(process.env.PORT, () => {
  console.log("Listening on port " + process.env.PORT);
});
