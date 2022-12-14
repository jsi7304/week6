import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import Cookies from "universal-cookie";
const cookies = new Cookies();

const API_TODOS = process.env.REACT_APP_TODOS_API_URL;
const API_COMMENT = process.env.REACT_APP_COMMENTS_API_URL;

const initialState = {
  todos: [],
  isLoading: false,
  error: null,
};
console.log("ETCSLICE_COOKIES=>", cookies.get("Authorization"));

export const __getTodos = createAsyncThunk(
  "todos/getTodos",
  async (payload, thunkAPI) => {
    try {
      const refresh_token = cookies.get("Authorization");

      const data = await axios.get(`${process.env.REACT_APP_IP_ADDRESS}/article/all`,{

        headers: {
          Authorization: refresh_token,
        },
      });
      return thunkAPI.fulfillWithValue(data.data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const __deleteTodos = createAsyncThunk(
  "todos/deleteTodos",
  async (payload, thunkAPI) => {
    try {
      console.log("__deleteTodos=>", payload);
      const refresh_token = cookies.get("Authorization");

      const data = await axios.delete(`${process.env.REACT_APP_IP_ADDRESS}/article/auth/${payload}`,{
        headers: {
          Authorization: refresh_token
        },
      });

      thunkAPI.dispatch(__getTodos());
      return thunkAPI.fulfillWithValue(data.data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const __postTodos = createAsyncThunk(
  "todos/postTodos",
  async (payload, thunkAPI) => {
    try {
      const refresh_token = cookies.get("Authorization");

      const data = await axios.post(`${process.env.REACT_APP_IP_ADDRESS}/article/auth`, payload,{
        headers: {
          Authorization: refresh_token
        },
      });

      return thunkAPI.fulfillWithValue(data.data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const __putTodos = createAsyncThunk(
  "todos/putTodos",
  async (payload, thunkAPI) => {
    try {
      console.log("__putTodos=>", payload);
      const refresh_token = cookies.get("Authorization");

      await axios.patch(`${process.env.REACT_APP_IP_ADDRESS}/article/auth/${payload.id}`, payload,{
        headers: {
          Authorization: refresh_token
        },
      });

      //await axios.patch(`${API_TODOS}/${payload.id}`, payload);
      return thunkAPI.fulfillWithValue(payload);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const etcSlice = createSlice({
  name: "etc",
  initialState,
  reducers: {},
  extraReducers: {
    [__getTodos.pending]: (state) => {
      state.isLoading = true;
    },
    [__getTodos.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.todos = action.payload;
    },
    [__getTodos.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    [__deleteTodos.pending]: (state) => {
      state.isLoading = true;
    },
    [__deleteTodos.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.todos.filter((todo) => todo.id !== action.payload);
    },
    [__deleteTodos.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    [__postTodos.pending]: (state) => {
      state.isLoading = true; // ???????????? ????????? ???????????? ??????????????? true??? ???????????????.
    },
    [__postTodos.fulfilled]: (state, action) => {
      state.isLoading = false; // ???????????? ????????? ????????????, false??? ???????????????.
      state.todos.push(action.payload); // Store??? ?????? todos??? ???????????? ????????? todos??? ????????????.
    },
    [__postTodos.rejected]: (state, action) => {
      state.isLoading = false; // ????????? ???????????????, ???????????? ????????? ????????????, false??? ???????????????.
      state.error = action.payload; // catch ??? error ????????? state.error??? ????????????.
    },
    [__putTodos.pending]: (state) => {
      state.isLoading = true; // ???????????? ????????? ???????????? ??????????????? true??? ???????????????.
    },
    [__putTodos.fulfilled]: (state, action) => {
      state.isLoading = false; // ???????????? ????????? ????????????, false??? ???????????????.
      // state.todos = action.payload
      state.todos = state.todos.map((todo) => {
        if (todo.id === action.payload.id) {
          return { ...todo, content: action.payload.content };
        } else {
          return todo;
        }
      });
    },
    [__putTodos.rejected]: (state, action) => {
      state.isLoading = false; // ????????? ???????????????, ???????????? ????????? ????????????, false??? ???????????????.
      state.error = action.payload; // catch ??? error ????????? state.error??? ????????????.
    },
  },
});

export const {} = etcSlice.actions;
export default etcSlice.reducer;
