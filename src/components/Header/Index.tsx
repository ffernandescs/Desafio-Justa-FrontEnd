import { Flex, Link, Box } from '@chakra-ui/react'

export const Header = () => {
    return (
        <Flex
            bg='black'
            as='header'
            mx='auto'
            h='70px'
            align='center'
            justify='center'
            w='100%'
            px={["5", "20"]}
        >
            <Box
                w='100%'
                maxW='1400px'
            >
                <Link 
                    href='#'
                    color='white'
                    fontSize={["2xl", "3xl"]}
                    textDecoration='none'
                >
                    R$ Coins History
                </Link>
            </Box>
        </Flex>
    )
}