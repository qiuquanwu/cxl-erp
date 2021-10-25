<template>
  <div class="header-warp">
    <div class="header-item" @click="logout">
      <logout-icon class="header-icon" />
      <div>注销</div>
    </div>
  </div>
</template>
<script>
import { inject } from '@vue/runtime-core'
import LogoutIcon from "../icon/Logout.vue"
import getData from "../lib/getData.js"
export default {
  name: "MyHeader",
  components: {
    LogoutIcon
  },
  setup() {
    const changeLoginStatus = inject("changeLoginStatus")
    const logout = () => {
      getData("api/user/logout", {})
        .then(data => {
          console.log(data)
        }) // JSON from `response.json()` call
        .catch(error => {
          console.error(error)
        })
      changeLoginStatus(false)
    }
    return {
      logout
    }
  }
}
</script>

<style>
.header-icon {
  font-size: 20px;
  color: #ff0033;
}
.header-item {
  height: 100%;
  width: 80px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  float: right;
}
.header-item:hover {
  background-color: #f8f8f9;
}
.header-warp {
  height: 100%;
}
</style>