const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path'); // test
const { MongoClient, ServerApiVersion } = require('mongodb');
const app = express();
app.use(express.static(path.join(__dirname, 'frontend/build')));
app.use(cors());
app.use(bodyParser.json());

// Use an environment variable for the MongoDB URI
const uri = process.env.MONGODB_URI;

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

// Connect to MongoDB outside of the request/response cycle
client.connect().then(() => console.log("Successfully connected to MongoDB"))
.catch(err => console.error("Failed to connect to MongoDB", err));


app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept, Authorization'
    );
    res.setHeader(
        'Access-Control-Allow-Methods',
        'GET, POST, PATCH, DELETE, OPTIONS'
    );
    next();
});

app.get('/', (req, res) => {
  res.send('Hello World!')
})

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
}).on('error', err => {
  console.error('Express failed to start');
  console.error(err);
});
