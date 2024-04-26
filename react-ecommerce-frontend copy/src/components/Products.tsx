import axios from "axios";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { popularProducts } from "../data";
import Product from "./Product";

const Container = styled.div`
  display: flex;
  padding: 20px;
  flex-wrap: wrap;
  justify-content: space-between;
`;

interface IProducts {
  category?: string;
  filters?: {};
  sort?: string;
}

const Products = (props: IProducts) => {
  const { category, filters, sort } = props;

  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    const getProducts = async () => {
      try {
        const res = await axios.get(
          category
            ? `${process.env.REACT_APP_BACKEND_URL}/api/product/get-all-products?category=${category}`
            : `${process.env.REACT_APP_BACKEND_URL}/api/product/get-all-products`
        );
        setProducts(res.data.products ?? []);
      } catch (error) {
        error;
      }
    };
    getProducts();
  }, [category]);
  

  useEffect(() => {
    category &&
    setFilteredProducts(
      products.filter((item) =>
        Object.entries(filters).every(([key, value]) => item[key].includes(value))
      )
      );
    }, [products, category, filters]);


  useEffect(() => {
    if(sort === "newest") {
      setFilteredProducts(prev => 
        [...prev].sort((a,b) => a.createdAt -  b.createdAt)
        );
    } else if (sort === "asc") {
      setFilteredProducts(prev => 
        [...prev].sort((a,b) => a.price -  b.price)
        );
      } else {
        setFilteredProducts(prev => 
          [...prev].sort((a,b) => b.price -  a.price)
          );
        } 
  }, [sort])

  return (
    <Container>
      {category 
        ? filteredProducts.map((item) => <Product item={item} key={item._id} />)
        : products
            .slice(0, 8)
            .map((item) => <Product item={item} key={item._id} />)}
    </Container>
  );
};

export default Products;
