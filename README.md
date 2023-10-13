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
import { initialize } from 'demoway-sdk';
import { createApp } from 'vue';

initialize({
  accessToken: '', // getting from your DemoWay dashboard
  appId: '' //  getting from your DemoWay dashboard
  attributes: {
    userId: '', // the user id or openid of the user in your system, you can get the user‘s data from DemoWay by API via this userId
    userName: '',
    nickName: '', // the nick name of the user in your system, will display in your DemoWay dashboard
    anyOtherAttributes1: '', // any other attributes you want to provide, will display in your DemoWay dashboard
    anyOtherAttributes2: '', 
    anyOtherAttributes3: '', 
  },
})
/**
* render your app
*/
createApp(App).mount();
```

### React Example

```jsx
import { initialize } from 'demoway-sdk';
import { createRoot } from 'react-dom/client';

initialize({
  accessToken: '', // getting from DemoWay dashboard
  appId: '' //  getting from DemoWay dashboard
  attributes: {
    userId: '', // the user id or openid of the user in your system, you can get the user‘s data from DemoWay by API via this userId
    userName: '',
    nickName: '', // the nick name of the user in your system, will display in your DemoWay dashboard
    anyOtherAttributes1: '', // any other attributes you want to provide, will display in your DemoWay dashboard
    anyOtherAttributes2: '', 
    anyOtherAttributes3: '', 
  },
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
