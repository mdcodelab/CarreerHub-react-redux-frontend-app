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

--------------------------------------------------------------------
#### 2) Landing Page - Setup
- npm install styled-components


--------------------------------------------------------------------
#### 3) Logo Component

----------------------------------------------------------------------

#### 4) React Router

-------------------------------------------------------------------

#### 5) Error Page

--------------------------------------------------------------------

#### 6) Register Page - Setup

----------------------------------------------------------------

#### 7) FormRow Component

----------------------------------------------------------------

#### 8) Toggle Member (in the Register)

-------------------------------------------------------------

#### 9) Handle Change and Empty Values

----------------------------------------------------------

#### 10) React Toastify

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

--------------------------------------------------------------------


### 11) User Slice - Setup

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

---------------------------------------------------------------------
#### 12) RegisterUser, LoginUser - Placeholders

- userSlice.js

```js
export const registerUser = createAsyncThunk(
  'user/registerUser',
  async (user, thunkAPI) => {
    console.log(`Register User : ${user}`)
);
export const loginUser = createAsyncThunk(
  'user/loginUser',
  async (user, thunkAPI) => {
    console.log(`Login User : ${user}`)
});
```

- Register.js

```js
import { useSelector, useDispatch } from 'react-redux';
import { loginUser, registerUser } from '../features/user/userSlice';


const Register = () => {
  const dispatch = useDispatch();
  const { isLoading, user } = useSelector((store) => store.user);


const onSubmit = (e) => {
    e.preventDefault();
    const { name, email, password, isMember } = values;
    if (!email || !password || (!isMember && !name)) {
      toast.error('Please Fill Out All Fields');
      return;
    }
    if (isMember) {
      dispatch(loginUser({ email: email, password: password }));
      return;
    }
    dispatch(registerUser({ name, email, password }));
  };
```
--------------------------------------------------------------

#### 13) HTTP Methods

- GET - get resources from the server
- POST - submit resource to the server
- PUT/PATCH - modify resource on the server
- DELETE - delete resource form the server

```js
// GET
axios.get(url, options);
// POST
axios.post(url, resource, options);
// PATCH
axios.patch(url, resource, options);
// DELETE
axios.delete(url, options);
```

```sh
npm install axios
```

----------------------------------------------------------------------
#### 14) API

- Root URL
- https://jobify-prod.herokuapp.com/api/v1/toolkit

NODE
###### Register USER

- https://jobify-prod.herokuapp.com/api/v1/toolkit/auth/register

- POST /auth/register
- {name:'john',email:'john@gmail.com',password:'secret'}
- sends back the user object with token

###### Register USER - TESTING()

- POST /auth/testingRegister
- {name:'john',email:'john@gmail.com',password:'secret'}
- sends back the user object with token

###### Login USER

- POST /auth/login
- {email:'john@gmail.com',password:'secret'}
- sends back the user object with token

###### Update USER

- PATCH /auth/updateUser
- { email:'john@gmail.com', name:'john', lastName:'smith', location:'my location' }
- sends back the user object with token
---------------------------------------------------------------


  #### 15) Custom Axios Instance

- utils/axios.js

```js
import axios from 'axios';

const customFetch = axios.create({
  baseURL: 'https://jobify-prod.herokuapp.com/api/v1/toolkit',
});

export default customFetch;
```

userSlice.js
``js
import customFetch from '../../utils/axios';

