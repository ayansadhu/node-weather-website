const request= require('request')
const geocode = (address,callback)=>{
    const url= 'http://api.positionstack.com/v1/forward?access_key=0dbcbcf7a4d4150ff71b536ec8779cb9&query='+encodeURIComponent(address)
    request({ url , json: true}, (error, {body})=> {
        //console.log(response.body.data.length)
        if(error){
            callback('Unable to connect', undefined)
        } else if(body.error){
            callback('Unable to find location', undefined)
        } else {
            callback(undefined,{
                latitude: body.data[0].latitude, 
                longitude: body.data[0].longitude,
                location: body.data[0].label
            })
        }
    })
}
module.exports =geocode