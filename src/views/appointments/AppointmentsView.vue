<script setup lang="ts">
  import { computed, inject, ref } from 'vue';
  import appointment from '../../components/appointments/appointmentComponent.vue';
  import EditAppointmentDialog from '@/components/appointments/dialogs/editAppointmentDialog.vue';
  import ConfirmDialog from '@/components/dialogs/confirmDialog.vue';
  import { useToast } from 'vue-toastification';
  import CreateAppointmentDialog from '@/components/appointments/dialogs/createAppointmentDialog.vue';

  const appointmentsService = inject('appointmentsService');
  const toast = useToast();
  const masks = ref({
    weekdays: 'WWW',
  });

  const appointments = ref(appointmentsService.getList());
  const attributes = computed(() => {
    console.log('appointments');
    return appointments.value.map((appointment) => {
      return {
        key: appointment.id,
        customData: appointment,
        popover: true,
        dates: appointment.date,
      };
    });
  });

  const selectedAppointment = ref(null);

  const showEditAppointmentDialog = (appointment) =>
    (selectedAppointment.value = appointment);
  const editAppointment = (appointment) => {
    appointmentsService.edit(appointment);
    selectedAppointment.value = null;

    toast.success('Appointment updated');
  };

  const showDeleteConfirmationDialog = ref(false);
  const confirmationDialogTitle = ref('');
  const confirmationDialogText = ref('');
  const appointedToDelete = ref(null);
  const toggleDeleteConfirmation = (appointment) => {
    if (showDeleteConfirmationDialog.value) {
      showDeleteConfirmationDialog.value = false;
      appointedToDelete.value = null;
    } else {
      appointedToDelete.value = appointment;
      confirmationDialogText.value = `Are you sure you want to delete appointment
      ${appointment.title} ?`;
      confirmationDialogTitle.value = 'Delete user account';
      showDeleteConfirmationDialog.value = true;
    }
  };
  const deleteAppointment = () => {
    console.log('deleteAppointment', appointedToDelete.value.id);
    appointmentsService.delete(appointedToDelete.value.id);
    toggleDeleteConfirmation(null);

    toast.success('Appointment deleted');
  };

  const showCreateAppointmentDialog = ref(false);
  const toggleCreateAppointmentDialog = () =>
    (showCreateAppointmentDialog.value =
      !showCreateAppointmentDialog.value);

  const handleCreateAppointment = (appointment) => {
    appointmentsService.add(appointment);
    toggleCreateAppointmentDialog();
    toast.success('Appointment created');
  };
</script>

<template>
  <confirm-dialog
    v-if="showDeleteConfirmationDialog"
    :title="confirmationDialogTitle"
    :text="confirmationDialogText"
    @close="toggleDeleteConfirmation"
    @confirm="deleteAppointment"
  />
  <edit-appointment-dialog
    v-if="selectedAppointment"
    :appointment="selectedAppointment"
    @save="editAppointment"
    @close="selectedAppointment = null"
  />
  <create-appointment-dialog
    v-if="showCreateAppointmentDialog"
    @save="handleCreateAppointment"
    @close="toggleCreateAppointmentDialog"
  />
  <div class="relative flex h-full w-full flex-col">
    <button
      @click="toggleCreateAppointmentDialog"
      class="fixed bottom-5 right-10 z-10 rounded-full bg-sky-600 p-2 shadow hover:bg-sky-500 active:bg-sky-700 active:shadow-inner"
    >
      <PlusIcon class="size-8 fill-white" />
    </button>
    <div class="flex flex-1 flex-col">
      <div
        class="mt-4 flex flex-col flex-1 overflow-hidden"
        id="appointments-calendar"
        style="flex: 1 0 0"
      >
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
                  @edit="showEditAppointmentDialog"
                  @delete="toggleDeleteConfirmation"
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
  :deep(.vc-container) {
    flex: 1 1 0
  }
  :deep(#appointments-calendar .vc-week) {
    margin: 8px 0 8px 0;
    column-gap: 8px;
    min-height: 64px;
    max-height: 128px;
  }

  :deep(#appointments-calendar .vc-day) {
    position: unset;
    z-index: unset;
  }
</style>
