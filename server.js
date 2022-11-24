const express = require("express");
const https = require("https");
const bodyParser = require("body-parser")

const app = express();

app.use(bodyParser.urlencoded({extended: true}));


app.get("", function (req, res){
  
res.sendFile(__dirname + "/index.html")
   
});

app.post("/", function(req, res){
   const query = req.body.cityName;
  const apiKey = "24514eb153f86aa2ab54980531b2a1a7";
  const unit = "metric";

  const url =
    "https://api.openweathermap.org/data/2.5/weather?q=" +
    query +
    "&appid=" +
    apiKey +
    "&units=" +
    unit;
  https.get(url, function (response) {
    console.log(response.statusCode);

    response.on("data", function (data) {
      const weatherData = JSON.parse(data);
      const temp = weatherData.main.temp;
      const weatherDescription = weatherData.weather[0].description;
      const weatherIcon = weatherData.weather[0].icon;
      const imageURL =
        "http://openweathermap.org/img/wn/" + weatherIcon + "@2x.png";
      res.write("<p>The weather is currently " + weatherDescription + "</p>");
      res.write(
        "<h1>Temperature in " + query+ " is " + temp + " Degree Celcius</h1>"
      );
      res.write("<img src=" + imageURL + ">");
      res.send();
    });
  });
})

app.listen(3000, function () {
  console.log("server is listening on port 3000");
});


