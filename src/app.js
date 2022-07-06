const path = require('path');
const express = require('express');
const { dirname } = require('path');
const hbs = require('hbs')
const geocode = require('./utils/geocoding')
const forecast = require("./utils/forecast")
// console.log(__dirname)
// //console.log(__filename)
const PORT = process.env.PORT || 3000

// Define paths for Express Config
const publicDir = path.join(__dirname,'../public/');
const viewsPath = path.join(__dirname,"../templates/views/")
const partialsPath = path.join(__dirname,"../templates/partials/")


const app =express();


app.set('view engine','hbs') 
app.set('views',viewsPath)
hbs.registerPartials(partialsPath)


app.use(express.static(publicDir));

app.get('',(req,res) => {
    res.render('index',{
        title:"RoaringWIND",
        name:"Created by Ashutosh",
    });
});


app.get('/about',(req,res) => {
    res.render('about',{
        title:"About",
        name:"rp",
    });
});

app.get('/help', ( req, res) => {
    res.render('help', {
        title:"Help",
        message:"We're still building this page! Check it out later!",
    });
});


app.get('/weather', ( req, res) => { 
    
    if(!req.query.address){
        return res.send({
            error: 'You must provide an address',
        });
    }


    geocode(req.query.address,(error,{latitude , longitude, location} = {}) => {
        if(error){
            return res.send({ error });
        }
        // console.log('Data', data);
        forecast(latitude, longitude, (error, forecastData) => {
            if(error){
                return res.send({ error });
            }
            console.log(location);
            console.log(forecastData);
            res.send({
                forecast:forecastData,
                location:location,
                address:req.query.address,
            });
        });
    });
});


app.get('/help/*',(req,res)=>{
    res.render('404', {
        title:"ERROR 404",
        message:"This help section is not avaliable right now!",
    });
})

app.get('*',(req,res)=>{
    res.render('404', {
        title:"ERROR 404",
        message:"Page Not Found! Go Back!",
    });
})




app.listen(PORT,()=>{
    console.log('Server up and ready at '+ PORT);
})
