<template>
  <div class="app">
    <header class="header">
      <img src="./logo1.png" alt="Vue logo" class="logo">
      <h1>Stock Management App</h1>
      <router-link to="/" class="back-button">
        <img src="./back-arrow.png" alt="Back" class="arrow-icon">
      </router-link>
    </header>
    <div class="content">
      <div class="products">
        <h2>Products</h2>
        <p v-if="products.length === 0">No products added yet.</p>
        <p v-else>
        Total products: {{ products.length }}
       </p>
        
        <div>
          <div>
  <table v-if="products.length > 0">
      <thead>
    <tr>
      <th>ID</th>
      <th>Description</th>
      <th>Brand</th>
      <th>Number</th>
      <th>Actions</th> <!-- New column for buttons -->
    </tr>
  </thead>
        <tbody>
          <tr v-for="product in products" :key="product.id">
            <td>{{ product.id }}</td>
            <td class="description-cell">
              <input
                type="text"
                v-model="product.description"
                :disabled="!product.editing"
              >
            </td>
            <td>
              <input
                type="text"
                v-model="product.brand"
                :disabled="!product.editing"
              >
            </td>
            <td>
              <input
                type="number"
                v-model="product.number"
                :disabled="!product.editing"
              >
            </td>
            <td>
              <button @click="toggleEdit(product)">
                {{ product.editing ? "Cancel" : "Update" }}
              </button>
              <button @click="deleteProduct(product.id)">Delete</button>
              <button v-if="product.editing" @click="confirmUpdate(product)">
                Confirm
              </button>
            </td>
          </tr>
        </tbody>
      </table>
      <div v-else>
        Table is empty.
  </div>
</div>
        <div class="buttons">
          <router-link to="/manage-stocks" class="manage-stocks-button">
            Manage Stocks
          </router-link>
        </div>
      </div>
    </div>
  </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      products: [],
    };
  },
mounted() {
  // Call your Node.js API endpoint to retrieve data from the SQL database
  this.fetchData();
},
methods: {
  fetchData() {
    // Make an API call to retrieve data from the backend using fetch
    fetch('http://localhost:4033/api/products')
      .then(response => response.json())
      .then(data => {
        this.products = data; // Assign the retrieved data to products
      })
      .catch(error => {
        console.error('Error retrieving data:', error);
      });
  },
  //effectuer une opération de bascule (toggle) en inversant la valeur de la propriété "editing" de l'objet "product"
  toggleEdit(product) {
    product.editing = !product.editing;
  },
  confirmUpdate(product) {
    // Make an API call to update the product in the backend using fetch
    fetch(`http://localhost:4033/api/products/${product.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(product),
    })
      .then(response => response.json())
      .then(updatedProduct => {
        console.log('Product updated:', updatedProduct);
        // Optionally, you can update the local data with the updated product
        this.fetchData();
      })
      .catch(error => {
        console.error('Error updating product:', error);
      });
  },
  
  deleteProduct(productId) {
    // Make an API call to delete the product
    fetch(`http://localhost:4033/api/products/${productId}`, {
      method: 'DELETE',
    })
      .then(response => {
        if (response.ok) {
          console.log('Product deleted');
          this.fetchData(); // Fetch updated product list
        } else {
          console.error('Error deleting product');
        }
      })
      .catch(error => {
        console.error('Error deleting product:', error);
      });
  }
}
};
</script>

<style scoped>
.app {
  font-family: "Arial", sans-serif;
  background-color: #f7f7f7;
}

.header {
  background-color: #333;
  padding: 20px;
  display: flex;
  align-items: center;
  color: #fff;
  font-size: 24px;
  font-weight: bold;
  text-transform: uppercase;
}
h1{
  margin-left: 500px;
}

.logo {
  width: 40px;
  height: 40px;
  margin-right: 10px;
}

.back-button {
  margin-left: auto;
  text-decoration: none;
  color: #fff;
  width: 45px;
  height: 45px;
  
}

.arrow-icon {
  width: 30px;
  height: 30px;
  fill: #fff;
}

.content {
  display: flex;
  height: calc(100vh - 80px);
}

.products {
  flex: 1;
  padding: 20px;
}
td.description-cell {
white-space: normal;
}

.products h2 {
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 20px;
  color: #333;
}

p {
  font-size: 18px;
  color: #555;
  text-align: center;
}

ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

li {
  margin-bottom: 10px;
}

strong {
  font-weight: bold;
}

.buttons {
  margin-top: 20px;
  text-align: center;
}

button {
padding: 5px 10px;
background-color: #4caf50;
color: #fff;
border: none;
cursor: pointer;
border-radius: 4px;
text-transform: uppercase;
text-decoration: none;
margin-right: 5px;
margin-bottom: 5px; /* Added margin bottom */
}

button:hover {
background-color: #45a049;
box-shadow: 0 0 3px rgba(0, 0, 0, 0.5);
}

button:focus {
outline: none;
}
.manage-stocks-button {
  padding: 10px 20px;
  background-color: #4caf50;
  color: #fff;
  border: none;
  cursor: pointer;
  border-radius: 4px;
  text-transform: uppercase;
  text-decoration: none;
}

.manage-stocks-button:hover {
  background-color: #45a049;
}

@media only screen and (max-width: 768px) {
  .content {
    flex-direction: column;
  }
}
table {
border-collapse: collapse;
width: 100%;

}

th, td {
border: 1px solid #ddd;
padding: 8px;
text-align: left;

}

th {
background-color: #f2f2f2;
}

td input[type="text"] {
/* New style for input text fields */
width: 100%;
padding: 5px;
box-sizing: border-box;
border: 1px solid #ddd;
border-radius: 4px;
}
td input[type="number"] {
/* New style for input number fields */
width: 100%;
padding: 5px;
box-sizing: border-box;
border: 1px solid #ddd;
border-radius: 4px;
}
td {
  text-align: center;
}
td button {
/* Existing button styles */
margin-bottom: 5px;
}
</style>