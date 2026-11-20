import { createApp } from "vue";
import App from "./App.vue";

// Bootswatch theme
import "bootswatch/dist/flatly/bootstrap.min.css";

// Bootstrap JavaScript
import "bootstrap/dist/js/bootstrap.bundle.min.js";

// Bootstrap Icons
import "bootstrap-icons/font/bootstrap-icons.css";

// Global CSS
import "./assets/style.css";

// Router
import router from "./router";

createApp(App).use(router).mount("#app");
