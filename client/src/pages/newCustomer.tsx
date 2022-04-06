import {
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  HStack,
  Input,
  VStack,
} from "@chakra-ui/react"
import { Field, Formik, useFormik } from "formik"
import * as Yup from "yup"
import InputField from "../components/InputField"
import CustomerDAO from "../DAOs/CustomerDAO"
import CustomerDTO from "../DTOs/CustomerDTO"

interface Props {}
const NewCustomer: React.FC<{}> = ({}) => {
  const now = new Date()
  return (
    <Formik
      initialValues={{
        name: "",
        createdAt: now.toString(),
      }}
      validationSchema={Yup.object({
        name: Yup.string().required("First name required"),
        createdAt: Yup.string().required("created at required")
      })}
      onSubmit={async (values, actions) => {
        console.log(values)
        const now = new Date()
        values.createdAt = now.toString()
        alert(JSON.stringify(values, null, 2))
        await CustomerDAO.insert(new CustomerDTO(values));
        actions.resetForm()
      }}
    >
      {(formik) => (
        <Box px={[4, 4, 20, 40]} h="100vh">
          <Box py={4}>
            <Heading size="lg">New Customer</Heading>
            <hr />
          </Box>

          <form onSubmit={formik.handleSubmit}>
            <VStack>
              <HStack w="100%">
                <InputField
                  name="firstName"
                  type="text"
                  label="First Name"
                  placeholder="Harry"
                />
                <InputField
                  name="lastName"
                  type="text"
                  label="Last Name"
                  placeholder="Potter"
                />
              </HStack>

              <InputField
                name="email"
                type="email"
                label="Email"
                placeholder="customer@domain.com"
              />
              <InputField
                name="phone"
                type="text"
                label="Phone No."
                placeholder="+61 ..."
              />
            </VStack>
            <Button type="submit" colorScheme="blue" w="100%">
              Submit
            </Button>
          </form>
        </Box>
      )}
    </Formik>
  )
}

export default NewCustomer
