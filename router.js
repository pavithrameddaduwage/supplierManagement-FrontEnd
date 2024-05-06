import { createRouter, createWebHistory } from 'vue-router';
import SupplierForm from './components/SupplierForm.vue';
import SupplierTable from './components/SupplierTable.vue';
import SupplierUpdate from './components/SupplierUpdate.vue';
import SupplierDashBoard from './components/SupplierDashBoard.vue';
import PageHeader from './components/PageHeader.vue';
import AddOrderDetailsForm from './components/AddOrderDetailsForm.vue';
import OrderDetailsTable from './components/OrderDetailsTable.vue';
import OrderDetailsUpdate from './components/OrderDetailsUpdate.vue';

const routes = [
  {
    path: '/',
    name: 'SupplierDashBoard',
    components: { default: SupplierDashBoard, header: PageHeader },  
  },
  {
    path: '/supplier-form',
    name: 'SupplierForm',
    components: { default: SupplierForm, header: PageHeader },  
  },
  {
    path: '/supplier-table',
    name: 'SupplierTable',
    components: { default: SupplierTable, header: PageHeader },  
  },
  {
    path: '/supplier-update/:id',
    name: 'SupplierUpdate',
    components: { default: SupplierUpdate, header: PageHeader },  
  },
  {
    path: '/order-details-form',
    name: 'AddOrderDetailsForm',
    components: { default: AddOrderDetailsForm, header: PageHeader },  
  },
  {
    path: '/order-details-table',
    name: 'OrderDetailsTable',
    components: { default: OrderDetailsTable, header: PageHeader },  
  },
  {
    path: '/order-details-update/:id',
    name: 'OrderDetailsUpdate',
    components: { default: OrderDetailsUpdate, header: PageHeader },  
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