//fir testing:
export const registerUser = createAsyncThunk(
  'user/registerUser',
  async (user, thunkAPI) => {
    try {
      const resp = await customFetch.post('/auth/testingRegister', user);
      console.log(resp);
    } catch (error) {
      console.log(error.response);
    }
  }
);
```

------------------------------------------------------------
#### 16) Register User

userSlice.js

```js
export const registerUser = createAsyncThunk(
  'user/register',
  async (user, thunkAPI) => {
    try {
      const resp = await customFetch.post('/auth/register', user);
      return resp.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.msg);
    }
  }
)
   extraReducers: (builder) => {
    builder
    .addCase(registerUser.pending, (state) => {
        state.isLoading = true;})

        .addCase(registerUser.fulfilled, (state, { payload }) => {
            const { user } = payload;
            state.isLoading = false;
            state.user = user;
            toast.success(`Hello There ${user.name}`);
          })

          .addCase(registerUser.rejected, (state, { payload }) => {
            state.isLoading = false;
            toast.error(payload);
          })  
}
```
----------------------------------------------------------
#### 17) Login User

userSlice.js

```js
export const loginUser = createAsyncThunk(
  'user/login',
  async (user, thunkAPI) => {
    try {
      const resp = await customFetch.post('/auth/register', user);
      return resp.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.msg);
    }
  }
)
extraReducers:
      .addCase(loginUser.fulfilled, (state, { payload }) => {
        const { user } = payload;
        state.isLoading = false;
        state.user = user;
        addUserToLocalStorage(user);

        toast.success(`Welcome Back ${user.name}`);
      })
      .addCase(loginUser.rejected, (state, { payload }) => {
        state.isLoading = false;
        toast.error(payload);
      })
  }
```

### 18) Login localStorage

- utils/localStorage.js

```js
export const addUserToLocalStorage = (user) => {
  localStorage.setItem('user', JSON.stringify(user));
};

export const removeUserFromLocalStorage = () => {
  localStorage.removeItem('user');
};

export const getUserFromLocalStorage = () => {
  const result = localStorage.getItem('user');
  const user = result ? JSON.parse(result) : null;
  return user;
};
```

- invoke getUserFromLocalStorage when app loads (set it equal to user)

```js
const initialState = {
  isLoading: false,
  user: getUserFromLocalStorage(),
};

 builder
    //registerUser
    .addCase(registerUser.pending, (state) => {
        state.isLoading = true;})

        .addCase(registerUser.fulfilled, (state, { payload }) => {
            const { user } = payload;
            state.isLoading = false;
            state.user = user;
            addUserToLocalStorage(user);/////////////////
            toast.success(`Hello There ${user.name}!`);
          })

          .addCase(registerUser.rejected, (state, { payload }) => {
            state.isLoading = false;
            toast.error(payload);
          })  
          //loginUser
          .addCase(loginUser.pending, (state) => {
            state.isLoading = true;})
    
            .addCase(loginUser.fulfilled, (state, { payload }) => {
                const { user } = payload;
                state.isLoading = false;
                state.user = user;
                addUserToLocalStorage(user); ////////////////////////
                toast.success(`Welcome back ${user.name}!`);
              })
    
            .addCase(loginUser.rejected, (state, { payload }) => {
                state.isLoading = false;
                toast.error(payload);
              })  
}

---------------------------------------------------------------------------------

### 19) Programmatically Navigate To Dashboard
Register.js:

const location=useLocation();

    React.useEffect(() => {
      if(user) {
        setTimeout(() => {
          window.location.href="/"
        }, 2000)
      }
    }, [user])

--------------------------------------------------------------------------------
#### 20) Setup Dashboard Pages

- remove Dashboard.js
- create Dashboard Folder
- create Stats, Profile, AddJob, AllJobs, SharedLayout

App.js

```js
import {
  AllJobs,
  Profile,
  SharedLayout,
  Stats,
  AddJob,
} from './dashboardPages/...';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<SharedLayout />}>
          <Route index element={<Stats />} />
          <Route path='all-jobs' element={<AllJobs />} />
          <Route path='add-job' element={<AddJob />} />
          <Route path='profile' element={<Profile />} />
        </Route>
        <Route path='register' element={<Register />} />
        <Route path='landing' element={<Landing />} />
        <Route path='*' element={<Error />} />
      </Routes>
      <ToastContainer position='top-center' />
    </BrowserRouter>
  );
}
```
--------------------------------------------------------
### 21) Navbar, SmallSidebar, BigSidebar

- create Navbar, SmallSidebar, BigSidebar in components

