import { Box, VStack } from "@chakra-ui/react"
import { useEffect, useState } from "react"
import CustomTable from "../components/CustomTable"
import Searchbar from "../components/Searchbar"

import CustomerDAO from "../DAOs/CustomerDAO"

interface customersProps {}

interface ICustomer {
  _id: string
  firstName: string
  lastName: string
  createdAt: string
  DOB: string
  email: string
  phone: string
  addressid: string
}

const Customers: React.FC<customersProps> = ({}) => {
  const domainName: string | undefined = process.env.REACT_APP_DOMAIN_NAME
  const protocol: string | undefined = process.env.REACT_APP_PROTOCOL
  const url: string = `${protocol}://${domainName}`
  const [customers, setCustomers] = useState<null | ICustomer[]>(null)
  const [searchText, setSearchText] = useState<string>("")
  const [customersCopy, setCustomersCopy] = useState<null | ICustomer[]>(null)

  useEffect(() => {
    const getCustomers = async () => {
      
      const customersFromServer = await CustomerDAO.select();
      setCustomers(customersFromServer)
      setCustomersCopy(customersFromServer)
    }
    getCustomers()
  }, [])

  const fetchCustomers = async () => {
    const res = await fetch(`${url}/customers`)
    const data = await res.json()

    return data
  }

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
