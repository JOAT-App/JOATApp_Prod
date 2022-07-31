const express = require("express");
const router = express.Router()
const geohash = require("ngeohash");
const authorization = require("../middleware/authorization.js");
const haversine = require('haversine');
const abbrState = require("../utils/abbr");
const nodeGeocoder = require("node-geocoder");
const getJobCat = require('../utils/jobCategoryMap');
const pool = require("../db");
const sendEmail = require('../utils/email')
const Stripe=require('stripe');
let options = {
  provider: "openstreetmap",
};
let geoCoder = nodeGeocoder(options);
const { config } = require("dotenv");
if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const stripe = Stripe(process.env.STRIPE_SK)

router.use(authorization);

router.get('/applied',  async(req,res)=>{
    try{
      const distance = req.query.distance;
      const id = req.query.id;
      const latitude = req.query.latitude;
      const longitude = req.query.longitude;
      const jobs = await pool.query(
        "SELECT * FROM f_workers_get_applied_jobs($1)",
        [id]
      );
      const userCoords={
        latitude: latitude,
        longitude:longitude
      }
      let ret =[]
      jobs.rows.forEach((item, i) => {
        //console.log(item.geohash);
        let addrLatLon = geohash.decode(item.geohash)
        //console.log(addrLatLon);
        let addressCoords={
          latitude:addrLatLon.latitude,
          longitude:addrLatLon.longitude
        }
        let distanceToJob=haversine(userCoords,addressCoords, {unit:'mile'})
        item.distance=distanceToJob;
        ret.push(item);
      });
      //console.log(ret);

      res.status(200).json(ret);
    }catch(e){
      console.log(e);
    }
})

router.get('/hired',  async(req,res)=>{
    try{
      const distance = req.query.distance;
      const id = req.query.id;
      const latitude = req.query.latitude;
      const longitude = req.query.longitude;
      const jobs = await pool.query(
        "SELECT * FROM f_workers_get_hired_jobs($1)",
        [id]
      );
      const userCoords={
        latitude: latitude,
        longitude:longitude
      }
      let ret =[]
      console.log(jobs.rows);
      if(!jobs.rows.length){ return res.status(200).json(jobs.rows)}
      console.log("here");
      jobs.rows.forEach((item, i) => {
        let addrLatLon = geohash.decode(item.geohash)
        console.log("here");
        //console.log(addrLatLon);
        let addressCoords={
          latitude:addrLatLon.latitude,
          longitude:addrLatLon.longitude
        }
        let distanceToJob=haversine(userCoords,addressCoords, {unit:'mile'})
        item.distance=distanceToJob;
        ret.push(item);
      })
        res.status(200).json(ret);
    }catch(e){
      console.log(e);
    }
})

router.get("/get/worker",  async (req, res) => {
  try {
    const distance = req.query.distance;
    const id = req.query.id;
    const latitude = req.query.latitude;
    const longitude = req.query.longitude;
    const km = distance*1.6 //convert distance to kilometers
    let hash = geohash.encode(latitude, longitude, 9);
    //console.log('app.js::/get/worker ',distance, latitude, longitude);
    if (km < 50){
      hash=hash.substring(0,4)
    }else{
      hash=hash.substring(0,3)
    }
    //console.log(hash);
    const Postings = await pool.query(
      "SELECT * FROM f_workers_get_open_jobs($1, $2)",
      [hash, id]
    );
    const userCoords={
      latitude: latitude,
      longitude:longitude
    }
    let ret =[]
    Postings.rows.forEach((item, i) => {
      //console.log(item.geohash);
      let addrLatLon = geohash.decode(item.geohash)
      //console.log(addrLatLon);
      let addressCoords={
        latitude:addrLatLon.latitude,
        longitude:addrLatLon.longitude
      }
      let distanceToJob=haversine(userCoords,addressCoords, {unit:'mile'})
      if(distanceToJob <= distance){
        item.distance=distanceToJob;
        ret.push(item);
      }
    });
    //console.log(ret);

    res.json(ret);
  } catch (err) {
    console.error(err.message);
  }
});

router.get("/get/homeowner/:id",  async(req,res)=>{
  try {
    const {id} = req.params;
    console.log(id);
    //console.log(hash);
    const jobs = await pool.query(
      "SELECT * FROM f_homeowner_get_jobs($1)",
      [id]
    );
    //console.log(ret);

    return res.json(jobs.rows);
  } catch (err) {
    console.error(err.message);
  }
})

