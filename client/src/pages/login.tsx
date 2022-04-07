import { Box, Flex, Heading, Stack, Text } from "@chakra-ui/react"
import LoginForm from "../components/LoginForm"

const Login = () => {
  return (
    <Box bg="gray.50" height="100vh">
      <Flex
        direction={["column", "column", "row", "row"]}
        pt={20}
        mx={[4, 4, 8, 32]}
      >
        <Flex basis="60%" alignSelf="center">
          <Stack>
            <Heading color="blue.500">Asset & Wealth Services Inc.</Heading>
            <Text pb={4}>
              "The best financial advisor in Australia." -{" "}
              <em>Albert Einstein</em>
            </Text>
          </Stack>
        </Flex>
        <Flex basis="40%" alignSelf="center">
          <LoginForm />
        </Flex>
      </Flex>
      <Text fontSize="xs" color="gray.500" pos="absolute" top="97vh" left="2vh">
        AWS-CPM © 2022
      </Text>
    </Box>
  )
}

export default Login
