import { UnwrapNestedRefs } from "vue";
export function createEnv(
  tips: UnwrapNestedRefs<editingData>,
  type: EnvType.UPD,
): (path: number[], msg: string) => void;

export function createEnv(
  tips: UnwrapNestedRefs<editingData>,
  type: EnvType,
): (path: number[]) => void;

export function createEnv(
  editData: UnwrapNestedRefs<editingData>,
  type: EnvType,
) {
  switch (type) {
    case EnvType.ADD:
      return function ADD(path: number[]) {
        const arr = TargetTreeEl(path);
        arr.splice(path[path.length - 1] + 1, 0, {
          title: "",
          children: [],
          id: Symbol(),
        });
      };
    case EnvType.DEL:
      return function DEL(path: number[]) {
        const arr = TargetTreeEl(path);
        arr.splice(path[path.length - 1], 1);
      };
    case EnvType.UPD:
      return function UPDATE(path: number[], msg: string) {
        const arr = TargetTreeEl(path);
        arr[path[path.length - 1]].title = msg;
      };
    case EnvType.UPP:
      return function UP(path: number[]) {
        if (path[path.length - 1] === 0) return;
        const arr = TargetTreeEl(path);
        const tmp = arr[path[path.length - 1]];
        arr[path[path.length - 1]] = arr[path[path.length - 1] - 1];
        arr[path[path.length - 1] - 1] = tmp;
      };
    case EnvType.SUB:
      return function SUB(path: number[]) {
        const arr = TargetTreeEl(path);
        arr[path[path.length - 1]].children.push({
          id: Symbol(),
          title: "",
          children: [],
        });
      };
    default:
      return;
  }

  function TargetTreeEl(path: number[]): omitPath[] {
    //path记录递归的路径

    let index = 0;
    let arr = editData.tips as omitPath[];
    //按路径递归,留下最后一层以便操作
    while (index++ < path.length - 1) {
      arr = arr[path[index - 1]].children;
    }

    return arr;
  }
}
export enum EnvType {
  ADD, //添加同级项目
  DEL, //删除条目
  UPD, //条目更新
  UPP, //条目上移
  SUB, //增加子节点
}
export type tipItems = { title: string; children: tipItems[] };
export type editingData = {
  commodityId: null | number;
  commodityName: string;
  commodityType: number;
  currentPrice: string;
  commodityBrief: string;
  initialQuantity: null;
  originPrice: null;
  remainQuantity: number;
  commodityStatus: number;
  picLink: string;
  picLinkTem: string;
  tips: componentPros[];
};
export type componentPros = {
  title: string;
  children: componentPros[];
  path: number[];
  id?: symbol;
};
type omitPath = {
  title: string;
  children: omitPath[];
  id?: symbol;
};
