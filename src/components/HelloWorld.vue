<script setup>
import {inject, onMounted, reactive, ref} from "vue";
import Appointment from "@/models/appointment.js";

defineProps({
  msg: {
    type: String,
    required: true
  }

})

const staticService = inject('staticService')

const appointmentRef = reactive(new Appointment())


const app = new Appointment('1')

const appRef = ref(app)

console.log(  appRef.value instanceof  Appointment)


console.log('appId', appRef.value)

onMounted(() => {
  console.log(staticService.name)

  staticService.setCode('134')

staticService.value = 10

  staticService.multiplyValue(10, 'testing')
  setTimeout(() => {
    console.log(staticService.code)
  }, 3000)

  appointmentRef.id = '1'



})
</script>

<template>
  <div class="greetings">
    <h1 class="green">{{appRef.id}}</h1>
    <h3>
      You’ve successfully created a project with
      <a href="https://vitejs.dev/" target="_blank" rel="noopener">Vite</a> +
      <a href="https://vuejs.org/" target="_blank" rel="noopener">Vue 3</a>.
    </h3>
  </div>
</template>

<style scoped>
h1 {
  font-weight: 500;
  font-size: 2.6rem;
  position: relative;
  top: -10px;
}

h3 {
  font-size: 1.2rem;
}

.greetings h1,
.greetings h3 {
  text-align: center;
}

@media (min-width: 1024px) {
  .greetings h1,
  .greetings h3 {
    text-align: left;
  }
}
</style>
