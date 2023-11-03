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
      <div class="brands">
        <h2>Brands</h2>
        <p v-if="brands.length === 0">No brands added yet.</p>
        <p v-else>
        Total brands: {{ brands.length }}
       </p>
       <div>
          <div>
  <table v-if="brands.length > 0">
      <thead>
    <tr>
      <th>ID</th>
      <th>Name</th>
      <th>Description</th>
      <th>Actions</th> <!-- New column for buttons -->
    </tr>
  </thead>
        <tbody>
          <tr v-for="brand in brands" :key="brand.id">
            <td>{{ brand.id }}</td>
            <td class="name-cell">
              <input
                type="text"
                v-model="brand.name"
                :disabled="!brand.editing"
              >
            </td>
            <td class="description-cell">
              <input
                type="text"
                v-model="brand.description"
                :disabled="!brand.editing"
              >
            </td>
            <td>
              <button @click="toggleEdit(brand)">
                {{ brand.editing ? "Cancel" : "Update" }}
              </button>
              <button @click="deleteBrand(brand.id)">Delete</button>
              <button v-if="brand.editing" @click="confirmUpdate(brand)">
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
      brands: [],
    };
  },
  mounted() {
    // Call your Node.js API endpoint to retrieve data from the SQL database
  this.fetchData();
  },
  methods: {
  fetchData() {
    // Make an API call to retrieve data from the backend using fetch
    fetch('http://localhost:8800/Brands')
      .then(response => response.json())
      .then(data => {
        this.brands = data; // Assign the retrieved data to brands
      })
      .catch(error => {
        console.error('Error retrieving data:', error);
      });
  },
    //effectuer une opération de bascule (toggle) en inversant la valeur de la propriété "editing" de l'objet "brand"
  toggleEdit(brand) {
    brand.editing = !brand.editing;
  },
  confirmUpdate(brand) {
    // Make an API call to update the brand in the backend using fetch
    fetch(`http://localhost:8800/Brands/${brand.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      //JSON.stringify() est utilisée pour convertir un objet JavaScript 
      //en une chaîne de caractères JSON qui peut être envoyée dans le corps de la requête.
      body: JSON.stringify(brand),
    })
      .then(response => response.json())
      .then(updateBrand => {
        console.log('Brand updated:', updateBrand);
        // Optionally, you can update the local data with the updated brand
        this.fetchData();
      })
      .catch(error => {
        console.error('Error updating brand:', error);
      });
  },
  deleteBrand(brandId) {
    // Make an API call to delete the product
    fetch(`http://localhost:8800/Brands/${brandId}`, {
      method: 'DELETE',
    })
      .then(response => {
        if (response.ok) {
          console.log('Brand deleted');
          this.fetchData(); // Fetch updated product list
        } else {
          console.error('Error deleting brand');
        }
      })
      .catch(error => {
        console.error('Error deleting brand:', error);
      });
  }
}
};
</script>

//scoped est utilisé pour définir des styles CSS qui s'appliquent uniquement à un composant spécifique
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

.brands {
  flex: 1;
  padding: 20px;
}
td.description-cell {
white-space: normal;
}
td.name-cell {
white-space: normal;
}

.brands h2 {
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