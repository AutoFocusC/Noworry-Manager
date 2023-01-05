<template>  <div class="box">
    <div class="ipt">
      <n-input
        :default-value="props.title"
        type="text"
        @update:value="onInputChange"
      ></n-input>
    </div>

    <div class="btng">
      <n-button-group>
        <n-button @click="onItemAdd"> + </n-button>
        <n-button @click="onItemRemove"> - </n-button>
        <n-button @click="onItemUp"> ↑ </n-button>
      </n-button-group>
    </div>
  </div>

  <div class="it" v-if="props.children.length">
    <TransitionGroup name="list">
      <div v-for="(tip, i) in props.children" :key="tip.id">
        <ReTips
          :title="tip.title"
          :children="tip.children"
          :path="[...props.path, i]"
          @add="(p) => emit('add', p)"
          @del="(p) => emit('del', p)"
          @update="(p, m) => emit('update', p, m)"
          @up="(p) => emit('up', p)"
          @down="(p) => emit('down', p)"
        />
      </div>
    </TransitionGroup>
  </div>
</template>

<script setup lang="ts">
import { defineProps, defineEmits } from "vue";
import { NInput, NButton, NButtonGroup } from "naive-ui";
import { componentPros } from "@/method/targetTreePath";
//编辑Tips时事件的类型

const emit = defineEmits<{
  (e: "update", path: number[], msg: string): void;
  (e: "del", path: number[]): void;
  (e: "add", path: number[]): void;
  (e: "up", path: number[]): void;
  (e: "down", path: number[]): void;
}>();

//depth是记录当前递归深度的
const props = defineProps<{
  title: string;
  children: componentPros[];
  path: number[];
  id?: symbol | undefined;
}>();
//当input的值变化是发生的回调
function onInputChange(msg: string): void {
  //向上层报告change事件
  emit("update", props.path, msg);
}
//删除一项时发生的回调
function onItemRemove() {
  emit("del", props.path);
}
//增加Item时发生的回调
function onItemAdd() {
  emit("add", props.path);
}
function onItemUp() {
  emit("up", props.path);
}
</script>

<style scoped>
.it {
  margin-left: 2em;
}
.box {
  display: flex;
  justify-content: space-between;
}
.btng {
  flex: 2;
}
.ipt {
  flex: 5;
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