```js
SharedLayout.js;

import { Outlet } from 'react-router-dom';
import Navbar etc.

const SharedLayout = () => {
  return (
    <>
      <Wrapper>
        <main className='dashboard'>
          <SmallSidebar />
          <BigSidebar />
          <div>
            <Navbar />
            <div className='dashboard-page'>
              <Outlet />
            </div>
          </div>
        </main>
      </Wrapper>
    </>
  );
};

------------------------------------------------------------
#### 22) Shared Layout CSS

- BigSidebar,SmallSidebar and Navbar
------------------------------------------------------------

### 23) Navbar setup
-----------------------------------------------------------
### 24) Toggle Dropdown

```js
Navbar.js
const [logout, setLogout]=React.useState(false);

  return (
    <Wrapper>
    <div className='nav-center'>
      <button type='button' className='toggle-btn' onClick={()=> console.log("toggle")}>
        <FaAlignLeft /></button>
      <div>
        <WrapperLogo> <Logo /></WrapperLogo>
        <h3 className='logo-text'>dashboard</h3>
      </div>
      <div className='btn-container'>
        <button type='button'className='btn' onClick={() => setLogout(!logout)}>
          <FaUserCircle />
          {user?.name}
          <FaCaretDown />
        </button>
        <div className={logout ? "dropdown show-dropdown" : "dropdown"}>
          <button type='button' className='dropdown-btn' 
          onClick={() => console.log("logout")}>
            Logout
          </button>
        </div>
        
      </div>
    </div>
  </Wrapper>
    )
    --------------------------------------------------------

    ### 25) Toggle Sidebar
  
userSlice.js

```js
const initialState = {
  isLoading: false,
  isSidebarOpen: false,
  user: getUserFromLocalStorage(),
};

reducers: {
    toggleSidebar: (state) => {
      state.isSidebarOpen = !state.isSidebarOpen;
    },
  },

export const { toggleSidebar } = userSlice.actions;

```

Navbar.js