router.get("/getById/:id",  async (req, res) => {
  try {
    const { id } = req.params;
    const todo = await pool.query("SELECT * FROM f_job_get_by_id($1)", [id]);
    res.json(todo.rows[0]);
  } catch (error) {
    console.error(error.message);
  }
});

router.post('/apply',  async(req,res)=>{
  try {
    const { jobID, workerID, note } = req.body;
    console.log(req.body);
    const accept = await pool.query(
      "SELECT * FROM f_apply($1, $2, $3)",
      [jobID, workerID, note]
    )
    return res.status(200).end();
  } catch (err) {
    console.error(err.message);
  }
})

router.post("/post",  async (req, res) => {
  // async provides await such that completes before continues
  try {
    // destructures parameters of the req parameter
    const {
      title,
      description,
      address,
      apt_no,
      category,
      pay,
      homeownerID,
      minutes
    } = req.body;
    console.log(req.body);
    const address0 = await geoCoder.geocode(address);
    console.log(address0);
    let city = address0[0].city;
    let state = abbrState(address0[0].state, "abbr");
    let street = address0[0].streetName;
    let streetNumber = address0[0].streetNumber;
    let zip = address0[0].zipcode;
    let lat = address0[0].latitude;
    let long = address0[0].longitude;
    let hash = geohash.encode(lat, long, 9);
    console.log(getJobCat(category));

    // // array helps with avoiding sql injection?
    const newPost = await pool.query(
      "SELECT * FROM f_add_job($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13)",
      [
        title,
        description,
        getJobCat(category),
        homeownerID,
        pay,
        city,
        state,
        street,
        streetNumber,
        zip,
        hash,
        apt_no,
        Number(minutes)
      ]
    );
    // // sends response to server through res parameter
    return res.status(200).end();
  } catch (err) {
    console.error(err.message);
    return res.status(500).end();
  }
});

router.put("/update",  async(req,res)=>{
  try {
    const {
      description,
      pay,
      jobID,
      minutes,
    } = req.body;
    const updated = await pool.query(
      "SELECT * FROM F_jobs_update($1,$2,$3,$4)",
      [jobID, description, minutes, pay]
    )
    return res.status(200).end();
  } catch (e) {
    console.log(e);
  }
})

router.post('/complete',  async(req,res)=>{
  try {
    const {jobID} = req.body;
    console.log(jobID);
    const jobInfo = await pool.query('SELECT * FROM f_jobs_mark_complete($1)',[jobID]);
    console.log(jobInfo.rows[0]);
    const {workerstripe, pay, title} = jobInfo.rows[0];
    console.log(workerstripe+":"+pay+":"+title);

    const transfer = await stripe.transfers.create({
      amount: ((pay*100)*0.929)-29,
      currency: 'usd',
      destination: workerstripe,
      transfer_group: title,
    })
    const transferDB = await pool.query('update job_detail set stripe_transfer_id=$1 where jd_job_header_id=$2 ',[transfer.id, jobID]);
    console.log(transfer);

    return res.status(200).end()

  } catch (e) {
    console.error(e);
  }
})

router.delete("/delete/:id",  async (req, res) => {
  try {
    const { id } = req.params;
    const deletePosting = await pool.query(
      "select * from f_delete_job($1)",
      [id]
    );
    res.status(200).end()
  } catch (error) {
    console.error(error.message);
    res.status(500).end()
  }
});

router.get("/getApplicants/:id",  async(req,res)=>{
  try {
    const { id } = req.params;
    const applicants = await pool.query(
      "SELECT * FROM f_get_applicants_for_homeowners($1)",
      [id]
    );
    res.json(applicants.rows);
  }
  catch (err) {
    console.error(err.message);
  }
});

router.post("/hireapplicant", async(req,res)=>{
  try {
    const { jobID, workerID } = req.body;
    console.log(req.body);
    const accept = await pool.query(
      "SELECT * FROM f_accept_applicant($1, $2)",
      [jobID, workerID]
    )
    const email = await pool.query(
      "SELECT email from users where id=$1",
      [workerID]
    )
    const {title, homeowner} = accept.rows[0];
    const html = `Congratulations${homeowner} has hired you to complete their ${title} job!
    Log into JOAT App on your phone to see the job details.`
    sendEmail(email.rows[0].email, "You're Hired!", html );
    res.json(accept.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
})

module.exports = router;
