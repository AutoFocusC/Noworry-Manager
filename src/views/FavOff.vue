<template>
  <div class="table">
    <header class="headerFav">
      <n-button
        @click="() => tableProcess.updateData()"
        :loading="tableProcess.status.isLoading.value"
        >刷新</n-button
      >

      <n-button
        type="primary"
        @click="() => (genFavProcess.stat.isShowModal.value = true)"
        >生成优惠券</n-button
      >
      <n-modal
        v-model:show="genFavProcess.stat.isShowModal.value"
        class="custom-card"
        preset="card"
        title="批量创建优惠券"
        size="huge"
        style="min-width: 640px; width: 70vw; min-height: 300px"
      >
        <n-form class="form" label-placement="left">
          <n-form-item class="form-item" label="优惠价格">
            <n-input-number
              v-model:value="genFavProcess.form.offPrice"
              placeholder="额，加号其实更方便些"
              :step="5"
              :min="FavCodeFormData.minOffPrice"
              :max="FavCodeFormData.maxOffPrice"
            >
              <template #prefix> ￡ </template>
            </n-input-number></n-form-item
          >
          <n-form-item class="form-item" label="失效时间">
            <n-date-picker
              type="datetime"
              format="MM-dd HH:00"
              v-model:value="genFavProcess.form.endTime"
              :is-date-disabled="genFavProcess.onFromDateChange"
          /></n-form-item>
          <n-form-item class="form-item" label="生成数量">
            <n-input-number
              placeholder="建议不要太多"
              v-model:value="genFavProcess.form.genNum"
              :min="FavCodeFormData.minGenNum"
              :max="FavCodeFormData.maxGenNum"
          /></n-form-item>
          <n-form-item class="form-item" label="优惠简介">
            <n-input
              placeholder="真的不要写点什么吗"
              v-model:value="genFavProcess.form.comment"
          /></n-form-item>
        </n-form>

        <div class="btn-flex">
          <n-popover trigger="hover" placement="bottom">
            <template #trigger>
              <n-button
                type="primary"
                :loading="genFavProcess.stat.isLoading.value"
                @click="() => genFavProcess.genFavCodes()"
                :disabled="!genFavProcess.stat.canUpload.value"
                >生成</n-button
              >
            </template>
            <span>确定很容易，撤回则不然</span>
          </n-popover>
          <n-button @click="() => genFavProcess.resetForm()">
            重置表单
          </n-button>
        </div>
        <div class="btn-flex">
          <n-card title="生成结果">
            <n-spin :show="genFavProcess.stat.isLoading.value">
              <n-table :single-line="false">
                <tbody>
                  <TransitionGroup name="list">
                    <tr
                      v-for="(favRow, i) in genFavProcess.stat.codeList"
                      :key="i"
                    >
                      <TransitionGroup name="list">
                        <td
                          v-for="(favCode, j) in favRow"
                          :key="j"
                          class="genFavTd"
                          @click="() => genFavProcess.onFavCodeTdClick(favCode)"
                        >
                          <b>{{ favCode }}</b>
                        </td>
                      </TransitionGroup>
                    </tr>
                  </TransitionGroup>
                </tbody>
              </n-table></n-spin
            >
          </n-card>
        </div>
      </n-modal>
    </header>
    <n-spin :show="tableProcess.status.isLoading.value">
      <n-data-table
        :bordered="false"
        :columns="createcolumusFrame()"
        :data="tableProcess.tableData"
        :pagination="{ pageSize: 6 }"
      />
    </n-spin>
  </div>
</template>
<script setup lang="ts">
import {
  NButton,
  NCard,
  NTable,
  NDataTable,
  NModal,
  NPopover,
  NInput,
  NInputNumber,
  NForm,
  NSpin,
  NFormItem,
  NDatePicker,
  createDiscreteApi,
} from "naive-ui";
import { h, reactive, Ref, ref, UnwrapRef } from "vue";
import type { DataTableColumns } from "naive-ui";
import axios from "axios";

