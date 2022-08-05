const path = require('path')
const express=  require('express')
const hbs = require('hbs')
const geocode = require('../../weather-app/utils/geocode')
const forecast = require('../../weather-app/utils/forecast')

const app = express()
const port = process.env.PORT || 3000

//Define paths for express config
const publicDirectoryPath = path.join(__dirname,'../public')
const viewsPath= path.join(__dirname,'../templates/views')
const partialPath= path.join(__dirname,'../templates/partials')

//Setup handle bars engine and views location 
app.set('view engine', 'hbs')
app.set('views',viewsPath)
hbs.registerPartials(partialPath)

//Setup static directory to serve
app.use(express.static(publicDirectoryPath))


app.get('', (req, res)=>{
    res.render('index', {
        title: 'Weather App',
        name: 'Ayan'
    })
})
app.get('/help',(req, res)=>{
    res.render('Help',{
        msg: 'This is help text',
        title: 'Help',
        name: 'Ayan'
    })
})


app.get('/about',(req, res)=>{
     res.render('about',{
        title: 'About',
        name: 'Ayan'
     })
 })

app.get('/weather',(req, res)=>{
    if (!req.query.address){
        return res.send({
           error: 'You must provide search term'
       })
   }
   
   geocode(req.query.address,(error, {latitude, longitude, location} = {})=>{
    //console.log(process.argv[2])
    if (error){
        return res.send({
            error: error
        })
    }
    forecast(latitude, longitude, (error, forecastData) => {
        if (error){
            return res.send(error)
        }
        res.send({
            location: location,
            forecast: forecastData
        })
        //console.log(location)
        //console.log(forecastData)
      })
})

    
})

// app.get('/products',(req, res)=>{
//     if (!req.query.search){
//          return res.send({
//             error: 'You must provide search term'
//         })
//     }
//     console.log(req.query.search)
//     res.send(
//         {
//             products: []
//         }
//     )
// })

app.get('/help/*',(req,res)=>{
    res.render('404',{
        title:'404',
        name: 'Ayan',
        msg: 'Help article not found'
    })
})

app.get('*',(req,res)=>{
    res.render('404',{
        title: '404',
        name: 'Ayan',
        msg:'Page not found'
    })
})

app.listen(port, ()=>{
    console.log('Listening from port '+port)
})