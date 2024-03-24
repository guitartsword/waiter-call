<script lang="ts" setup>
import { Table } from '@prisma/client'

const { data: tableList, refresh } = useFetch('/api/table')
usePoll(refresh, 2000)

const changeToIdle = async (table: Table) => {
  if (table.status === 'CALL') {
    const res = await $fetch(`/api/table/${table.id}/waiter`, { method: 'POST' })
    table.status = res.status
  }
}

</script>

<template>
  <div class="flex flex-wrap gap-4 p-4">
    <!-- Loop through your tables here -->
    <div
      v-for="table in tableList"
      :key="table.id"
      :class="{
        'bg-gray-300': table.status === 'IDLE',
        'bg-green-400': table.status === 'CALL',
      }"
      class="border border-gray-300 hover:border-gray-500 rounded-lg p-4 cursor-pointer shadow-md hover:shadow-lg transition-all"
      @click="changeToIdle(table)"
    >
      <p class="text-lg font-semibold">
        Mesa: {{ table.name }}
      </p>
    </div>
  </div>
  <!-- <table class="min-w-full">
    <thead class="bg-gray-200 border-b">
      <tr>
        <th scope="col" class="text-sm font-medium text-gray-900 px-6 py-4 text-left">
          Ubicación
        </th>
        <th scope="col" class="text-sm font-medium text-gray-900 px-6 py-4 text-left">
          #
        </th>
        <th scope="col" class="text-sm font-medium text-gray-900 px-6 py-4 text-left">
          Acción
        </th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="table in tableList" :key="table.id" class="bg-white border-b transition duration-300 ease-in-out hover:bg-gray-100">
        <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
          {{ table.location }}
        </td>
        <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
          {{ table.name }}
        </td>
        <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
          <NuxtLink :to="`/table/${table.id}`">
            <wc-button>
              Editar
            </wc-button>
          </NuxtLink>
          <wc-button class="ml-3 bg-red-500 hover:bg-red-400">
            Borrar
          </wc-button>
        </td>
      </tr>
      <tr class="bg-white border-b transition duration-300 ease-in-out hover:bg-gray-100">
        <td colspan="3" class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 text-end">
          <wc-button class="min-w-full">
            Crear
          </wc-button>
        </td>
      </tr>
    </tbody>
  </table> -->
</template>
