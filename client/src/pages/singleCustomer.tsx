import { Box, Center, Heading } from "@chakra-ui/react"
import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import CustomerDAO from "../DAOs/CustomerDAO"
import { Customer } from "../types/types"

const SingleCustomer = () => {
  const { customerId } = useParams() as { customerId: string }
  const [customer, setCustomer] = useState<Customer | null>(null)
  const navigate = useNavigate()

  useEffect(() => {
    const getSingleCustomer = async (customerId: string) => {
      console.log(customerId, "customerId")
      const customerFromServer = await CustomerDAO.selectId(customerId)
      if (customerFromServer) {
        setCustomer(customerFromServer)
      } else {
        navigate("/404")
      }
    }
    getSingleCustomer(customerId)
  }, [])

  return (
    <Box bg="gray.50" px={[4, 4, 20, 20]} h="100vh">
      <Center h="100%">
        {customer ? (
          <Heading size="4xl">{customer.firstName}</Heading>
        ) : (
          <p>Loading ... </p>
        )}
      </Center>
    </Box>
  )
}

export default SingleCustomer
