import { Text, Box, Heading, SimpleGrid, VStack } from "@chakra-ui/react"
import { useState } from "react"
import AddressDTO from "../DTOs/AddressDTO"
import { Address, Customer } from "../types/types"
import CustomerDetailsField from "./CustomerDetailsField"

interface Props {
  customer: Customer
}

const CustomerDetailsSection: React.FC<Props> = ({ customer }) => {
  const extractAddressValue = (address: Address): string => {
    let addressValue: string = ""
    // Object.entries(address).forEach(
    //   ([, value]) => (addressValue += `${value} `),
    // )
    addressValue = `${address.line1} ${address.line2}, ${address.city} ${
      address.state
    } ${address.postcode.slice(0, 4)} ${address.country} `

    return addressValue
  }

  const [firstName] = useState(customer.firstName)
  const [lastName] = useState(customer.lastName)
  const [phone] = useState(customer.phone)
  const [email] = useState(customer.email)
  const [DOB] = useState(customer.DOB.slice(0, 10))
  const [createdAt] = useState(customer.createdAt.slice(0, 10))
  const [address] = useState(extractAddressValue(customer.address))

  return (
    <Box>
      <Heading size="lg" py={4}>
        Customer Details
      </Heading>
      <VStack align="stretch" spacing={4}>
        <CustomerDetailsField title="First Name" content={firstName} />
        <CustomerDetailsField title="Last Name" content={lastName} />
        <CustomerDetailsField title="Phone" content={phone} />
        <CustomerDetailsField title="Email" content={email} />
        <CustomerDetailsField title="Date of Birth" content={DOB} />
        <CustomerDetailsField title="Customer Since" content={createdAt} />
        <CustomerDetailsField title="Address" content={address} />
      </VStack>
    </Box>
  )
}

export default CustomerDetailsSection
