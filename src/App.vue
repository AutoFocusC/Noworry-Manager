<template>
  <div class="header">
    <nav>
      <div class="website-title">
        <router-link to="/">
          <img src="@/assets/icon/home/title.png" />
        </router-link>
      </div>
      <div class="nav-list">
        <router-link to="/">{{ $t("homeNav.technology") }}</router-link>
        <router-link to="/chart">{{ $t("homeNav.charts") }}</router-link>
        <router-link to="/">{{ $t("homeNav.library") }}</router-link>
        <router-link to="/contact">{{ $t("homeNav.contact") }}</router-link>
      </div>
      <div class="get-start">GET STARTED</div>
      <router-link to="/contact" class="menu-botton">
        <img src="@/assets/icon/home/menu-icon.png" />
      </router-link>
    </nav>
  </div>
  <div class="container">
    <router-view />
  </div>

  <div class="footer">
    <hr />
    <div class="copyright">© 2022 VON Foundation, all rights reserved</div>
    <div class="list-menu">
      <div>Cookie Notice</div>
      <div>Privacy Notice</div>
      <div>Contact</div>
      <div>Careers</div>
    </div>
  </div>
</template>

<script lang="ts">
import { i18n } from "./local";
import * as config from "@/doc/frontend";
import { defineComponent } from "vue";

const { t } = i18n.global;
export default defineComponent({
  setup() {
    return { config };
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
}
@media screen and (min-width: 650px) {
  nav {
    width: 100%;
    display: flex;
    padding: 40px 50px;
    justify-content: space-between;
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
  }

  .footer {
    color: #1a1b1f;
    font-size: 22px;
    display: flex;
    margin: 5%;
    padding-top: 1%;
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
    width: 50%;
    text-align: left;
    font-weight: 600;
    font-size: 14px;
  }
}
@media screen and (max-width: 650px) {
  nav {
    width: 100%;
    display: flex;
    padding: 40px 10px;
    justify-content: space-between;
    align-items: center;
  }

  nav .website-title {
    padding-left: 10px;
  }

  nav .website-title img {
    width: 175px;
  }

  nav .get-start,
  nav .nav-list {
    display: none;
  }

  nav .menu-botton {
    padding-right: 10px;
  }
  nav .menu-botton img {
    height: 20px;
    width: 20px;
  }

  .footer {
    color: #1a1b1f;
    font-size: 22px;
    display: flex;
    flex-direction: column-reverse;
    align-items: center;
    padding-top: 1%;
    border-top: 1px solid #7a7a7a;
    margin: 3%;
  }
  .footer .list-menu {
    display: flex;
    justify-content: space-around;
    width: 100%;
    font-family: Montserrat;
    font-weight: 400;
    font-size: 6px;
  }
  .footer .copyright {
    padding-top: 3%;
    font-family: Montserrat;
    text-align: left;
    font-weight: 600;
    font-size: 6px;
  }
}
</style>
