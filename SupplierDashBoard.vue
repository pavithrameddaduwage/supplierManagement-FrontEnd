<template>
  <div class="page-container">
    <PageHeader/>

    <div class="supplier-dashboard">
      <h2 style="color:#357007;">Supplier Dashboard</h2>
      <div class="dashboard-container">
        <div class="dashboard-buttons">
          <button class="dashboard-button" @click="navigateToSupplierDetails">Supplier Details</button>
        </div>
        <div class="dashboard-buttons">
          <button class="dashboard-button" @click="navigateToRawMaterialsDetails">Raw Materials Details</button>
        </div>
      </div>
    </div>

    <footer class="footer">
      <p>Footer</p>
    </footer>
  </div>
</template>

<script>
import PageHeader from './PageHeader.vue';

export default {
  components: {
    PageHeader
  },
  methods: {
    navigateToSupplierDetails() {
      this.$router.push({ name: 'SupplierForm' });
    },
    navigateToRawMaterialsDetails() {
      this.$router.push({ name: 'AddOrderDetailsForm' });
    }
  }
};
</script>

<style scoped>
body{
  margin: 0;
}
.page-container {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.supplier-dashboard {
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-image: url('/src/assets/supplier_img.png');
  background-size: cover;
  background-position: center;
}

h2 {
  text-align: center;
}

.dashboard-container {
  background-color: rgba(255, 255, 255, 0.5);
  border-radius: 10px;
  padding: 100px;
}

.dashboard-buttons {
  display: flex;
  justify-content: center;
  margin-top: 20px;
}

.dashboard-button {
  padding: 10px 20px;
  background-color: #357007;
  color: #fff;
  border: none;
  border-radius: 2rem;
  cursor: pointer;
  margin: 5px;
  width: 200px; 
}


.dashboard-button:hover {
  background-color: #152d03;
}

.footer {
  background-color: #333;
  color: #fff;
  padding: 20px;
  text-align: center;
}
</style>
