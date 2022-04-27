import { Box, Center, Heading } from "@chakra-ui/react"

import StockOpenCloseDAO from '../DAOs/StockOpenCloseDAO';

const StocksPage = () => {
    StockOpenCloseDAO.select().then((data) => {
        console.log(data);
    })
    return (
        <Box bg="gray.50" px={[4, 4, 20, 20]} h="100vh">
            <Center h="100%">
                <Heading size="4xl">TODO</Heading>
            </Center>
        </Box>
    )
}

export default StocksPage
