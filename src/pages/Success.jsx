import { useEffect, useState } from "react";
// import { useSelector } from "react-redux";
import { useLocation } from "react-router";
import { Link } from "react-router-dom";
import { userRequest } from "../api/axios";

const Success = () => {
  const location = useLocation();

  const data = location.state.stripeData;
  const cart = location.state.cart;

  // const currentUser = useSelector((state) => state.user.currentUser);
  const [orderId, setOrderId] = useState(null);
  const currentUser = "63b59f4bc8f683ed3de50fda";
  useEffect(() => {
    const createOrder = async () => {
      try {
        const res = await userRequest.post("/orders", {
          userId: currentUser,
          products: cart.products.map((item) => ({
            productId: item._id,
            quantity: item._quantity,
          })),
          amount: cart.total,
          address: data.billing_details.address,
        });
        setOrderId(res.data._id);
      } catch (error) {
        console.log(error);
      }
    };
    data && createOrder();
  }, [cart, data, currentUser]);

  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {orderId
        ? `Order has been created successfully. Your order number is ${orderId}`
        : `Failed Order.`}
      <Link to="/">
        <button style={{ padding: 10, marginTop: 20 }}>Go to Homepage</button>
      </Link>
    </div>
  );
};

export default Success;
