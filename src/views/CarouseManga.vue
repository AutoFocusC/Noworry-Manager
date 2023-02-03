<template>
  <div class="let-middle">
    <header class="control-width">
      <n-carousel autoplay>
        <n-dropdown
          draggable
          trigger="hover"
          :options="options"
          @select="
            (method) => modifyCoverProcess.onModifyCoverSelect(method, 0)
          "
        >
          <img class="carousel-img" :src="coverList[0]"
        /></n-dropdown>
        <n-dropdown
          trigger="hover"
          :options="options"
          @select="
            (method) => modifyCoverProcess.onModifyCoverSelect(method, 1)
          "
        >
          <img class="carousel-img" :src="coverList[1]"
        /></n-dropdown>
        <n-dropdown
          trigger="hover"
          :options="options"
          @select="
            (method) => modifyCoverProcess.onModifyCoverSelect(method, 2)
          "
        >
          <img class="carousel-img" :src="coverList[2]"
        /></n-dropdown>
        <n-dropdown
          trigger="hover"
          :options="options"
          @select="
            (method) => modifyCoverProcess.onModifyCoverSelect(method, 3)
          "
        >
          <img class="carousel-img" :src="coverList[3]"
        /></n-dropdown>
      </n-carousel>
      <n-modal
        v-model:show="modifyCoverProcess.stat.isShowDetailModal.value"
        class="custom-card"
        preset="card"
        title="查看详情页"
        size="huge"
        style="min-width: 640px; width: 70vw; min-height: 300px"
      >
        <img
          class="carousel-img"
          :src="detailList[modifyCoverProcess.stat.modifyingImgIndex.value]"
        />
        <n-upload
          :keep-file-after-finish="true"
          :max="1"
          list-type="image"
          :on-remove="(op) => modifyCoverProcess.onFileRemove(op)"
          :custom-request="(op) => modifyCoverProcess.onContentUpload(op)"
        >
          <n-button>上传图片</n-button>
        </n-upload>
        <n-button
          type="primary"
          @click="
            () =>
              modifyCoverProcess.onConfirmClick(
                modifyCoverProcess.stat.contentFile,
              )
          "
          >确认修改详情图</n-button
        >
      </n-modal>
      <n-modal
        v-model:show="modifyCoverProcess.stat.isShowModifyModal.value"
        class="custom-card"
        preset="card"
        title="修改封面图片"
        size="huge"
        style="min-width: 640px; width: 70vw; min-height: 300px"
      >
        <n-form label-placement="left">
          <n-form-item label="待更改图片">
            <img
              height="200"
              :src="coverList[modifyCoverProcess.stat.modifyingImgIndex.value]"
          /></n-form-item>
          <n-form-item label="上传新图片">
            <n-upload
              :keep-file-after-finish="true"
              :max="1"
              list-type="image"
              :on-remove="(op) => modifyCoverProcess.onFileRemove(op)"
              :custom-request="(op) => modifyCoverProcess.onCoverUpload(op)"
            >
              <n-button>上传图片</n-button>
            </n-upload>
          </n-form-item>
          <n-button
            type="primary"
            @click="
              () =>
                modifyCoverProcess.onConfirmClick(
                  modifyCoverProcess.stat.coverFile,
                )
            "
            >确认</n-button
          >
        </n-form>
      </n-modal>
    </header>
    <n-p>
      <n-text type="primary"> tips：鼠标悬在图片上才会弹出更改选项 </n-text>
    </n-p>
  </div>
</template>
<script setup lang="ts">
import axios, { AxiosResponse } from "axios";
import {
  NCarousel,
  createDiscreteApi,
  NModal,
  UploadCustomRequestOptions,
  NDropdown,
  NForm,
  NUpload,
  NFormItem,
  NButton,
  NP,
  NText,
} from "naive-ui";
import { FileInfo } from "naive-ui/es/upload/src/interface";
import { ref, Ref } from "vue";
type TSELECT_DEATIL = 0;
type TSELECT_MODIFY = 1;