```js
import { toggleSidebar } from '../features/user/userSlice';


<button type='button' className='toggle-btn' onClick={()=> dispatch(toggleSidebar())}>
  <FaAlignLeft />
</button>;
---------------------------------------------------

### 26) Logout functionality
userSlice.js

```js
reducers: {
    logoutUser: (state) => {
      state.user = null;
      state.isSidebarOpen = false;
      localStorage.removeItem("user")
    }

export const { logoutUser, toggleSidebar } = userSlice.actions;

```

Navbar.js

```js
import { toggleSidebar, logoutUser } from '../features/user/userSlice';

<div className={showLogout ? 'dropdown show-dropdown' : 'dropdown'}>
  <button
    type='button'
    className='dropdown-btn'
    onClick={() => {
      dispatch(logoutUser());
    }}
  >
    logout
  </button>
</div>;
```
--------------------------------------------------------------------
### 27) Restricted route
 pages/ProtectedRoute.js

```js
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
const ProtectedRoute = ({ children }) => {
  const { user } = useSelector((store) => store.user);
  if (!user) {
    return <Navigate to='/landing' />;
  }
  return children;
};

export default ProtectedRoute;
```

App.js

```js
<Route
  path='/'
  element={
    <ProtectedRoute>
      <SharedLayout />
    </ProtectedRoute>
  }
>
  ...
</Route>
```
--------------------------------------------------------------
#### 28) Small Sidebar - Setup
-------------------------------------------------------------
### 29) Small Sidebar Toggle

mallSidebar.js;

```js
import { toggleSidebar } from '../features/user/userSlice';


const { isSidebarOpen } = useSelector((store) => store.user);
  const dispatch = useDispatch();


return (
  <div className={isSidebarOpen ? 'sidebar-container show-sidebar' : 'sidebar-container'}>
    <div className='content'>
        <button type='button' className='close-btn' onClick={()=> dispatch(toggleSidebar())}>
          <FaTimes />
        </button>

);
```
---------------------------------------------------------------
#### 30) Setup Links
--utils -links.js
import { IoBarChartSharp } from 'react-icons/io5';
import { MdQueryStats } from 'react-icons/md';
import { FaWpforms } from 'react-icons/fa';
import { ImProfile } from 'react-icons/im';

const links = [
  { id: 1, text: 'stats', path: '/', icon: <IoBarChartSharp /> },
  { id: 2, text: 'all jobs', path: 'all-jobs', icon: <MdQueryStats /> },
  { id: 3, text: 'add job', path: 'add-job', icon: <FaWpforms /> },
  { id: 4, text: 'profile', path: 'profile', icon: <ImProfile /> },
];

export default links;
--------------------------------------------------------------------
#### 31) Small Sidebar - Nav Links

-------------------------------------------------------------------

#### 32) Big Sidebar - setup

------------------------------------------------------------------
### 33) Big Profile - setup

----------------------------------------------------------------

### 33) Profile Page structure
Profile.js:
```js
import React from 'react';
import FormRow from '../components/FormRow';
import { toast } from "react-toastify";
import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';



function Profile() {
  const {isLoading, user}=useSelector((store) => store.user);
  const dispatch=useDispatch();

  const [userData, setUserData]=React.useState({
    name: user?.name || "",
    email: user?.email || "",
    lastName: user?.lastName || "",
    location: user?.location || ""
  });

  const handleSubmit = (e) => {
      e.preventDefault();
      const {name, email, lastName, location}=userData;
      if(!name || !email || !lastName || !location) {
        toast.error("Please fill out all fields!");
        return;
      }
  }

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setUserData({...userData, [name]: value})
  }
  

  return (
    <Wrapper>
        <form className="form" on Submit ={handleSubmit}>
            <h3>Profile</h3>
            <div className="form-center">
                <FormRow type="text" name="name" value={userData.name} onChange={handleChange}></FormRow>
                <FormRow type="text" labelText="last name" name="lastName" value={userData.lastName} onChange={handleChange}></FormRow>
                <FormRow type="email" name="email" value={userData.email} onChange={handleChange}></FormRow>
                <FormRow type="text" name="location" value={userData.location} onChange={handleChange}></FormRow>
                <button type="submit" className="btn btn-block" disabled={isLoading}>
                  {isLoading ? "Pleased wait..." : "Save changes"}
                </button>
            </div>

        </form>
    </Wrapper>
  );
}
```
------------------------------------------------------------------------
### 34) Update user
- PATCH /auth/updateUser
- { email:'john@gmail.com', name:'john', lastName:'smith', location:'my location' }
- authorization header : 'Bearer token'
- sends back the user object with token

userSlice.js:
```js
export const updateUser = createAsyncThunk('user/updateUser', async (user, thunkAPI) => {
      try {
        const resp = await customFetch.patch('/auth/updateUser', user, {
          headers: {
            authorization: `Bearer ${thunkAPI.getState().user.user.token}`,
          },
        });
        return resp.data;
      } catch (error) {
        console.log(error.response);
        return thunkAPI.rejectWithValue(error.response.data.msg);
      }
    }
  );
  -extraReducer:
  .addCase(updateUser.pending, (state) => {
                state.isLoading = true;})
        
                .addCase(updateUser.fulfilled, (state, { payload }) => {
                    const { user } = payload;
                    state.isLoading = false;
                    state.user = user;
                    addUserToLocalStorage(user);
                    toast.success("User Updated!");
                  })
        
                .addCase(updateUser.rejected, (state, { payload }) => {
                    state.isLoading = false;
                    toast.error(payload);
                  }) 

```
Profile.js:
```js
const handleSubmit = (e) => {
    e.preventDefault();
    const {name, email, lastName, location}=userData;
    if(!name || !email || !lastName || !location) {
      toast.error("Please fill out all fields!");
      return;
    }
    dispatch(updateUser(userData));
}
```
------------------------------------------------------------------
### 35) Unauthorized - Logout User

userSlice.js

```js
export const updateUser = createAsyncThunk(
  'user/updateUser',
  async (user, thunkAPI) => {
    try {
      const resp = await customFetch.patch('/auth/updateUser', user, {
        headers: {
          // authorization: `Bearer ${thunkAPI.getState().user.user.token}`,
          authorization: `Bearer `,
        },
      });

      return resp.data;
    } catch (error) {
      // console.log(error.response);
      if (error.response.status === 401) {
        thunkAPI.dispatch(logoutUser());
        return thunkAPI.rejectWithValue('Unauthorized! Logging Out...');
      }
      return thunkAPI.rejectWithValue(error.response.data.msg);
    }
  }
);

