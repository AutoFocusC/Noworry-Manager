<template>
  <div class="form-btns">
    <div class="btn">
      <n-button round @click="updateData()">刷新</n-button>
    </div>
    <div class="btn">
      <!-- <n-button v-for="(item, index) in typeGroup" :key="index">
        {{ item.categoryName }}
      </n-button> -->
      <n-button><b>商品列表</b></n-button>
    </div>
    <div class="btn">
      <n-button type="primary" @click="edit()">新增</n-button>
    </div>
  </div>
  <div class="list">
    <n-data-table :columns="columns" :data="data" :pagination="pagination" />
  </div>

  <div class="dialog" v-if="dialog">
    <n-card
      style="width: 600px"
      title="商品详情"
      :bordered="false"
      size="huge"
      role="dialog"
      aria-modal="true"
    >
      <n-form
        ref="formRef"
        :model="editing"
        label-placement="left"
        label-width="auto"
        require-mark-placement="right-hanging"
        :style="{
          maxWidth: '640px',
        }"
      >
        <n-form-item label="商品名称" path="inputValue">
          <n-input
            v-model:value="editing.commodityName"
            placeholder="如 法国签证刷签"
          />
        </n-form-item>
        <n-form-item label="商品价格" path="inputValue">
          <n-input
            v-model:value="editing.currentPrice"
            placeholder="请输入英镑价格"
          />
        </n-form-item>

        <n-form-item label="商品类型">
          <n-radio-group v-model:value="editing.commodityType">
            <n-space>
              <n-radio :value="11">申根</n-radio>
              <n-radio :value="12">北欧</n-radio>
              <n-radio :value="13">美签</n-radio>
              <n-radio :value="14">亚洲</n-radio>
            </n-space>
          </n-radio-group>
        </n-form-item>

        <n-form-item label="商品简介" path="inputValue">
          <n-input
            v-model:value="editing.commodityBrief"
            placeholder="请输入商品简介"
          />
        </n-form-item>
      </n-form>
      <div class="dialog-btns">
        <div class="btn" @click="hideDialog()">
          <n-button round>取消</n-button>
        </div>
        <div class="btn">
          <n-button round type="primary" @click="submit()">保存</n-button>
        </div>
      </div>
    </n-card>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, reactive, h } from "vue";
import {
  NButton,
  NDataTable,
  NCard,
  NForm,
  NFormItem,
  NInput,
  NRadioGroup,
  NRadio,
} from "naive-ui";
import type { DataTableColumns, DataTableRowKey } from "naive-ui";
import axios from "axios";

type RowData = {
  key: number;
  commodityId: number;
  commodityName: string;
  commodityType: string;
  brief: string;
};

const createColumns = (): DataTableColumns<RowData> => [
  {
    title: "商品名称",
    align: "center",
    width: 350,
    key: "commodityName",
  },
  {
    title: "商品类别",
    align: "center",
    width: 150,
    key: "commodityType",
    sorter: "default",
    render(row) {
      return h("div", null, {
        default: () => {
          switch (Number(row.commodityType)) {
            case 11:
              return "申根";
            case 12:
              return "北欧";
            case 13:
              return "美签";
            case 14:
              return "亚洲";
          }
        },
      });
    },
  },
  {
    title: "简介",
    align: "center",
    key: "commodityBrief",
  },
  {
    title: "操作",
    align: "center",
    width: 100,
    key: "actions",
    render(row) {
      return h(
        "div",
        {
          style: "display:flex",
        },
        {
          default: () => [
            h(NButton, { onClick: () => edit(row) }, { default: () => "编辑" }),
            h(
              NButton,
              { onClick: () => deleteData(row.commodityId), type: "error" },
              { default: () => "删除" }
            ),
          ],
        }
      );
    },
  },
];

//编辑或新增商品
const dialog = ref(false);
const editing = reactive({
  commodityId: null,
  commodityName: "",
  commodityType: 11,
  currentPrice: "",
  commodityBrief: "",
  initialQuantity: null,
  originPrice: null,
  remainQuantity: 20,
  commodityStatus: 0,
});

const edit = function (row?: RowData) {
  dialog.value = !dialog.value;
  console.log(row);
  if (row) {
    const keys = Object.keys(row);
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //@ts-ignore
    keys.forEach((key) => (editing[key] = row[key]));
  } else {
    editing.commodityId = null;
    editing.commodityName = "";
    editing.commodityType = 11;
    editing.currentPrice = "";
    editing.commodityBrief = "";
    editing.initialQuantity = null;
    editing.originPrice = null;
    editing.remainQuantity = 20;
  }
};

const deleteData = function (commodityId: number) {
  const result = confirm("确定删除?");
  if (result) {
    axios({
      url: `/v1/mp/visa/detail/detele/${commodityId}`,
      method: "POST",
    })
      .then(() => {
        alert("删除成功");
        updateData();
      })
      .catch(() => {
        alert("删除失败");
      });
  }
};

const submit = function () {
  if (editing.commodityId) {
    axios({
      url: `/v1/mp/visa/detail/${editing.commodityId}`,
      method: "POST",
      data: editing,
    })
      .then(() => {
        alert("修改成功");
        hideDialog();
        updateData();
      })
      .catch(() => {
        alert("修改失败");
      });
  } else {
    axios({
      url: `/v1/mp/visa/detail`,
      method: "POST",
      data: editing,
    })
      .then(() => {
        alert("修改成功");
        hideDialog();
      })
      .catch(() => {
        alert("修改失败");
      });
  }
};

const hideDialog = () => {
  dialog.value = false;
};

const checkedRowKeysRef = ref<DataTableRowKey[]>([]);

const data: RowData[] = reactive([]);

const typeGroup: unknown[] = reactive([]);

const updateData = function () {
  axios({
    url: "/v1/mp/visa/group",
  }).then((res) => {
    typeGroup.push(...res.data);
    res.data.forEach((element: { categoryId: number }) => {
      axios({
        url: `/v1/mp/visa/group/${element.categoryId}`,
      }).then((res) => {
        data.push(...res.data);
      });
    });
  });
};

export default defineComponent({
  setup() {
    updateData();

    return {
      data,
      typeGroup,
      columns: createColumns(),
      checkedRowKeys: checkedRowKeysRef,
      pagination: {
        pageSize: 6,
      },
      edit,
      editing,
      dialog,
      submit,
      updateData,
      hideDialog,
    };
  },
  components: {
    NDataTable,
    NButton,
    NCard,
    NForm,
    NFormItem,
    NInput,
    NRadioGroup,
    NRadio,
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
