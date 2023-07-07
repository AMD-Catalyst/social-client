import Add from "@mui/icons-material/Add";
import Remove from "@mui/icons-material/Remove";
import DeleteForeverOutlinedIcon from "@mui/icons-material/DeleteForeverOutlined";
import ButtonM from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

import styled from "styled-components";
import Announcement from "../components/shared/Announcement";
import Footer from "../components/shared/Footer";
import Navbar from "../components/shared/Navbar";
import { mobile } from "../responsive";
import { useSelector } from "react-redux";
import StripeCheckout from "react-stripe-checkout";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { userRequest } from "../api/axios";

const KEY = process.env.REACT_APP_STRIPE;

const Container = styled.div``;

const Wrapper = styled.div`
  padding: 20px;
  ${mobile({ padding: "10px" })}
`;

const Title = styled.h1`
  font-weight: 300;
  text-align: center;
`;

const Top = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px;
`;

const TopButton = styled.button`
  padding: 10px;
  font-weight: 600;
  cursor: pointer;
  border: ${(props) => props.type === "filled" && "none"};
  background-color: ${(props) =>
    props.type === "filled" ? "black" : "transparent"};
  color: ${(props) => props.type === "filled" && "white"};
`;

const TopTexts = styled.div`
  ${mobile({ display: "none" })}
`;
const TopText = styled.span`
  text-decoration: underline;
  cursor: pointer;
  margin: 0px 10px;
`;

const Bottom = styled.div`
  display: flex;
  justify-content: space-between;
  ${mobile({ flexDirection: "column" })}
`;

const Info = styled.div`
  flex: 3;
`;

const Product = styled.div`
  display: flex;
  justify-content: space-between;
  position: relative;
  ${mobile({ flexDirection: "column" })}
`;

const ProductDetail = styled.div`
  flex: 2;
  display: flex;
`;

const Image = styled.img`
  width: 200px;
  cursor: pointer;
`;

const Details = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`;

const ProductName = styled.span`
  font-weight: 500;
  cursor: pointer;
`;

// const ProductId = styled.span``;

const ProductColor = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: ${(props) => props.color};
`;

const ProductSize = styled.span``;

const PriceDetail = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const ProductAmountContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
`;

const ProductAmount = styled.div`
  font-size: 24px;
  margin: 5px;
  ${mobile({ margin: "5px 15px" })}
`;

const ProductPrice = styled.div`
  font-size: 30px;
  font-weight: 200;
  ${mobile({ marginBottom: "20px" })}
`;

const Hr = styled.hr`
  background-color: #eee;
  border: none;
  height: 1px;
`;

const Summary = styled.div`
  flex: 1;
  border: 0.5px solid lightgray;
  border-radius: 10px;
  padding: 20px;
  height: 50vh;
`;

const SummaryTitle = styled.h1`
  font-weight: 200;
`;

const SummaryItem = styled.div`
  margin: 30px 0px;
  display: flex;
  justify-content: space-between;
  font-weight: ${(props) => props.type === "total" && "500"};
  font-size: ${(props) => props.type === "total" && "24px"};
`;

const SummaryItemText = styled.span``;

const SummaryItemPrice = styled.span``;

const Button = styled.button`
  width: 100%;
  padding: 10px;
  background-color: black;
  color: white;
  font-weight: 600;
  cursor: pointer;
  &:disabled {
    background-color: gray;
    cursor: not-allowed;
  }
`;

const RemoveButton = styled.button`
  position: absolute;
  right: 10px;
  top: 10px;
  background-color: purple;
  border-radius: 5px;
  color: white;
  border: none;
`;

