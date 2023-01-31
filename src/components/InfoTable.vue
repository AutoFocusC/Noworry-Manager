<template>
  <div class="table" v-if="Number(data.status) >= 2">
    <!-- 美签 -->
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
            {{ form.sex == "0" ? "男" : "女" }}
          </td>
          <td>
            {{
              form.marriedStatus == "0"
                ? "未婚"
                : form.marriedStatus == "1"
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

    <n-table
      v-else-if="Number(data.commodityType) != 14"
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
            {{ form.sex == "0" ? "男" : "女" }}
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

    <!-- 美签 -->

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
            {{ form.sex == "0" ? "男" : "女" }}
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
</template>

<script setup lang="ts">
import { defineComponent, defineProps, ref, reactive } from "vue";
import { createDiscreteApi, NTable } from "naive-ui";
defineProps(["data", "form"]);

setTimeout(() => {
  const tdlist = document.getElementsByTagName("td");
  for (let i = 0; i < tdlist.length; i++) {
    tdlist[i].addEventListener("click", () =>
      onFavCodeTdClick(tdlist[i].innerText)
    );
  }
}, 2000);

const onFavCodeTdClick = async (mes: string) => {
  if (navigator.clipboard == void 0) return;
  const { message } = createDiscreteApi(["message"]);
  try {
    await navigator.clipboard.writeText(mes);
    message.success("数据已复制到粘贴板", { duration: 750 });
  } catch (e) {
    return;
  }
};
</script>

<style>
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
  cursor: pointer;
}
</style>