// logoutUser
logoutUser: (state) => {
      state.user = null;
      state.isSidebarOpen = false;
      toast.success('Logout Successful!');
      removeUserFromLocalStorage();
    },
```
---------------------------------------------------------------------
#### 36) Job Slice

- features/job/jobSlice.js

```js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import customFetch from '../../utils/axios';
import { getUserFromLocalStorage } from '../../utils/localStorage';

const initialState = {
  isLoading: false,
  position: '',
  company: '',
  jobLocation: '',
  jobTypeOptions: ['full-time', 'part-time', 'remote', 'internship'],
  jobType: 'full-time',
  statusOptions: ['interview', 'declined', 'pending'],
  status: 'pending',
  isEditing: false,
  editJobId: '',
};

const jobSlice = createSlice({
  name: 'job',
  initialState,
});

export default jobSlice.reducer;
```

store.js

```js
import jobSlice from './features/job/jobSlice';

export const store = configureStore({
  reducer: {
    user: userSlice,
    job: jobSlice,
  },
});
```
------------------------------------------------------------------------
#### 37) AddJob Structure

AddJobs.js
````js
import React from 'react';
import styled from "styled-components";
import { toast } from "react-toastify";
import { useSelector, useDispatch } from 'react-redux';
import FormRow from "../components/FormRow";

function AddJob() {
  const {isLoading, position, company, jobLocation, jobType, jobTypeOptions, status,
  statusOptions, isEditing, editJobId}=useSelector((state)=> state.job);
  const dispatch=useDispatch();

  const onChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    console.log(name, value);
  }

  const onSubmit = (e) => {
    e.preventDefault();
    if(!position || !company || !jobLocation) {
      toast.warning("Please Fill Out All Fields!");
      return;
    }
  }
  
  return (
    <Wrapper>
          <form className="form">
            <h3>{isEditing ? "Edit Job" : "Add Job"}</h3>
            <div className="form-center">
              {/* position */}
              <FormRow type="text" name="position" value={position} onChange={onChange}></FormRow>
                {/* company */}
              <FormRow type="text" name="company" value={company} onChange={onChange}></FormRow>
                {/* jobLocation */}
              <FormRow type="text" name="jobLocation" labelText="Job Location" 
              value={jobLocation} onChange={onChange}></FormRow>
              <div className="btn-container">
                <button type="button" className="btn btn-block clear-btn" 
                    onClick={()=> console.log("clear values")}>Clear</button>
                <button type="submit" className="btn btn-block submit-btn" disabled={isLoading}
                    onClick={onSubmit}>Submit</button>
              </div>
            </div>
          </form>
    </Wrapper>
  );
}
``
------------------------------------------------------------------------------
#### 38) FormRowSelect

```js
// job status

return (
  <div className='form-row'>
    <label htmlFor='status' className='form-label'>
      status
    </label>
    <select
      name='status'
      value={status}
      onChange={handleJobInput}
      className='form-select'
    >
      {statusOptions.map((itemValue, index) => {
        return (
          <option key={index} value={itemValue}>
            {itemValue}
          </option>
        );
      })}
    </select>
  </div>
);
```

- FormRowSelect.js

```js
const FormRowSelect = ({ labelText, name, value, handleChange, list }) => {
  return (
    <div className='form-row'>
      <label htmlFor={name} className='form-label'>
        {labelText || name}
      </label>
      <select
        name={name}
        value={value}
        id={name}
        onChange={handleChange}
        className='form-select'
      >
        {list.map((itemValue, index) => {
          return (
            <option key={index} value={itemValue}>
              {itemValue}
            </option>
          );
        })}
      </select>
    </div>
  );
};
```

AddJob.js

```js

  /* job status */
<FormRowSelect
  name='status'
  value={status}
  handleChange={handleJobInput}
  list={statusOptions}
/>

