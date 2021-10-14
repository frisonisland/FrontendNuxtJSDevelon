<template>
  <div class="dark">
    <Navbar/>
    <div>
      <!-- Required font awesome -->
      <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.11.2/css/all.css"/>
      <div class="px-3 py-3 rounded overflow-hidden shadow-lg mb-4 dark:bg-gray-900" style="min-height: 100vh">
        <div class="px-3">
          <button
            class="bg-purple-500 text-white active:bg-purple-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
            type="button" @click="getRivers">Show me some rivers
          </button>
        </div>
        <div v-if="this.currentRiver != null"
             class="px-3 py-3 rounded overflow-hidden shadow-lg mb-4 dark:bg-gray-900"
        >
          <img
            :src="[this.currentRiver.url]"
            :alt="[this.currentRiver.label]"
            style="height: 300px"
          />
          <div class="inline-flex">
            <button
              class="bg-transparent-300 hover:bg-transparent-400 dark:text-white text-transparent-800 font-bold py-2 px-4 rounded-l"
              @click="getPrevious">
              Prev
            </button>
            <button
              class="bg-transparent-300 hover:bg-transparent-400 dark:text-white text-transparent-800 font-bold py-2 px-4 rounded-r"
              @click="getNext">
              Next
            </button>
          </div>
          <div class="px-6 py-4 pb-2">
            <div class="font-bold text-xl mb-2 dark:text-white">
              {{ this.currentRiver.index + 1 }}. {{ this.currentRiver.label }}:
              {{ this.currentRiver.length }} Km
            </div>
            <p class="text-gray-700 dark:text-gray-300 text-base">
              {{ this.currentRiver.description }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
import $ from 'jquery'
import * as axios from "axios";

export default {
  name: "Rivers",
  data() {
    return {
      hidden: true,
      rivers: {},
      currentRiver: null,
      nRivers: 0
    }
  },
  methods: {
    getPrevious() {
      var index = this.currentRiver.index - 1;
      console.log("Previous is:" + index);
      if (index < 1) {
        index = this.nRivers - 1;
      }
      console.log(index);
      console.log(this.rivers);
      this.currentRiver = this.rivers[index];
    },
    getNext() {
      var index = this.currentRiver.index + 1;
      console.log("Next is:" + index);
      if (index === this.nRivers) {
        index = 0;
      }
      this.currentRiver = this.rivers[index];
    },

    getRivers() {
      axios.get("https://api.nuxtjs.dev/rivers").then(response => {
        var tmpRivers = [];
        var data = response.data;
        data.forEach(
          x => tmpRivers.push({
            label: x.title,
            length: parseInt(x.length.split(" ")[0].replace(",", "")),
            url: x.image,
            description: x.description
          })
        )
        //compare: >0, b before a, <0 a before b
        tmpRivers = tmpRivers.sort((a, b) => a.length > b.length ? -1 : 1);
        this.nRivers = tmpRivers.length;
        tmpRivers.forEach((x, index) => {
            console.log(x);
            console.log(index);
            x.index = index;
            this.rivers[index] = x; // map key, value for rivers
          }
        );
        this.currentRiver = tmpRivers[0]
      })
    }
  }
}
</script>
