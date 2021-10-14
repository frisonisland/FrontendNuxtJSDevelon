<template>
  <div>
    <nav class="bg-white shadow dark:bg-gray-800">
      <div
        class="container px-6 py-3 md:flex md:justify-between md:items-center"
      >
        <div class="flex items-left">
            <a
              class="text-xl font-bold text-gray-800 dark:text-white md:text-2xl hover:text-gray-700 dark:hover:text-gray-300"
              href="#"
            >Rivers</a
            >
        </div>
        <div class="items-center md:flex">
          <div class="flex flex-col md:flex-row md:mx-6">
            <SwitchDark/>
          </div>
        </div>

        <!-- Mobile Menu open: "block", Menu closed: "hidden" -->

      </div>
    </nav>
  </div>
</template>
