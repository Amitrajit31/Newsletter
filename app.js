//jshint esversion: 6

const express = require('express');
const bodyParser = require('body-parser');
//const request = require('request');
const fetch = require('node-fetch');
const app = express();

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(express.static("public"));

app.get("/", function(req, res) {
  res.sendFile(__dirname + "/signup.html");
});

app.post("/", function(req, res) {
  var firstName = req.body.fName;
  var lastName = req.body.lName;
  var email = req.body.email;

  var data = {
    'members': [
      {
      email_address: email,
      status: 'subscribed',
      merge_fields: {
        FNAME: firstName,
        LNAME: lastName
        }
      }
    ],
  }

  var jsonData = JSON.stringify(data)

  console.log(firstName, lastName, email);

  // NOTE: The API KEY BELOW HAS BEEN DISABLED ON MAILCHIMP
  //       AS THIS CODE WILL BE PUSHED TO PUBLIC GITHUB

  const url: 'https://us17.api.mailchimp.com/3.0/lists/232bd1ab2e',

  var options = {
    method: 'POST',
    headers: {
      "Content-type": "application/x-www-form-urlencoded; charset=UTF-8"
      'Authorization': "anish1 4b713ffe2687d651c4f33866d41163c1-us17"
    },
    body: jsonData
  }

  fetch(url, options)
  .then((res) => {
    if(res.statusCode == 200){
      res.sendFile(__dirname + "/success.html");
    }else{
      res.sendFile(__dirname + "/failure.html");
    }
  })
  catch((err) => {
    console.log(err);
  });
   

app.post("/failure.html", function(req, res){
  res.redirect("/");
});

app.listen(process.env.PORT || 3000, function() {
  console.log("Server is running");
});
