import { Flex, Link, Box } from '@chakra-ui/react'

export const Header = () => {
    return (
        <Flex
            bg='black'
            as='header'
            mx='auto'
            align='center'
            justify='center'
            w='100%'
            padding={["5", "5"]}
        >
            <Box
                w='100%'
                maxW='1200px'
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