const coverList = [
  "http://122.9.107.17/static/home/17b1.jpg",
  "http://122.9.107.17/static/home/17b2.jpg",
  "http://122.9.107.17/static/home/17b3.jpg",
  "http://122.9.107.17/static/home/17b4.jpg",
] as const;
const detailList = [
  "http://122.9.107.17/static/home/poster1.jpg",
  "http://122.9.107.17/static/home/poster2.jpg",
  "http://122.9.107.17/static/home/poster3.jpg",
  "http://122.9.107.17/static/home/poster4.png",
] as const;
const SELECT_DEATIL: TSELECT_DEATIL = 0;
const SELECT_MODIFY: TSELECT_MODIFY = 1;
const options = [
  { label: "进入详情", key: SELECT_DEATIL },
  { label: "修改此图", key: SELECT_MODIFY },
];

class CoverStatus {
  isShowModifyModal: Ref<boolean>;
  isShowDetailModal: Ref<boolean>;
  modifyingImgIndex: Ref<number>;
  coverFile: File | null;
  contentFile: File | null;
  constructor() {
    this.isShowModifyModal = ref(false);
    this.modifyingImgIndex = ref(0);
    this.isShowDetailModal = ref(false);
    this.coverFile = null;
    this.contentFile = null;
  }
}
class ModifyCoverProcess {
  stat: CoverStatus;
  constructor() {
    this.stat = new CoverStatus();
  }
  onModifyCoverSelect(method: TSELECT_DEATIL | TSELECT_MODIFY, index: number) {
    //method是用户下拉框中选择的类型,index是图片的序号
    this.stat.modifyingImgIndex.value = index;
    if (method === SELECT_DEATIL) {
      this.stat.isShowDetailModal.value = true;
    }
    if (method === SELECT_MODIFY) {
      this.stat.isShowModifyModal.value = true;
    }
  }
  onCoverUpload(options: UploadCustomRequestOptions) {
    if (options.file.file) {
      const { notification } = createDiscreteApi(["notification"]);
      //弹出提示
      if (options.file.file.size > 1024 * 10240) {
        notification.create({
          duration: 4000,
          type: "warning",
          title: "图片大小大于10MB，将图片导致加载缓慢",
        });
      }
      this.stat.coverFile = options.file.file;
    }
  }
  onContentUpload(options: UploadCustomRequestOptions) {
    if (options.file.file) {
      const { notification } = createDiscreteApi(["notification"]);
      //弹出提示
      if (options.file.file.size > 1024 * 10240) {
        notification.create({
          duration: 4000,
          type: "warning",
          title: "图片大小大于10MB，将图片导致加载缓慢",
        });
      }
      this.stat.contentFile = options.file.file;
    }
  }
  async onConfirmClick(file: File | null) {
    const { message } = createDiscreteApi(["message"]);
    if (file === null) return message.error("上传失败");
    const formdata = new FormData();
    const serverPath = coverList[this.stat.modifyingImgIndex.value].split("/");
    file && formdata.append("img", file);
    formdata.append("path", serverPath[serverPath.length - 1]);

    //文件上传前静止提交表单
    //上传至服务器
    //   await fetch("http://localhost:39443", {
    //     method: "POST",
    //     body: formdata,
    //   });
    try {
      const { data } = await axios({
        url: "/v2/mp/manager/banner",
        method: "POST",
        data: formdata,
      });
      file = null;
      if (!data.status) message.error("上传失败");
    } catch (e) {
      //清除文件缓存
      file = null;
      message.error("上传失败");
    }
  }
  onFileRemove(op: {
    file: Required<FileInfo>;
    fileList: Required<FileInfo>[];
  }) {
    //防止内存泄露
    op.file.file = null;
    this.stat.contentFile = this.stat.coverFile = null;
  }
}
const modifyCoverProcess = new ModifyCoverProcess();
</script>

<style scoped>
.carousel-img {
  height: var(--img-height);
  width: 100%;
  object-fit: fill;
}
.let-middle {
  min-width: 640px;
  width: var(--top-width);
  margin: auto;
  --width-percent: 1.34;
  /* 首页图片宽高比固定为1.34（之前美工定的比例） */
  --img-height: 25vw;
  --top-width: 70vw;
}
.control-width {
  width: calc(var(--width-percent) * var(--img-height) / var(--top-width));
}
</style>
