const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const express = require('express')
const dotenv = require('dotenv')
const cors = require('cors')
const app = express()
const port =process.env.PORT || 5000
dotenv.config()
app.use(cors())
app.use(express.json())
const uri = "mongodb+srv://mentoradb:ZT7XUHKQVk81ZAiG@cluster0.ctxpd6l.mongodb.net/?appName=Cluster0";


const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});
async function run() {
  try {
    
    await client.connect();
const db=client.db("mentoradb")
const coursesCollection =db.collection('courses') 
// get all data
    app.get('/courses',async(req,res)=>{
      const cursor = coursesCollection.find()
      const result =await cursor.toArray()
   res.send(result)
    })
 // get featured data
    app.get('/featured',async(req,res)=>{
      const cursor = coursesCollection.find().limit(4)
      const result =await cursor.toArray()
   res.send(result)
    })

    //get data by id
    app.get('/courses/:id',async(req,res)=>{
      const id = req.params.id;
      console.log(id);
      const query = {
        _id: new ObjectId(id)
      }
     
      const result = await coursesCollection.findOne(query)
    res.send(result)
    })
    
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})