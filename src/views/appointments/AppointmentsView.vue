<script setup lang="ts">
  import { inject, ref, toRaw } from 'vue';
  // import appointment from '../../components/appointments/appointmentComponent.vue';
  import EditAppointmentDialog from '@/components/appointments/dialogs/editAppointmentDialog.vue';
  import ConfirmDialog from '@/components/dialogs/confirmDialog.vue';
  import { useToast } from 'vue-toastification';
  import CreateAppointmentDialog from '@/components/appointments/dialogs/createAppointmentDialog.vue';
  import { useAppointmentsStore } from '@/stores/appointments';
  import AppointmentComponent from '@/components/appointments/appointmentComponent.vue';

  const appointmentsService = inject('appointmentsService');
  const toast = useToast();
  const appointmentsStore = useAppointmentsStore();
  // const masks = ref({
  //   weekdays: 'WWW',
  // });

  appointmentsStore.set([
    {
      id: 1,
      date: new Date(),
      title: 'Today event',
      bgColor: 'orange',
    },
    {
      id: 2,
      date: new Date(),
      title: '2nd today event',
      bgColor: 'orange',
    },
    {
      id: 3,
      date: new Date(new Date().getTime() + 24 * 60 * 60 * 1000),
      title: 'Tomorrow event',
      bgColor: 'orange',
    },
    {
      id: 4,
      date: new Date(new Date().getTime() + 24 * 60 * 60 * 1000),
      title: 'Tomorrow all day event',
      allDay: true,
      bgColor: 'orange',
    },
  ]);
  const selectedAppointment = ref(null);

  const editAppointment = (appointment) => {
    appointmentsService.edit(appointment);
    selectedAppointment.value = null;

    toast.success('Appointment updated');
  };

  const showDeleteConfirmationDialog = ref(false);
  const confirmationDialogTitle = ref('');
  const confirmationDialogText = ref('');
  const appointedToDelete = ref(null);
  const showEditAppointmentDialog = (appointment) => {
    selectedAppointment.value = appointment;
  };
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
        class="flex flex-1 flex-col bg-white"
        id="appointments-calendar"
        style="flex: 1 0 0"
      >
        <EventsCalendar
          :events="appointmentsStore.list"
          v-slot="{ event }"
        >
          <appointment-component
            :appointment="event"
            @edit="showEditAppointmentDialog"
            @delete="toggleDeleteConfirmation"
          />
          <!--          <div
            @click="handleEventClick(event)"
            class="rounded bg-orange-700 p-1 text-xs text-white hover:cursor-pointer hover:orange hover:shadow active:shadow-inner"
          >
            {{ event.title }}
            {{ event.endDate }}
          </div>-->
        </EventsCalendar>
      </div>
    </div>
  </div>
</template>

<style scoped>
  :deep(.calendar__navigation) > * {
    @apply rounded bg-sky-600 px-2 py-1 text-sm text-white;
  }
</style>
