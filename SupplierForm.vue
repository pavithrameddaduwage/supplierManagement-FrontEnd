<template>
  <div class="page-container">
    <PageHeader/>

    <div class="background"></div> <!-- Background image -->
    
    <div class="form-container">
      <div class="supplier-form">
        <h2>Supplier Registration Form <i class="fas fa-user-plus"></i></h2>
        <form @submit.prevent="submitForm">
          <div class="form-group">
            <label for="supplierName">Supplier Name <i class="fas fa-user"></i>:</label>
            <input type="text" id="supplierName" v-model="supplierName" required>
            <span v-if="!isSupplierNameValid" class="error-message">Please enter a valid supplier name (only alphabets and spaces)</span>
          </div>
          <div class="form-group">
            <label for="companyName">Company Name <i class="fas fa-building"></i>:</label>
            <input type="text" id="companyName" v-model="companyName" required>
            <span v-if="!isCompanyNameValid" class="error-message">Please enter a valid company name (only alphabets and spaces)</span>
          </div>
          <div class="form-group">
            <label for="joinDate">Join Date <i class="fas fa-calendar-alt"></i>:</label>
            <input type="date" id="joinDate" v-model="joinDate" required>
          </div>
          <div class="form-group">
            <label for="contactNumber">Contact Number <i class="fas fa-phone"></i>:</label>
            <input type="text" id="contactNumber" v-model="contactNumber" required>
            <span v-if="!isContactNumberValid" class="error-message">Please enter a valid 10-digit phone number</span>
          </div>
          <div class="form-group">
            <label for="email">Email <i class="fas fa-envelope"></i>:</label>
            <input type="email" id="email" v-model="email" required>
            <span v-if="!isEmailValid" class="error-message">Please enter a valid email address</span>
          </div>
          <div class="form-group">
            <label for="address">Address <i class="fas fa-map-marker-alt"></i>:</label>
            <textarea id="address" v-model="address" required></textarea>
          </div>
          <button type="submit">Submit <i class="fas fa-check"></i></button>
          <br><br>
          <button @click="navigateToView">View Details <i class="fas fa-eye"></i></button>
        </form>
      </div>
    </div>

    <!-- Dummy footer -->
    <footer class="footer">
      <p>Dummy footer content</p>
    </footer>
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
      supplierName: '',
      companyName: '',
      joinDate: '',
      contactNumber: '',
      email: '',
      address: '',
      isSupplierNameValid: true,
      isCompanyNameValid: true,
      isContactNumberValid: true,
      isEmailValid: true
    };
  },
  methods: {
    submitForm() {
      // Form submission logic
       // Validate supplier name
       if (!this.supplierName.match(/^[A-Za-z ]+$/)) {
        this.isSupplierNameValid = false;
        return;
      } else {
        this.isSupplierNameValid = true;
      }

      // Validate company name
      if (!this.companyName.match(/^[A-Za-z ]+$/)) {
        this.isCompanyNameValid = false;
        return;
      } else {
        this.isCompanyNameValid = true;
      }

      // Validate contact number
      if (!this.contactNumber.match(/^[0-9]{10}$/)) {
        this.isContactNumberValid = false;
        return;
      } else {
        this.isContactNumberValid = true;
      }

      // Validate email
      if (!this.validateEmail(this.email)) {
        this.isEmailValid = false;
        return;
      } else {
        this.isEmailValid = true;
      }

      // If all validations pass, submit the form
      this.submitFormData();
    },
    validateEmail(email) {
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailPattern.test(email);
    },
    async submitFormData() {
      try {
        const formData = {
          supplierID: this.supplierID,
          supplierName: this.supplierName,
          companyName: this.companyName,
          joinDate: this.joinDate,
          contactNumber: this.contactNumber,
          email: this.email,
          address: this.address
        };
        //Connection
        const response = await fetch("http://localhost:5154/api/Supplier", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        });

        if (!response.ok) {
          throw new Error(`Failed to add supplier. Status: ${response.status}`);
        }

        alert("Supplier added successfully!");

        // Reset form fields after successful submission
        this.resetFormFields();
      } catch (error) {
        console.error("Error adding supplier:", error);

        alert("Error adding supplier. Please try again.");
      }
    },
    resetFormFields() {
      // Reset all form fields to empty strings
      this.supplierID = '';
      this.supplierName = '';
      this.companyName = '';
      this.joinDate = '';
      this.contactNumber = '';
      this.email = '';
      this.address = '';
    },
    navigateToView() {
      const router = this.$router;
      if (router) {
        router.push({ name: 'SupplierTable' });
      } else {
        console.error("Router instance is undefined.");
      }
    }
  }
};
</script>

<style scoped>
.page-container {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  overflow: hidden; /* Prevent background image from appearing on scroll */
  position: relative; /* Position relative for the background image */
  background-image: url('/src/assets/1.png'); /* Background image */
  background-size: cover;
  background-position: center;
}

.background {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -1;
}

.form-container {
  background-color: rgba(255, 255, 255, 0.8); /* Semi-transparent white background */
  border-radius: 10px;
  padding: 30px;
  max-width: 600px; /* Increase the max-width for a wider form */
  margin: auto;
  margin-top: 20px; /* Adjust margin-top to create space between header and form */
  padding-bottom: 30px;
}

/* Other styles for form components */

.footer {
  background-color: #333;
  color: white;
  text-align: center;
  padding: 10px;
}
</style>
