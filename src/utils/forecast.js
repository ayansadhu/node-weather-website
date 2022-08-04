const request= require('request')
const forecast = (latitude,longitude,callback)=>{
    const url= 'http://api.weatherstack.com/current?access_key=cd914cb4671fb056bedcdf252fc25859&query=' + latitude +','+ longitude
    //console.log(url)
    request({url, json: true}, (error,{body})=>{
        if (error){
            callback('Unable to connect weather service',undefined)
        } else if (body.error){
            callback('Unable to find location', undefined)
        } else {
            callback(undefined,'It is currectly '+ body.current.temperature +' degrees out. '+ 'It is feels like '+body.current.feelslike+ ' degrees '
            )
        }
    })
 }
 module.exports = forecast