import { Outlet } from 'react-router-dom'
import { Header } from "./components/Header/Index"
import { Flex, Box } from '@chakra-ui/react';
import { Form } from "./components/Form/Index";
import { Tabela } from "./components/Tabela/Tabela";

export const App = () => {
  
  return (
    <Flex 
      direction='column'
      w='100%'
      maxW='1400px'
      align='center'
      justify='center'
    >
      <Box>
        <Header />
        <Form />
        <Tabela />
      </Box>
      <Outlet />
    </Flex>
    
  )
}