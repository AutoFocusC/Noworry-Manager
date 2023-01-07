<template>
  <div class="table">
    <header class="headerFav">
      <n-button>刷新</n-button>

      <n-button type="primary" @click="() => (isShowAddModal = true)"
        >生成优惠券</n-button
      >
      <n-modal
        v-model:show="isShowAddModal"
        class="custom-card"
        preset="card"
        title="批量创建优惠券"
        size="huge"
        style="min-width: 640px; width: 70vw; min-height: 300px"
      >
        <n-form class="form" label-placement="left">
          <n-form-item class="form-item" label="优惠价格">
            <n-input-number
              v-model:value="editData.offPrice"
              placeholder="额，加号其实更方便些"
              :min="1"
              :max="99"
              :step="5"
            >
              <template #prefix> ￡ </template>
            </n-input-number></n-form-item
          >
          <n-form-item class="form-item" label="失效时间">
            <n-date-picker
              type="datetime"
              format="MM-dd HH:00"
              v-model:value="editData.endTime"
          /></n-form-item>
          <n-form-item class="form-item" label="生成数量">
            <n-input-number
              placeholder="建议不要太多"
              v-model:value="editData.genNum"
              :min="1"
              :max="40"
          /></n-form-item>
          <n-form-item class="form-item" label="优惠简介">
            <n-input
              placeholder="真的不要写点什么吗"
              v-model:value="editData.commet"
          /></n-form-item>
        </n-form>

        <div class="btn-flex">
          <n-popover trigger="hover" placement="bottom">
            <template #trigger>
              <n-button type="primary" @click="() => (isShowAddModal = true)"
                >生成</n-button
              >
            </template>
            <span>确定很容易，撤回则不然</span>
          </n-popover>
        </div>
        <div class="btn-flex">
          <n-table>
            <tbody>
              <tr v-for="(_, id) in Math.ceil(newFavs.length / 5)" :key="id">
                <td style="text-align:center" v-for="(_, index) in 5" :key="index">
                  <b>{{ newFavs[index + id * 5] || "" }}</b>
                </td>
              </tr>
            </tbody>
          </n-table>
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
  NTable,
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
            () => "查看"
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
            () => h(NCard, null, () => "hi")
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
                  () => "删除"
                );
              },
              default() {
                return h("span", null, "只能删除已过期的记录");
              },
            }
          ),
        ];
      },
    },
  ];
}

const newFavs = reactive([
  "ASWSASWD",
  "ASWSASWD",
  "ASWSASWD",
  "ASWSASWD",
  "ASWSASWD",
  "ASWSASWD",
  "ASWSASWD",
  "ASWSASWD",
  "ASWSASWD",
  "ASWSASWD",
  "ASWSASWD",
  "ASWSASWD",
  "ASWSASWD",
  "ASWSASWD",
]);
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
  width: 100%;
  display: flex;
  justify-content: center;
  margin: 1% 0;
}
</style>
