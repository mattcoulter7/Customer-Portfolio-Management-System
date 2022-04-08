import { Box, Button, Heading } from "@chakra-ui/react"
import { Formik } from "formik"
import * as Yup from "yup"
import InputField from "../components/InputField"

interface Props {}
const NewCustomer: React.FC<Props> = () => {
  const now = new Date()
  return (
    <Formik
      initialValues={{
        firstName: "",
        lastName: "",
        createdAt: now.toString(),
        DOB: "",
        email: "",
        phone: "",
        address: {
          country: "Australia",
          line1: "",
          line2: "",
          postcode: "",
          city: "",
          state: "",
        },
      }}
      validationSchema={Yup.object({
        firstName: Yup.string().required("First name required"),
        lastName: Yup.string().required("Last name required"),
        createdAt: Yup.string().required("created at required"),
        email: Yup.string().required("Email required").email("Invalid Email"),
        phone: Yup.string().required("Phone Number required"),
        DOB: Yup.string().required("DOB required"),

        address: Yup.object({
          country: Yup.string().required("country is required"),
          line1: Yup.string().required("line1 is required"),
          line2: Yup.string().required("line2 is required"),
          postcode: Yup.string().required("postcode is required"),
          city: Yup.string().required("city is required"),
          state: Yup.string().required("state is required"),
        }),
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
            <InputField
              name="DOB"
              type="text"
              label="Date of Birth"
              placeholder="DD/MM/YYYY"
            />
            <InputField
              name="address.country"
              type="text"
              label="Country"
              placeholder="Australia"
            />
            <InputField
              name="address.line1"
              type="text"
              label="Line1"
              placeholder="line 1"
            />
            <InputField
              name="address.line2"
              type="text"
              label="Line2"
              placeholder="line2"
            />
            <InputField
              name="address.postcode"
              type="text"
              label="Postcode"
              placeholder="Postcode"
            />
            <InputField
              name="address.city"
              type="text"
              label="City"
              placeholder="Melbourne"
            />
            <InputField
              name="address.state"
              type="text"
              label="State"
              placeholder="VIC"
            />
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
