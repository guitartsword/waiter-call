<script lang="ts" setup>

const { data: tableList } = useFetch('/api/table')

</script>

<template>
  <table class="min-w-full">
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
              Comensal
            </wc-button>
          </NuxtLink>
          <wc-button class="ml-3 bg-orange-500 hover:bg-orange-400">
            Editar
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
  </table>
</template>
