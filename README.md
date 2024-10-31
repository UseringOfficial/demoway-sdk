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

## Setup

### Tailwind user

```js
// tailwind.config.js

module.exports = {
  content: [
    '**/demoway-sdk/dist/**/*.{js,cjs}',
    // ...
  ],
};
```

### Uno CSS user

```js
// uno.config.js

export default defineConfig({
  content: {
    pipeline: {
      include: [
        '**/demoway-sdk/dist/**/*.{js,cjs}',
        // ...
      ],
    },
  },
});
```

### If you are not using tailwind or unocss or something similar

```js
import 'demoway-sdk/style.css';
// or
require('demoway-sdk/style.css');
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
    xxx: '',
    company: {
      id: ''
      name: ''
    }
  } as IUserInfo, // IUserInfo is TS interface, you can remove it if you are not using TS
})
/**
* render your app
*/
createApp(App).mount();
```

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
    xxx: '',
    company: {
      id: ''
      name: ''
    }
  } as IUserInfo, // IUserInfo is TS interface, you can remove it if you are not using TS
})

/**
* render your app
*/
const domNode = document.getElementById('root');
const root = createRoot(domNode);
root.render(<App />);
```

| Name                  | Required | Description                                                                                                                                                                        |
| --------------------- | -------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| accessToken           | required | temporary access token fot test, you can get it from your DemoWay dashboard                                                                                                        |
| appId                 | required | your DemoWay application id, you can get it from your DemoWay dashboard                                                                                                            |
| userInfo              | optional | **strongly recommend**                                                                                                                                                             |
| userInfo.openId       | optional | open user id of the user in your system, you can associate each user with the users in your own system when retrieving user access records through the API. **strongly recommend** |
| userInfo.nickName     | optional | the nick name of the user in your system                                                                                                                                           |
| userInfo.xxx          | optional | you can add string value with any key name to "userInfo"                                                                                                                           |
| userInfo.company      | optional | **strongly recommend**                                                                                                                                                             |
| userInfo.company.id   | optional | the company id of the user in your system                                                                                                                                          |
| userInfo.company.name | required | the company or organization name of the user, required in `userInfo.company`                                                                                                       |

When a user accesses the demo, Demoway will create an anonymous user for them. If you provide the "userInfo" field when initializing the SDK, this information will be associated with the anonymous user. In the Demoway dashboard, when viewing the user's access records, you may also see this information. This makes it convenient to identify different users. If the "userInfo" includes the "openId" field, you can associate each user with the users in your own system when retrieving access records through the API.

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

openDemoDialog('demo-id', { checklistId: 'checklist-id' }); // demo-id and checklist-id can be got from DemoWay dashboard
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
