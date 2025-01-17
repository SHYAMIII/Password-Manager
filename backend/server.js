const express = require('express')
const dotenv = require('dotenv')
const { MongoClient } = require('mongodb');
const bodyparser= require("body-parser");
const { Result } = require('postcss');

dotenv.config()



const app = express()
const port = 3000

const url = 'mongodb://localhost:27017';
const client = new MongoClient(url);
const dbName = 'PassSG';
app.use(bodyparser.json())



client.connect();

app.get('/', async(req, res) => {
    const db = client.db(dbName);
    const collection = db.collection('passwords');
    const findResult = await collection.find({}).toArray();
    res.json(findResult);
})

app.post('/', async(req, res) => {
    const db = client.db(dbName);
    const password=req.body
    const collection = db.collection('passwords');
    const findResult = await collection.insertOne(password);
    res.send({success:true, result:findResult});
})

app.delete('/', async(req, res) => {
    const db = client.db(dbName);
    const password=req.body
    const collection = db.collection('passwords');
    const findResult = await collection.deleteOne(password);
    res.json({success:true, result:findResult});
})


app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})