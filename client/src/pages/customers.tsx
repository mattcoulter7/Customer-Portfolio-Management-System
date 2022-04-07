import { Box, VStack } from "@chakra-ui/react"
import { useEffect, useState } from "react"
import CustomTable from "../components/CustomTable"
import Searchbar from "../components/Searchbar"

import CustomerDAO from "../DAOs/CustomerDAO"
import { Customer } from "../types/types"

interface customersProps {}

const Customers: React.FC<customersProps> = () => {
  const [customers, setCustomers] = useState<null | Customer[]>(null)
  const [searchText, setSearchText] = useState<string>("")
  const [customersCopy, setCustomersCopy] = useState<null | Customer[]>(null)

  useEffect(() => {
    const getCustomers = async () => {
      const customersFromServer = await CustomerDAO.select()
      console.log(customersFromServer)
      setCustomers(customersFromServer)
      setCustomersCopy(customersFromServer)
    }
    getCustomers()
  }, [])

  const handleSearchTextChange = (text: string) => {
    setSearchText(text)
    sortCustomersByName(text)
  }

  const sortCustomersByName = (text: string) => {
    if (customers) {
      const result = customers.filter(
        (customer) =>
          customer.firstName.includes(text) || customer.lastName.includes(text),
      )
      setCustomersCopy(result)
    }
  }

  return (
    <Box px={[4, 4, 20, 20]}>
      <VStack spacing={6} pt={6}>
        <Searchbar value={searchText} onChange={handleSearchTextChange} />
        {customersCopy ? (
          <CustomTable customers={customersCopy} />
        ) : (
          <p>Loading... </p>
        )}
      </VStack>
    </Box>
  )
}

export default Customers