<FormRowSelect
  name='jobType'
  labelText='job type'
  value={jobType}
  handleChange={handleJobInput}
  list={jobTypeOptions}
/>
```
------------------------------------------------------------------

### 39) Handle Change reducer
```js
    // reducers
    handleChange: (state, { payload: { name, value } }) => {
      state[name] = value;
    },

export const { handleChange } = jobSlice.actions;
```

AddJob.js

```js
import { handleChange } from '../../features/job/jobSlice';

const handleJobInput = (e) => {
  const name = e.target.name;
  const value = e.target.value;
  dispatch(handleChange({ name, value }));
};
```
------------------------------------------------------------
### 40) User Slice - handleClear Reducer

```js

    // reducers
    handleClear: () => {
      return {
        ...initialState
      };
      return initialState
    },

export const { handleChange, handleClear } = jobSlice.actions;

```


#### 41) Add Job
jobSlice.js

```js
export const createJob = createAsyncThunk('job/createJob', async (job, thunkAPI) => {
      try {
        const resp = await customFetch.post('/jobs', job, {
          headers: {
            authorization: `Bearer ${thunkAPI.getState().user.user.token}`,
            //authorization: `Bearer`,
          },
        });
        thunkAPI.dispatch(handleClear());
        return resp.data;
      } catch (error) {
        if (error.response.status === 401) {
            thunkAPI.dispatch(logoutUser());
            return thunkAPI.rejectWithValue('Unauthorized! Logging Out...');
          }
        // basic setup
        return thunkAPI.rejectWithValue(error.response.data.msg);
      }
    }
  );
  `````
  / extra reducers

extraReducers: {
    builder: (state) => {
      state.isLoading = true;
    },
    builder: (state, action) => {
      state.isLoading = false;
      toast.success('Job Created');
    },
    builder: (state, { payload }) => {
      state.isLoading = false;
      toast.error(payload);
    },
}
```

AddJob.js

```js
import {
  clearValues,
  handleChange,
  createJob,
} from '../../features/job/jobSlice';

const handleSubmit = (e) => {
  e.preventDefault();

  if (!position || !company || !jobLocation) {
    toast.error('Please Fill Out All Fields');
    return;
  }

  dispatch(createJob({ position, company, jobLocation, jobType, status }));
};
```
----------------------------------------------------------------------

#### 42) Use Existing User Location

AddJob.js

```js
const { user } = useSelector((store) => store.user);

useEffect(() => {
  // eventually will check for isEditing
  if (!isEditing) {
    dispatch(handleChange({ name: 'jobLocation', value: user.location }));
  }
}, []);
```

jobSlice.js

```js

    // reducers
    clearValues: () => {
      return {
        ...initialState,
        jobLocation: getUserFromLocalStorage()?.location || '',
      };
    },
```
------------------------------------------------------------------

#### 43) Logout Message
userSlice.js

```js
logoutUser: (state,{payload}) => {
      state.user = null;
      state.isSidebarOpen = false;
      removeUserFromLocalStorage();
      if(payload){
        toast.success(payload)
      }
    },

```
Navbar.js

```js
<button
  type='button'
  className='dropdown-btn'
  onClick={() => dispatch(logoutUser('Logging out...'))}
>
  logout
</button>
```
------------------------------------------------------------

#### 44) AllJobs Slice

- features/allJobs/allJobsSlice.js

```js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import customFetch from '../../utils/axios';

const initialFiltersState = {
  search: '',
  searchStatus: 'all',
  searchType: 'all',
  sort: 'latest',
  sortOptions: ['latest', 'oldest', 'a-z', 'z-a'],
};

const initialState = {
  isLoading: false,
  jobs: [],
  totalJobs: 0,
  numOfPages: 1,
  page: 1,
  stats: {},
  monthlyApplications: [],
  ...initialFiltersState,
};

const allJobsSlice = createSlice({
  name: 'allJobs',
  initialState,
});

export default allJobsSlice.reducer;
```

store.js

