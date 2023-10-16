# Demoway SDK

## Install

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

## Initialize DemoWay SDK

Initialize DemoWay SDK before application rendering

### Vue Example

```js
import { initialize, IUserInfo } from 'demoway-sdk';
import { createApp } from 'vue';

initialize({
  accessToken: '', 
  appId: '',
  userInfo: {
    openId: '',
    userName: '',
    nickName: ''
  } as IUserInfo,
})
/**
* render your app
*/
createApp(App).mount();
```

`accessToken`: temporary access token, you can get it from your DemoWay dashboard
`appId`: your DemoWay application id, you can get it from your DemoWay dashboard
`userInfo.openId`: openid of the user in your system, you can get the user‘s data from DemoWay by API via this userId
`userInfo.nickName`: the nick name of the user in your system, will display in your DemoWay dashboard
`userInfo.xxx`: you can provide any other attributes you want into `userInfo`, they will all display as a part of visit user profile in your DemoWay dashboard

### React Example

```jsx
import { initialize, IUserInfo } from 'demoway-sdk';
import { createRoot } from 'react-dom/client';

initialize({
  accessToken: '', 
  appId: '',
  userInfo: {
    openId: '',
    userName: '',
    nickName: ''
  } as IUserInfo,
});

/**
* render your app
*/
const domNode = document.getElementById('root');
const root = createRoot(domNode);
root.render(<App />);
```

## Usage

### Open Demo in Dialog

<img src="./assets/demo-dialog.png" width="100%" />

Open a demo in dialog, which can switch to full screen mode.

```js
import { openDemoDialog } from 'demoway-sdk';

openDemoDialog('demo-id'); // demo-id can be got from DemoWay dashboard
```

### Open CheckList in Dialog

Open a checklist in dialog, which can switch to full screen mode.

```js
import { openDemoDialog } from 'demoway-sdk';

openDemoDialog('demo-id', {checklistId: 'checklist-id'}); // demo-id and checklist-id can be got from DemoWay dashboard
```

### Record a New Demo

<img src="./assets/recording-board.png" width="60%" />

Enable recording feature and show recording board by calling `enableRecord` function.

```js
import { enableRecord } from 'demoway-sdk';

// enable recording feature and show recording board
enableRecord();
```

Enable recording feature and show recording board by rage click.

```js
import { enableRecord, rageClick } from 'demoway-sdk';

const button = document.querySelector('button');

// rage click button 5 times with 1000ms interval
rageClick(button, 5, 1000).then(() => {
  // enable recording feature and show recording board
  return enableRecord();
});
```
