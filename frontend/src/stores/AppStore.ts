<script setup lang="ts">
import { ref } from "vue"
import { useAppStore } from "../stores/AppStore"

const appStore = useAppStore()
const auth = appStore.auth

const email = ref("")
const password = ref("")

const handleLogin = async () => {
  await auth.login(email.value, password.value)
}
</script>
