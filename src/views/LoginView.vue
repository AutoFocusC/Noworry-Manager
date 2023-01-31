<template>
  <div class="login">
    <div class="item">
      <label>昵称</label>
      <n-input v-model:value="name" placeholder="仅支持英文" />
    </div>
    <div class="item">
      <label>密码</label>
      <n-input v-model:value="psd"  placeholder="和之前的一样"  />
    </div>
    <div class="item">
      <n-button type="success" @click="check()">验证</n-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { NButton, NInput } from "naive-ui";
import route from "@/router";
const name = ref("");
const psd = ref("");
const check = () => {
  if (psd.value == "nw1230") {
    const time = Date.now();
    document.cookie = `timer=${time}`;
    document.cookie = `token=${name.value}`;
    alert("验证通过!");
    route.push("/");
  } else {
    psd.value = "";
    alert("验证失败!");
  }
};
</script>

<style>
.login {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  width: 300px;
  margin: 0 auto;
  padding-top: 5vw;
}

.login .item{
  display: flex;
  flex-direction: row;
  justify-content: center;
  margin: 10px;
}

.login .item label{
  width: 60px;
  line-height: 34px;
  font-weight: 600;
}
</style>
