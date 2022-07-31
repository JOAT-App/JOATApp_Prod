## 

# 

# Backend Documentation
# Contents
1. [Routes](#routes)
    1. [Login/Register](#logister-routes) 
    2. [Users](#user-routes) 
    3. [Jobs](#job-routes) 
    4. [Misc.](#misc) 
3. [Utils](#util-functions)
4. [Database](#database)
    1. [Tables](#tables) 

## Routes

### Logister routes 
#### `loginRegister.js`

- POST `/logister/register`
  
  - PARAMS: `firstName, lastName, email, password, phone, dob, type`
  
  - Creates account, sends confirmation email and initalizes stripe account if user is worker 
  
  - sends response with success boolean and user id

- POST `/logister/login`
  
  - PARAMS:`email,  password`
  
  - Checks email and password, if user auth passes creates jwt token and sends response with `fname, lname, type, image_url (ProfilePic), token` 
  
  - 

- POST `/logister/password/forgot`
  
  - PARAMS: `email`
  
  - Generates token and emails to user to reset password
  
  - returns status 200

- PUT `/logister/password/change`
  
  - PARAMS: `id(userID), email, password, token `
  
  - Verifies the forgot password token, and then updates the user password in data base on successful auth
  
  - returns 200 status on success

- POST `/logister/password/verifyToken` 
  
  - PARAMS: `email, token` 
  
  - Verifies password hash and returns status 200
  
  - 

- GET `/logister/verify/:hash`
  
  - checks if hash if correct (exists) and if it is verifies user in the database
  
  - sends success message, probably should make HTML page

- POST `/logister/stripe-onboarding` 
  
  - PARAMS: `userId` 
  
  - creates stripe account link and sends it as response, front end should redirect user to link

## User routes 
#### `users.js`

- GET `/users/self/profile/:id`
  
  - Gets and returns profile info from database, see f_get_profile_info database function for what it returns 

- GET `/users/other/profile/:id` 
  
  - Gets and returns profile info from database, see f_get_other_profile database function for what it returns

- GET `/users/type/:id`
  
  - Gets and returns the user type fro the user with the corresponding `:id` 

- GET `/users/self/profile/update` 
  
  - PARAMS: `firstName, lastName, email, phone, bio, id` 
  
  - Calls `f_update_profile()` frunction from database with above params, returns 200 status

- PUT `/users/self/uploadProfilePic` 
  
  - Takes in a multi party form containing user id from fields, file (picture) in files
  
  - Uploads new profile pic to AWS s3, using current datetime as file name
  
  - gets url of new AWS image, updates in database, returns urls to client'

## Job routes 
#### `jobs.js`

- GET `/jobs/applied`
  
  - PARAMS (Query String): `distance, id, latitude, longitude` 
  
  - calls the `f_workers_get_applied_jobs()` database funciton to get data for jobs the user has applied to, returns the rows from this query   

- GET `/jobs/hired` 
  
  - PARAMS (Query String): `distance, id, latitude, longitude`
  
  - calls the `f_workers_get_hired_jobs()` database funciton to get data for jobs the user has been hired to, returns the rows from this query

- GET `/jobs/get/worker` 
  
  - PARAMS (Query String): `distance, id, latitude, longitude`
  
  - calls the`f_workers_get_open_jobs()` database funciton to get data for jobs the user has been hired to, filters the rows to only the jobs within specified distance of the users, returns the rows

- GET `/jobs/get/homeowner/:id`
  
  - Calls `f_homeowner_get_jobs` database function to get all jobs the user has posted, returns job info form query to client

- GET `/jobs/getById/:id`
  
  - calls  `f_job_get_by_id($1)` databse function to get job info for a specific jobs, returns this info

- POST `/jobs/apply` 
  
  - PARAMS: `jobID, workerID, note`
  
  - calls `f_apply` databse function to add the workers job application to the specific job.
  
  - returns 200 on success

- POST `/jobs/post` 
  
  - PARAMS: `title, description, address, apt_no, category, pay, homeownerID, minutes`
  
  - Desconstructs address, generates geohash, and calls `f_add_job()` database function to add job 
  
  - returns 200 on success

- PUT `/jobs/update` 
  
  - PARAMS: `pay, description, jobID, minutes` 
  
  - Calls `F_jobs_update()` database function to update the job posting
  
  - returns 200 on success

- POST `/jobs/complete`
  
  - PARAMS: `jobID`
  
  - Marks job with `jobID` complete in databse using `f_jobs_mark_complete()` function
  
  - initiates stripe transfer to worker who has completed the job

- DELETE `/jobs/delete/:id`
  
  - Deletes job using `f_delete_job()` databse function
  
  - returns 200 on success

- GET  `/jobs/getApplicants/:id`
  
  - Calls `f_get_applicants_for_homeowners()` database function to get applicants for job with specified `id`

- POST `/jobs/hireapplicant`
  
  - PARAMS: `jobID, workerID`
  
  - calls `f_accept_applicant()` database function to hire worker to job in database
  
  - emails user that they have been hired for a job
  
  - 

## Misc
#### `app.js`

- GET `/` 
  
  - Test route, just returns some sample JSON

- POST `/contactUs`
  
  - PARAMS: `email, subject, message`
  
  - Sends email to Admin@joatapp.com with `subject` as subject line, `message` as email conteent, and `email` as the reply to email (user's email)

- POST `/payments/checkout` 
  
  - PARAMS: `jobID, workerID` 
  
  - Creates stripe payment for a job, and reutrns payment info to the client.
  
  - see `f_get_payment_info` database function

- POST `/stream-token`
  
  - PARAMS: `input(UserID)`
  
  - Creates stream chat token for specified user and sends to client  

# Util Functions
## `/utils` Directory

# 1. `abbr.js`

- Exports function `abbrState(input, to)`, converts state name to abreviation or vice versa
  
  - `to` is either 'abbr' for 'name', 'abbr' to convert from name to abbreviation, 'name' from abbreviation to name
  
  - `input` is the input, either a state name or abbreviation,
  
  - Example usage `abbrState('New York', 'abbr')` or `abbrState('NY', 'name')` 

# 2. `email.js`

- exports function `sendEmail(email, subject, html, replyTo='do-not-reply@joatapp.com')` which sends a email with the specified subject and html
  
  - `email` email address of recipient
  
  - `html` html contents of email to be sent
  
  - `subject` subject line of email to be sent
  
  - `replyTo` reply to email address, defauls to do-not-reply@joatapp.com

# 3. `jobCategoryMap.js`

- Exports function `getJobCat(category)`, takes in string of category as parameter and returns its correspodning id from database

# 4. `jwtGenerator.js`

- exports function `jwtGenerator(user_id)` that takes userID integer as parameter and returns jwt token generated from secret in our env file. 

# Database

## Tables

- #### Address
  
  - Stores the information relating to any addresses we have such as addressess jobs will be done at. 
  
  - Columns (ALL not null except `apt_no`)
    
    - `id integer identity` PK 
    
    - `state varchar(2)` (State Abbreviation)
    
    - `city varchar(32)`
    
    - `street varchar(64)` 
    
    - `addr_number int` (street number)
    
    - `zip integer`
    
    - `apt_no varchar (32)` 
    
    - `geohash varchar(16)` Geohash to encode location of address 

- #### Forgot_password
  
  - Stores tokens for resetting password as well as when they are created
  
  - Columns 
    
    - `user_id integer` FK into `users(id)`
    
    - `token varchar(256)` (Reset password token)
    
    - `created timestamp` time that the token was created

- #### job_applicants
  
  - Stores information about what users have applied to what jobs 
  
  - Columns 
    
    - `note varchar(2048)` note worker can include with job application
    
    - `worker_id integer` FK into `user(id)` 
    
    - `job_id integer` FK into `job_header(id)`   

- #### Job_category
  
  - Reference take to store different job categories
  
  - Columns 
    
    - `id integer identity ` PK 
    
    - `category varchar(16)`

- #### job_header
  
  - Stores 'header' information about jobs, works in tandom with `job_detail` to store all job data
  
  - Columns 
    
    - `id integer identity` PK
    
    - `title varchar(128)`
    
    - `description varchar(1024)`
    
    - `addr_id integer` FK into `address(id)`
    
    - `job_status_id integer` FK into `job_status(id)`
    
    - `job_category_id integer` FK into `job_category(id)`
    
    - `homeowner_id integer` FK into `user(id)`
    
    - `minutes integer` 

- #### job_detail
  
  - Stores other data about jobs not stored in job_header (ik this doesn't make sense but we can't change it now)
  
  - Columns 
    
    - `id integer identity` PK
    
    - `jd_job_header_id integer` FK into `job_header(id)`
    
    - `time_posted timestampWithoutTimezone`
    
    - `pay numericc(5,2)`
    
    - `worker_id integer` FK into `user(id)`
    
    - `time_completed timestamp`
    
    - `stripe_transfer_id varchar(64)` unique idenitifer for stripe transaction related to payment for this job

- #### Job_status
  
  - Reference table for different job statuses and their correspodning ID
  
  - Columns 
    
    - `id integer identity` PK
    
    - `status varchar(16)`

- #### review
  
  - Currently unused. Stores information relating to reviews for jobs
  
  - Columns 
    
    - `id integer identity` PK
    
    - `title varchar(64)`
    
    - `description varchar(2048)`
    
    - `rating integer` values 0-10, each number represents a half star
    
    - `date_posted timestamp` 
    
    - `review_jh_id integer` FK into `job_header(id)`
    
    - `type integer` FK into `review_type(id)`

- #### review_type
  
  - Reference table to store type of review (i.e user to worker or worker to user)
  
  - Columns 
    
    - `id integer identity ` PK
    
    - `type varchar(32)` 

- #### user_auth
  
  - Tables to store users hashed passwords
  
  - Columns 
    
    - `pass_hash varchar(256)` hashed password
    
    - `ua_user_id integer` FK into `users(id)`

- #### user_type
  
  - Reference tabel to store the different types of users 
  
  - Columns 
    
    - `id integer indentity` PK
    
    - `type varchar(32)`

- #### Users
  
  - Stores all of the information related to our users
  
  - Columnns 
    
    - `id integer identity` PK
    
    - `first_name varchar(64)`
    
    - `last_name varchar(64)`
    
    - `phone varchar(10)` NOTE: Formatted as 1234567890
    
    - `email varchar(128)` SK
    
    - `photo_url varchar(256)` url of profile pic
    
    - `dob date`
    
    - `skills_id integer` FK into `skills(id)` (currently unused)
    
    - `confirmed boolean` boolean for if user is confirmed
    
    - `user_type_id integer` FK into `user_type(id)`
    
    - `bio varchar(2048)`
    
    - `geohash varchar(16)` (unused)
    
    - `stripe_id varchar(32)` only used for workers
    
    - `confirmation_hash varchar(256)`
    
    - `stripe_cust_id varchar(64)` only used for homeowners
    
    - `notification_token varchar(256)` currently unused
