import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { loginUser } from '../../api';
import StorageService from '../../services/StorageService';
let Storage = new StorageService();

const name = "user";
const initialState = createInitialState();
const reducers = createReducers();
const extraActions = createExtraActions();
const extraReducers = createExtraReducers();
const userSlice = createSlice({name, initialState, reducers, extraReducers})


export const authActions = { ...userSlice.actions, ...extraActions };
export default userSlice.reducer

function createInitialState(){
  return  {
    user: Storage.getUser(),
    token: Storage.getToken(),
    isLoading: false,
    isError: false,
    counter: 0,
    errorMessage:false
  }
}

function createReducers(){
  return {
    startLogin,
    logout,
    setAuth
  }
  function startLogin(state, action) {
    state.isLoading = true;
  };
  function logout(state, action) {
    state.user = null;
    state.token = null;
    state.isLoading = false;
    state.isError = false;
  };
  function setAuth(state, action){
    state.user = action.payload.user;
    state.token = action.payload.token;
  }
}


function createExtraActions() {
  return {
      login: login()
  };    

  function login() {
      return createAsyncThunk(
        `${name}/login`,
        async ({email,password}) => await loginUser({ email, password })
      );
  }
}

function createExtraReducers() {
  return {
      ...login()
  };

  function login() {
      var { pending, fulfilled, rejected } = extraActions.login;
      return {
          [pending]: (state) => {
              state.isError = false;
          },
          [fulfilled]: (state, action) => {
              const {statusCode, access_token, user, error} = action.payload;
              state.isLoading = false;
              // console.log(statusCode);
              // console.log(access_token);
              if(statusCode !== 200){
                
                state.user = null;
                state.token = null;
                state.isError = true;
              }else{
                state.user = user;
                state.token = access_token;
                Storage.setToken(access_token);
                Storage.setUser(user);
              }
          },
          [rejected]: (state, action) => {
              state.isLoading = false;
              state.isError = true;
              state.errorMessage = action.error;
          }
      };
  }
}

