const { MongoClient, ServerApiVersion } = require('mongodb');
const { default: mongoose } = require('mongoose');
const uri = "mongodb+srv://abirhsaini:abirabir@cluster0.qxk2gwb.mongodb.net/mydata?retryWrites=true&w=majority";
mongoose.connect(uri, () => { console.log("connected") })