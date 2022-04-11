import { Box, Button, Heading, SimpleGrid } from "@chakra-ui/react";
import { Formik } from "formik";
import { matches } from "lodash";
import * as Yup from "yup";
import InputField from "../components/InputField";

interface Props {}
const NewCustomer: React.FC<Props> = () => {
	const now = new Date();
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
				firstName: Yup.string()
					.required("First name cannot be blank")
					.matches(/^[A-Za-z]+$/, "Only alphabets are allowed for this field"),
				lastName: Yup.string()
					.required("Last name cannot be blank")
					.matches(/^[A-Za-z]+$/, "Only alphabets are allowed for this field"),
				createdAt: Yup.string().required("Date Created At cannot be blank"),
				email: Yup.string()
					.required("Email Address cannot be blank")
					.email("Please enter valid email address"),
				phone: Yup.string()
					.required("Phone Number cannot be blank")
					.matches(
						/^\+(?:[0-9] ?){6,14}[0-9]$/,
						"Please enter a valid phone number"
					),
				DOB: Yup.string()
					.required("Date of Birth cannot be blank")
					.matches(
						/^([0-2][0-9]|(3)[0-1])(\/)(((0)[0-9])|((1)[0-2]))(\/)\d{4}$/,
						"Please enter a valid date"
					),
				address: Yup.object({
					country: Yup.string()
						.required("Country cannot be blank")
						.matches(/^[A-Za-z]+$/, "Please enter a valid country"),
					line1: Yup.string()
						.required("Address Line 1 cannot be blank")
						.matches(/^[ A-Za-z0-9_./#&-]*$/, "Please enter a valid address"),
					line2: Yup.string().matches(
						/^[ A-Za-z0-9_./#&-]*$/,
						"Please enter a valid address"
					),
					city: Yup.string()
						.required("City cannot be blank")
						.matches(
							/^[A-Za-z]+$/,
							"Only alphabets are allowed for this field"
						),
					state: Yup.string()
						.required("State cannot be blank")
						.matches(/^[A-Za-z]+$/, "Please enter a valid state"),
					postcode: Yup.string()
						.required("Postcode cannot be blank")
						.matches(/^[a-zA-Z0-9]+$/, "Please enter a valid postcode"),
				}),
			})}
			onSubmit={(values, actions) => {
				console.log(values);
				const now = new Date();
				values.createdAt = now.toString();
				alert(JSON.stringify(values, null, 2));
				actions.resetForm();
			}}
		>
			{(formik) => (
				<Box px={[4, 4, 20, 40]} h="100vh">
					<Box py={4}>
						<Heading size="lg">Add New Customer</Heading>
						<hr />
					</Box>
					<form onSubmit={formik.handleSubmit}>
						<SimpleGrid columns={[1, 2]} spacing={[0, 5]}>
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
						</SimpleGrid>
						<SimpleGrid columns={1} spacing={0}>
							<InputField
								name="DOB"
								type="text"
								label="Date of Birth"
								placeholder="dd/mm/yyyy"
							/>
						</SimpleGrid>
						<SimpleGrid columns={[1, 2]} spacing={[0, 5]}>
							<InputField
								name="email"
								type="email"
								label="Email"
								placeholder="customer@domain.com"
							/>
							<InputField
								name="phone"
								type="text"
								label="Phone Number (incl. country code)"
								placeholder="+61 ..."
							/>
						</SimpleGrid>
						<SimpleGrid columns={1} spacing={0}>
							<InputField
								name="address.line1"
								type="text"
								label="Address Line 1"
								placeholder="line 1"
							/>
						</SimpleGrid>
						<SimpleGrid columns={1} spacing={0}>
							<InputField
								name="address.line2"
								type="text"
								label="Address Line 2"
								placeholder="line 2"
							/>
						</SimpleGrid>
						<SimpleGrid columns={[1, 2]} spacing={[0, 5]}>
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
						</SimpleGrid>
						<SimpleGrid columns={[1, 2]} spacing={[0, 5]}>
							<InputField
								name="address.postcode"
								type="text"
								label="Postcode"
								placeholder="Postcode"
							/>
							<InputField
								name="address.country"
								type="text"
								label="Country"
								placeholder="Australia"
							/>
						</SimpleGrid>
						<Button
							type="submit"
							colorScheme="blue"
							variant="solid"
							w="100%"
							my={5}
						>
							Submit
						</Button>
					</form>
				</Box>
			)}
		</Formik>
	);
};

export default NewCustomer;
