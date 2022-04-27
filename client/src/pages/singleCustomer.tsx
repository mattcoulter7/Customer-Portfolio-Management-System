import { Box, Heading, SimpleGrid } from "@chakra-ui/react"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import CustomerDetailsSection from "../components/CustomerDetailsSection"
import CustomerDAO from "../DAOs/CustomerDAO"
import { Customer } from "../types/types"
import NotFound from "./notFound"
import TodoPage from "./todo"

interface Props {}

const SingleCustomer: React.FC<Props> = () => {
  const { customerId } = useParams() as { customerId: string }
  const [customer, setCustomer] = useState<Customer | null>(null)

  useEffect(() => {
    const getSingleCustomer = async (customerId: string) => {
      const customerFromServer = await CustomerDAO.selectId(customerId)
      if (customerFromServer) {
        setCustomer(customerFromServer)
      }
    }
    getSingleCustomer(customerId)
  }, [])

  return (
    <Box px={[4, 4, 20, 20]} h="100vh">
      {customer ? (
        <SimpleGrid columns={[1, 1, 2, 2]}>
          <CustomerDetailsSection customer={customer} />
          <TodoPage />
        </SimpleGrid>
      ) : (
        <NotFound />
      )}
    </Box>
  )
}

export default SingleCustomer
