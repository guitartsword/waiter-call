<script lang="ts" setup>
definePageMeta({
  layout: 'no-layout'
})
const route = useRoute()
const tableId = route.params.id
const { data, refresh } = useFetch(`/api/table/${tableId}`)

const { createInterval, stopInterval } = usePoll()

onMounted(() => {
  if (data.value?.status === 'CALL') {
    createInterval(refresh, 2000)
  }
})

watch(data, () => {
  if (data.value?.status === 'IDLE') {
    stopInterval()
  }
})

const onCallWaiter = async () => {
  if (data.value?.status === 'CALL') {
    return
  }
  await $fetch(`/api/table/${tableId}/call`, {
    method: 'POST'
  })
  await refresh()
  createInterval(refresh, 2000)
}

const message = computed<string>(() => {
  const messages = {
    IDLE: 'Llamar Mesero',
    CALL: 'Mesero en camino'
  } as const
  type STATUSES = keyof typeof messages
  const status = (data.value?.status || 'IDLE') as STATUSES
  return messages[status] || ''
})

</script>

<template>
  <div class="text-center">
    <h1 class="text-4xl font-medium">
      Mesa: {{ data?.name }}
    </h1>
    <h2>
      Lugar: {{ data?.location }}
    </h2>
    <div class="mt-16">
      <button
        :class="{
          'bg-gray-600 hover:bg-gray-600': data?.status === 'CALL',
          'bg-green-600 hover:bg-green-500': data?.status === 'IDLE',
        }"
        class="max-w-fit w-72 h-72 sm:w-96 sm:h-96 rounded-full text-5xl bg-gray-600 m-0 p-0"
        @click="onCallWaiter"
      >
        {{ message }}
      </button>
    </div>
  </div>
</template>

<style scoped></style>