class FavCodeFormStatus {
  codeList: FavCode[][];
  isLoading: Ref<boolean>;
  isShowModal: Ref<boolean>;
  canUpload: Ref<boolean>;
  constructor(
    codeList = [],
    isLoading = false,
    isShowModal = false,
    canUpload = true,
  ) {
    this.codeList = codeList;
    this.isLoading = ref(isLoading);
    this.isShowModal = ref(isShowModal);
    this.canUpload = ref(canUpload);
  }
}
class FavCodeTableStatus {
  isLoading: Ref<boolean>;
  constructor() {
    this.isLoading = ref(true);
  }
}
class FavCodeFormData {
  genNum: number;
  endTime: number;
  offPrice: number;
  comment: string;
  static maxGenNum = 40;
  static maxOffPrice = 99;
  static minGenNum = 1;
  static minOffPrice = 1;
  constructor(
    genNum: number,
    endTime: number,
    offPrice: number,
    comment: string,
  ) {
    this.genNum = genNum;
    this.endTime = endTime;
    this.offPrice = offPrice;
    this.comment = comment;
  }
}
class GenFavCodeProcess {
  stat: FavCodeFormStatus;
  form: UnwrapRef<FavCodeFormData>;
  constructor(
    stat: FavCodeFormStatus = new FavCodeFormStatus(),
    form = new FavCodeFormData(
      1,
      new Date().setDate(new Date().getDate() + 2),
      10,
      "节日特惠",
    ),
  ) {
    this.stat = stat;
    this.form = reactive(form);
  }
  async onFavCodeTdClick(mes: string) {
    if (navigator.clipboard == void 0) return;
    const { message } = createDiscreteApi(["message"]);
    try {
      await navigator.clipboard.writeText(mes);
      message.success("优惠码已复制到粘贴板");
    } catch (e) {
      return;
    }
  }
  async getFavCode() {
    const { data } = await axios.get<string>("v2/mp/manager/fav");
    console.log(JSON.parse(data));
  }
  async genFavCodes() {
    this.stat.isLoading.value = true;
    const res = await axios.post<FavCode[]>("v2/mp/manager/fav", {
      ...this.form,
      endTime: formatTime(this.form.endTime),
    });
    //得到的数据是一维数组，要转换成二维的列表以便渲染
    this.stat.codeList = spiltArray(res.data);
    this.stat.isLoading.value = false;
    return;
    function spiltArray(arr: string[], spiltNum = 5): string[][] {
      //该函数将一维数组转化为二维数组以便渲染
      const result = [];
      const _len = arr.length;
      //如果length/spiltNum为小数,也不用向上取整
      for (let i = 0; i < _len / spiltNum; ++i)
        result.push(arr.splice(0, spiltNum));
      return result;
    }
    function formatTime(t: number) {
      const d = new Date(t);
      const m =
        d.getMonth() > 8 ? String(d.getMonth() + 1) : "0" + (d.getMonth() + 1);
      const dt = d.getDate() > 9 ? String(d.getDate()) : "0" + d.getDate();
      const h = d.getHours() > 9 ? String(d.getHours()) : "0" + d.getHours();

      return m + dt + h;
    }
  }
  resetForm() {
    this.form.comment = "节日特惠";
    this.form.endTime = new Date().setDate(new Date().getDate() + 2);
    this.form.genNum = 1;
    this.form.offPrice = 10;
  }
  onFromDateChange(t: number) {
    //禁止选择今天之前的时间
    return t < new Date().setDate(new Date().getDate() - 1);
  }
}
class GetFavCodeProcess {
  tableData: RowData[];
  status: FavCodeTableStatus;
  constructor() {
    this.tableData = reactive([]);
    this.status = new FavCodeTableStatus();
    this.getFavCodes().then((res) => this.tableData.splice(0, 0, ...res));
  }
  private async getFavCodes() {
    this.status.isLoading.value = true;
    const { data } = await axios.get<RowData[]>("v2/mp/manager/fav");
    data.map((e) => {
      e.orderidList = e.orderidList || "未被使用";
      e.validityTime = new Intl.DateTimeFormat("cn", {
        year: "numeric",
        month: "numeric",
        day: "numeric",
        hour: "numeric",
      }).format(new Date(e.validityTime));
    });
    this.status.isLoading.value = false;
    return data;
  }

  async updateData() {
    const result = await this.getFavCodes();
    this.tableData.splice(0, this.tableData.length);
    this.tableData.push(...result);
  }
}
const tableProcess = new GetFavCodeProcess();

const genFavProcess = new GenFavCodeProcess();

function createcolumusFrame(): DataTableColumns<RowData> {
  const isShowModify = ref(false);
  return [
    {
      title: "过期时间",
      key: "validityTime",
    },
    {
      title: "优惠价格",
      key: "value",
    },
    {
      title: "使用轨迹",
      key: "orderidList",
    },

    {
      title: "优惠码",
      key: "favcode",
    },
    {
      title: "操作",
      key: "action",
      render() {
        return [
          h(
            NButton,
            {
              onClick() {
                isShowModify.value = true;
              },
            },
            () => "详情",
          ),
          h(
            NModal,
            {
              style: "min-width: 640px;width:70vw",
              show: isShowModify.value,
              onMaskClick() {
                isShowModify.value = false;
              },
            },
            () => h(NCard, null, () => "hi"),
          ),
          h(
            NPopover,
            {
              trigger: "hover",
            },

            {
              trigger() {
                return h(
                  NButton,
                  {
                    tag: "div",
                    disabled: true,
                  },
                  () => "删除",
                );
              },
              default() {
                return h("span", null, "只能删除*已过期*的记录");
              },
            },
          ),
        ];
      },
    },
  ];
}

type FavCode = string;
type RowData = {
  favcode: string; //同时充当ID
  offPrice: number;
  validityTime: string;
  createtime: string;
  createby: string;
  comment: string;
  orderidList: null | string;
};
</script>

<style scoped>
.table {
  min-width: 640px;
  width: 70vw;
  margin: auto;
}
.headerFav {
  display: flex;
  justify-content: space-between;
  margin-bottom: 1em;
}
.genFavTd:hover {
  background-color: rgba(46, 51, 56, 0.05);
  cursor: pointer;
}

.form {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
}
.form-item {
  width: 40%;
  margin: 0 4%;
}

.btn-flex {
  display: flex;
  justify-content: space-evenly;
  margin: 1% 0;
}

.list-move, /* 对移动中的元素应用的过渡 */
.list-enter-active,
.list-leave-active {
  transition: all 0.5s ease;
}

.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateX(30px);
}
.list-leave-active {
  position: absolute;
}
</style>
