import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useAppointmentsStore = defineStore(
  'appointments',
  () => {
    const appointments = ref([]);

    const set = (payload) => {
      appointments.value = payload;
    };

    const add = (payload) => {
      appointments.value.push(payload);
    };

    const remove = (appointmentId) => {
      const appointmentIndex = appointments.value.findIndex(
        (appointment) => appointment.id === appointmentId,
      );

      if (appointmentIndex > -1) {
        appointments.value.splice(appointmentIndex, 1);
      }
    };

    const update = (payload) => {
      const appointmentIndex = appointments.value.findIndex(
        (appointment) => appointment.id === payload.id,
      );

      if (appointmentIndex > -1) {
        appointments.value.splice(appointmentIndex, 1, payload);
      }
    };
    return {
      appointments,
      set,
      add,
      remove,
      update,
    };
  },
);
