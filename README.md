# Example Vue3工程化模板

## 工程介绍
使用 Vue3 + TypeScript的Vue3模板，搭载Vue-Router与i18n国际化。只具有基础的项目结构。    

### 基本结构
```
--src 工作目录  
  --assets 静态资源，包含图片、图标、音视频与字体文件等   
  --doc 前后端配置相关的全局文件  
  --entity TypeScript类的统一管理，涉及前后端对接的也在此处理  
    --meta 基础元数据  
    --request 发起HTTP请求的类  
    --response 接受HTTP返回的类  
  --local 多语言文本翻译
  --method 全局方法或通用方法配置
  --router 路由管理
  --views 页面  
```

## 工程命令

### 项目初始化
```
npm install
```

### 开放环境热重载运行
```
npm run serve
```

### 打包为生产环境项目
```
npm run build
```

### ES-lint校验
```
npm run lint
```

### Vue官网支持
See [Configuration Reference](https://cli.vuejs.org/config/).
