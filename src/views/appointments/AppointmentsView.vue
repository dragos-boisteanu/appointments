<script setup lang="ts">
  import { computed, ref } from 'vue';
  import appointment from '../../components/appointments/appointmentComponent.vue';
  import { useAppointmentsStore } from '@/stores/appointments';

  const appointmentsStore = useAppointmentsStore();
  const masks = ref({
    weekdays: 'WWW',
  });
  const attributes = computed(() => {
    return appointmentsStore.appointments.map((appointment) => {
      return {
        key: appointment.id,
        customData: appointment,
        popover: true,
        dates: appointment.date,
      };
    });
  });

  const selectedAppointment = ref(null);
  const editAppointment = (appointment) => {
    selectedAppointment.value = appointment;
  };
</script>

<template>
  <!--  <edit-appointment-dialog
    v-if="selectedAppointment"
    :appointment="selectedAppointment"
  />-->
  <div class="relative flex h-full w-full flex-col">
    <div class="flex flex-1 flex-col">
      <div class="mt-4 flex-1 overflow-auto" style="flex: 1 0 0">
        <VCalendar
          class="!w-full"
          :masks="masks"
          :attributes="attributes"
          :trim-weeks="true"
          :first-day-of-week="2"
          disable-page-swipe
          is-expanded
        >
          <template #day-content="{ day, attributes }">
            <div
              class="z-10 flex h-full flex-col overflow-hidden rounded border p-1"
            >
              <div
                class="p-1 text-center text-sm font-medium text-gray-800"
              >
                {{ day.day }}
              </div>
              <div class="flex-grow overflow-x-auto overflow-y-auto">
                <appointment
                  v-for="attr in attributes"
                  :key="attr.key"
                  :appointment="attr.customData"
                  @edit="editAppointment"
                />
              </div>
            </div>
          </template>
        </VCalendar>
      </div>
    </div>
  </div>
</template>

<style scoped>
  :deep(.vc-week) {
    margin: 8px 0 8px 0;
    column-gap: 8px;
    min-height: 192px;
    max-height: 192px;
  }

  :deep(.vc-day) {
    position: unset;
    z-index: unset;
  }
</style>
