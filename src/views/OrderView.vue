<template>
  <div class="form-btns">
    <div class="btn">
      <n-button
        @click="() => orderTableProcess.getOrderDataProcess()"
        :loading="orderTableProcess.stat.tableIsLoading.value"
        >刷新</n-button
      >
    </div>
    <div class="btn">
      <n-button @click="() => historyDrawerProcess.onShowDrawer()"
        >历史记录</n-button
      >
    </div>
    <div class="btn">
      <n-input
        placeholder="搜索购买来源"
        @input="(e) => orderTableProcess.onSearchInput(e)"
      />
    </div>
  </div>
  <div class="list">
    <n-data-table
      :columns="columns"
      :data="orderTableProcess.viewData.value"
      :pagination="{
        pageSize: 6,
      }"
    />
  </div>
  <!-- 历史记录 -->
  <n-drawer
    v-model:show="historyDrawerProcess.stat.isShow.value"
    width="50%"
    placement="right"
  >
    <n-drawer-content title="历史记录">
      <n-button @click="() => historyDrawerProcess.onDeleteHistory()"
        >清空</n-button
      >
      <n-table :bordered="false" :single-line="false">
        <thead>
          <tr>
            <th>操作时间</th>
            <th>订单号</th>
            <th>商品名</th>
            <th>购买来源</th>
          </tr>
        </thead>
        <tbody>
          <TransitionGroup name="list">
            <tr v-for="e in HistoryRecordProcess.history" :key="e.t">
              <td>{{ new Date(Number(e.t)).toLocaleString() }}</td>
              <td>{{ e.r.orderDetailId }}</td>
              <td>{{ e.r.commodityName }}</td>
              <td>{{ e.r.contact }}</td>
            </tr>
          </TransitionGroup>
        </tbody>
      </n-table>
    </n-drawer-content>
  </n-drawer>
</template>

<script lang="ts" setup>
import { ref, reactive, h, Ref, computed, ComputedRef, onMounted } from "vue";
import {
  NButton,
  NDataTable,
  NTag,
  NInput,
  NDrawer,
  NDrawerContent,
  NTable,
} from "naive-ui";
import type { DataTableColumns } from "naive-ui";
import axios from "axios";
import route from "@/router";
type HistoryRecord = { t: string; r: RowData };
type RowData = {
  key: number;
  orderDetailId: number;
  orderId: number;
  status: number; //0-未支付 1-已支付待填表 2-已填表
  commodityId: number;
  boughtQuantity: number;
  invPrice: number;
  remark: string;
  commodityName: string;
  contact: string;
  createTime: string;
};
class HistoryDrawerStatus {
  isShow: Ref<boolean>;
  constructor() {
    this.isShow = ref(false);
  }
}
class HistoryRecordProcess {
  stat: HistoryDrawerStatus;
  static history: HistoryRecord[] = reactive([]);
  constructor() {
    this.stat = new HistoryDrawerStatus();
    onMounted(() => {
      HistoryRecordProcess.history.push(...HistoryRecordProcess.get());
    });
  }
  onShowDrawer() {
    this.stat.isShow.value = true;
  }
  onDeleteHistory() {
    HistoryRecordProcess.history.splice(0, HistoryRecordProcess.history.length);
    HistoryRecordProcess.save();
  }
  //历史记录数据形式: 'orderViewHistory':
  //{key记录时的时间戳,value:RowData}[]
  static set(value: RowData) {
    HistoryRecordProcess.history.push({ t: Date.now().toString(), r: value });
  }
  static get(): HistoryRecord[] {
    const res = localStorage.getItem("orderViewHistory");
    if (!res) return [];
    return JSON.parse(res);
  }
  static save() {
    localStorage.setItem(
      "orderViewHistory",
      JSON.stringify(HistoryRecordProcess.history),
    );
  }
}

