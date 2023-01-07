<template>  <div class="table">
    <header class="headerFav">
      <n-button>刷新</n-button>

      <n-button type="primary" @click="() => (isShowAddModal = true)"
        >批量新增</n-button
      >
      <n-modal
        v-model:show="isShowAddModal"
        class="custom-card"
        preset="card"
        title="批量创建优惠码"
        size="huge"
        style="min-width: 640px; width: 70vw"
      >
        <n-form label-placement="left">
          <n-form-item label="优惠价格">
            <n-input-number
              v-model:value="editData.offPrice"
              :min="1"
              :max="99"
              :step="5"
            >
              <template #prefix> ￡ </template>
            </n-input-number></n-form-item
          >
          <n-form-item label="失效时间">
            <n-date-picker
              type="datetime"
              format="本年MM月dd日 : HH时"
              v-model:value="editData.endTime"
          /></n-form-item>
          <n-form-item label="生成数量">
            <n-input-number v-model:value="editData.genNum" :min="1"
          /></n-form-item>
          <n-form-item label="优惠简介">
            <n-input v-model:value="editData.commet"
          /></n-form-item>
        </n-form>

        <div class="btn-flex">
          <n-button type="primary" @click="() => (isShowAddModal = true)"
            >上传</n-button
          >
        </div>
      </n-modal>
    </header>

    <n-data-table
      :bordered="false"
      :columns="createcolumusFrame()"
      :data="tableData"
      :pagination="{ pageSize: 10 }"
    />
  </div>
</template>
<script setup lang="ts">
import {
  NButton,
  NCard,
  NDataTable,
  NModal,
  NPopover,
  NInput,
  NInputNumber,
  NForm,
  NFormItem,
  NDatePicker,
} from "naive-ui";
import { h, reactive, ref } from "vue";
import type { DataTableColumns } from "naive-ui";
type RowData = {
  id: symbol;
  commet: string;
  stage: [string, string]; //时间
  price: number;
  status: string;
};
const isShowAddModal = ref(false);
const editData = createEditData();
function createEditData() {
  return reactive({
    offPrice: 10,
    endTime: Date.now(),
    genNum: 1,
    commet: "节日特惠",
  });
}
function addMutiple() {
  void 1;
}

const tableData = getTableData();
function getTableData(): RowData[] {
  return [
    { commet: "act", status: "ok", id: Symbol(), stage: ["o", "p"], price: 66 },
  ];
}
function createcolumusFrame(): DataTableColumns<RowData> {
  const isShowModify = ref(false);
  return [
    {
      title: "有效时间",
      key: "stage",
    },
    {
      title: "优惠价格",
      key: "price",
    },
    {
      title: "目前状态",
      key: "status",
    },

    {
      title: "备注",
      key: "commet",
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
            () => "查看",
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
                return h("span", null, "只能删除已过期的记录");
              },
            },
          ),
        ];
      },
    },
  ];
}
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
</style>
