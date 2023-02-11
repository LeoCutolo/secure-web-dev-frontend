import { createWebHistory, createRouter } from "vue-router";
import Login from './components/Login.vue'
import SignUp from './components/SignUp.vue'
import Locations from "./components/Locations.vue";
import Homepage from "./components/Homepage.vue";
import AddLocation from "./components/AddLocation.vue";
import EditLocation from "./components/EditLocation.vue";
import Location from "./components/Location.vue";

const routes = [
    {
        path: '/',
        name: 'home',
        component: Homepage
    },
    {
        path: '/login',
        name: 'login',
        component: Login
    },
    {
        path: '/signup',
        name: 'signup',
        component: SignUp
    },
    {
        path: '/locations',
        name: 'locations',
        component: Locations
    },
    {
        path: '/add',
        name: 'add',
        component: AddLocation
    },
    {
        path: '/editlocation/:id',
        name: 'editlocation',
        component: EditLocation
    },
    {
        path: '/location/:id',
        name: 'location',
        component: Location
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;