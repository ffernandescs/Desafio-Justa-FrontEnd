import { Form } from "./components/Form/Index"
import { Header } from "./components/Header/Index"
import { Flex } from '@chakra-ui/react';

export const App = () => {
  return (
    <Flex 
      direction='column'
      w='100%'
      align='center'
      justify='center'
    >
      <Header />
      <Form/>
    </Flex>
    
  )
}