```js
import { configureStore } from '@reduxjs/toolkit';

import userSlice from './features/user/userSlice';
import jobSlice from './features/job/jobSlice';
import allJobsSlice from './features/allJobs/allJobsSlice';

export const store = configureStore({
  reducer: {
    user: userSlice,
    job: jobSlice,
    allJobs: allJobsSlice,
  },
});
```
-----------------------------------------------------------------
#### 45) AllJobs Page Structure

- create
- SearchContainer.js
- JobsContainer.js
- Job.js
- import/export

AllJobs.js

```js
import { JobsContainer, SearchContainer } from '../../components';

const AllJobs = () => {
  return (
    <>
      <SearchContainer />
      <JobsContainer />
    </>
  );
};
```
-------------------------------------------------------------
#### 46) JobsContainer.js

`` JobsContainer.js
import Job from './Job';
import Wrapper from '../assets/wrappers/JobsContainer';
import { useSelector, useDispatch } from 'react-redux';
import Loader

const JobsContainer = () => {
  const { jobs, isLoading } = useSelector((store) => store.allJobs);
  const dispatch = useDispatch();

  if (isLoading) {
    return (
      <Wrapper>
        <Loader></Loader>
      </Wrapper>
    );
  }

  if (jobs.length === 0) {
    return (
      <Wrapper>
        <h2>No jobs to display...</h2>
      </Wrapper>
    );
  }

  return (
    <Wrapper>
      <h5>jobs info</h5>
      <div className='jobs'>
        {jobs.map((job) => {
          return <Job key={job._id} {...job} />;
        })}
      </div>
    </Wrapper>
  );
};

export default JobsContainer;
```

Loader.js

```js
const Loader = ({ center }) => {
  return <div className={center ? 'loading loading-center' : 'loading'}></div>;
};

export default Loader;
```
--------------------------------------------------------------
#### 47) GetAllJobs Request

- GET /jobs
- authorization header : 'Bearer token'
- returns {jobs:[],totalJobs:number, numOfPages:number }

allJobsSlice.js

``` js
export const getAllJobs = createAsyncThunk(
  'allJobs/getJobs',
  async (_, thunkAPI) => {
    let url = `/jobs`;

    try {
      const resp = await customFetch.get(url, {
        headers: {
          authorization: `Bearer ${thunkAPI.getState().user.user.token}`,
        },
      });

      return resp.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.msg);
    }
  }
);

// extra reducers

extraReducers: {
    [getAllJobs.pending]: (state) => {
      state.isLoading = true;
    },
    [getAllJobs.fulfilled]: (state, { payload }) => {
      state.isLoading = false;
      state.jobs = payload.jobs;
    },
    [getAllJobs.rejected]: (state, { payload }) => {
      state.isLoading = false;
      toast.error(payload);
    },
}

```

JobsContainer.js

```js
import { getAllJobs } from '../features/allJobs/allJobsSlice';

useEffect(() => {
  dispatch(getAllJobs());
}, []);
```
------------------------------------------------------------------

#### 48) Single Job
Job.js

```js
import { FaLocationArrow, FaBriefcase, FaCalendarAlt } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';

const Job = ({
  _id,
  position,
  company,
  jobLocation,
  jobType,
  createdAt,
  status,
}) => {
  const dispatch = useDispatch();

  return (
    <Wrapper>
      <header>
        <div className='main-icon'>{company.charAt(0)}</div>
        <div className='info'>
          <h5>{position}</h5>
          <p>{company}</p>
        </div>
      </header>
      <div className='content'>
        <div className='content-center'>
          <h4>more content</h4>
          <div className={`status ${status}`}>{status}</div>
        </div>
        <footer>
          <div className='actions'>
            <Link
              to='/add-job'
              className='btn edit-btn'
              onClick={() => {
                console.log('edit job');
              }}
            >
              Edit
            </Link>
            <button
              type='button'
              className='btn delete-btn'
              onClick={() => {
                console.log('delete  job');
              }}
            >
              Delete
            </button>
          </div>
        </footer>
      </div>
    </Wrapper>
  );
};

