import styled from "styled-components";
import { mobile } from "../responsive";
import { Link } from "react-router-dom";
// import { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useMutation } from "@tanstack/react-query";
import { publicRequest } from "../api/axios";

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
  flex-wrap: wrap;
`;

const Input = styled.input`
  min-width: 20%;
  margin: 20px 10px 0px 0px;
  padding: 10px;
`;

const Agreement = styled.span`
  font-size: 12px;
  margin: 20px 0px;
`;

const Button = styled.button`
  width: 40%;
  border: none;
  padding: 15px 20px;
  background-color: purple;
  cursor: pointer;
  color: white;
  &:disabled {
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

const ErrorP = styled.p`
  color: red;
  font-style: italic;
`;

const ResponseH2 = styled.h3`
  color: ${(props) => props.color};
  margin-top: 10px;
`;
const Register = () => {
  // const [registerInfo, setRegisterInfo] = useState({
  //   username: "",
  //   email: "",
  //   password: "",
  //   confirmPassword: "",
  // });

  // const handleInputs = (e) => {
  //   setRegisterInfo({ ...registerInfo, [e.target.name]: e.target.value });
  // };

  const schema = yup.object().shape({
    username: yup.string().min(4).required(`Username is required.`),
    email: yup.string().email().required(`Email is required.`),
    password: yup.string().min(6).max(20).required(`Password is required.`),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref("password"), null], `Password do not match`),
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const { isLoading, isError, error, isSuccess, mutate } = useMutation({
    mutationFn: (registerData) => {
      return publicRequest.post("/auth/register", registerData);
    },
    onSuccess: async () => {
      reset();
    },
  });

  const handleRegister = (data) => {
    mutate(data);
  };

  return (
    <Container>
      <Wrapper>
        <Title>CREATE AN ACCOUNT</Title>
        {isError && (
          <ResponseH2 color="red">{error.response.data.message}</ResponseH2>
        )}
        {isSuccess && (
          <ResponseH2 color="blue">Registered Successfully!</ResponseH2>
        )}
        <Form onSubmit={handleSubmit(handleRegister)}>
          <Input
            type="text"
            name="username"
            placeholder="username"
            autoComplete="off"
            // onChange={handleInputs}
            {...register("username")}
          />
          <ErrorP>{errors.username?.message}</ErrorP>
          <Input
            type="text"
            name="email"
            placeholder="email"
            autoComplete="off"
            // onChange={handleInputs}
            {...register("email")}
          />
          <ErrorP>{errors.email?.message}</ErrorP>
          <Input
            type="password"
            name="password"
            placeholder="password"
            // onChange={handleInputs}
            {...register("password")}
          />
          <ErrorP>{errors.password?.message}</ErrorP>
          <Input
            type="password"
            name="confirmPassword"
            placeholder="confirm password"
            // onChange={handleInputs}
            {...register("confirmPassword")}
          />
          <ErrorP>{errors.confirmPassword?.message}</ErrorP>
          <Agreement>
            By creating an account, I consent to the processing of my personal
            data in accordance with the <b>PRIVACY POLICY</b>
          </Agreement>
          <div style={{ width: "100%", marginBottom: "5px" }}>
            <Link2 as={Link} to="/login">
              EXISTING ACCOUNT?
            </Link2>
          </div>

          <Button type="submit" disabled={isLoading}>
            CREATE
          </Button>
        </Form>
      </Wrapper>
    </Container>
  );
};

export default Register;
