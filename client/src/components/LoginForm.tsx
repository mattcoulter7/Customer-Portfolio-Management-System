import React from "react";
import { useState, useEffect } from "react";
import { Button, Flex, Heading, Input } from "@chakra-ui/react"
import { useNavigate } from "react-router-dom"

interface IProps { }

const LoginForm: React.FC<IProps> = (props: IProps) => {
  const [authenticated, setAuthenticated] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    debugger;
    if (authenticated) {
      navigate('/');
    }
  }, [authenticated]);

  const onLogin = (event: React.MouseEvent<HTMLButtonElement>) => {
    fetch(`http://localhost:3001/user?user=${email}&password=${password}`, {
      method: "GET",
      credentials: "include"
    }).then((resp) => {
      return resp.json();
    }).then((data) => {
      setAuthenticated(data.valid);
    })
  }

  return (
    <Flex
      height="350px"
      width="400px"
      p={4}
      mt={[4, 4, 20, 20]}
      direction="column"
      background="white"
      rounded="md"
      boxShadow="lg"
    >
      <Input
        id="email"
        type="email"
        placeholder="  Email address"
        mb={5}
        onChange={(event: React.ChangeEvent<HTMLInputElement>) => setEmail(event.target.value)} // need to ensure 'this' is LoginForm
        variant="flushed"
      />
      <Input
        id="password"
        type="password"
        placeholder="  Password"
        mb={5}
        onChange={(event: React.ChangeEvent<HTMLInputElement>) => setPassword(event.target.value)}
        variant="flushed"
      />
      <Button onClick={onLogin} colorScheme="blue" size="lg">
        <b>Log In</b>
      </Button>
    </Flex>
  )
}

export default LoginForm
