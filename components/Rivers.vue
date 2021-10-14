<template>
  <div>
    <Navbar/>
    <div class="px-6 py-3">
      <button
        class="bg-purple-500 text-white active:bg-purple-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
        type="button" @click="getRivers">Show me some rivers
      </button>
    </div>
    <div class="carousel relative rounded relative overflow-hidden shadow-xl" v-if="this.currentRiver != null">
      <!-- Required font awesome -->
      <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.11.2/css/all.css"/>

      <style>
        .carousel-open:checked + .carousel-item {
          position: static;
          opacity: 100;
        }

        .carousel-item {
          -webkit-transition: opacity 0.6s ease-out;
          transition: opacity 0.6s ease-out;
        }

        .carousel-indicators {
          list-style: none;
          margin: 0;
          padding: 0;
          position: absolute;
          bottom: 2%;
          left: 0;
          right: 0;
          text-align: center;
          z-index: 10;
        }
      </style>
      <div class="carousel-inner relative overflow-hidden w-full">
        <div class="bg-white px-3 py-3">
          <img class="object-cover h-48 w-full ..." :src="this.currentRiver.url" style="max-width:500px">
          <div class="inline-flex">
            <button class="bg-transparent-300 hover:bg-transparent-400 text-transparent-800 font-bold py-2 px-4 rounded-l" @click="getPrevious">
              Prev
            </button>
            <button class="bg-transparent-300 hover:bg-transparent-400 text-transparent-800 font-bold py-2 px-4 rounded-r" @click="getNext">
              Next
            </button>
          </div>
          <div>
            <p class="px-3 py-3">{{ this.currentRiver.label }}: {{this.currentRiver.length}} Km</p>
            <p
              class="px-3 py-3">{{ this.currentRiver.description }}</p>
          </div>
        </div>

        <label
          :class="['control w-10 h-10 ml-2 md:ml-10 absolute cursor-pointer hidden font-bold text-black hover:text-white rounded-full bg-white hover:bg-blue-700 leading-tight text-center z-10 inset-y-0 left-0 my-auto flex justify-center content-center']"><i
          class="fas fa-angle-left mt-3"></i></label>
        <label
          :class="['next control- w-10 h-10 mr-2 md:mr-10 absolute cursor-pointer hidden font-bold text-black hover:text-white rounded-full bg-white hover:bg-blue-700 leading-tight text-center z-10 inset-y-0 right-0 my-auto']"><i
          class="fas fa-angle-right mt-3"></i></label>
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
            length: x.length.split(" ")[0],
            url: x.image,
            description: x.description
          })
        )
        tmpRivers = tmpRivers.sort((a, b) => a.length > b.length ? a : b);
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
