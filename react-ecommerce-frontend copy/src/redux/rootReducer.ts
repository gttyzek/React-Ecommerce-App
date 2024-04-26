import { combineReducers } from "redux";
import cartReducer from "./cartSlice";
import loginReducer from "./loginSlice";
import productReducer from "./productSlice";
import userReducer from "./userSlice"

const rootReducer = combineReducers({
  cart: cartReducer,
  userLogin: loginReducer,
  product: productReducer,
  user: userReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
