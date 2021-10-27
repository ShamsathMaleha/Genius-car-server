const express = require('express');
const cors = require('cors');
const { MongoClient } = require('mongodb');
require('dotenv').config();



const app = express();
const port = 5000;

app.use(cors())
app.use(express.json())

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.ucxei.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

// console.log(uri);


async function run() {
    try {
      await client.connect();
      const database = client.db("carDB");
      const serviceCollection = database.collection("services");
      
      // post api

      app.post('/services',async(req,res)=>{
         const service = req.body; 
         console.log('hit',service);
          const result = await serviceCollection.insertOne(service);
          res.json(result);
        //   console.log(result)
        // res.send('post hitted')
      })
      
      
    } 
    finally {
    //   await client.close();
    }
  }
  run().catch(console.dir);


app.get('/',(req,res)=>{
    res.send('running')
})

app.listen(port,()=>{
    console.log('on port', port)
})