<template>
  <div class="form-btns">
    <div class="btn">
      <n-button round @click="updateData">刷新</n-button>
    </div>
    <div class="btn">
      <!-- <n-button v-for="(item, index) in typeGroup" :key="index">
          {{ item.categoryName }}
        </n-button> -->
      <n-button><b>订单列表</b></n-button>
    </div>
    <div class="btn"></div>
  </div>
  <div class="list">
    <n-data-table :columns="columns" :data="data" :pagination="pagination" />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, reactive, h } from "vue";
import { NButton, NDataTable, NTag } from "naive-ui";
import type { DataTableColumns, DataTableRowKey } from "naive-ui";
import axios from "axios";
import route from "@/router";

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
};

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
    width: 250,
  },
  {
    title: "状态",
    align: "center",
    width: 100,
    key: "status",
    filter(value, row) {
      return !!~String(row.status).indexOf(value.toString());
    },
    defaultFilterOptionValues: [0, 1, 2, 3],
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
        { onClick: () => viewDetail(row) },
        { default: () => "查看" }
      );
    },
  },
];

const viewDetail = function (row: RowData) {
  route.push({ name: "detail", query: row });
};

const checkedRowKeysRef = ref<DataTableRowKey[]>([]);

const data: RowData[] = reactive([]);

const updateData = function () {
  while (data.length) {
    data.splice(0, 1);
  }
  axios({
    url: "/v2/mp/manager/order",
  }).then((res) => {
    res.data.forEach((element: any) => {
      element.orderDetailInfoGroup.forEach((i: any) => {
        i.contact = element.contact;
        i.orderTotalPrice = element.orderTotalPrice;
        i.favourablePrice = element.favourablePrice;
      });
      data.push(...element.orderDetailInfoGroup);
    });
  });
};

export default defineComponent({
  setup() {
    updateData();

    return {
      data,
      columns: createColumns(),
      checkedRowKeys: checkedRowKeysRef,
      pagination: {
        pageSize: 6,
      },
      updateData,
    };
  },
  components: {
    NDataTable,
    NButton,
  },
});
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
.form-btns .btn {
  width: 23vw;
}
.list {
  width: 75vw;
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
</style>
