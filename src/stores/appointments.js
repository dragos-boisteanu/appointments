import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useAppointmentsStore = defineStore(
  'appointments',
  () => {
    const list = ref([]);

    const set = (payload) => {
      list.value = payload;
    };

    const add = (payload) => {
      list.value.push(payload);
    };

    /**
     *
     * @param {string} appointmentId
     */
    const remove = (appointmentId) => {
      const appointmentIndex = list.value.findIndex(
        (appointment) => appointment.id === appointmentId,
      );

      if (appointmentIndex > -1) {
        list.value.splice(appointmentIndex, 1);
      }
    };

    const update = (payload) => {
      const appointmentIndex = list.value.findIndex(
        (appointment) => appointment.id === payload.id,
      );

      let result = [];

      if (appointmentIndex > -1) {
        result = list.value.splice(appointmentIndex, 1, payload);
      }

      return result.length;
    };
    return {
      list,
      set,
      add,
      remove,
      update,
    };
  },
);
