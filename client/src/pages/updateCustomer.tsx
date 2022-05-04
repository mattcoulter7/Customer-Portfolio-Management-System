import { Box, Button, Heading, SimpleGrid, useToast } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Formik } from 'formik';
import * as Yup from 'yup';
import InputField from '../components/InputField';
import CustomerDAO from '../DAOs/CustomerDAO';
import CustomerDTO from '../DTOs/CustomerDTO';
import { Customer } from '../types/types';

interface Props {}
const UpdateCustomer: React.FC<Props> = () => {
	const { customerId } = useParams() as { customerId: string };
	const [customer, setCustomer] = useState<Customer | null>(null);

	useEffect(() => {
		const getCustomer = async (customerId: string) => {
			const customerFromServer = await CustomerDAO.selectId(customerId);
			if (customerFromServer) {
				setCustomer(customerFromServer);
			}
		};
		getCustomer(customerId);
	}, []);

	const now = new Date();
	const toast = useToast();
	return (
		<Formik
			enableReinitialize
			initialValues={{
        _id: customer?._id,
				firstName: customer?.firstName,
				lastName: customer?.lastName,
				createdAt: customer?.createdAt,
				DOB: customer ? customer.DOB.slice(0, 10): " ",
				email: customer?.email,
				phone: customer?.phone,
				address: {
          _id: customer?.address._id,
					country: customer?.address.country,
					line1: customer?.address.line1,
					line2: customer?.address.line2,
					postcode: customer?.address.postcode,
					city: customer?.address.city,
					state: customer?.address.state,
				},
			}}
			validationSchema={Yup.object({
				firstName: Yup.string()
					.required('First name cannot be blank')
					.matches(/^[A-Za-z]+$/, 'Only alphabets are allowed for this field'),
				lastName: Yup.string()
					.required('Last name cannot be blank')
					.matches(/^[A-Za-z]+$/, 'Only alphabets are allowed for this field'),
				createdAt: Yup.string().required('Date Created At cannot be blank'),
				email: Yup.string()
					.required('Email Address cannot be blank')
					.email('Please enter valid email address'),
				phone: Yup.string()
					.required('Phone Number cannot be blank')
					.matches(
						/^\+(?:[0-9] ?){6,14}[0-9]$/,
						'Please enter a valid phone number'
					),
				DOB: Yup.string()
					.required('Date of Birth cannot be blank')
					.matches(
						/^\d{4}\-(0[1-9]|1[0-2])\-(0[1-9]|[12][0-9]|3[01])$/,
						'Please enter a valid date in the format: YYYY-MM-DD'
					),
				address: Yup.object({
					country: Yup.string()
						.required('Country cannot be blank')
						.matches(/^[A-Za-z]+$/, 'Please enter a valid country'),
					line1: Yup.string()
						.required('Address Line 1 cannot be blank')
						.matches(/^[ A-Za-z0-9_./#&-]*$/, 'Please enter a valid address'),
					line2: Yup.string().matches(
						/^[ A-Za-z0-9_./#&-]*$/,
						'Please enter a valid address'
					),
					city: Yup.string()
						.required('City cannot be blank')
						.matches(
							/^[A-Za-z]+$/,
							'Only alphabets are allowed for this field'
						),
					state: Yup.string()
						.required('State cannot be blank')
						.matches(/^[A-Za-z]+$/, 'Please enter a valid state'),
					postcode: Yup.string()
						.required('Postcode cannot be blank')
						.matches(/^[a-zA-Z0-9]+$/, 'Please enter a valid postcode'),
				}),
			})}
			onSubmit={(values, actions) => {
				CustomerDAO.update(
					new CustomerDTO({
						...values,
            DOB: new Date(values.DOB).toISOString(),
					})
				).then((result) => {
					if (result) {
						toast({
							title: 'Success',
							position: 'top-right',
							description: 'Customer details updated successfully',
							status: 'success',
							duration: 5000,
							isClosable: true,
						});

						actions.resetForm();
					} else {
						toast({
							title: 'Error',
							position: 'top-right',
							description: 'Something went wrong',
							status: 'error',
							duration: 5000,
							isClosable: true,
						});
					}
				});
			}}
		>
			{(formik) => (
				<Box px={[4, 4, 20, 40]} h="100vh">
					<Box py={4}>
						<Heading size="lg">Update Customer</Heading>
						<hr />
					</Box>
					<form onSubmit={formik.handleSubmit}>
						<SimpleGrid columns={[1, 2]} spacing={[0, 5]}>
							<InputField
								name="firstName"
								type="text"
								label="First Name"
								placeholder="Joe"
							/>
							<InputField
								name="lastName"
								type="text"
								label="Last Name"
								placeholder="Smith"
							/>
						</SimpleGrid>
						<SimpleGrid columns={1} spacing={0}>
							<InputField
								name="DOB"
								type="text"
								label="Date of Birth"
								placeholder="YYYY-MM-DD"
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
								placeholder="Address"
							/>
						</SimpleGrid>
						<SimpleGrid columns={1} spacing={0}>
							<InputField
								name="address.line2"
								type="text"
								label="Address Line 2"
								placeholder="Apt, Suite, etc(optional)"
							/>
						</SimpleGrid>
						<SimpleGrid columns={[1, 2]} spacing={[0, 5]}>
							<InputField
								name="address.city"
								type="text"
								label="City"
								placeholder="City"
							/>
							<InputField
								name="address.state"
								type="text"
								label="State"
								placeholder="State"
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
								placeholder="Country"
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

export default UpdateCustomer;
