const express = require('express');
const parser = require('body-parser');
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/online-store');

const Product = mongoose.model('Product', {id: Number, name: String, price: mongoose.Schema.Types.Decimal128})

const app = express();
app.use(parser.json());


app.get('/products', (req,res) => Product.find()
.exec()
.then(products => res.json(products)));

app.post('/products', (req,res) => Product.create(req.body)
.then(newProduct => res.json(newProduct)));

app.put('/products/:id',(req,res) => Product.findOneAndUpdate({
    id: req.params.id }, req.body)
    .exec()
    .then(product => res.json(product)))

app.delete('/products/:id', (req,res) => Product.deleteOne({
    id: req.params.id })
    .exec()
    .then(product => res.json(product))
)

app.listen(3000, 'localhost', ()=> {console.log('Сервер запущен')});