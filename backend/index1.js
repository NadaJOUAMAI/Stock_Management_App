import express from "express";
import mysql from "mysql";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json())


const connection = mysql.createConnection({
    host : "localhost",
    user :"root",
    password: "password",
    database:"vuejs"
});


  app.get('/api/products', (req, res) => {
    const query = 'SELECT * FROM products';
    connection.query(query, (error, results) => {
      if (error) {
        console.error('Error retrieving products:', error);
        res.status(500).json({ error: 'Error retrieving products' });
        return;
      }
      res.json(results);
    });
  });

  app.put('/api/products/:id', (req, res) => {
    const productId = req.params.id;
    const updatedProduct = req.body;
  
    const query = 'UPDATE products SET description = ?, number = ?, brand = ? WHERE id = ?';
    const values = [updatedProduct.description, updatedProduct.number, updatedProduct.brand, productId];
  
    connection.query(query, values, (error, result) => {
      if (error) {
        console.error('Error updating product:', error);
        res.status(500).json({ error: 'An error occurred while updating the product' });
      } else {
        if (result.affectedRows === 0) {
          res.status(404).json({ error: 'Product not found' });
        } else {
          console.log('Product updated:', updatedProduct);
          res.json(updatedProduct);
        }
      }
    });
  });

  app.post('/api/products', (req, res) => {
    const { description, number, brand } = req.body;
    const sql = 'INSERT INTO products (description, number, brand) VALUES (?, ?, ?)';
    const values = [description, number, brand];
  
    connection.query(sql, values, (err, results) => {
      if (err) {
        console.error('Error executing MySQL query:', err);
        res.status(500).json({ error: 'Failed to add product' });
        return;
      }
  
      console.log('Product added:', { description, number, brand });
      res.sendStatus(200);
    });
  });


  app.delete('/api/products/:id', (req, res) => {
    const productId = req.params.id;
  
    const query = 'DELETE FROM products WHERE id = ?';
    const values = [productId];
  
    connection.query(query, values, (error, result) => {
      if (error) {
        console.error('Error deleting product:', error);
        res.status(500).json({ error: 'An error occurred while deleting the product' });
      } else {
        if (result.affectedRows === 0) {
          res.status(404).json({ error: 'Product not found' });
        } else {
          console.log('Product deleted');
          res.sendStatus(200);
        }
      }
    });
  });
  

  app.listen(4033, () => {
    console.log("Connected to backend");
  })