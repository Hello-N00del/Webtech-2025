import { onBeforeUnmount, onMounted, ref } from "vue"

const MOBILE_BREAKPOINT = 768

export function useIsMobile() {
  const isMobile = ref<boolean>(false)

  onMounted(() => {
    const mql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`)

    const onChange = () => {
      isMobile.value = window.innerWidth < MOBILE_BREAKPOINT
    }

    mql.addEventListener("change", onChange)
    // initial value
    isMobile.value = window.innerWidth < MOBILE_BREAKPOINT

    onBeforeUnmount(() => {
      mql.removeEventListener("change", onChange)
    })
  })

  return isMobile
}
