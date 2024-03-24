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
    <div class="mt-16">
      <wc-button
        :class="{
          'bg-gray-600': data?.status === 'CALL',
          'bg-green-600': data?.status === 'IDLE',
        }"
        class="pw-5 h-[50vh] w-[50vh] rounded-full text-5xl bg-gray-600 hover:bg-green-500"
        @click="onCallWaiter"
      >
        {{ message }}
      </wc-button>
    </div>
  </div>
</template>

<style scoped></style>
