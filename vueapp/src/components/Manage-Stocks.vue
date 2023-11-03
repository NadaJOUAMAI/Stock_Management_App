<template>
  <div class="app">
    <header class="header">
      <h1>Stock Management App</h1>
    </header>
    <div class="content">
      <div class="product-form">
        <h2>Add New Product</h2>
        <form @submit.prevent="addProduct">
          <label>Description:</label>
          <input v-model="product.description" type="text" required>
          <label>Number:</label>
          <input v-model="product.number" type="number" required>
          <label>Brand:</label>
          <select v-model="product.brand" required>
          <option v-for="brand in brands" :key="brand.id" :value="brand.name">
            {{ brand.name }}
          </option>
        </select>
          <button type="submit">Add Product</button>
        </form>
      </div>
      <div class="brand-form">
        <h2>Add New Brand</h2>
        <form @submit.prevent="addBrand">
          <label>Brand Name:</label>
          <input v-model="newBrand.name" type="text" required>
          <label for="brandDescription">Brand Description:</label>
          <input type="text" id="brandDescription" v-model="newBrand.description">
          <button type="submit">Add Brand</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      product: {
        description: '',
        number: '',
        brand: ''
      },
      brands: [],
      newBrand: {
      name: '',
      description: ''
    }
    };
  },
  created() {
  this.fetchBrands();
},

  methods: {
      fetchBrands() {
   fetch('http://localhost:8800/Brands')
  .then(response => {
    if (!response.ok) {
      throw new Error('Failed to fetch brands');
    }
    return response.json();
  })
  .then(data => {
    this.brands = data;
  })
  .catch(error => {
    console.error('Error fetching brands:', error);
  });
},

addBrand() {
    const { name, description } = this.newBrand;
    const options = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, description })
    };

    fetch('http://localhost:8800/Brands/add', options)
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to add brand');
        }
        this.fetchBrands(); // Fetch the updated list of brands
        this.newBrand = { name: '', description: '' }; // Clear the input fields
      })
      .catch(error => {
        console.error('Error adding brand:', error);
      });
  },


  addProduct() {
    const { description, number, brand } = this.product;
    const options = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ description, number, brand })
    };

    fetch('http://localhost:4033/api/products', options)
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to add product');
        }
        console.log('Product added:', this.product);
        this.product = { description: '', number: '', brand: '' }; // Clear the input fields
      })
      .catch(error => {
        console.error('Error adding product:', error);
      });
  },
    
  }
};
</script>
<style>
.app {
font-family: "Arial", sans-serif;
background-color: #f7f7f7;
}

.header {
background-color: #333;
padding: 20px;
text-align: center;
color: #fff;
font-size: 24px;
font-weight: bold;
text-transform: uppercase;
}

.content {
display: flex;
height: calc(100vh - 80px);
}

.product-form,
.brand-form {
flex: 1;
padding: 20px;
}

.product-form {
background-color: #fff;
border-right: 1px solid #ccc;
}

.brand-form {
background-color: #f2f2f2;
}

.product-form h2,
.brand-form h2 {
font-size: 24px;
font-weight: bold;
margin-bottom: 20px;
color: #333;
}

form {
display: flex;
flex-direction: column;
}

label {
margin-bottom: 10px;
font-weight: bold;
color: #333;
}

input,
select {
padding: 10px;
margin-bottom: 20px;
border-radius: 4px;
border: 1px solid #ccc;
}

button {
padding: 10px 20px;
background-color: #4caf50;
color: #fff;
border: none;
cursor: pointer;
border-radius: 4px;
text-transform: uppercase;
}

button:hover {
background-color: #45a049;
}

input[type="text"],
input[type="number"] {
  padding: 10px;
margin-bottom: 20px;
border-radius: 4px;
}

select {
width: 100%;
}

@media only screen and (max-width: 768px) {
.content {
  flex-direction: column;
}

.product-form,
.brand-form {
  border-right: none;
}
}

</style>