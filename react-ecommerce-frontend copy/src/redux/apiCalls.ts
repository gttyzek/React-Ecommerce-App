import { publicRequest, publicRequest2, userRequest, userRequest2 } from "../axios";
import {
  registerStart,
  registerSuccess,
  registerFailure,
  getUserStart,
  getUserSuccess,
  getUserFailure,
  updateUserStart,
  updateUserSuccess,
  updateUserFailure,
  deleteUserStart,
  deleteUserSuccess,
  deleteUserFailure,
} from "./userSlice";
import { loginFailure, loginStart, loginSuccess } from "./loginSlice";
import {
  getProductStart,
  getProductSuccess,
  getProductFailure,
  deleteProductStart,
  deleteProductSuccess,
  deleteProductFailure,
  updateProductStart,
  updateProductSuccess,
  updateProductFailure,
  addProductStart,
  addProductSuccess,
  addProductFailure,
} from "./productSlice";



export const login = async (dispatch, user) => {

  
  dispatch(loginStart());
  try {
    const res = await publicRequest.post("/api/users/login", user);
    localStorage.setItem("token", res.data.token);
    dispatch(loginSuccess(res.data));
  } catch (error) {
    dispatch(loginFailure());
  }
};

export const register = async (dispatch, user) => {
  dispatch(registerStart());
  try {
    const res = await publicRequest2.post("/api/users/register", user);
    dispatch(registerSuccess(res.data));
  } catch (error) {
    dispatch(registerFailure());
  }
};

export const getUsers = async (dispatch) => {
  dispatch(getUserStart());
  try {
    const res = await userRequest.get("/api/users/get-all-users");
    dispatch(getUserSuccess(res.data.users));
  } catch (error) {
    dispatch(getUserFailure());
  }
};

export const updateUsers = async (id, user, dispatch) => {
  dispatch(updateUserStart());
  try {
    const res = await userRequest2.put(`/api/users/update-profile/${id}`, user);
    dispatch(updateUserSuccess(res.data.user));
  } catch (error) {
    dispatch(updateUserFailure());
  }
};

export const deleteUser = async (id, dispatch) => {
  dispatch(deleteUserStart());
  try {
    const res = await userRequest.delete(`/api/users/delete-user/${id}`);
    dispatch(deleteUserSuccess(id));
  } catch (error) {
    dispatch(deleteUserFailure());
  }
};

export const getProducts = async (dispatch) => {
  dispatch(getProductStart());
  try {
    const res = await publicRequest.get("/api/product/get-all-products");
    dispatch(getProductSuccess(res.data.products));
  } catch (error) {
    dispatch(getProductFailure());
  }
};

export const deleteProduct = async (id, dispatch) => {
  dispatch(deleteProductStart());
  try {
    const res = await userRequest.delete(`/api/product/delete-product/${id}`);
    dispatch(deleteProductSuccess(id));
  } catch (error) {
    dispatch(deleteProductFailure());
  }
};

export const updateProduct = async (id, product, dispatch) => {
  dispatch(updateProductStart());
  try {
    const res = await userRequest2.put(`/api/product/update-product/${id}`, product);
    dispatch(updateProductSuccess(res.data.updatedProduct));
  } catch (error) {
    dispatch(updateProductFailure());
  }
};

export const addProduct = async (product, dispatch) => {
  dispatch(addProductStart());
  try {
    const res = await userRequest2.post(`/api/product/create-product`, product);
    dispatch(addProductSuccess(res.data.newproduct));
  } catch (error) {
    dispatch(addProductFailure());
  }
};
