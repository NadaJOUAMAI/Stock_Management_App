<template>
  <div class="app">
    <header class="header">
      <h1>Stock Management App</h1>
    </header>
    <div class="content">
      <div class="welcome">
        <h2>Welcome to Stock Management App</h2>
        <p>Start managing your stocks efficiently!</p>
      </div>
      <div class="menu">
        <div class="menu-box" @click="navigateTo('brands')">
          <h3>Brands</h3>
          <img src="./arrow.png" alt="Arrow" class="arrow-icon" />
        </div>
        <div class="menu-box" @click="navigateTo('products')">
          <h3>Products</h3>
          <img src="./arrow.png" alt="Arrow" class="arrow-icon" />
        </div>
        <div class="menu-box" @click="navigateTo('manage-stocks')">
          <h3>Manage Stocks</h3>
          <img src="./arrow.png" alt="Arrow" class="arrow-icon" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    methods: {
      navigateTo(page) {
        console.log("Navigating to:", page);
        this.$router.push("/" + page);
      },
    },
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

.welcome {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 20px;
  background-color: #f2f2f2; 
}

.welcome h2 {
  font-size: 32px;
  font-weight: bold;
  color: #333;
  margin-bottom: 10px;
}

.welcome p {
  font-size: 18px;
  color: #555;
  text-align: center;
}

.menu {
  flex: 1;
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding: 20px;
}

.menu-box {
  text-align: center;
  cursor: pointer;
}

.menu-box h3 {
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 10px;
}

.arrow-icon {
  width: 30px;
  height: 30px;
  margin-top: 10px;
}

@media only screen and (max-width: 768px) {
  .content {
    flex-direction: column;
  }

  .welcome {
    order: 2;
  }

  .menu {
    order: 1;
  }
}

.arrow-icon {
  width: 30px;
  height: 30px;
  margin-top: 10px;
  fill: #333; /* Set the color of the arrow */
}
</style>

