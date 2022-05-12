import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import PrimeVue from "primevue/config";

import "primeflex/primeflex.css";
import "primevue/resources/themes/md-light-indigo/theme.css";
import "primevue/resources/primevue.min.css";
import "primeicons/primeicons.css";


import DataTable from "primevue/datatable";
import Column from "primevue/column";
import Button from "primevue/button";
import Toolbar from "primevue/toolbar";
import Card from "primevue/card"
import Dialog from "primevue/dialog";
import InputText from "primevue/inputtext";
import ToastService from "primevue/toastservice";
import Toast from "primevue/toast";
import Sidebar from "primevue/sidebar";
import Dropdown from "primevue/dropdown";
import Tag from "primevue/tag";
import Textarea from "primevue/textarea";

const app = createApp(App)

app.use(router)
app.use(PrimeVue)
app.use(ToastService);

app.component("pv-data-table", DataTable);
app.component("pv-column", Column);
app.component("pv-button", Button);
app.component("pv-toolbar", Toolbar);
app.component("pv-card", Card);
app.component("pv-dialog", Dialog);
app.component("pv-input-text", InputText);
app.component("pv-toast", Toast);
app.component("pv-sidebar", Sidebar);
app.component("pv-dropdown", Dropdown);
app.component("pv-tag", Tag);
app.component("pv-textarea",Textarea);

app.mount('#app')
