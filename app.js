// Express stuff
const express = require("express")
const app = express();
const port = 80;
const path = require("path");
const fs = require("fs")
const bodyparser = require("body-parser")
const mongoose = require('mongoose');
main().catch(err => console.log(err));
async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/pubG');
    console.log("Mangoose Connection in established with the mongoDB")
}
// defining mongoose schema
const PubGSchema = new mongoose.Schema({
    Name: String,
    age: String,
    gender: String,
    address: String,
    more: String
});
const Mearch = mongoose.model('Mearch', PubGSchema);

app.use('/static', express.static('static'));// serving static files
app.use(express.urlencoded())

// pug stuff
app.set('view engine', 'pug')// set the template engine as pug
app.set('views', path.join(__dirname, 'views'))// set the view directory

// End points
app.get('/', (req, res) => { 
    const params = { }
    res.status(200).render('index.pug');
})

app.post('/', (req, res) => { 
    var mydata = new Mearch(req.body);
    mydata.save().then(()=>{
        res.send("this data has been saved to the database");
    }).catch(()=>{
        res.status(400).send("the item was not saved to the database")
    })
    // res.status(200).render('index.pug');
})

// app.post('/', (req, res) => {
//     Name = req.body.Name;
//     age = req.body.age;
//     gender = req.body.gender
//     address = req.body.address
//     more = req.body.more
//     let outputofForm = ` the response of user is ${Name}, ${age},${address},${gender},${more},`
//     fs.writeFileSync("output.txt", outputofForm)
//     const params = { 'message': 'Your form hass submitted successfully' }
//     res.status(200).render('index.pug', params);
// }) //

app.listen(port, () => {
    console.log("The app is working successfully")
})