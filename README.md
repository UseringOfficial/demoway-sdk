# Demoway SDK

## 安装

### pnpm

```
pnpm add demoway-sdk
```

### npm

```
npm install demoway-sdk --save
```

### yarn

```
yarn add demoway-sdk
```

## 初始化

在应用入口调用 initialize 方法

### Vue

```js
import { intialize } from 'demoway-sdk';
import { createApp } from 'vue';

initialzie({
  accessToken: '', // 从管理后台获取
});

createApp(App).mount();
```

### React

```jsx
import { intialize } from 'demoway-sdk';
import { createRoot } from 'react-dom/client';

initialzie({
  accessToken: '', // 从管理后台获取
});

const domNode = document.getElementById('root');
const root = createRoot(domNode);
root.render(<App />);
```

## 使用

### 打开 demo 对话框

```js
import { openDemoDialog } from 'demoway-sdk';

openDemoDialog('demo-id');
```

### 启动录制功能

```js
import { enableRecord } from 'demoway-sdk';

enableRecord();
```

### 工具函数 rageClick

```js
import { enableRecord, rageClick } from 'demoway-sdk';

// 用户在1秒内点击按钮5次
rageClick(button, 5, 1000).then(() => {
  return enableRecord();
});
```
