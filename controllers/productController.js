// controllers/productController.js
const Product = require('../models/Product');



// controllers/productController.js
exports.createProduct = async (req, res, next) => {
    try {
      const product = new Product(req.body);
      await product.save();
      res.locals.message = 'Product created successfully.';
      res.redirect('/api/allProducts'); // Redirect to the allProducts endpoint
    } catch (error) {
      res.status(500).json({ error: 'Unable to create product' });
    }
  };
  
  exports.getAllProducts = async (req, res) => {
    try {
      const products = await Product.find();
      res.render("createProduct", {products: products})
    } catch (error) {
      res.status(500).json({ error: 'Unable to fetch products' });
    }
  };
  
  exports.getAllProd = async (req, res) => {
    try {
      const products = await Product.find();
      res.render("allProduct", {products: products})
    } catch (error) {
      res.status(500).json({ error: 'Unable to fetch products' });
    }
  };
  
  



// renderActiveProducts
exports.renderActiveProducts = async (req, res) =>  {
  try {
    const activeProducts = await Product.find({ status: 'active' });
    res.render('activeProducts', { products: activeProducts })
    ;
  } catch (error) {

    res.status(500).json({ error: 'Unable to fetch active products' });
  }
};

// retrieve a list of inactive products
exports.renderInactiveProducts = async (req, res) => {
  try {
    const inactiveProducts = await Product.find({ status: 'inactive' });
    res.render('inactiveProducts', { products: inactiveProducts });
  } catch (error) {
    res.status(500).json({ error: 'Unable to fetch inactive products' });
  }
};



  
  exports.getProductById = async (req, res) => {
    try {
      const product = await Product.findById(req.params.id);
      if (!product) {
        return res.status(404).json({ error: 'Product not found' });
      }
      res.json(product);
    } catch (error) {
      res.status(500).json({ error: 'Unable to fetch product' });
    }
  };
  
  exports.updateProduct = async (req, res) => {
    try {
      const updatedProduct = await Product.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
      );
      if (!updatedProduct) {
        return res.status(404).json({ error: 'Product not found' });
      }
      res.json(updatedProduct);
    } catch (error) {
      res.status(500).json({ error: 'Unable to update product' });
    }
  };
  
  exports.deleteProduct = async (req, res) => {
    try {
      const deletedProduct = await Product.findByIdAndRemove(req.params.id);
      if (!deletedProduct) {
        return res.status(404).json({ error: 'Product not found' });
      }
      res.json(deletedProduct);
    } catch (error) {
      res.status(500).json({ error: 'Unable to delete product' });
    }
  };
  

  
// Search for products by name or barcode
exports.searchProducts = async (req, res) => {
  try {
    const { query } = req.query;

    // Use a regular expression to perform a case-insensitive search
    const products = await Product.find(
      {
        $or: [
          { name: { $regex: new RegExp(query, 'i') } }, // Search by name
          { barcode: { $regex: new RegExp(query, 'i') } }, // Search by barcode
        ],
      },
      { name: 1, barcode: 1, _id: 0 } // Projection to include only name and barcode
    );
    res.render('searchResults', { products }); // Render the searchResults template
  } catch (error) {
    res.status(500).json({ error: 'Unable to perform the search' });
  }
};
