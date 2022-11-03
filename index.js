const express = require('express')
const app = express()
const cors = require('cors');
const { ObjectId } = require('mongodb')
const { MongoClient, ServerApiVersion } = require('mongodb');
const port = 5000;


app.use(cors());
app.use(express.json());

const uri = "mongodb+srv://snapwrite:FnHef5E5I2DzgePy@cluster0.afzxww3.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });


async function run() {
    try {
        await client.connect()
        // const firstCollection = client.db("test").collection("devices")
        const images = client.db("images").collection("url")
        const product = client.db("product").collection("information")


        app.get('/data', async (req, res) => {
            const result = await product.find().toArray()
            // console.log(result);
            res.send(result)
        })

        app.get('/image', async (req, res) => {
            const result = await images.find().toArray()
            res.send(result)
        })

        app.put('/saveImage', async (req, res) => {
            const { id, imageURL } = req.body

            const filter = {_id: ObjectId(id)}
            const options = {upsert: true}
            const updatedDoc = {
                $set: {
                    imageURL
                }
            }

            const result = await images.updateOne(filter, updatedDoc, options)
            console.log(result);
            res.send({ result: result })
        })

        app.put('/mod', async (req, res) => {
            const { id, paragraphOne, paragraphTwo, paragraphThree } = req.body

            const filter = {_id: ObjectId(id)}
            const options = { upsert: true }
            const updatedDoc = {
                $set: {
                    paragraphOne, 
                    paragraphTwo, 
                    paragraphThree
                }
            }

            const result = await product.updateOne(filter, updatedDoc, options)
            console.log(result);
            res.send({ result: result })
        })


        app.get('/', (req, res) => {
            res.send({ hi: "p" })
        })

    }

    finally {

    }
}

run().catch(console.dir)


app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})