<template>
  <div class="header">
    <nav>
      <div class="get-start" @click="toHome()">NOWORRY</div>
    </nav>
  </div>
  <div class="container">
    <router-view />
  </div>

  <div class="footer">
    <hr />
    <div class="copyright">© 2023 Noworry, all rights reserved</div>
  </div>
</template>

<script lang="ts">
import * as config from "@/doc/frontend";
import route from "@/router";
import { defineComponent } from "vue";

export default defineComponent({
  setup() {
    return {
      config,
      toHome: () => {
        route.push("/");
      },
    };
  },
});
</script>

<style>
body {
  margin: 0;
  padding: 0;
  width: 100%;
  height: 100%;
}
#app {
  font-family: Segoe UI, Segoe UI Light;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  background-color: #ffffff;
}

.header {
  width: 100%;
  background-color: #ffffff;
  display: flex;
  justify-content: space-between;
  height: 15vh;
}
nav {
  width: 100%;
  display: flex;
  padding: 40px 50px;
  justify-content: center;
  align-items: center;
}

nav .website-title {
  display: flex;
  justify-content: center;
  align-items: center;
}

nav .website-title img {
  width: 175px;
}

nav .get-start {
  color: #ffffff;
  font-weight: 900;
  padding: 15px 30px;
  border-radius: 10px;
  background-color: #1a1b1f;
  cursor: pointer;
}

nav .menu-botton {
  display: none;
}

nav .nav-list {
  width: 30%;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
nav .nav-list a {
  font-family: Microsoft YaHei;
  font-weight: 600;
  color: #7a7a7a;
  font-size: 14px;
  letter-spacing: 1px;
  line-height: 28px;
  text-decoration: none;
}
.container {
  width: 100%;
  min-height: 70vh;
}

.footer {
  color: #1a1b1f;
  font-size: 22px;
  display: flex;
  margin: 5vh 5%;
  border-top: 1px solid #7a7a7a;
}
.footer .list-menu {
  display: flex;
  width: 50%;
  justify-content: space-around;
  font-family: Montserrat;
  font-weight: 400;
  font-size: 14px;
}
.footer .copyright {
  font-family: Montserrat;
  width: 100%;
  text-align: center;
  font-weight: 600;
  font-size: 14px;
}
</style>
