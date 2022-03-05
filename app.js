const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const { path } = require('express/lib/application');
const { HTTPRequest } = require('puppeteer');
const MongoClient = require('mongodb').MongoClient;
const url = 'mongodb://127.0.0.1:27017';


app.use(express.static('/public'))



//setup connection
MongoClient.connect(url, {useUnifiedTopology: true})
.then(client => {
    console.log('connected to database');
    const db = client.db('user-signup-info');
    const manateeCollection = db.collection('manatees');



//----------middleware------------
app.use(bodyParser.urlencoded({extended: true}));
app.set('view engine', 'html');


//----------routes----------------
//going to index.ejs and reading database entries
app.get('/', (req, res) =>{
    db.collection('manatees').find().toArray()
    .then(manatees => {
        res.render('index.html', {manatees: manatees})
    })
    .catch(/*---*/)
})

//grabbing form data and adding to database
app.post('/manatees', (req, res)=>{
    //console.log(req.body);
    manateeCollection.insertOne(req.body)
    .then(result =>{
        //console.console.log(result);
        res.redirect('/');
    })
    .catch(error => console.error(error));
})


//----------server----------------
app.listen(3000, function(){
    console.log('server is running');
})
})

//----------end of connection-----
.catch(console.error);