```
---------------------------------------------------------------
#### 49) Job info
Job.js
```
<div className="more-info">
                <span className="icon"><FaLocationArrow></FaLocationArrow></span>
                <span className="text">{jobLocation}</span>
            </div>
            <div className="more-info">
                <span className="icon"><FaCalendarAlt></FaCalendarAlt></span>
                <span className="text">{createdAt}</span>
            </div>
            <div className="more-info">
                <span className="icon"><FaBriefcase></FaBriefcase></span>
                <span className="text">{jobType}</span>
            </div>
```
------------------------------------------------------------------------
#### 50) Moment.js

[moment.js](https://momentjs.com/)

```sh
npm install moment
```

Job.js

```js
const date = moment(createdAt).format('MMM Do, YYYY');
```
---------------------------------------------------------------
#### 51) Delete job

allJobsSlice.js:

export const deleteJob = createAsyncThunk("allJobs/deleteJob", async(id, thunkAPI) => {
    try {
        const response = await customFetch.delete(`/jobs/${id}`, {
            headers: {
                authorization: `Bearer ${thunkAPI.getState().user.user.token}`
            }
        })
        thunkAPI.dispatch(getAllJobs());
        return response.data;
    } catch (error) {
        return thunkAPI.rejectWithValue("There was an error deleting the job");
    }
  })

  extraReducers:
  .addCase(deleteJob.pending, (state) => {
            state.isLoading =true;
        })
        .addCase(deleteJob.fulfilled, (state, {payload}) => {
           state.isLoading=false;
           state.jobs=state.jobs.filter((job) => ( job._id != payload._id))
           toast.success("Job Deleted!");
        })
        .addCase(deleteJob.rejected, (state, {payload}) => {
            state.isLoading=false;
            toast.error(payload);
         })
  
  ```
  Jobs.js
  import { deleteJob} from '../features/allJobs/allJobsSlice';
   <button type="button" className="btn delete-btn" onClick={()=> dispatch(deleteJob(_id))}>Delete</button>
   ------------------------------------------------------------

#### 52) Edit job functionality
2 steps process:
i) click "Edit" to navigate to AddJob page and set up those estate values (which have been cleaned).
We rewrite them.
ii) edit job request
-------------------
i) jobSlice.js
reducers:
 setEditJob: (state, {payload}) => {
          return {...state, isEditing: true, ...payload}
        }
        export const {handleChange, handleClear, setEditJob}=jobSlice.actions;
    
    Job.js
    import { setEditJob } from '../features/job/jobSlice';
    onClick={()=> dispatch(setEditJob({editJobId: _id, position, company, jobLocation, status, jobType}))}
----
ii) jobSlice.js
export const editJob = createAsyncThunk("allJobs/editJob", async({jobId, job}, thunkAPI) => {
    try {
        const response = await customFetch.patch(`/jobs/${jobId}`, job, {
                headers: {
                    authorization: `Bearer ${thunkAPI.getState().user.user.token}`  
                }
        })
            return response.data;
    } catch (error) {
        return thunkAPI.rejectWithValue("There was an error editing the job!");
    }
  })

extraReducers:
//edit job
          .addCase(editJob.pending, (state, action) => {
            state.isLoading = true;
          })
          .addCase(editJob.fulfilled, (state, {payload}) => {
            state.isLoading = false;
            toast.success("Job Modified!");
          })
          .addCase(editJob.rejected, (state, {payload}) => {
            state.isLoading = false;
            toast.error(payload);
          })
  
  AddJob.js
  const onSubmit = (e) => {
    .....................
    if (isEditing) {
      dispatch(editJob({
        jobId: editJobId,
        job: { position, company, jobLocation, jobType, status }
      }));
    } else {
      dispatch(createJob({ position, company, jobLocation, jobType, status }));
    }
  }
```````````````
------------------------------------------------------------------------------
#### 53) Test user
Register.js
 <button type="button" className="btn btn-block btn-hipster" disabled={isLoading}
            onClick={()=> dispatch(loginUser({email: "testUser@test.com", password: "secret"}))}>
              {isLoading ? "Loading.." : "Demo App"}
            </button>

-------------------------------------------------------------------------------
### 54)





