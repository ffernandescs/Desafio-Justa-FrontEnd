import { 
    Flex, 
    Text, 
    FormControl, 
    Box, 
    Select,
    Input,
    Button 
} from '@chakra-ui/react'

export const Form = () => {
    return (
        <Flex
            align='center'
            justify='center'
            direction='column'
            w='100%'
            maxW='1400px'
            px={["5", "20"]}
        >
            <Text
                fontSize={["3xl","5xl"]}
            >
                Histórico de cotação
            </Text>
            <FormControl
                as='form'
                
                
            >
                <Flex
                    justify='space-between'
                    align='center'
                    wrap='wrap'
                    
                >
                    <Select 
                        placeholder='Select option'                         
                        maxW='300px'
                    >
                        <option value='option1'></option>
                    </Select>
                    <Input
                        placeholder="Selecione a Data Inicial"
                        size="md"
                        type="date"
                        maxW='300px'
                    />
                    <Input
                        placeholder="Selecione a Data Final"
                        size="md"
                        type="date"
                        maxW='300px'

                    />
                    <Button colorScheme='blue'>Limpar</Button>
                    <Button colorScheme='blue'>Consultar Dados</Button>

                </Flex>

            </FormControl>
            
        </Flex>
    )
}