<template>
  <div class="page-container">
    <div class="header">
      <PageHeader/>
    </div>
    <div class="background"></div> <!-- Background image with opacity -->
    <div class="order-table-container">
      <h2>Order Details</h2>
      <div class="search-container">
        <input type="text" v-model="searchQuery" placeholder="Search by item name or order state" class="form-control">
      </div>
      <div class="table-responsive">
        <table class="table table-dark table-striped-columns">
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Item Name</th>
              <th>Quantity</th>
              <th>Unit Price</th>
              <th>Order State</th>
              <th>Order Date</th>
              <th>Supplier ID</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(order, index) in filteredOrders" :key="index">
              <td>{{ order.orderID }}</td>
              <td>{{ order.itemName }}</td>
              <td>{{ order.quantity }}</td>
              <td>{{ order.unitPrice }}</td>
              <td>{{ order.orderState }}</td>
              <td>{{ order.orderDate }}</td>
              <td>{{ order.supplierID }}</td>
              <td>
                <div class="btn-group">
                  <button @click="editOrder(order)" class="btn btn-warning">Update</button>
                  <button @click="deleteOrder(order)" class="btn btn-danger">Delete</button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <br><br>
      <router-link to="/order-details-form" class="btn btn-success">Back to Form</router-link>
    </div>
  </div>
</template>

<script>
import PageHeader from './PageHeader.vue';

export default {
  components: {
    PageHeader
  },
  data() {
    return {
      List: true,
      orders: [
        {
          orderID: 1,
          itemName: 'Product A',
          quantity: 10,
          unitPrice: 15.99,
          orderState: 'Pending',
          orderDate: '2024-05-10',
          supplierID: 101
        },
        {
          orderID: 2,
          itemName: 'Product B',
          quantity: 5,
          unitPrice: 25.49,
          orderState: 'Confirmed',
          orderDate: '2024-05-12',
          supplierID: 102
        },
        // Add more dummy orders as needed
      ],
      searchQuery: ''
    };
  },
  computed: {
    filteredOrders() {
      const query = this.searchQuery.toLowerCase().trim();
      return this.orders.filter(order =>
        order.itemName.toLowerCase().includes(query) ||
        order.orderState.toLowerCase().includes(query)
      );
    }
  },
  methods: {
    editOrder(order) {
      const router = this.$router;
      if (router) {
        router.push({ name: 'OrderDetailsUpdate', params: { id: order.orderID }, query: order });
      } else {
        console.error("Router instance is undefined.");
      }
    },
    async deleteOrder(order) {
      const confirmDelete = window.confirm("Are you sure you want to delete this order?");
      if (!confirmDelete) {
        return;  
      }
      
      try {
        const response = await fetch(`http://localhost:5154/api/Order/${order.orderID}`, {
          method: "DELETE"
        });
        if (!response.ok) {
          throw new Error("Failed to delete order");
        }
        
        this.orders = this.orders.filter(o => o.orderID !== order.orderID);
        alert("Order deleted successfully!");
      } catch (error) {
        console.error("Error deleting order:", error);
        alert("Error deleting order. Please try again.");
      }
    }
  }
};
</script>

<style scoped>
.page-container {
  position: relative; /* Position relative for the background image */
}

.header {
  margin-bottom: 20px;
}

.background {
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw; /* Adjusted to cover the full viewport width */
  height: 100vh; /* Adjusted to cover the full viewport height */
  /* background-image: url('/src/assets/img1.png');  */
  background-color: aliceblue;
  background-size: cover;
  background-position: center;
  z-index: -1;
  opacity: 0.5; /* Opacity for the background image */
}

.order-table-container {
  margin: auto;
  padding: 20px;
  border-radius: 10px;
}

.search-container {
  margin-bottom: 20px;
}

.btn-primary {
  margin-top: 20px;
}

.back-button {
  display: inline-block;
  padding: 10px 20px;
  border-radius: 5px;
  text-decoration: none;
}

.btn-danger,
.btn-warning {
  padding: 8px 12px;
  font-size: 14px;
}
</style>
