<template>  <div class="title">
    <n-icon class="icon" size="35">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024">
        <path
          d="M590.0288 617.2672c44.9024-44.9024 86.2208-155.6992 94.208-245.0432 1.792-19.6608-15.104-35.7888-34.7648-33.9456-96.9728 9.216-199.3728 48.0256-244.8896 93.5424-51.2 51.2-51.2 134.2464 0 185.4464s134.2464 51.2 185.4464 0z"
          fill="#F55C04"
        />
        <path
          d="M511.0784 920.1664c-225.0752 0-408.1664-183.0912-408.1664-408.1664s183.0912-408.1664 408.1664-408.1664 408.1664 183.0912 408.1664 408.1664-183.0912 408.1664-408.1664 408.1664z m0-754.8928C319.8976 165.2736 164.352 320.8192 164.352 512s155.5456 346.7264 346.7264 346.7264 346.7264-155.5456 346.7264-346.7264-155.5456-346.7264-346.7264-346.7264z"
          fill="#333333"
        />
      </svg>
    </n-icon>
    <div>订单详情</div>
  </div>
  <div class="table">
    <n-table :bordered="false" :single-line="false">
      <thead>
        <tr>
          <th>订单子号</th>
          <th>商品名称</th>
          <th>订单总价</th>
          <th>优惠价格</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>{{ data.orderDetailId }}</td>
          <td>{{ data.commodityName }}</td>
          <td>{{ data.orderTotalPrice }}</td>
          <td>{{ data.favourablePrice }}</td>
        </tr>
        <tr>
          <th>递签城市</th>
          <th>订单状态</th>
          <th colspan="2">联系地址</th>
        </tr>
        <tr>
          <td>{{ data.remark }}</td>
          <td>
            {{
              data.status == "0"
                ? "未支付"
                : data.status == "1"
                ? "待填表"
                : data.status == "2"
                ? "已填表"
                : "已审核"
            }}
          </td>
          <td colspan="2">{{ data.contact }}</td>
        </tr>
      </tbody>
    </n-table>
  </div>

  <div class="title" v-if="Number(data.status) >= 2">
    <n-icon class="icon" size="35">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024">
        <path
          d="M590.0288 617.2672c44.9024-44.9024 86.2208-155.6992 94.208-245.0432 1.792-19.6608-15.104-35.7888-34.7648-33.9456-96.9728 9.216-199.3728 48.0256-244.8896 93.5424-51.2 51.2-51.2 134.2464 0 185.4464s134.2464 51.2 185.4464 0z"
          fill="#F55C04"
        />
        <path
          d="M511.0784 920.1664c-225.0752 0-408.1664-183.0912-408.1664-408.1664s183.0912-408.1664 408.1664-408.1664 408.1664 183.0912 408.1664 408.1664-183.0912 408.1664-408.1664 408.1664z m0-754.8928C319.8976 165.2736 164.352 320.8192 164.352 512s155.5456 346.7264 346.7264 346.7264 346.7264-155.5456 346.7264-346.7264-155.5456-346.7264-346.7264-346.7264z"
          fill="#333333"
        />
      </svg>
    </n-icon>
    <div>信息登记表</div>
  </div>

  <div class="table" v-if="Number(data.status) >= 2">
    <n-table
      v-if="Number(data.commodityType) != 13"
      :bordered="false"
      :single-line="false"
    >
      <thead>
        <tr>
          <th colspan="2">递签国家</th>
          <th colspan="2">递签城市</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td colspan="2">{{ form.handSignCountry }}</td>
          <td colspan="2">{{ form.handSignCity }}</td>
        </tr>
        <tr v-if="form.handHistoryExist">
          <th>历史递签国家</th>
          <th>历史递签日期</th>
          <th>签证存续时间</th>
          <th>签证号码</th>
        </tr>
        <tr v-if="form.handHistoryExist">
          <td>{{ form.handHistoryCountry }}</td>
          <td>{{ form.handHistoryDate }}</td>
          <td>{{ form.handHistoryValidity }}</td>
          <td>{{ form.handHistoryCode }}</td>
        </tr>
        <tr>
          <th>中文姓名</th>
          <th>姓名拼音</th>
          <th>性别</th>
          <th>婚姻状态</th>
        </tr>
        <tr>
          <td>{{ form.chineseName }}</td>
          <td>{{ form.lastName }} {{ form.firstName }}</td>
          <td>
            {{ form.sex == "0" ? "男" : data.status == "1" ? "女" : "保密" }}
          </td>
          <td>
            {{
              form.marriedStatus == "0"
                ? "未婚"
                : data.status == "1"
                ? "已婚"
                : "离异"
            }}
          </td>
        </tr>
        <tr>
          <th>出生日期</th>
          <th>出生地</th>
          <th>国籍</th>
          <th>曾国籍</th>
        </tr>
        <tr>
          <td>{{ form.birthday }}</td>
          <td>{{ form.birthplace }}</td>
          <td>{{ form.nationality }}</td>
          <td>{{ form.nationalityPre || "--" }}</td>
        </tr>
        <tr>
          <th>英国电话</th>
          <th>电子邮箱</th>
          <th colspan="2">英国住址</th>
        </tr>
        <tr>
          <td>{{ form.phoneEngland }}</td>
          <td>{{ form.email }}</td>
          <td colspan="2">{{ form.addressEngland }}</td>
        </tr>
        <tr>
          <th colspan="2">护照号码</th>
          <th>护照签发日期</th>
          <th>护照有效期</th>
        </tr>
        <tr>
          <td colspan="2">{{ form.passportCode }}</td>
          <td>{{ form.passportIssue }}</td>
          <td>{{ form.passportValidity }}</td>
        </tr>
        <tr>
          <th colspan="2">BRP号码</th>
          <th>BRP签发日期</th>
          <th>BRP有效期</th>
        </tr>
        <tr>
          <td colspan="2">{{ form.BRPNumber }}</td>
          <td>{{ form.BRPIssue }}</td>
          <td>{{ form.BRPValidity }}</td>
        </tr>
        <tr>
          <th>学校名称</th>
          <th>学校地址</th>
          <th>学校电话</th>
          <th>学校邮箱</th>
        </tr>
        <tr>
          <td>{{ form.collegeName }}</td>
          <td>{{ form.collegeAddress }}</td>
          <td>{{ form.collegePhone }}</td>
          <td>{{ form.collegeEmail }}</td>
        </tr>
        <tr>
          <th>专业名称</th>
          <th>微信号</th>
          <th>计划出发时间</th>
          <th>计划返回时间</th>
        </tr>
        <tr>
          <td>{{ form.subjectName }}</td>
          <td>{{ form.wechatId }}</td>
          <td>{{ form.estDepartureTime }}</td>
          <td>{{ form.estReturnTime }}</td>
        </tr>
      </tbody>
    </n-table>
    <n-table v-else :bordered="false" :single-line="false">
      <thead>
        <tr>
          <th colspan="2">递签城市</th>
          <th>是否办理过美签</th>
          <th>上一次美签有效期</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td colspan="2">{{ form.handSignCity }}</td>
          <td>{{ form.handHistoryExist == "1" ? "是" : "否" }}</td>
          <td>{{ form.handHistoryValidity || "--" }}</td>
        </tr>
        <tr>
          <th>中文姓名</th>
          <th>姓名拼音</th>
          <th>性别</th>
          <th>婚姻状态</th>
        </tr>
        <tr>
          <td>{{ form.chineseName }}</td>
          <td>{{ form.lastName }} {{ form.firstName }}</td>
          <td>
            {{ form.sex == "0" ? "男" : data.status == "1" ? "女" : "保密" }}
          </td>
          <td>
            {{
              form.marriedStatus == "0"
                ? "未婚"
                : data.status == "1"
                ? "已婚"
                : "离异"
            }}
          </td>
        </tr>
        <tr>
          <th>出生日期</th>
          <th>出生地</th>
          <th>国籍</th>
          <th>曾国籍</th>
        </tr>
        <tr>
          <td>{{ form.birthday }}</td>
          <td>{{ form.birthplace }}</td>
          <td>{{ form.nationality }}</td>
          <td>{{ form.nationalityPre || "--" }}</td>
        </tr>
        <tr>
          <th>英国电话</th>
          <th>电子邮箱</th>
          <th>DLS-160</th>
          <th>签证类型</th>
        </tr>
        <tr>
          <td>{{ form.phoneEngland }}</td>
          <td>{{ form.email }}</td>
          <td>{{ form.DLS_number || "未填" }}</td>
          <td>
            {{
              form.visaType == "1"
                ? "B1"
                : form.visaType == "2"
                ? "B2"
                : "B1/B2"
            }}
          </td>
        </tr>
        <tr>
          <th colspan="2">护照号码</th>
          <th>微信号</th>
          <th>计划面签时间</th>
        </tr>
        <tr>
          <td colspan="2">{{ form.passportCode }}</td>
          <td>{{ form.wechatId }}</td>
          <td>{{ form.estInterviewTime }}</td>
        </tr>
      </tbody>
    </n-table>
  </div>

  <div
    style="margin: 2vw"
    @click="edit(data.status)"
    v-if="Number(data.status) == 0 || Number(data.status) == 2"
  >
    <n-button type="success">复核</n-button>
  </div>

  <div style="margin: 2vw" @click="deleteOrder()">
    <n-button type="error">删除订单</n-button>
  </div>

  <div class="dialog" v-if="dialog">
    <n-card
      style="width: 600px"
      title="订单复核"
      :bordered="false"
      size="huge"
      role="dialog"
      aria-modal="true"
    >
      <n-form
        v-if="Number(data.status) == 0"
        ref="formRef"
        :model="editing"
        label-placement="left"
        label-width="auto"
        require-mark-placement="right-hanging"
        :style="{
          maxWidth: '640px',
        }"
      >
        <n-form-item label="优惠价格" path="inputValue">
          <n-input
            v-model:value="editing.favourablePrice"
            placeholder="请输入英镑价格"
          />
        </n-form-item>

        <n-form-item label="订单状态">
          <n-radio-group v-model:value="editing.payStatus">
            <n-radio :value="0">未支付</n-radio>
            <n-radio :value="1">已支付</n-radio>
          </n-radio-group>
        </n-form-item>
      </n-form>

      <n-form
        v-if="Number(data.status) == 2"
        ref="formRef"
        :model="editing"
        label-placement="left"
        label-width="auto"
        require-mark-placement="right-hanging"
        :style="{
          maxWidth: '840px',
          height: '500px',
          overflow: 'auto',
        }"
      >
        <n-form-item
          v-for="(item, index) in formKeys"
          :key="index"
          :label="item.name"
          path="inputValue"
        >
          <n-input v-model:value="editing[item.name]" />
        </n-form-item>
      </n-form>
      <div class="dialog-btns">
        <div class="btn" @click="hideDialog()">
          <n-button round>取消</n-button>
        </div>
        <div class="btn">
          <n-button
            v-if="Number(data.status) == 0"
            round
            type="primary"
            @click="submit()"
            >保存</n-button
          >
          <n-button
            v-if="Number(data.status) == 2"
            round
            type="primary"
            @click="submit2()"
            >保存</n-button
          >
        </div>
      </div>
    </n-card>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, reactive } from "vue";
