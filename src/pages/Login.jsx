import styled from "styled-components";
import { mobile } from "../responsive";
import { Link } from "react-router-dom";
import { useRef } from "react";
import { login } from "../redux/apiCalls";
import { useDispatch, useSelector } from "react-redux";

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: teal;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Wrapper = styled.div`
  border: 1px solid black;
  width: 25%;
  padding: 20px;
  background-color: white;
  ${mobile({ width: "75%" })}
`;

const Title = styled.h1`
  font-size: 24px;
  font-weight: 300;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const Input = styled.input`
  flex: 1;
  min-width: 40%;
  margin: 10px 0;
  padding: 10px;
`;

const Button = styled.button`
  width: 40%;
  border: none;
  padding: 15px 20px;
  background-color: purple;
  color: white;
  cursor: pointer;
  margin-bottom: 10px;
  &:disabled {
    color: gray;
    cursor: not-allowed;
  }
`;

const Link2 = styled.a`
  color: black;
  margin: 5px 0px;
  font-size: 12px;
  text-decoration: underline;
  cursor: pointer;
`;

const Error = styled.p`
  margin-top: 0.5rem;
  color: red;
`;
const Login = () => {
  const username = useRef("");
  const password = useRef("");
  const { isFetching, error, isError } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const handleLogin = (e) => {
    e.preventDefault();
    login(dispatch, {
      username: username.current.value,
      password: password.current.value,
    });
  };

  return (
    <Container>
      <Wrapper>
        <Title>SIGN IN</Title>

        {isError && <Error>{error}</Error>}
        <Form onSubmit={handleLogin}>
          <Input ref={username} type="text" placeholder="username/email" />
          <Input ref={password} type="password" placeholder="password" />
          <Button type="submit" disabled={isFetching}>
            LOGIN
          </Button>
          <Link2>FORGOT PASSWORD?</Link2>
          <Link2 as={Link} to="/register">
            CREATE A NEW ACCOUNT
          </Link2>
        </Form>
      </Wrapper>
    </Container>
  );
};

export default Login;