const Cart = () => {
  const cart = useSelector((state) => state.cart);
  const { currentUser } = useSelector((state) => state.user);
  const [stripeToken, setStripeToken] = useState(null);
  const navigate = useNavigate();

  const onToken = (token) => {
    setStripeToken(token);
  };

  useEffect(() => {
    const makeRequest = async () => {
      try {
        const res = await userRequest.post("/checkout/payment", {
          tokenId: stripeToken.id,
          amount: cart.total,
        });
        navigate("/success", {
          state: {
            stripeData: res.data,
            cart: cart,
          },
        });
      } catch (error) {
        console.log(error);
      }
    };
    stripeToken && makeRequest();
  }, [stripeToken, cart, navigate]);

  const [openRemove, setOpenRemove] = useState(false);

  const handleClickOpen = () => {
    setOpenRemove(true);
  };

  const handleYes = () => {
    setOpenRemove(false);
  };

  const handleNo = () => {
    setOpenRemove(false);
  };

  const handleCartProduct = (productId) => [navigate(`/product/${productId}`)];

  return (
    <Container>
      <Navbar />
      <Announcement />
      <Wrapper>
        <Title>YOUR BAG</Title>
        <Top>
          <TopButton onClick={() => navigate("/products")}>
            CONTINUE SHOPPING
          </TopButton>
          <TopTexts>
            <TopText>Shopping Bag({cart.quantity})</TopText>
            <TopText>Your Wishlist (0)</TopText>
          </TopTexts>
          {/* <TopButton type="filled">CHECKOUT NOW</TopButton> */}
        </Top>
        <Bottom>
          {cart.products.length > 0 ? (
            <>
              <Info>
                {cart.products?.map((product) => (
                  <Product key={product._id}>
                    <ProductDetail>
                      <Image
                        src={product.img}
                        onClick={() => handleCartProduct(product._id)}
                      />
                      <Details>
                        <ProductName
                          onClick={() => handleCartProduct(product._id)}
                        >
                          {product.title}
                        </ProductName>
                        {/* <ProductId>
                      <b>ID:</b> {product._id}
                    </ProductId> */}
                        <ProductColor color={product.color} />
                        <ProductSize>
                          <b>Size:</b> {product.size}
                        </ProductSize>
                      </Details>
                    </ProductDetail>
                    <PriceDetail>
                      <ProductAmountContainer>
                        <Add />
                        <ProductAmount>{product.quantity}</ProductAmount>
                        <Remove />
                      </ProductAmountContainer>
                      <ProductPrice>
                        $ {product.price * product.quantity}
                      </ProductPrice>
                    </PriceDetail>
                    <RemoveButton onClick={handleClickOpen}>
                      <DeleteForeverOutlinedIcon />
                    </RemoveButton>
                    <Dialog
                      open={openRemove}
                      aria-labelledby="alert-dialog-title"
                      aria-describedby="alert-dialog-description"
                    >
                      <DialogTitle id="alert-dialog-title">
                        Are you sure?
                      </DialogTitle>
                      <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                          Remove Product from Cart?
                        </DialogContentText>
                      </DialogContent>
                      <DialogActions>
                        <ButtonM onClick={handleYes}>Yes</ButtonM>
                        <ButtonM onClick={handleNo} autoFocus>
                          No
                        </ButtonM>
                      </DialogActions>
                    </Dialog>
                  </Product>
                ))}

                <Hr />
              </Info>
              <Summary>
                <SummaryTitle>ORDER SUMMARY</SummaryTitle>
                <SummaryItem>
                  <SummaryItemText>Subtotal</SummaryItemText>
                  <SummaryItemPrice>$ {cart.total}</SummaryItemPrice>
                </SummaryItem>
                <SummaryItem>
                  <SummaryItemText>Estimated Shipping</SummaryItemText>
                  <SummaryItemPrice>$ 5.90</SummaryItemPrice>
                </SummaryItem>
                <SummaryItem>
                  <SummaryItemText>Shipping Discount</SummaryItemText>
                  <SummaryItemPrice>$ -5.90</SummaryItemPrice>
                </SummaryItem>
                <SummaryItem type="total">
                  <SummaryItemText>Total</SummaryItemText>
                  <SummaryItemPrice>$ {cart.total}</SummaryItemPrice>
                </SummaryItem>
                <StripeCheckout
                  name="E-COMMERCE"
                  billingAddress
                  shippingAddress
                  description={`Your total is $${cart.total}`}
                  amount={cart.total * 100}
                  token={onToken}
                  stripeKey={KEY}
                >
                  <Button disabled={!currentUser || cart.quantity === 0}>
                    CHECKOUT NOW
                  </Button>
                </StripeCheckout>
              </Summary>
            </>
          ) : (
            <div>Nothing inside your cart. Continue Shopping?</div>
          )}
        </Bottom>
      </Wrapper>
      <Footer />
    </Container>
  );
};

export default Cart;
