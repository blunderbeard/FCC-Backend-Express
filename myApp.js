let express = require('express');
let bodyParser = require('body-parser');
let app = express();
let index = __dirname + '/views/index.html';

//CSS
app.use(express.static(__dirname + "/public"));
app.use("/public", express.static(__dirname + "/public"));

//Body-parser
app.use(bodyParser.urlencoded({extended: false}));

// JSON
app.use(express.json());

//Remote Logger
app.use((req, res, next) => {
  console.log(req.method, req.path,"- ",req.ip)
  next()
})

//Console Outputs
console.log("Hello World");
console.log(process.env.MESSAGE_STYLE);


//Main Page
app.get('/', (req, res) => {
//res.send('Hello Express')  Test 
  res.sendFile(index);
})


// Environment Variable
app.get('/json',function(req,res) {
if (process.env.MESSAGE_STYLE === 'uppercase') {
  res.json({"message": "HELLO JSON"});
} else {
  res.json({"message": "Hello json"});
}
});

// Date
app.get('/now', function(req,res,next) {
 req.time = Date().toString();
 next();
}, function(req,res) {
  res.send({time: req.time});
});

// Return word from url path
app.get("/:word/echo",(req,res) => {
  let word = req.params.word;

  res.json({"echo":word});
  
})

//Query Name
app.route('/name') 

    .get((req,res,next) => {

        let first = req.query.first;
        let last =  req.query.last;

        res.json({name: `${first} ${last}`});
    })

    .post ((req,res,next) => {

       let data = req.body;
      
        console.log(data.first);
        console.log(data.last);

        let First = data.first;
        let Last =  data.last;      

      res.send({name: `${First} ${Last}`});
      
    })


  
    

































 module.exports = app;
