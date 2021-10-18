const path = require('path')
const express = require('express');
const hbs = require('hbs');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

const app = express()

//Define paths for Express configs
const publicDirectoryPath = path.join(__dirname,'../public')
const viewPath  = path.join(__dirname,'../templates/views');
const partialsPath = path.join(__dirname,'../templates/partials')

//Set up handlebars engine  and views location
app.set('views',viewPath)
app.set('view engine','hbs');
hbs.registerPartials(partialsPath)

//Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('',(req,res) =>{
    res.render('index',{
        title:'Weather',
        name:'Sahir Bansal'
    });
})

app.get('/about',(req,res) =>{
    res.render('about',{
        title:'About Me',
        name:'Sahir Bansal'
    })
})

app.get('/help',(req,res) =>{
    res.render('help',{
        title:'Help!',
        message:'sahir@abc.com',
        name:'Sahir Bansal'
    })
})

app.get('/weather',(req,res) =>{
    if(!req.query.address){
        return res.send({
            error:'Please provide an address!'
        })
    }
    const address = req.query.address;

    geocode(address,(error,{latitude,longitude,location} ={}) =>{
        if(error){
            return res.send({
                error
            });
        }
        
        forecast(latitude, longitude, (error, forecastData) => {
            if(error){
                return res.send({
                    error
                });
            }
            res.send({
                forecast:forecastData,
                location:location,
                address:req.query.address
            });
    
        })
            
    })

});

app.get('/products',(req,res) =>{
    if(!req.query.search){
        return res.send({
            error:'You must provide a search term'
        })
    }
    //console.log(req.query);
    res.send({
        products:[]
    });
})
app.get('/help/*',(req,res) =>{
    res.render('error',{
        title:'Help 404',
        name:'Sahir Bansal',
        message:'Help article not found'
    })
})

//match everything (error page)
app.get('*',(req,res) =>{
    res.render('error',{
        title:'404',
        name:'Sahir Bansal',
        message:'Page not found'
    })

})


app.listen(3000,() =>{
    console.log('server is up on port 3000');
})



// app.get('/help',(req,res) =>{
//     res.send([{
//         name:'Sahir',
//         age:22
//     },{
//         name:'Ishita',
//         age:20
//     }]);
// });

// app.get('/about',(req,res) =>{
//     res.send('<h1>About</h1>')
// });





//console.log(__dirname);
//console.log(__filename);
//console.log(path.join(__dirname,'../public'));
// app.get('',(req,res) =>{
//     res.send('<h1>Hello express!</h1>')

// });