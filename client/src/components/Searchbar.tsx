import { SearchIcon } from "@chakra-ui/icons"
import { Input, InputGroup, InputLeftElement } from "@chakra-ui/react"

interface Props {
  value: string
  onChange: (text: string) => void
}

const Searchbar: React.FC<Props> = ({ value, onChange }) => {
  return (
    <InputGroup>
      <InputLeftElement
        fontSize="xl"
        pointerEvents="none"
        children={<SearchIcon color="gray.300" />}
      />
      <Input
        rounded="full"
        type="text"
        variant="outline"
        placeholder="Search... "
        size="md"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </InputGroup>
  )
}

export default Searchbar
