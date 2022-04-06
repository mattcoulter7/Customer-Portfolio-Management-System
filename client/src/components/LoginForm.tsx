import { Button, Flex, Heading, Input } from "@chakra-ui/react"

const LoginForm = () => {
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
        type="email"
        placeholder="  Email address"
        mb={5}
        variant="flushed"
      />
      <Input
        type="password"
        placeholder="  Password"
        mb={5}
        variant="flushed"
      />
      <Button colorScheme="blue" size="lg">
        <b>Log In</b>
      </Button>
    </Flex>
  )
}

export default LoginForm