const createColumns = (): DataTableColumns<RowData> => [
  {
    title: "订单号",
    align: "center",
    width: 100,
    key: "orderDetailId",
    sorter: "default",
  },
  {
    title: "商品名",
    align: "center",
    width: 180,
    key: "commodityName",
  },
  {
    title: "购买来源",
    align: "center",
    key: "contact",
    width: 100,
    render: (row) => h("div", null, row.contact.split(",")[0]),
  },
  {
    title: "购买时间",
    align: "center",
    key: "createTime",
    width: 120,
    render: (row) =>
      h("div", null, row.createTime.slice(5, -8).replace("T", " ")),
  },
  {
    title: "状态",
    align: "center",
    width: 100,
    key: "status",
    filter(value, row) {
      return !!~String(row.status).indexOf(value.toString());
    },
    defaultFilterOptionValues: [0, 1, 2, 3, 4, 5],
    filterOptions: [
      {
        label: "未支付",
        value: 0,
      },
      {
        label: "待填表",
        value: 1,
      },
      {
        label: "已填表",
        value: 2,
      },
      {
        label: "已审核",
        value: 3,
      },
      {
        label: "已刷位",
        value: 4,
      },
      {
        label: "已完成",
        value: 5,
      },
      {
        label: "已废弃",
        value: 9,
      },
    ],
    render(row) {
      switch (row.status) {
        case 0:
          return h(NTag, { type: "error" }, { default: () => "未支付" });
        case 1:
          return h(NTag, { type: "warning" }, { default: () => "待填表" });
        case 2:
          return h(NTag, { type: "success" }, { default: () => "已填表" });
        case 3:
          return h(NTag, { type: "info" }, { default: () => "已审核" });
        case 4:
          return h(NTag, { type: "info" }, { default: () => "已刷位" });
        case 5:
          return h(NTag, { type: "success" }, { default: () => "已完成" });
        case 9:
          return h(NTag, { type: "error" }, { default: () => "已废弃" });
      }
    },
  },
  {
    title: "操作",
    align: "center",
    width: 100,
    key: "actions",
    render(row) {
      return h(
        NButton,
        {
          class: HistoryRecordProcess.history.find(
            (e) => e.r.orderDetailId === row.orderDetailId,
          )
            ? "looked"
            : "",
          onClick: () => orderTableProcess.onViewDetail(row),
        },
        { default: () => "查看" },
      );
    },
  },
];

class OrderDataStatus {
  tableIsLoading: Ref<boolean>;
  filerCondition: Ref<string>; //搜索的条件
  constructor() {
    this.tableIsLoading = ref(true);
    this.filerCondition = ref("");
  }
}

class OrderTableProcess {
  stat: OrderDataStatus;
  rowData: RowData[];
  viewData: ComputedRef<RowData[]>;
  constructor() {
    this.stat = new OrderDataStatus();
    this.rowData = reactive([]);
    this.viewData = computed(() => {
      if (this.stat.filerCondition.value === "") return this.rowData;
      return this.rowData.filter(
        (e) => e.contact.indexOf(this.stat.filerCondition.value) !== -1,
      );
    });
    this.getOrderDataProcess();
  }
  async getOrderDataProcess() {
    this.stat.tableIsLoading.value = true;
    //清空data
    this.rowData.splice(0, this.rowData.length);
    await axios({
      url: "/v2/mp/manager/order",
    }).then((res) => {
      res.data.reverse();
      res.data.forEach((element: any) => {
        element.orderDetailInfoGroup.forEach((i: any) => {
          i.contact = element.contact;
          i.orderTotalPrice = element.orderTotalPrice;
          i.favourablePrice = element.favourablePrice;
        });
        this.rowData.push(...element.orderDetailInfoGroup);
      });
    });
    this.stat.tableIsLoading.value = false;
  }
  onSearchInput(e: string) {
    this.stat.filerCondition.value = e;
  }
  async onViewDetail(row: RowData) {
    await route.push({
      name: "detail",
      query: { orderId: row.orderId, orderDetailId: row.orderDetailId },
    });
    //加入跳转队列后才记录历史
    HistoryRecordProcess.set(row);
    HistoryRecordProcess.save();
  }
}

const columns = createColumns();
const orderTableProcess = new OrderTableProcess();
const historyDrawerProcess = new HistoryRecordProcess();
</script>

<style>
.form-btns {
  height: 8vh;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 70vw;
  margin: 0 auto;
}

.list {
  width: 70vw;
  margin: 0 auto;
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
  margin: 0 auto;
}
.looked {
  background-color: rgb(246, 236, 224);
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
