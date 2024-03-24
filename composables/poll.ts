export const usePoll = (action?: () => void, interval?: number) => {
  const intervalId = ref<number | null>(null)

  const createInterval = (newAction?: () => void, newInterval = 1000) => {
    if (!newAction || !newInterval) {
      return
    }
    stopInterval()
    intervalId.value = window.setInterval(newAction, newInterval)
  }

  const stopInterval = () => {
    if (intervalId.value !== null) {
      clearInterval(intervalId.value)
    }
  }

  onMounted(() => {
    createInterval(action, interval)
  })

  onUnmounted(() => {
    stopInterval()
  })

  return {
    createInterval,
    stopInterval
  }
}
