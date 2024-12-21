var express = require('express');
var router = express.Router();


// Main Page List

router.get('/', function(req, res, next) {
  res.render('home')
});

router.get('/marketPlace', function(req, res, next) {
  res.render('marketPlace')
});

router.get('/Transactions', function(req, res, next) {
  res.render('transactions')
});

router.get('/Profile', function(req, res, next) {
  res.render('Profile')
});

// Category List

router.get('/category/furniture',(req,res)=>{
  res.render('category/furniture',)

})

router.get('/category/Appliances',(req,res)=>{
  res.render('category/Appliances')
})

router.get('/category/Appartments',(req,res)=>{
  res.render('category/Appartments')
})

router.get('/category/Bike',(req,res)=>{
  res.render('category/Bike')
})

// product CRUD operations

router.get('/addProduct',(req,res)=>{
  res.render('addProduct')
})

module.exports = router;
