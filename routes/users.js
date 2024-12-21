var express = require('express');
const upload  = require('../config/multer');
const Product = require('../Model/product');
var router = express.Router();





// Main Page List

router.get('/', async function(req, res, next) {
  res.render('home')
});

router.get('/marketPlace',async function(req, res, next) {
  res.render('marketPlace')
});

router.get('/Transactions',async function(req, res, next) {
  res.render('transactions')
});

router.get('/Profile', async function(req, res, next) {
  res.render('Profile')
});

// Category List

router.get('/category/furniture',async(req,res)=>{
  res.render('category/furniture',)

})

router.get('/category/Appliances',async(req,res)=>{
  res.render('category/Appliances')
})

router.get('/category/Appartments',async(req,res)=>{
  res.render('category/Appartments')
})

router.get('/category/Bike',async(req,res)=>{
  res.render('category/Bike')
})

// product CRUD operations

router.get('/addProduct',async(req,res)=>{
  res.render('addProduct')
})

router.post('/addProduct', upload.single('productImage'), async (req, res) => {
  try {
    const { productName, productCategory, rentalPrice, rentalDuration, productDescription } = req.body;
    console.log(req.body);
    

    if (!productName || !productCategory || !rentalPrice || !rentalDuration || !productDescription) {
      return res.status(400).json({ message: 'All fields are required.' });
    }

    if (!req.file) {
      return res.status(400).json({ message: 'Product image is required.' });
    }

    const newProduct = new Product({
      productName,
      productCategory,
      rentalPrice: parseFloat(rentalPrice),
      rentalDuration: parseInt(rentalDuration),
      productDescription,
      productImage: `/uploads/${req.file.filename}`, // Save file path
    });

    await newProduct.save();

    res.status(201).json({
      message: 'Product added successfully!',
      product: newProduct,
    });
  } catch (error) {
    console.error("Error adding product:", error);
    res.status(500).json({ message: 'An error occurred while adding the product.', error: error.message });
  }
});

router.get('/item-details',async(req,res)=>{
  res.render('ItemDetails')
})



module.exports = router;
