const express = require('express')
const https = require('https')
const bodyParser = require('body-parser')
const app = express()

app.use(bodyParser.urlencoded({extended:true}))

app.use(express.static("public"))

app.get("/", function(req, res){

  res.sendFile(__dirname + "/index.html")


})

app.post("/", function(req, res){
  const query = req.body.city



  const url = "https://api.openweathermap.org/data/2.5/weather?q="+query+"&appid=4e802080563227d08cd996b2560485d7&units=Metric"
  https.get(url, function(response){
    console.log(response.statusCode)
    response.on("data", function(data){
      const weatherData = JSON.parse(data)
      const temp = weatherData.main.temp
      const descrip = weatherData.weather[0].description
      const icon = weatherData.weather[0].icon
      res.write("<h1>The temperature in "+query+" is "+ temp +" degree Celcius.</h1>")
      res.write("<p>The weather is currrntly "+ descrip+" </p>")
      res.write('<img src ="http://openweathermap.org/img/wn/' + icon + '@2x.png" alt ="imag">')
      res.send()
    })
  })
})




app.listen(process.env.PORT || 3000, function(){
  console.log("Server started")
});
"https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=CnRtAAAATLZNl354RwP_9UKbQ_5Psy40texXePv4oAlgP4qNEkdIrkyse7rPXYGd9D_Uj1rVsQdWT4oRz4QrYAJNpFX7rzqqMlZw2h2E2y5IKMUZ7ouD_SlcHxYq1yL4KbKUv3qtWgTK0A6QbGh87GB3sscrHRIQiG2RrmU_jF4tENr9wGS_YxoUSSDrYjWmrNfeEHSGSc3FyhNLlBU&key=YOUR_API_KEY"
