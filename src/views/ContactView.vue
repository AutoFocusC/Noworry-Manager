<template>
  <div class="contact">
    <div class="frame-left">
      <div class="title">Contact us</div>
      <div class="describe">Let AI boost your revenue......</div>
      <div class="form">
        <label>NAME</label>
        <input required type="text" v-model="email.name" />
        <label>EMAIL ADDRESS</label>
        <input required type="email" v-model="email.email" />
        <label>MESSAGE</label>
        <textarea
          required
          v-model="email.content"
          placeholder="Any message which you want to say..."
        ></textarea>
        <input
          v-bind:style="{
            visibility:
              email.name && email.email && email.content ? 'visible' : 'hidden',
          }"
          class="submit"
          value="SUBMIT"
          type="submit"
          @click="sendMail()"
        />
      </div>
    </div>
    <div class="frame-right">
      <div class="title">Contact</div>
      <div class="contact">
        <div class="contact-item">
          <div><u>Wechat</u></div>
          <div><u>Mail</u></div>
        </div>
        <div class="contact-item">
          <div>{{frontend.AdminInfo.email}}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import endpoint from "@/doc/endpoint";
import frontend from "@/doc/frontend";
import { EmailReq } from "@/entity/request/SendEmailReq";
import axios from "axios";
import { defineComponent, reactive } from "vue";

export default defineComponent({
  setup() {
    const email = reactive({
      name: "",
      email: "",
      content: "",
    });
    const sendMail = () => {
      axios({
        url: `${endpoint.SEND_EMAIL_TO_HOST}`,
        method: "POST",
        data: new EmailReq(`${email.name} ${email.email}`, email.content),
      })
        .then(() => {
          email.name = "";
          email.email = "";
          email.content = "";
          alert("Mail sent successfully!");
        })
        .catch(() => {
          alert("Mail sent failed!");
        });
    };
    return {
      frontend,
      email,
      sendMail,
    };
  },
});
</script>

<style>
@media screen and (min-width: 650px) {
  .contact {
    width: 70%;
    display: flex;
    margin: 0 auto;
  }
  .contact .frame-left {
    width: 80%;
    margin: 0 50px;
    padding: 40px;
    border: 1px solid #eeeeee;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
  }

  .contact .frame-left .title {
    font-family: Montserrat;
    font-size: 40px;
    line-height: 100px;
    font-weight: 600;
    text-align: left;
  }
  .contact .frame-left .describe {
    font-family: Montserrat;
    letter-spacing: 1px;
    font-size: 18px;
    line-height: 50px;
    font-weight: 300;
    color: #7f7f7f;
    text-align: left;
  }

  .contact .frame-left .form {
    width: 100%;
    display: flex;
    flex-direction: column;
  }
  .contact .frame-left .form label {
    text-align: left;
    font-family: Montserrat;
    font-weight: 600;
    font-size: 17px;
    margin-top: 20px;
  }
  .contact .frame-left .form input,
  .contact .frame-left .form textarea {
    font-family: Microsoft YaHei;
    font-size: 17px;
    font-stretch: 100%;
    font-weight: 400;
    letter-spacing: 1px;
    line-height: 26px;
    margin: 25px 0;
    padding: 0 3%;
    outline-style: none;
    transition-duration: 0.5s;
  }

  /* 隐藏侧边栏的scroll */
  .contact .frame-left .form textarea::-webkit-scrollbar {
    display: none;
  }

  .contact .frame-left .form input {
    width: 32%;
    height: 44px;
  }
  .contact .frame-left .form input:focus {
    width: 92%;
  }
  .contact .frame-left .form textarea {
    width: 92%;
    height: 44px;
    padding-top: 2.5%;
  }
  .contact .frame-left .form textarea:focus {
    height: 144px;
  }

  .contact .frame-left .form .submit {
    color: #fff;
    margin: 20px 0;
    border: none;
    background-color: #1a1b1f;
    width: 38%;
  }

  .contact .frame-right {
    width: 30%;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }

  .contact .frame-right .title {
    font-family: Montserrat;
    font-size: 24px;
    line-height: 60px;
    font-weight: 600;
    text-align: left;
  }

  .contact .frame-right .contact {
    text-align: left;
  }

  .contact .frame-right .contact .contact-item {
    margin-right: 20px;
    font-size: 19px;
    line-height: 40px;
    font-family: Montserrat;
    font-weight: 500;
    letter-spacing: 1px;
    display: flex;
    flex-direction: column;
  }
}

@media screen and (max-width: 650px) {
  .contact {
    width: 90%;
    display: flex;
    flex-direction: column;
    margin: 0 auto;
  }
  .contact .frame-left {
    width: 90%;
    border: 1px solid #eeeeee;
    padding: 0 5%;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
  }

  .contact .frame-left .title {
    font-family: Montserrat;
    font-size: 26px;
    line-height: 50px;
    font-weight: 700;
    text-align: left;
  }
  .contact .frame-left .describe {
    font-family: Montserrat;
    letter-spacing: 1px;
    font-size: 14px;
    line-height: 40px;
    font-weight: 300;
    color: #7f7f7f;
    text-align: left;
  }

  .contact .frame-left .form {
    padding-left: 3%;
    width: 100%;
    display: flex;
    flex-direction: column;
  }
  .contact .frame-left .form label {
    text-align: left;
    font-family: Montserrat;
    font-weight: 600;
    font-size: 12px;
    margin-top: 20px;
  }
  .contact .frame-left .form input,
  .contact .frame-left .form textarea {
    font-family: Microsoft YaHei;
    font-size: 12px;
    font-stretch: 100%;
    letter-spacing: 1px;
    padding: 0 2%;
    width: 90%;
    outline-style: none;
    transition-duration: 0.5s;
  }

  .contact .frame-left .form input {
    line-height: 26px;
    font-weight: 400;
    height: 30px;
  }
  .contact .frame-left .form textarea {
    line-height: 20px;
    height: 44px;
    padding-top: 1%;
  }
  .contact .frame-left .form textarea:focus {
    height: 144px;
  }

  .contact .frame-left .form .submit {
    color: #fff;
    margin: 20px 0;
    border: none;
    background-color: #1a1b1f;
    width: 95%;
  }

  .contact .frame-right {
    width: 100%;
    margin: 3%;
    display: flex;
    flex-direction: column;
  }

  .contact .frame-right .title {
    font-family: Montserrat;
    font-size: 22px;
    line-height: 60px;
    font-weight: 500;
    text-align: left;
  }

  .contact .frame-right .contact {
    width: 100%;
    text-align: left;
    display: flex;
    flex-direction: row;
    justify-content: start;
  }

  .contact .frame-right .contact .contact-item {
    width: 25%;
    font-size: 14px;
    line-height: 16px;
    font-family: Montserrat;
    font-weight: 400;
    letter-spacing: 1px;
    display: flex;
    flex-direction: column;
  }
}
</style>
