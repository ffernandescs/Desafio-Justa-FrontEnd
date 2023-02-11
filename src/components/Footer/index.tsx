import { Stack, ButtonGroup, Icon, Text, Link } from '@chakra-ui/react'
import { FiCode, FiGithub, FiInstagram, FiLinkedin } from 'react-icons/fi'

export const Footer = () => {
    return (
      <Stack 
        w='100%'
        align='center'
        justify='center'
        bg='black'
        color='white' 
        spacing={{ base: '4', md: '5' }}
        padding='10'
      >
      <Stack justify="space-between" direction="row" align="center">
        
        <ButtonGroup 
          variant="ghost" 
          w={['100%', '200px']}
          justifyContent='space-between'
        >
          <Link
            href='https://github.com/ffernandescs/'
            target='_blank'
          >
            <Icon
              aria-label="GitHub"
              as={FiGithub}
              fontSize='30'
            />
          </Link>
          <Link
            href='https://www.linkedin.com/in/felipefcs/'
            target='_blank'
          >
            <Icon
              aria-label="LinkedIn"
              as={FiLinkedin}
              fontSize='30'
            />
          </Link>
          <Link
            href='https://www.instagram.com/f.fernandes.dev/'
            target='_blank'
          >
            <Icon
              aria-label="Instagram"
              as={FiInstagram}
              fontSize='30'
            />
          </Link>
          <Link
            href='https://www.felipefernandescs.com/'
            target='_blank'
          >
            <Icon
              aria-label="Portifolio"
              as={FiCode}
              fontSize='30'
            />
          </Link>
          
        </ButtonGroup>
      </Stack>
      <Text fontSize="sm" color="subtle">
        &copy; {new Date().getFullYear()} Copyright: Felipe Fernandes
      </Text>
    </Stack>
    )
}