import route from "@/router";
import {
  NTable,
  NIcon,
  NCard,
  NForm,
  NFormItem,
  NInput,
  NButton,
  NRadio,
  NRadioGroup,
} from "naive-ui";
import { useRoute } from "vue-router";
import axios from "axios";

const form: any = reactive({});
const formKeys: any = reactive([]);
//编辑或新增商品
const dialog = ref(false);

const editing: any = reactive({});

const hideDialog = () => {
  dialog.value = false;
};
export default defineComponent({
  setup() {
    const data = reactive(useRoute().query);
    if (data.status == "0") {
      editing.orderId = data.orderId;
      editing.favourablePrice = data.favourablePrice;
      editing.payStatus = 0;
    }
    const edit = function (row?: any) {
      dialog.value = !dialog.value;
    };

    const getData = function () {
      axios({
        url: `/v1/mp/order/getform/${data.commodityType}/${data.orderDetailId}`,
        method: "GET",
      }).then((res) => {
        const keys = Object.keys(res.data);
        keys.forEach((key) => {
          formKeys.push(
            JSON.parse(`{"name":"${key}","value":"${res.data[key]}"}`),
          );
          form[key] = res.data[key];
          editing[key] = res.data[key];
        });
      });
    };
    getData();

    const submit = function () {
      axios({
        url: `/v1/mp/order/update`,
        method: "POST",
        data: {
          orderId: editing.orderId,
          favourablePrice: editing.favourablePrice,
          payStatus: editing.payStatus,
        },
      })
        .then(() => {
          alert("修改成功");
          hideDialog();
          route.push("/order");
        })
        .catch((err) => {
          console.log(err);
          alert("修改失败");
        });
    };

    const submit2 = function () {
      axios({
        url: `/v1/mp/order/updateform/${data.commodityType}/${data.orderDetailId}`,
        method: "POST",
        data: editing,
      })
        .then(() => {
          alert("修改成功");
          hideDialog();
          route.push("/order");
        })
        .catch((err) => {
          console.log(err);
          alert("修改失败");
        });
    };

    return {
      data,
      form,
      formKeys,
      edit,
      editing,
      dialog,
      hideDialog,
      submit,
      submit2,
      deleteOrder: () => {
        if (confirm("确认删除该订单？")) {
          alert("权限已关闭");
        }
      },
    };
  },
  components: {
    NTable,
    NIcon,
    NCard,
    NForm,
    NFormItem,
    NInput,
    NButton,
    NRadio,
    NRadioGroup,
  },
});
</script>

<style>
.title {
  margin: 2vw 15vw;
  width: 150px;
  border-bottom: 2px solid #6d6d6d;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  font-size: 17px;
  font-weight: 700;
  margin-bottom: 3vh;
}
.table {
  width: 70vw;
  margin: 0 auto;
}
.table th {
  font-weight: 700;
}

.table th,
.table td {
  text-align: center;
}

.dialog {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 999;
  background-color: rgba(0, 0, 0, 0.3);
  transition: 0.5s;
  width: 100vw;
  height: 100vh;

  display: flex;
  justify-content: center;
  align-items: center;
}

.dialog-btns {
  width: 15vw;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  margin: 2vh auto 0 auto;
}
</style>
