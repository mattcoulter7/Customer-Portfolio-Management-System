import {
  Box,
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  SimpleGrid,
  Stack,
  useDisclosure,
  useToast,
  Text,
} from "@chakra-ui/react"
import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import CustomerDetailsSection from "../components/CustomerDetailsSection"
import CustomerDAO from "../DAOs/CustomerDAO"
import { Customer } from "../types/types"
import NotFound from "./notFound"
import TodoPage from "./todo"

interface Props {}

const SingleCustomer: React.FC<Props> = () => {
  const { customerId } = useParams() as { customerId: string }
  const [customer, setCustomer] = useState<Customer | null>(null)
  const navigate = useNavigate()
  const toast = useToast()
  const { isOpen, onOpen, onClose } = useDisclosure()

  useEffect(() => {
    const getSingleCustomer = async (customerId: string) => {
      const customerFromServer = await CustomerDAO.selectId(customerId)
      if (customerFromServer) {
        setCustomer(customerFromServer)
      }
    }
    getSingleCustomer(customerId)
  }, [])

  const gotoEditPage = (customerId: string): void => {
    navigate(`/update/customer/${customerId}`)
  }

  const gotoListPage = (isDeleted: boolean): void => {
    if (isDeleted) {
      navigate(`/customers`)
    }
  }

  const handleDeletion = async (customerId: string) => {
    const isDeleted: boolean = await CustomerDAO.delete(customerId)
    showNotification(isDeleted)
    gotoListPage(isDeleted)
  }

  const showNotification = (isDeleted: boolean) => {
    if (isDeleted) {
      toast({
        title: "Success",
        description: "Account was deleted.",
        status: "success",
        duration: 5000,
        isClosable: true,
      })
    } else {
      toast({
        title: "Error",
        description: "Something went wrong.",
        status: "error",
        duration: 5000,
        isClosable: true,
      })
    }
  }

  return (
    <Box px={[4, 4, 20, 20]} h="100vh">
      {customer ? (
        <>
          <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
              <ModalHeader>Deletion is irreversible</ModalHeader>
              <ModalCloseButton />
              <ModalBody>
                <Text>
                  You are about to delete customer :{" "}
                  <b>{`${customer.firstName} ${customer.lastName}`} </b>
                </Text>
              </ModalBody>

              <ModalFooter>
                <Button colorScheme="blue" mr={3} onClick={onClose}>
                  I have fat finger.
                </Button>
                <Button
                  colorScheme="red"
                  onClick={() => {
                    handleDeletion(customerId)
                    onClose()
                  }}
                >
                  DELETE
                </Button>
              </ModalFooter>
            </ModalContent>
          </Modal>

          <SimpleGrid columns={[1, 1, 2, 2]}>
            <Stack>
              <CustomerDetailsSection customer={customer} />
              <Stack direction="row" align="center">
                <Button
                  w="50%"
                  colorScheme="blue"
                  onClick={() => gotoEditPage(customerId)}
                >
                  Edit
                </Button>

                <Button w="50%" colorScheme="red" onClick={onOpen}>
                  Delete
                </Button>
              </Stack>
            </Stack>
            <TodoPage />
          </SimpleGrid>
        </>
      ) : (
        <NotFound />
      )}
    </Box>
  )
}

export default SingleCustomer
