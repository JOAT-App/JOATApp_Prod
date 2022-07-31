// Middleware; when users submit information to the login/register routes this will check and see if they follow email and username conventions.
// Maybe we do this check beforehand, before submission of information? Client side checking of routes
// I think it might be annoying for user if they figure out after they have submitted the form.

module.exports = function(req, res, next) {
    const { firstName, lastName, email, password, phone, dateString } = req.body;

    function validEmail(userEmail) {
      return /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/.test(userEmail);
    }

    // lets have an intern do the validation of username with regex. No spaces, symbols, etc in username
    // function validUsername(username) {
    //     return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(username);
    // }
    //
    if (req.path === "logister/register") {
      console.log(!email.length);
      if (![firstName, lastName, email, password, phone].every(Boolean)) {
        return res.json("Missing Credentials");
      } else if (!validEmail(email)) {
        return res.json("Invalid Email");
      }
    } else if (req.path === "logister/login") {
      if (![email, password].every(Boolean)) {
        console.error('From validInfo.js',email,password)
        return res.json("Missing Credentials validInfo.js");
      } else if (!validEmail(email)) {
        return res.json("Invalid Email");
      }
    }

    next();
  };
