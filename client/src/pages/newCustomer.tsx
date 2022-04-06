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

interface Props {}
const NewCustomer: React.FC<{}> = ({}) => {
  const now = new Date()
  return (
    <Formik
      initialValues={{
        firstName: "",
        lastName: "",
        createdAt: now.toString(),
        email: "",
        phone: "",
      }}
      validationSchema={Yup.object({
        firstName: Yup.string().required("First name required"),
        lastName: Yup.string().required("Last name required"),
        createdAt: Yup.string().required("created at required"),
        email: Yup.string().required("Email required").email("Invalid Email"),
        phone: Yup.string().required("Phone Number required"),
      })}
      onSubmit={(values, actions) => {
        console.log(values)
        const now = new Date()
        values.createdAt = now.toString()
        alert(JSON.stringify(values, null, 2))
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
