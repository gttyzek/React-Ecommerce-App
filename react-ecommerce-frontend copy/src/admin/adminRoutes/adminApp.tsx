import Sidebar from "../adminComponents/sidebar/Sidebar";
import Topbar from "../adminComponents/topbar/Topbar";
import "./adminApp.css";
import AdminHome from "../adminPages/home/Home";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import UserList from "../adminPages/userList/UserList";
import User from "../adminPages/user/User";
import NewUser from "../adminPages/newUser/NewUser";
import ProductList from "../adminPages/productList/ProductList";
import Product from "../adminPages/product/Product";
import NewProduct from "../adminPages/newProduct/NewProduct";

function adminDashboard() {
  return (
    <>
      <Topbar />
      <div className="container">
        <Sidebar />
        <Routes>
          <Route path="/" element={<AdminHome />} />
          <Route path="/users" element={<UserList />} />
          <Route path="/user/:userId" element={<User />} />
          <Route path="/newUser" element={<NewUser />} />
          <Route path="/products" element={<ProductList />} />
          <Route path="/product/:productId" element={<Product />} />
          <Route path="/newproduct" element={<NewProduct />} />
        </Routes>
      </div>
    </>
  );
}

export default adminDashboard;
