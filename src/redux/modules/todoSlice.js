// import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
// import axios from "axios";
// import { setRefreshTokenToCookie } from "../../components/Login";
// import Cookies from "universal-cookie";
// const cookies = new Cookies();
// const refresh_token = cookies.get("Authorization");

// const IP_ADDRESS = process.env.REACT_APP_IP_ADDRESS;

// const initialState = {
//   overChk: false,
//   userInfo: [],
//   response: [],
//   todo: [],
// };

// export const __postUserInfo = createAsyncThunk(
//   "todos/postSignin",
//   async (payload, thunkAPI) => {
//     try {
//       console.log("__postUserInfo=>", payload);
//       const data = await axios.post(
//         `http://52.78.17.178/api/member/signup`,
//         payload
//       );
//       console.log("로그인데이터:", data);
//       return thunkAPI.fulfillWithValue(data.data);
//     } catch (error) {
//       return thunkAPI.rejectWithValue(error);
//     }
//   }
// );

// export const todoSlice = createSlice({
//   name: "todo",
//   initialState,
//   reducers: {},
//   extraReducers: {
//     [__postUserInfo.pending]: (state) => {
//       state.isLoading = true; // 네트워크 요청이 시작되면 로딩상태를 true로 변경합니다.
//     },
//     [__postUserInfo.fulfilled]: (state, action) => {
//       state.isLoading = false; // 네트워크 요청이 끝났으니, false로 변경합니다.
//       state.todos.push(action.payload); // Store에 있는 todos에 서버에서 가져온 todos를 넣습니다.
//     },
//     [__postUserInfo.rejected]: (state, action) => {
//       state.isLoading = false; // 에러가 발생했지만, 네트워크 요청이 끝났으니, false로 변경합니다.
//       state.overChk = "success";
//       state.error = action.payload; // catch 된 error 객체를 state.error에 넣습니다.
//     },
//   },
// });

// export const {} = todoSlice.actions;
// export default todoSlice.reducer;
