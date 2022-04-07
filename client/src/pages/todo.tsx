import { Box, Center, Heading } from "@chakra-ui/react"

const TodoPage = () => {
  return (
    <Box bg="gray.50" px={[4, 4, 20, 20]} h="100vh">
      <Center h="100%">
        <Heading size="4xl">TODO</Heading>
      </Center>
    </Box>
  )
}

export default TodoPage
