const   express     = require("express"),
        app         = express(),
        mongoose    = require("mongoose"),
        bodyParser  = require("body-parser"),
        multer      = require("multer"),
        upload      = multer()
        clearCache   = require('./services/cache')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))

// MONGODB SETUP

mongoose.connect('mongodb+srv://rushika:rushika@nodeexpressapp.orttsxn.mongodb.net/NREDB?retryWrites=true&w=majority',{
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
})
mongoose.connection
        .once('open', ()=>console.log('connected to database'))
        .on('error',(err)=>console.log("connection to database failed!!",err))

const vehicle = require('./models/vehicle');
const gs = require('./models/groceries');

app.use(upload.array()); 
app.use(express.static('public'));

// ROUTES

app.get('/',(req,res)=>{
    vehicle.find({})
            .then((data)=>{
                res.json({found: true, data: data});
            })
            .catch((err)=>{
                console.log(err)
                res.json({found: false, data: null});
            })
})

app.post('/vehicle',(req,res)=>{
    new vehicle(req.body)
        .save()
        .then((v_data)=>{
            console.log(v_data);
            res.json({save: true, data:v_data})
            clearCache(v_data.vehicleType)
        })
        .catch((err)=>{
            console.log(err)
            res.json({save: false})
        })
})
 

app.get('/:vehicleType/', (req,res)=>{
    gs.find({gsType: req.params.vehicleType})
                .cache(req.params.vehicleType)
                .then((data)=>{
                    if(data){
                        res.json({found: true, data: data})
                    }else{
                        res.json({found: false, data: null})
                    }
                })
                .catch((err)=>{
                    console.log(err)
                    res.json({found: false, data: null})
                })
})

 
app.listen(3000,()=>console.log("server started at port:3000"))