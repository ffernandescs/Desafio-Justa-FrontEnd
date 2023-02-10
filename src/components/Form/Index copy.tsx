import { useEffect, useState } from 'react';
import { 
    Flex, 
    Text, 
    FormControl,  
    Select,
    Input,
    Button, Box, TableContainer, Table, Spinner, Tr, Th, Thead, Tbody, Td, FormLabel

} from '@chakra-ui/react'
import moment from 'moment';


interface SimbolProps {
    nomeFormatado: string,
    simbolo: string,
    tipoMoeda: string,
}


interface ListPriceProps {
    cotacaoCompra: number;
    cotacaoVenda: number;
    dataHoraCotacao: string;
    paridadeCompra: number
    paridadeVenda: number
    tipoBoletim: string,
    nome: "Justa"
}

export const Form = () => { 
    const [listSimbol, setListSimbol] = useState<SimbolProps[]>([])

    const [listPrice, setListPrice] = useState<ListPriceProps[]>([])
    const [simbolVal, setSimbolVal] = useState('')

    const [valDateInitial, setValDateInitial] = useState('')

    const [valDateFinal, setValDateFinal] = useState('')

    const [showPercentage, setShowPercentage] = useState(false);

    const [enableSubmit, setEnableSubmit] = useState<boolean>(false);

    const [errors, setErrors] = useState<{ [key: string]: string }>({});

    const [isLoading, setIsLoading] = useState(false);

    async function loadApiSimbol() {
        const responseSimbol = await fetch('https://olinda.bcb.gov.br/olinda/servico/PTAX/versao/v1/odata/Moedas')
        const dataSimbol = await responseSimbol.json()
        setListSimbol(dataSimbol.value)
    }

    async function loadPrice() {
        
        const dateFormaInitial = moment(valDateInitial).format('MM-DD-YYYY')
        const dateFormaFinal = moment(valDateFinal).format('MM-DD-YYYY')

        const responsePrice = await fetch(`https://olinda.bcb.gov.br/olinda/servico/PTAX/versao/v1/odata/CotacaoMoedaPeriodo(moeda=@moeda,dataInicial=@dataInicial,dataFinalCotacao=@dataFinalCotacao)?@moeda='${simbolVal}'&@dataInicial='${dateFormaInitial}'&@dataFinalCotacao='${dateFormaFinal}'&$top=100&$format=json`)
        const dataPrice = await responsePrice.json()
        setListPrice(dataPrice.value)
    }

    const toPercentage = (numbe: any) => {
        return (numbe * 100).toFixed(2) + '%'

    }

    useEffect(() =>  {
        loadApiSimbol()
    }, [])

    function loading() {
        setIsLoading(true);

        setTimeout(() => {
            setIsLoading(false);
        }, 300);
    }
    
    const handleHistoryPrice = () => {
        if (valDateInitial > valDateFinal) {
            setEnableSubmit(false)
        } else if (simbolVal && valDateInitial && valDateFinal) {
            setEnableSubmit(true);
            loading()
            loadPrice()
            setShowPercentage(false);
            console.log(listPrice)
        } else {
            alert('Por favor, preencha ambos os campos de data.');
        }
        
    }

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (new Date(valDateInitial) > new Date(valDateFinal)) {
            alert('A data inicial não pode ser maior que a data final');
        }
    };
    
    const handleBlur = () => {
        if (!simbolVal) {
          setErrors((prevState) => ({ ...prevState, simbolVal: '*Campo obrigatorio!' }));
        }
        if (!valDateInitial) {
          setErrors((prevState) => ({ ...prevState, valDateInitial: '*Campo obrigatorio!' }));
        }
        if (!valDateFinal) {
          setErrors((prevState) => ({ ...prevState, valDateFinal: '*Campo obrigatorio!' }));
        }
      };

    const handleConvertPrice = () => {
      
        loading()
        loadPrice()
        setShowPercentage(true);
        console.log(listPrice)
    }
    
    const handleClearClick = () => {
        setEnableSubmit(false)
        setListPrice([]);
        setSimbolVal('');
        setValDateInitial('');
        setValDateFinal('');
      };

    
 

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
            <form
                onSubmit={handleSubmit}
            >
                <Flex
                    justify='space-between'
                    align='center'
                    wrap='wrap'
                >
                    <FormControl isInvalid={!!errors.simbolVal}>
                        <FormLabel htmlFor="simbolVal">Moeda::</FormLabel>
                        <Select 
                            id="simbolVal"
                            placeholder=''                         
                            maxW='300px'
                            onChange={(e) => setSimbolVal(e.target.value)}
                            onBlur={handleBlur}
                            value={simbolVal}
                            borderColor={errors.simbolVal ? 'red.500' : 'gray.200'}
                        >
                            <option ></option>
                            {listSimbol.map(item => {
                                return (
                                    <option >{item.simbolo}</option>
                                )
                            })}
                        </Select>
                        <Box color="red.500" mt={2}>
                            {errors.simbolVal}
                        </Box>
                    </FormControl>
                    <FormControl isInvalid={!!errors.valDateInitial}>
                        <FormLabel htmlFor="valDateInitial">Data inicial:</FormLabel>
                        <Input
                            id='valDateInitial'
                            placeholder="Selecione a Data Inicial"
                            size="md"
                            type="date"
                            maxW='300px'
                            value={valDateInitial}
                            onChange={(e) => setValDateInitial(e.target.value)}
                            borderColor={errors.valDateInitial ? 'red.500' : 'gray.200'}
                            onBlur={handleBlur}
                        />
                        <Box color="red.500" mt={2}>
                            {errors.valDateInitial}
                        </Box>
                    </FormControl>
                    <FormControl isInvalid={!!errors.valDateFinal}>
                        <FormLabel htmlFor="valDateFinal">Data Final:</FormLabel>
                        <Input
                            id='valDateFinal'
                            placeholder="Selecione a Data Final"
                            size="md"
                            type="date"
                            maxW='300px'
                            value={valDateFinal}
                            onChange={(e) => setValDateFinal(e.target.value)}
                            borderColor={errors.valDateFinal ? 'red.500' : 'gray.200'}
                            onBlur={handleBlur}

                        />
                         <Box color="red.500" mt={2}>
                            {errors.valDateFinal}
                        </Box>
                    </FormControl>
                    
                    <Button
                        colorScheme='blue'
                        onClick={handleClearClick}
                    >Limpar</Button>
                    <Button 
                        as='button'
                        type='submit'
                        onClick={handleHistoryPrice}
                        colorScheme='blue'
                        isDisabled={!simbolVal || !valDateInitial || !valDateFinal}
                        >Consultar Dados
                        
                    </Button>
                    <Button
                        as='button'
                        type='submit'
                        onClick={handleConvertPrice}
                        colorScheme='blue'
                        isDisabled={!enableSubmit}
                    >Converter Valores
                    </Button>
                </Flex>

            </form>
            <TableContainer>
