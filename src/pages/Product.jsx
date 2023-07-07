import { Add, Remove } from "@mui/icons-material";
import styled from "styled-components";
import Announcement from "../components/shared/Announcement";
import Footer from "../components/shared/Footer";
import Navbar from "../components/shared/Navbar";
import Newsletter from "../components/shared/Newsletter";
import { mobile } from "../responsive";
import { useNavigate, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { publicRequest } from "../api/axios";
import { addProduct } from "../redux/cartRedux";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, toast, Zoom } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Container = styled.div``;

const Wrapper = styled.div`
  padding: 50px;
  display: flex;
  ${mobile({ padding: "10px", flexDirection: "column" })}
`;

const ImgContainer = styled.div`
  flex: 1;
`;

const Image = styled.img`
  width: 100%;
  height: 90vh;
  object-fit: cover;
  ${mobile({ height: "40vh" })}
`;

const InfoContainer = styled.div`
  flex: 1;
  padding: 0px 50px;
  ${mobile({ padding: "10px" })}
`;

const Title = styled.h1`
  font-weight: 200;
`;

const Desc = styled.p`
  margin: 20px 0px;
`;

const Price = styled.span`
  font-weight: 100;
  font-size: 40px;
`;

const FilterContainer = styled.div`
  width: 50%;
  margin: 30px 0px;
  display: flex;
  justify-content: space-between;
  ${mobile({ width: "100%" })}
`;

const Filter = styled.div`
  display: flex;
  align-items: center;
`;

const FilterTitle = styled.span`
  font-size: 20px;
  font-weight: 200;
`;

const FilterColor = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: ${(props) => props.color};
  margin: 0px 5px;
  cursor: pointer;
`;

const FilterSize = styled.select`
  margin-left: 10px;
  padding: 5px;
`;

const FilterSizeOption = styled.option``;

const AddContainer = styled.div`
  width: 50%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  ${mobile({ width: "100%" })}
`;

const AmountContainer = styled.div`
  display: flex;
  align-items: center;
  font-weight: 700;
`;

const Amount = styled.span`
  width: 30px;
  height: 30px;
  border-radius: 10px;
  border: 1px solid teal;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0px 5px;
`;

const Button = styled.button`
  padding: 15px;
  border: 2px solid teal;
  background-color: white;
  cursor: pointer;
  font-weight: 500;

  &:hover {
    background-color: #f8f4f4;
  }
`;

const Product = () => {
  const location = useLocation();
  const productId = location.pathname.split("/")[2];
  const [product, setProduct] = useState({});
  const [quantity, setQuantity] = useState(1);
  const [color, setColor] = useState("");
  const [size, setSize] = useState("");
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.user.currentUser);
  const navigate = useNavigate();

  useEffect(() => {
    const getProduct = async () => {
      try {
        const result = await publicRequest.get(`/products/${productId}`);

        setProduct(result.data);
      } catch (error) {
        console.log(error);
      }
    };
    getProduct();
  }, [productId]);

  const handleQty = (t) => {
    console.log(t);
    if (t === "add") {
      setQuantity((p) => p + 1);
    } else {
      quantity > 1 && setQuantity((p) => p - 1);
    }
  };

  const handleCart = () => {
    if (!currentUser) {
      return navigate("/login");
    }

    if (!color || !size) {
      return toast.error("Color and Size required!", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        toastId: 1,
        transition: Zoom,
      });
    }
    dispatch(addProduct({ ...product, quantity, color, size }));
    toast.success("Added to Cart!", {
      position: "top-center",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
      toastId: 1,
      transition: Zoom,
    });
  };

  return (
    <Container>
      <Navbar />
      <Announcement />
      <Wrapper>
        <ImgContainer>
          <Image src={product.img} />
        </ImgContainer>
        <InfoContainer>
          <Title>{product.title}</Title>
          <Desc>{product.desc}</Desc>
          <Price>{product.price}</Price>
          <FilterContainer>
            <Filter>
              <FilterTitle>Color</FilterTitle>
              {product.color?.map((c) => (
                <FilterColor
                  color={c}
                  key={c}
                  style={color === c ? { border: "3px black solid" } : {}}
                  onClick={() => {
                    setColor(c);
                  }}
                />
              ))}
            </Filter>
            <Filter>
              <FilterTitle>Size</FilterTitle>
              <FilterSize
                defaultValue=""
                onChange={(e) => setSize(e.target.value)}
              >
                <option disabled value="">
                  -
                </option>
                {product.size?.map((s) => (
                  <FilterSizeOption key={s}>{s}</FilterSizeOption>
                ))}
              </FilterSize>
            </Filter>
          </FilterContainer>
          <AddContainer>
            <AmountContainer>
              <Remove onClick={() => handleQty("minus")} />
              <Amount>{quantity}</Amount>
              <Add onClick={() => handleQty("add")} />
            </AmountContainer>
            <Button onClick={handleCart}>ADD TO CART</Button>
            <ToastContainer limit={1} />
          </AddContainer>
        </InfoContainer>
      </Wrapper>
      <Newsletter />
      <Footer />
    </Container>
  );
};

export default Product;
