import { createApp } from 'vue';
import { createPinia } from 'pinia';
import router from './router';
import { Calendar, DatePicker } from 'v-calendar';
import Toast, { POSITION } from 'vue-toastification';
import * as dayjs from 'dayjs';

import App from './App.vue';

import './assets/style.css';
import 'vue-toastification/dist/index.css';
import 'v-calendar/dist/style.css';

import dialog from './components/dialogs/customDialog.vue';
import buttonComponent from './components/buttonComponent.vue';
import textInput from './components/inputs/textInput.vue';
import textareaInput from './components/inputs/texareaInput.vue';
import dropdownComponent from './components/dropdownComponent.vue';
import datepickerInput from './components/inputs/datepickerInput.vue';

import {
  PencilIcon,
  UserIcon,
  UserPlusIcon,
  XCircleIcon,
  XMarkIcon,
} from '@heroicons/vue/20/solid';
import UsersService from './services/usersService';
import RolesService from './services/rolesService';

const app = createApp(App);

app.component('CustomDialog', dialog);
app.component('TextInput', textInput);
app.component('TextareaInput', textareaInput);
app.component('VDatepicker', DatePicker);
app.component('VCalendar', Calendar);
app.component('DatepickerInput', datepickerInput);
app.component('ButtonComponent', buttonComponent);
app.component('DropdownComponent', dropdownComponent);

app.component('XMarkIcon', XMarkIcon);
app.component('PencilIcon', PencilIcon);
app.component('XCircleIcon', XCircleIcon);
app.component('UserPlusIcon', UserPlusIcon);
app.component('UserIcon', UserIcon);

const pinia = createPinia();
app.use(pinia);

const toastOptions = {
  position: POSITION.BOTTOM_LEFT,
  hideProgressBar: true,
};
app.use(Toast, toastOptions);

app.use(router);

app.provide('usersService', new UsersService());
app.provide('rolesService', new RolesService());
app.provide('dayJS', dayjs); // provide dayJS

app.mount('#app');
