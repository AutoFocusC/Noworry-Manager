<template>  <div class="login">
    <n-input v-model:value="psd" />
    <n-button type="success" @click="check()">验证</n-button>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { NButton, NInput } from "naive-ui";
import route from "@/router";
const psd = ref("");
export default defineComponent({
  setup() {
    return {
      psd,
      check: () => {
        if (psd.value == "nw1230") {
          const time = Date.now();
          document.cookie = `token=${time}`;
          alert("验证通过!");
          route.push("/");
        } else {
          psd.value = "";
          alert("验证失败!");
        }
      },
    };
  },
  components: {
    NButton,
    NInput,
  },
});
</script>

<style>
.login {
  display: flex;
  justify-content: center;
  width: 300px;
  margin: 0 auto;
  padding-top: 10vw;
}
</style>
