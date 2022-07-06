const request = require('request')


const forecast = (latitude,longitude, callback) => {
    const url = 'http://api.weatherapi.com/v1/current.json?key=cc9e2380423b47c094254140220607&q='+ latitude + ',' + longitude;

    request({ url , json:true }, (error,{body}) => {
        if(error){
            callback( 'Unable to connect to the weather service! Try Again?' , undefined);
        } else if (body.error){
            callback('Please enter valid input (Enter a location)!',undefined)
        }
        else{
            const getback = body.current.condition.text + ".\n" + "Today's Temperature is " + body.current.temp_c + "°C. " +
                            "Feels like " + body.current.feelslike_c + "°C."+ "\n" +
                            "Pressure - " + body.current.pressure_mb + "mb \n" +
                            "Wind  - " + body.current.wind_kph + "kph ("+body.current.wind_dir+") " +"\n" +
                            "Wind Gust - " + body.current.gust_kph + "kph \n" +
                            "Humidity - " + body.current.humidity + "\n" +
                            "Precipitation amount - " + body.current.precip_mm + "mm \n" +
                            "Cloud cover is " + body.current.cloud + "% \n" +
                            "Last Updated : " + body.current.last_updated + "\n" ;

            callback(undefined,getback);
        }
    });

}


module.exports = forecast;







