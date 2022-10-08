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

mongoose.connect('mongodb+srv://<userdetails unique string>>/<tablename>>?retryWrites=true&w=majority',{
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
})
mongoose.connection
        .once('open', ()=>console.log('connected to database'))
        .on('error',(err)=>console.log("connection to database failed!!",err))

const gs = require('./models/groceries');
//const gs = require('./models/groceries');

app.use(upload.array()); 
app.use(express.static('public'));

// ROUTES
// find all groceries 
app.get('/',(req,res)=>{
    gs.find({})
            .then((data)=>{
                res.json({found: true, data: data});
            })
            .catch((err)=>{
                console.log(err)
                res.json({found: false, data: null});
            })
})
// insert new groceries 
app.post('/gs',(req,res)=>{
    new gs(req.body)
        .save()
        .then((v_data)=>{
            console.log(v_data);
            res.json({save: true, data:v_data})
            clearCache(v_data.gsType) // clear from cache if data is inserted 
        })
        .catch((err)=>{
            console.log(err)
            res.json({save: false})
        })
})
 
//
app.get('/:gsType/:sno', (req,res)=>{
    gs.findOne({serialno: req.params.sno,gsType: req.params.gsType})
                .cache(req.params.gsType) // save data in cache 
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

app.get('/:gsType/', (req,res)=>{
    gs.find({gsType: req.params.gsType})
                .cache(req.params.gsType)
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