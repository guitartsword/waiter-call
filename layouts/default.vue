<script lang="ts" setup>
const showSidebar = ref(false)

const toggleSidebar = () => {
  showSidebar.value = !showSidebar.value
}
</script>

<template>
  <div class="flex flex-col h-screen overflow-y-hidden">
    <!-- Navbar -->
    <nav class="z-30 flex justify-between items-center p-4 bg-white shadow-md h-12">
      <!-- Hamburger Icon for small screens -->
      <div class="md:hidden">
        <!-- Assuming you have a function toggleSidebar() to open/close the sidebar -->
        <button class="p-5 hover:text-slate-500" @click="toggleSidebar">
          <i class="gg-menu" />
        </button>
      </div>
    </nav>
    <div class="flex flex-grow">
      <div class="flex md:block md:static fixed z-30 md:z-0 inset-0 md:bg-transparent" :class="{hidden: !showSidebar}">
        <aside class="flex flex-col gap-1 w-64 h-full p-2 font-sans text-base font-normal text-gray-700 shadow-xl bg-slate-50 overflow-y-auto max-h-[calc(100vh-3rem)]">
          <NuxtLink to="/" class="flex items-center w-full p-3 rounded-lg text-start leading-tight transition-all hover:bg-blue-50 hover:bg-opacity-80 focus:bg-blue-50 focus:bg-opacity-80 active:bg-gray-50 active:bg-opacity-80 hover:text-blue-900 focus:text-blue-900 active:text-blue-900 outline-none">
            Inicio
          </NuxtLink>
          <NuxtLink to="/table" class="flex items-center w-full p-3 rounded-lg text-start leading-tight transition-all hover:bg-blue-50 hover:bg-opacity-80 focus:bg-blue-50 focus:bg-opacity-80 active:bg-gray-50 active:bg-opacity-80 hover:text-blue-900 focus:text-blue-900 active:text-blue-900 outline-none">
            Mesas
          </NuxtLink>
        </aside>
        <div class="bg-black flex-grow bg-opacity-50" @click="toggleSidebar" />
      </div>
      <div class="flex-1 p-4 overflow-y-auto max-h-[calc(100vh-3rem)]">
        <slot />
      </div>
    </div>
  </div>
</template>

<style scoped></style>
