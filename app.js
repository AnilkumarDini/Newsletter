
const express = require("express");
const bodyParser = require("body-parser");
const request = require("requests");
const https = require("https");
const { url } = require("inspector");
const app = express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));

app.get("/",function(req,res){
    res.sendFile(__dirname + "/signup.html");
});

app.post("/",function(req, res){
    const firstName = req.body.fName;
    const lastName = req.body.lName;
    const emailId = req.body.email;
    const data ={
        members : [  
            {
                email_address : emailId,
                status : "subscribed",
                merge_fields: {
                    FNAME : firstName,
                    LNAME : lastName
                }
        }
    ]
    };
  const jsonData = JSON.stringify(data);  

  const url = "https://us12.api.mailchimp.com/3.0/lists/b172c10f10"

  const options ={
    method : "POST",
    auth : "dini:1db8902df4becda33e8defa143fde144-us12"
  }
  const request = https.request(url, options, function(response){

    if (response.statusCode===200){
        res.sendFile(__dirname +"/success.html");
    }
    else{
        res.sendFile(__dirname +"/failure.html");
    }
    response.on("data",function(data){
        console.log(JSON.parse(data));
    })
  })
//   request.write(jsonData);
  request.end();

})
app.post("/failure", function(req, res){
    res.redirect("/")
})
app.listen(process.env.PORT || 3000, function(req,res){
    console.log("Server listening");
})

// api key
// 1db8902df4becda33e8defa143fde144-us12
// audience id
// b172c10f10