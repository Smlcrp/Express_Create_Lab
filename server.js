const express = require('express');
const app = express();

const PORT = 3000;

// middleware
app.use(express.urlencoded({ extended: false }));

// db
const products = require('./models/productModel.js');

// product index route
app.get('/products', (req, res) => {
  const allProducts = products.find();
  const context = {products: allProducts}
  res.render('index.ejs', context);
});

// product create route

app.get("/products/new", function(req, res) {
  res.render("create.ejs")
})

app.post('/products', (req, res) => {
  console.log('CREATE route accessed');
  console.log('Data within req.body: ', req.body);
  products.create(req.body, (error, createdProduct) => {
    if(error) {
      console.log(error)
    }
  });
  res.redirect('/products');
});

// product show route
app.get('/products/:productId', (req, res) => {
  products.findById(req.params.productId, (error, foundProduct) => {
    res.render('show.ejs', {product: foundProduct})
  })
});



app.listen(PORT, () => {
  console.log("App is running on port: ", PORT);
});


