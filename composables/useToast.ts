// Simple toast notification composable
interface Toast {
  id: number
  title: string
  color: 'green' | 'red' | 'yellow' | 'blue'
}

const toasts = ref<Toast[]>([])
let nextId = 0

export function useToast() {
  function add(options: { title: string; color?: 'green' | 'red' | 'yellow' | 'blue' }) {
    const id = nextId++
    const toast: Toast = {
      id,
      title: options.title,
      color: options.color || 'blue'
    }
    toasts.value.push(toast)

    // Auto-remove after 3 seconds
    setTimeout(() => {
      remove(id)
    }, 3000)
  }

  function remove(id: number) {
    const index = toasts.value.findIndex(t => t.id === id)
    if (index > -1) {
      toasts.value.splice(index, 1)
    }
  }

  return {
    toasts: readonly(toasts),
    add,
    remove
  }
}
