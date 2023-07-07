import styled from "styled-components";
import Navbar from "../components/shared/Navbar";
import Announcement from "../components/shared/Announcement";
import Products from "../components/shared/Products";
import Newsletter from "../components/shared/Newsletter";
import Footer from "../components/shared/Footer";
import { mobile } from "../responsive";
// import { useLocation } from "react-router-dom";
import { useState } from "react";

const Container = styled.div``;

// const Title = styled.h1`
//   margin: 20px;
// `;

const FilterContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Filter = styled.div`
  margin: 20px;
  ${mobile({ width: "0px 20px", display: "flex", flexDirection: "column" })}
`;

const FilterText = styled.span`
  font-size: 20px;
  font-weight: 600;
  margin-right: 20px;
  ${mobile({ marginRight: "0px" })}
`;

const Select = styled.select`
  padding: 10px;
  margin-right: 20px;
  ${mobile({ margin: "10px 0px" })}
`;
const Option = styled.option``;

const ProductList = () => {
  // const location = useLocation();
  // const category = location.pathname.split("/")[2];
  const [filters, setFilters] = useState({});
  const [sort, setSort] = useState("newest");
  const [category, setCategory] = useState();

  const handleFilters = (e) => {
    const value = e.target.value;
    setFilters({
      ...filters,
      [e.target.name]: value,
    });
  };

  const handleSort = (e) => {
    const value = e.target.value;
    setSort(value);
  };

  const handleCategory = (e) => {
    const value = e.target.value;

    setCategory(value);
  };
  return (
    <Container>
      <Navbar />
      <Announcement />
      {/* <Title style={{ textTransform: "capitalize" }}>{category}</Title> */}
      <FilterContainer>
        <Filter>
          <FilterText>Filter Products:</FilterText>
          <label>Category: </label>
          <Select name="category" defaultValue="" onChange={handleCategory}>
            <Option value="">All</Option>
            <Option>women</Option>
            <Option>coat</Option>
            <Option>jeans</Option>
          </Select>
          <label>Color: </label>
          <Select name="color" defaultValue="" onChange={handleFilters}>
            <Option value="">All</Option>
            <Option>White</Option>
            <Option>Black</Option>
            <Option>Red</Option>
            <Option>Blue</Option>
            <Option>Yellow</Option>
            <Option>Green</Option>
          </Select>
          <label>Size: </label>
          <Select name="size" defaultValue="" onChange={handleFilters}>
            <Option value="">All</Option>
            <Option>XS</Option>
            <Option>S</Option>
            <Option>M</Option>
            <Option>L</Option>
            <Option>XL</Option>
          </Select>
        </Filter>
        <Filter>
          <FilterText>Sort Products:</FilterText>
          <Select onChange={handleSort}>
            <Option value="newest">Newest</Option>
            <Option value="asc">Price (asc)</Option>
            <Option value="desc">Price (desc)</Option>
          </Select>
        </Filter>
      </FilterContainer>
      <Products category={category} filters={filters} sort={sort} />
      <Newsletter />
      <Footer />
    </Container>
  );
};

export default ProductList;
