const express = require('express');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;





const server = express();

server.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }));
server.use(bodyParser.json({ limit: '50mb' }));
server.use(cookieParser());
server.use(morgan('dev'));
server.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*'); // update to match the domain you will make the request from
  res.header('Access-Control-Allow-Credentials', 'true');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
  next();
});







let schemaUsers = new Schema({
  name: String,
  email: String,
  password: String
});
// You can add collection parameter object

let schemaProduct = new Schema({
  name: String,
  price: Number,
  weight: Number,
  categories: [String],
});
     

let User = mongoose.model('User', schemaUsers);
let Product = mongoose.model('Product', schemaProduct);

mongoose.connect('mongodb://localhost:27017/dbHenry')
.then(db => console.log('DB is connected'))
.catch(err => console.log(err));








async function searchDbUsers(){
  let dbtest = await User.find({name:'lucas'});
  if (dbtest.length > 0) return dbtest;

  await new User({
    name: 'lucas',
    email: 'lucas@hotmail.com',
    password: '1234'
  }).save();
  
  await new User({
    name: 'lucas',
    email: 'lucas@gmail.com',
    password: '12345'
  }).save();
  
  await new User({
    name: 'toto',
    email: 'toto@hotmail.com',
    password: '123456'
  }).save();
  
  
  let dbtest2 = await User.find({name:'lucas'});
  return dbtest2
};



async function searchDbProducts(){
  let productsDB = await Product.find();
  if (productsDB.length > 0) return productsDB;

  await new Product({
    name: 'Harry Potter',
    price: 100,
    weight: 10,
    categories: ['Clásicos', 'Misterio'],
  }).save();
  
  await new Product({
    name: 'Tom Sawyer',
    price: 50,
    weight: 5,
    categories: ['Clásicos', 'Misterio'],
  }).save();
  
  await new Product({
    name: 'Call of Ctullu',
    price: 70,
    weight: 7,
    categories: ['Clásicos', 'Misterio'],
  }).save();
  
  let productsDBNew = await Product.find();
  return (productsDBNew);
};






server.get('/', function (req, res) {
  res.send('Welcome');
});

server.get('/users', async function (req, res) {
  let dbtest = await searchDbUsers();
  res.json(dbtest);
});

server.get('/products', async function (req, res) {
  let dbtest = await searchDbProducts();
  res.json(dbtest);
});
    


server.listen(3001,() =>{
  console.log('listening on port 3001');
});
