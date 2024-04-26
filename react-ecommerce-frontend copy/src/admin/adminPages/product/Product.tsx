import { Link, useLocation } from "react-router-dom";
import "./product.css";
import Chart from "../../adminComponents/chart/Chart";
import { Publish } from "@material-ui/icons";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../redux/rootReducer";
import { useEffect, useMemo, useState } from "react";
import { userRequest } from "../../../axios";
import { updateProduct } from "../../../redux/apiCalls";

export default function Product() {
  const location = useLocation();
  const productId = location.pathname.split("/")[3];
  const [productStats, setProductStats] = useState([]);
  const [inputs, setInputs] = useState({});
  const [file, setFile] = useState(null);
  const [categories, setCategories] = useState([]);
  const [size, setSize] = useState([]);
  const [color, setColor] = useState([]);

  const dispatch = useDispatch();

  const product = useSelector((state: RootState) =>
    state.product.products.find((eachProduct) => eachProduct._id === productId)
  );

  const MONTHS = useMemo(
    () => [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ],
    []
  );

  useEffect(() => {
    const getProductStats = async () => {
      try {
        const res = await userRequest.get(
          "/api/order/get-monthly-stats?productId=" + productId
        );
        const list = res.data.income.sort((a, b) => {
          return a._id - b._id;
        });
        list.map((item) =>
          setProductStats((prev) => [
            ...prev,
            { name: MONTHS[item._id - 1], Sales: item.total },
          ])
        );
      } catch (error) {
        error;
      }
    };
    getProductStats();
  }, [productId, MONTHS]);

  const handleChange = (e) => {
    setInputs((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  const handleCategories = (e) => {
    setCategories(e.target.value.split(","));
  };
  const handleSize = (e) => {
    setSize(e.target.value.split(","));
  };
  const handleColor = (e) => {
    setColor(e.target.value.split(","));
  };

  const handleClick = (e) => {
    e.preventDefault();
    const product = {
      ...inputs,
      image: file,
      categories: categories,
      size: size,
      color: color,
    };
    updateProduct(productId, product, dispatch);
  };

  return (
    <div className="product">
      <div className="productTitleContainer">
        <h1 className="productTitle">Product</h1>
        <Link to="/dashboard/newproduct">
          <button className="productAddButton">Create</button>
        </Link>
      </div>
      <div className="productTop">
        <div className="productTopLeft">
          <Chart
            data={productStats}
            dataKey="Sales"
            grid
            title="Sales Performance"
          />
        </div>
        <div className="productTopRight">
          <div className="productInfoTop">
            <img src={product.image} alt="" className="productInfoImg" />
            <span className="productName">{product.title}</span>
          </div>
          <div className="productInfoBottom">
            <div className="productInfoItem">
              <span className="productInfoKey">id:</span>
              <span className="productInfoValue">{product._id}</span>
            </div>
            <div className="productInfoItem">
              <span className="productInfoKey">price:</span>
              <span className="productInfoValue">{product.price}</span>
            </div>
            <div className="productInfoItem">
              <span className="productInfoKey">in stock:</span>
              <span className="productInfoValue">{product.inStock}</span>
            </div>
          </div>
        </div>
      </div>
      <div className="productBottom">
        <form className="productForm">
          <div className="productFormLeft">
            <label>Title</label>
            <input
              type="text"
              placeholder={product.title}
              name="title"
              onChange={handleChange}
            />
            <label>Description</label>
            <input
              type="text"
              name="description"
              placeholder="product description..."
              onChange={handleChange}
            />
            <label>Categories</label>
            <input
              type="text"
              placeholder="bag, hat, jeans"
              onChange={handleCategories}
            />
            <label>Size</label>
            <input type="text" placeholder="M, L, XL" onChange={handleSize} />
            <label>Color</label>
            <input
              type="text"
              placeholder="green, blue"
              onChange={handleColor}
            />
            <label>Price</label>
            <input
              type="text"
              name="price"
              placeholder={product.price}
              onChange={handleChange}
            />
            <label>In Stock</label>
            <select name="inStock" id="inStock" onChange={handleChange}>
              <option value="true">True</option>
              <option value="false">False</option>
            </select>
          </div>
          <div className="productFormRight">
            <div className="productUpload">
              <img src={product.image} alt="" className="productUploadImg" />
              <label htmlFor="file">
                <Publish />
              </label>
              <input
                type="file"
                id="file"
                style={{ display: "none" }}
                onChange={(e) => setFile(e.target.files[0])}
              />
            </div>
            <button className="productButton" onClick={handleClick}>
              Update
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
