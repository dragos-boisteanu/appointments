<script setup lang="ts">
  import TopNav from './components/navigation/topNav.vue';
  import LeftNav from './components/navigation/leftNav.vue';

  import { useRolesStore } from './stores/roles';
  import { useUserStatusesStore } from './stores/userStatuses';
  import { useGuiStore } from './stores/gui';
  import { inject } from 'vue';
  import ViewUser from '@/models/user/viewUser';

  const usersService = inject('usersService');
  const rolesStore = useRolesStore();
  const guiStore = useGuiStore();
  const dayJs = inject('dayJS');

  const userStatusesStore = useUserStatusesStore();
  const appointmentsService = inject('appointmentsService');

  const generateUsersLists = () => {
    // Function to generate a random string for email
    function generateRandomEmail() {
      const chars = 'abcdefghijklmnopqrstuvwxyz0123456789';
      let email = '';
      for (let i = 0; i < 10; i++) {
        email += chars[Math.floor(Math.random() * chars.length)];
      }
      return email + '@example.com';
    }

    // Function to generate a random date
    function generateRandomDate() {
      const year =
        Math.floor(Math.random() * (2023 - 1980 + 1)) + 1980;
      const month = String(
        Math.floor(Math.random() * 12) + 1,
      ).padStart(2, '0');
      const day = String(Math.floor(Math.random() * 28) + 1).padStart(
        2,
        '0',
      );
      return new Date(day, month, year);
    }

    function generateRandomPhoneNumber() {
      return (
        '0' +
        Math.floor(Math.random() * 9000000000 + 1000000000).toString()
      );
    }

    function generateRandomNumber() {
      return Math.floor(Math.random() * 3) + 1;
    }
    const createdAt = generateRandomDate();

    function generateRandomRole() {
      const roleId = generateRandomNumber().toString();
      return rolesStore.list.find((role) => role.id == roleId);
    }

    // Function to generate random data for each object
    function generateRandomData(id) {
      const role = generateRandomRole();
      return new ViewUser(
        id,
        generateRandomEmail(),
        'FirstName' + id,
        'LastName' + id,
        generateRandomPhoneNumber(),
        generateRandomDate(),
        '',
        '1',
        'available',
        role.id,
        role.name,
        role.color,
        createdAt,
        createdAt,
      );
    }

    // Generate 1000 objects
    const objects = [];

    for (let i = 1; i <= 1000; i++) {
      objects.push(generateRandomData(i.toString()));
    }

    return objects;
  };
  const generateAppointmentsList = (count) => {
    function generateAppointmentsArray(x) {
      const appointmentsArray = [];

      function getRandomString(
        minWords,
        maxWords,
        minWordLength,
        maxWordLength,
      ) {
        const numWords =
          Math.floor(Math.random() * (maxWords - minWords + 1)) +
          minWords;
        const words = [];

        for (let i = 0; i < numWords; i++) {
          const wordLength =
            Math.floor(
              Math.random() * (maxWordLength - minWordLength + 1),
            ) + minWordLength;
          const characters =
            'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
          let word = '';
          for (let j = 0; j < wordLength; j++) {
            word += characters.charAt(
              Math.floor(Math.random() * characters.length),
            );
          }
          words.push(word);
        }

        return words.join(' ');
      }

      function getRandomDate() {
        const startDate = new Date('2024-02-01T00:00:00Z');
        const endDate = new Date('2024-02-29T23:59:59Z');
        const randomDate = new Date(
          startDate.getTime() +
            Math.random() * (endDate.getTime() - startDate.getTime()),
        );
        return randomDate;
      }

      function getRandomDuration() {
        const durations = [15, 30, 45, 60, 75, 90, 105, 120];
        return durations[
          Math.floor(Math.random() * durations.length)
        ];
      }

      function generateRandomHexColor(appointmentId, date, title) {
        // Combine appointmentId, date, and title to create a unique string
        const combinedString = `${appointmentId}-${date}-${title}`;

        // Use a simple hash function to convert the combined string into a numerical value
        let hash = 0;
        for (let i = 0; i < combinedString.length; i++) {
          hash = combinedString.charCodeAt(i) + ((hash << 5) - hash);
        }

        // Convert the numerical value to a hex color
        const hexColor = (hash & 0x00ffffff)
          .toString(16)
          .toUpperCase();

        // Ensure the hex color has six digits (pad with zeros if needed)
        return `#${'00000'.substring(
          0,
          6 - hexColor.length,
        )}${hexColor}`;
      }

      function getRandomInteger(N) {
        // Make sure N is a positive integer
        if (typeof N !== 'number' || N <= 0 || !Number.isInteger(N)) {
          throw new Error('N must be a positive integer');
        }

        // Generate a random number between 1 and N (inclusive)
        return Math.floor(Math.random() * N) + 1;
      }

      const usersCount = usersService.getList().length;
      for (let i = 1; i <= x; i++) {
        const appointment = {
          id: i.toString(),
          clientId: getRandomInteger(usersCount).toString(),
          assignedTo: '1',
          color: '',
          title: getRandomString(1, 5, 1, 5),
          description: getRandomString(5, 100, 1, 20),
          date: getRandomDate(),
          duration: getRandomDuration(),
          createdBy: '1',
          updatedBy: '1',
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        };

        appointment.color = generateRandomHexColor(
          appointment.id,
          appointment.date,
          appointment.title,
        );

        appointmentsArray.push(appointment);
      }

      return appointmentsArray;
    }

    // Example: Generate an array with 5 appointments
    return generateAppointmentsArray(count);
  };
  const rolesList = [
    {
      id: '1',
      name: 'admin',
      color: 'bg-indigo-600',
    },
    {
      id: '2',
      name: 'staff',
      color: 'bg-sky-600',
    },
    {
      id: '3',
      name: 'client',
      color: 'bg-teal-600',
    },
  ];
  const statusesList = [
    {
      id: '1',
      name: 'Available',
    },
    {
      id: '2',
      name: 'Away',
    },
  ];

  rolesStore.set(rolesList);
  userStatusesStore.set(statusesList);

  const users = generateUsersLists();

  usersService.set(users);
  appointmentsService.set(generateAppointmentsList(10));
</script>

<template>
  <div class="flex h-screen flex-col">
    <div
      class="flex h-16 flex-shrink-0 flex-grow-0 items-center justify-between border-b px-5"
    >
      <top-nav />
    </div>

    <div class="flex flex-1">
      <div
        class="hidden w-20 flex-shrink-0 flex-grow-0 flex-col items-center justify-center lg:flex"
        :class="{ '!w-56': guiStore.showFullLefNavBar }"
      >
        <left-nav />
      </div>

      <div class="w-full bg-gray-50">
        <router-view />
      </div>
    </div>
  </div>
</template>
