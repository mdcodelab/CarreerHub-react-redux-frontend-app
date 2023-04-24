# npx create-react-app career-hub

- resource [Generate Favicons](https://favicon.io/)

#### 1) Normalize.css and Global Styles

- CSS in JS (styled-components)
- normalize.css
- small CSS file that provides cross-browser consistency in the default styling of HTML elements.
- [normalize docs](https://necolas.github.io/normalize.css/)

```sh
npm install normalize.css
```

- import 'normalize.css' in index.js
- SET BEFORE 'index.css'
- replace contents of index.css


#### 4) Landing Page - Setup
- npm install styled-components


#### 5) Logo Component

#### 6) React Router

#### 7) Error Page

#### 8) Register Page - Setup

#### 9) FormRow Component

#### 10) Toggle Member (in the Register)

#### 11) Handle Change and Empty Values

#### 12) React Toastify

[React Toastify](https://www.npmjs.com/package/react-toastify)


npm install --save react-toastify


App.js:

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

return (
<Router>
<Routes/>
<ToastContainer/>
<Router/>
)

Register.js:
import { toast } from 'react-toastify';

if (!email || !password || (!isMember && !name)) {
  toast.error('Please Fill Out All Fields');
  return;
}

- modifications

position

<ToastContainer position='top-center' >


### 13) User Slice - Setup

- features/user/userSlice.js

```js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';

const initialState = {
  isLoading: false,
  user: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
});

export default userSlice.reducer;
```

- create store.js

```js
import { configureStore } from '@reduxjs/toolkit';

import userSlice from './features/user/userSlice';

export const store = configureStore({
  reducer: {
    user: userSlice,
  },
});
```

- index.js

```js
import { store } from './store';
import { Provider } from 'react-redux';

root.render(
  <Provider store={store}>
    <App tab='home' />
  </Provider>
);
```

```sh
npm install @reduxjs/toolkit react-redux
```



