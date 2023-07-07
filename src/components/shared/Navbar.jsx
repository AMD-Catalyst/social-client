import React from "react";
import styled from "styled-components";
import Search from "@mui/icons-material/Search";
import Badge from "@mui/material/Badge";
import IconButton from "@mui/material/IconButton";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import ShoppingBagOutlinedIcon from "@mui/icons-material/ShoppingBagOutlined";
import { mobile } from "../../responsive";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../redux/userRedux";
import { logoutCart } from "../../redux/cartRedux";

const Navbar = () => {
  const qty = useSelector((state) => state.cart.quantity);
  const { currentUser } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    dispatch(logoutCart());
    navigate("/login");
  };

  return (
    <Container>
      <Wrapper>
        <Left>
          <Language>EN</Language>
          <SearchContainer>
            <Input placeholder="Search" />
            <Search style={{ color: "white", fontSize: 16 }} />
          </SearchContainer>
          <Link
            to="/products"
            style={{
              color: "white",
              alignItems: "center",
              display: "flex",
              marginLeft: "25px",
            }}
          >
            <ShoppingBagOutlinedIcon />
            Shop Now
          </Link>
        </Left>
        <Center>
          <Link to="/" style={{ textDecoration: "None", color: "white" }}>
            <Logo>E-COMMERCE</Logo>
          </Link>
        </Center>
        <Right>
          <Link to="/cart">
            <IconButton aria-label="cart">
              <Badge badgeContent={qty} color="primary">
                <ShoppingCartOutlinedIcon style={{ color: "white" }} />
              </Badge>
            </IconButton>
          </Link>
          {currentUser ? (
            <>
              <ProfileMenu>
                <UserMenu>{currentUser.username}</UserMenu>
                <SubMenu>
                  <SubMenuList onClick={handleLogout}>Logout</SubMenuList>
                </SubMenu>
              </ProfileMenu>
            </>
          ) : (
            <>
              <MenuItem as={Link} to="/register">
                REGISTER
              </MenuItem>
              <MenuItem as={Link} to="/login">
                SIGN IN
              </MenuItem>
            </>
          )}
        </Right>
      </Wrapper>
    </Container>
  );
};

const Container = styled.div`
  height: 60px;
  background-color: purple;
  color: white;
  ${mobile({ height: "50px" })}
`;

const Wrapper = styled.div`
  padding: 10px 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  ${mobile({ padding: "10px 0px" })}
`;

const Left = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  ${mobile({ flex: 2 })}
`;

const Language = styled.span`
  font-size: 14px;
  cursor: pointer;
  ${mobile({ display: "none" })}
`;

const SearchContainer = styled.div`
  border: 0.5px solid lightcyan;
  border-radius: 5px;
  display: flex;
  align-items: center;
  margin-left: 25px;
  padding: 5px;
  ${mobile({ display: "none" })}
`;

const Input = styled.input`
  border: none;
  background-color: purple;
  color: white;
  &:focus {
    outline: none;
  }
  &::placeholder {
    color: white;
    opacity: 1;
  }
  ${mobile({ width: "50px" })}
`;

const Center = styled.div`
  flex: 1;
  text-align: center;
`;

const Logo = styled.h1`
  font-weight: bold;
  ${mobile({ display: "none" })}
`;

const Right = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  ${mobile({ flex: 2, justifyContent: "center" })}
`;

const MenuItem = styled.a`
  color: white;
  text-decoration: none;
  font-size: 14px;
  cursor: pointer;
  margin-left: 25px;
  ${mobile({ fontSize: "12px", marginLeft: "10px" })}
`;

const SubMenu = styled.ul`
  display: none;
  position: absolute;
  border-radius: 10px;
  background-color: white;
  width: 100%;
`;

const SubMenuList = styled.li`
  list-style: none;
  color: black;
  padding: 10px;
  cursor: pointer;
  text-align: center;
  &:hover {
    color: purple;
    font-weight: bold;
  }
`;

const ProfileMenu = styled.nav`
  position: relative;
  &:hover ${SubMenu} {
    display: block;
  }
`;

const UserMenu = styled.span`
  cursor: pointer;
`;

export default Navbar;
