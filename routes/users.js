var express = require('express');
const upload  = require('../config/multer');
const Product = require('../Model/product');
const User = require('../Model/user');
var router = express.Router();
const bcrypt = require('bcrypt')




// auth

router.get('/auth-signup',async(req,res)=>{
  res.render('signup')
})

router.post('/auth-signup', async (req, res) => {
  const { username, email, password } = req.body;
  console.log(req.body);
  

  // Input validation
  if (!username || !email || !password) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  try {
    // Check if the email already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'Email already in use' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create the new user
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
    });

    // Save the user to the database
    await newUser.save();

    req.session.user = {
      email:email
    }


    res.redirect('/')
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

router.get('/login',async(req,res)=>{
  res.render('login')
})

router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if email and password are provided
    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required' });
    }

    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    req.session.user = {
      email:email
    }


    // Respond with token and user info
    res.redirect('/')

  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// router.post('/logout',()=>{
  
// })

// Main Page List

router.get('/', async function(req, res, next) {
  if(!req.session.user){
    res.redirect('/login')
  }else{
    res.render('home')
  }
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
