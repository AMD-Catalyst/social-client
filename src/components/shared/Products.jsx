import { useEffect, useState } from "react";
import styled from "styled-components";
// import { popularProducts } from "../../data";
import Product from "./Product";
import { publicRequest } from "../../api/axios";
import SyncLoader from "react-spinners/SyncLoader";

const Container = styled.div`
  padding: 20px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
`;

const Products = ({ category, filters, sort, homeProduct }) => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  useEffect(() => {
    const controller = new AbortController();

    const getProducts = async () => {
      setIsLoading(true);
      setError(false);
      try {
        const result = await publicRequest.get(
          category
            ? `/products?category=${category}`
            : homeProduct
            ? `/products?homeProduct=${homeProduct}`
            : `/products`,
          {
            signal: controller.signal,
          }
        );
        setProducts(result.data);
        setFilteredProducts(result.data);
      } catch (error) {
        if (error.message === "canceled") {
          console.log("Request: " + error.message);
          return;
        }
        setError(true);
        console.log(error);
      }
      setIsLoading(false);
    };

    getProducts();

    return () => {
      controller.abort();
    };
  }, [category, homeProduct]);

  useEffect(() => {
    category &&
      setFilteredProducts(
        products.filter((item) =>
          Object.entries(filters).every(([key, value]) =>
            item[key].includes(value)
          )
        )
      );
  }, [products, category, filters]);

  useEffect(() => {
    if (sort === "newest") {
      setFilteredProducts((prev) =>
        [...prev].sort((a, b) => a.createdAt - b.createdAt)
      );
    } else if (sort === "asc") {
      setFilteredProducts((prev) =>
        [...prev].sort((a, b) => a.price - b.price)
      );
    } else if (sort === "desc") {
      setFilteredProducts((prev) =>
        [...prev].sort((a, b) => b.price - a.price)
      );
    }
  }, [sort]);

  return (
    <Container>
      {error ? (
        "Something went wrong"
      ) : isLoading ? (
        <SyncLoader color="#36d7b7" />
      ) : filteredProducts.length > 0 ? (
        filteredProducts.map((item) => <Product item={item} key={item._id} />)
      ) : (
        "No Record Found"
      )}
    </Container>
  );
};

export default Products;
