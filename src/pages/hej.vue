<template>
  <q-page class="bg-grey-3">
    <router-link to="/">Home</router-link>
    <div class="fixed-center">
      <q-input v-model="broker" label="Broker" style="width: 400px;"/>
      <q-input v-model="clientId" label="clientId" />
      <q-input v-model="port" label="port" />
       <q-btn push color="white" text-color="primary" label="Connect" @click="connect()" style="top:40px"/>
    </div>

  </q-page>
</template>

<script>
import { client, mqtt, options } from "../boot/mqtt-boot";
export default {
  created() {
    client.on("connect", () => {
      console.log("Conntected!");
    });
  },
  data() {
    return {
      broker:"ws://abb-mosca.cloud.abbspets.se",
      clientId:"robin",
      port:1884
    };
  },
  methods: {
    connect() {
      options.clientId = this.clientId
      options.port = this.port
      client = mqtt.connect(broker, options);

    }
  },
};
</script>