"               <Table variant='striped' colorScheme='teal'>
                    <Thead>
                        <Tr>
                            <Th>Cotação de compra:</Th>
                            <Th>Cotação de Venda:</Th>
                            <Th>Data e hora da cotação:</Th>
                            <Th>Nome:</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                    {isLoading ? (
                        <Flex>
                            <Spinner
                            thickness='4px'
                            speed='0.65s'
                            emptyColor='gray.200'
                            color='blue.500'
                            size='xl'
                            />
                            <Text>Bem vindo ao Desafio Justa</Text>
                        </Flex>
                    ) : (
                    <>
                        {listPrice.map(item => {
                            const dateFormat = moment(item.dataHoraCotacao).format('DD-MM-YYYY HH:mm:ss')
                            return (
                                <Tr>
                                    <Td
                                    >{showPercentage ? toPercentage(item.cotacaoCompra) : item.cotacaoVenda}</Td>
                                    <Td>{showPercentage ? toPercentage(item.cotacaoVenda) : item.cotacaoVenda}</Td>
                                    <Td isNumeric
                                    >{dateFormat}</Td>
                                    <Td isNumeric>Justa</Td>
                                </Tr>
                            )
                        })}
                        
                    </>
                    )}
                    </Tbody>
                </Table>
            </TableContainer>"
         
        </Flex>
    )
}