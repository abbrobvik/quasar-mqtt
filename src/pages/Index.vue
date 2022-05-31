<template>
  <q-page class="bg-grey-3">
    <router-link to="/hej">Setting</router-link>
    <!-- Scroll-bar for documentation from arduino -->
    <q-virtual-scroll
    class="fixed-center"
    style="max-height: 100px; width: 400px; top:130px;"
    :items="chatMessages"
    separator
    v-slot="{ item, index }"
  >
    <q-item
      :key="index"
      dense
    >
      <q-item-section>
        <q-item-label>
          #{{ index }} - {{ item.user }}, {{item.message}}
        </q-item-label>
      </q-item-section>
    </q-item>
  </q-virtual-scroll>


    <div class="fixed-center background text-center" style="top:350px;">
      <div style="margin-top:10px">
        Forward
        <div  style=" margin-bottom: 30px">
          <button class="btn" @mousedown="left_forward(), hastighet()"   @mouseup="basic()"><img src="../assets/arrow_left.png" style="height: 40px; margin-top: 10px;" alt="Bakåt"></button>
          <button class="btn" @mousedown="forward(), hastighet()"        @mouseup="basic()"><img src="../assets/arrow_upp.png" style="height: 40px; margin-top: 10px;" alt="Frammåt"></button>
          <button class="btn" @mousedown="right_forward(), hastighet()"  @mouseup="basic()"><img src="../assets/arrow_right.png" style="height: 40px; margin-top: 10px;" alt="Bakåt"></button>
        </div>
      </div>


      <div style="margin-bottom:10px">
        <div style=" padding-top: 30px;">
          <button class="btn" @mousedown="left_backward(), hastighet()"  @mouseup="basic()"><img src="../assets/arrow_left.png" style="height: 40px; margin-top: 10px;" alt="Bakåt"></button>
          <button class="btn" @mousedown="backward(), hastighet()"       @mouseup="basic()"><img src="../assets/arrow_down.png" style="height: 40px; margin-top: 10px;" alt="Bakåt"></button>
          <button class="btn" @mousedown="right_backward(), hastighet()" @mouseup="basic()"><img src="../assets/arrow_right.png" style="height: 40px; margin-top: 10px;" alt="Bakåt"></button>
        </div>
        Backward
      </div>
    </div>
    <div class="q-pa-md fixed-center" style="width: 400px; margin-top: 150px; top:400px;">
    <q-badge color="secondary " style="justify-content:center;">
      Hastighet:{{standard}} (0 to 100)
    </q-badge>

    <q-slider v-model="standard" :min="0" :max="100 "/>
  </div>
  </q-page>
</template>

<script>

import { client } from "../boot/mqtt-boot";
export default {
  created() {
    client.on("connect", () => {
      console.log("Conntected!");
      client.subscribe("robvik/message", function (err) {

        if (!err) {
          let info = JSON.stringify({
            user: "hemsida",
            message: "Hello mqtt",
          });
          client.publish("robvik/hello", info);
        }
      });
    });

    client.on("message", (user, message) => {
      console.log(`${user} - ${message.toString()}`);
      let info = JSON.parse(message.toString());
      this.chatMessages.push(info);
    });
  },
  data() {
    return {
      receivedMessage: "",
      publishMessage: "",
      chatMessages: [],
      standard: 0,
    };
  },
  methods: {
    hastighet(){
      client.publish("robvik/hastighet", this.standard.toString());
    },
    basic(){
      client.publish("robvik/drive/b", "0");
    },
    forward(){
      client.publish("robvik/drive/forward", "1")
    },
    backward(){
      client.publish("robvik/drive/backward", "2");
    },
    right_forward(){
      client.publish("robvik/drive/right_forward", "3");
    },
    left_forward(){
      client.publish("robvik/drive/right_forward", "4");
    },
    right_backward(){
      client.publish("robvik/drive/right_backward", "5");
    },
    left_backward(){
      client.publish("robvik/drive/left_backward", "6");
    },
  },
  // watch: {
  //   standard(standard) {
  //     if (standard > 0) {
  //       this.hastighet = this.standard.toString()
  //       console.log(this.hastighet)
  //       client.publish("robvik/hastighet", this.hastighet);
  //     }
  //   }
  // },
};
</script>
<style>
  .btn {
    height: 75px;
    width: 75px;
    border-radius: 50%;
    background-color: lightgray;
    border: 1px solid grey;
    margin: 10px;
  }
  .background{
    height: 310px;
    width: 310px;
    background-color: gray;
    border-radius:  5%;
  }
</style>
