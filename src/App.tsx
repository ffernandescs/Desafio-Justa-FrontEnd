import { useEffect, useState } from 'react';
import { Header } from "./components/Header/Index"
import { Form } from "./components/Form/Index";
import { Footer } from "./components/Footer";
import { Flex, Text, Image } from '@chakra-ui/react';
import logo from './assets/img/logo.gif'

export const App = () => {

  const [isLoading, setIsLoading] = useState(true);


  useEffect(() =>  {
    setTimeout(() => {
      setIsLoading(false);
      }, 3000);
}, [])
  
  return (
    <Flex 
      direction='column'
      align='center'
      justifyContent='center'
      w='100%'
    >
      {isLoading ? (
        <Flex
          align='center'
          justify='center'
          direction='column'
          w='100%'
          h='100vh'
          overflow='hidden'
          textAlign='center'
        >
          <Image 
            w='80px'
            h='80px'
            marginBottom='5'
            src={logo} alt='loading' 
          />
            
            <Text
              fontSize='25px'
            >Bem vindo ao Desafio
              <Text
                color='blue.600'
                fontWeight='bold'
                fontSize='38px'
              >Justa</Text>
            </Text>
        </Flex>
      ) : (
      <>
        <Header />
        <Form />
        <Footer/>
      </>
    )}
    </Flex>
    
  )
}