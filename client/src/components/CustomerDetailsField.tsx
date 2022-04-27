import { SimpleGrid, Text } from "@chakra-ui/react"
interface Props {
  title: string
  content: string
}

const CustomerDetailsField: React.FC<Props> = ({ title, content }) => (
  <>
    <SimpleGrid columns={2}>
      <Text as="b">{title}:</Text>
      <Text>{content}</Text>
    </SimpleGrid>
    <hr />
  </>
)

export default CustomerDetailsField
