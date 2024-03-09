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
  TrashIcon,
  ChevronDownIcon,
  PlusIcon,
  PhoneIcon,
  EnvelopeIcon,
  FunnelIcon,
  BarsArrowDownIcon,
} from '@heroicons/vue/20/solid';
import UsersService from './services/usersService';
import RolesService from './services/rolesService';
import UsersRepository from './repositories/usersRepository.js';
import AppointmentsService from '@/services/appointmentsService.js';
import { useUsersStore } from '@/stores/users.js';
import AppointmentsRepository from '@/repositories/appointmentsRepository.js';
import { useAppointmentsStore } from '@/stores/appointments.js';

const app = createApp(App);

// GLOBAL COMPONENTS
app.component('CustomDialog', dialog);
app.component('TextInput', textInput);
app.component('TextareaInput', textareaInput);
app.component('VDatepicker', DatePicker);
app.component('VCalendar', Calendar);
app.component('DatepickerInput', datepickerInput);
app.component('ButtonComponent', buttonComponent);
app.component('DropdownComponent', dropdownComponent);

// ICONS
app.component('XMarkIcon', XMarkIcon);
app.component('PencilIcon', PencilIcon);
app.component('XCircleIcon', XCircleIcon);
app.component('UserPlusIcon', UserPlusIcon);
app.component('UserIcon', UserIcon);
app.component('TrashIcon', TrashIcon);
app.component('ChevronDownIcon', ChevronDownIcon);
app.component('PlusIcon', PlusIcon);
app.component('PhoneIcon', PhoneIcon);
app.component('EnvelopeIcon', EnvelopeIcon);
app.component('FunnelIcon', FunnelIcon);
app.component('BarsArrowDownIcon', BarsArrowDownIcon);

const pinia = createPinia();
app.use(pinia);

const toastOptions = {
  position: POSITION.BOTTOM_LEFT,
  hideProgressBar: true,
};
app.use(Toast, toastOptions);

app.use(router);

app.provide(
  'usersService',
  new UsersService(new UsersRepository(useUsersStore())),
);
app.provide('rolesService', new RolesService());
app.provide(
  'appointmentsService',
  new AppointmentsService(
    new AppointmentsRepository(useAppointmentsStore()),
  ),
);
app.provide('dayJS', dayjs); // provide dayJS

app.mount('#app');
