<template>
  <n-message-provider>
    <!-- <div>{{ states.loginStatus }}</div> -->
    <router-view></router-view>
  </n-message-provider>
</template>
<script>
import { defineComponent, provide, reactive } from "@vue/runtime-core"
import { useRouter } from "vue-router"
export default defineComponent({
  setup() {
    const router = useRouter()
    const states = reactive({
      loginStatus: false,
      user: null,
    })
    const changeLoginStatus = (user) => {
      states.loginStatus = user ? true : false
      let routeName = user ? "Admin" : "Login"
      states.user = user
      router.replace({ name: routeName })
    }
    provide("changeLoginStatus", changeLoginStatus)
    provide("states", states)
    return {
      states
    }
  }
})

</script>
<style>
* {
  padding: 0;
  margin: 0;
}
div {
  box-sizing: border-box;
}
.bg-white {
  background-color: white;
  padding: 10px;
}
.mt-10 {
  margin-top: 10px;
}
</style>
