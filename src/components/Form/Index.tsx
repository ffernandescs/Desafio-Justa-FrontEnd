import { useEffect, useState } from 'react';
import { 
    Flex,
    useToast,
    Text, 
    FormControl,  
    Select,
    Input,
    Button, 
    Box, 
    TableContainer, 
    TableCaption, 
    Table, 
    Spinner, 
    Tr, 
    Th, 
    Thead, 
    Tbody, 
    Td, 
    FormLabel

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

    const [searchCompra, setSearchCompra] = useState('')
    const [searchVenda, setSearchVenda] = useState('')
    const [searchDate, setSearchDate] = useState('')
    const [searchName, setSearchName] = useState('')

    const [errors, setErrors] = useState<{ [key: string]: string }>({});

    const [showPercentage, setShowPercentage] = useState(false);

    const [enableSubmit, setEnableSubmit] = useState<boolean>(false);

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

    //*Fun????o com objetivo de transformar numeros em porcentagem

    const toPercentage = (numbe: any) => {
        return (numbe * 100).toFixed(2) + '%'
    }

    /*Fun????o para carregamento da API que contem os simbolos,
    a mesma tem objetivo de mostrar os simbolos no componente Select */

    useEffect(() =>  {
        loadApiSimbol()
    }, [])

    //* Fun????o parar loding e mensagem bem vindo quando abre o Desafio

    function loading() {
        setIsLoading(true);
        setTimeout(() => {
            setIsLoading(false);
        }, 300);
    }

    /*Fun????o que cria um alerta quando a data inicial ?? maior que a data Final */
    
    const toast = useToast()
    const statuses = 'error'
    const position = 'top'

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (new Date(valDateInitial) > new Date(valDateFinal)) {
            toast({
                title: 'Data inicial n??o pode ser maior que Data final!',
                status: statuses,
                position: position,
                isClosable: true
            })
        }
    };

    //* Fun????o que tem objetivo de fazer limpeza em todos os campos preenchidos

    const handleClearClick = () => {
        loading()
        setEnableSubmit(false)
        setListPrice([]);
        setSimbolVal('');
        setValDateInitial('');
        setValDateFinal('');
        setSearchCompra('')
        setSearchVenda('')
        setSearchDate('')
        setSearchName('')
    };

    //* Fun????o para fltrar os objetos exibidos na tabela ao digitar valor nos inputs

    const filterData = listPrice.filter(itemData => {
        return (
            (searchCompra === '' || itemData.cotacaoCompra === parseFloat(searchCompra)) &&
            (searchVenda === '' || itemData.cotacaoVenda === parseFloat(searchVenda)) &&
            itemData.dataHoraCotacao.toLowerCase().includes(searchDate.toLowerCase())
        )
    })

    //* Fun????o que cria maskara nos inputs

    function stringMask(value: string) {
        let maskeValue = value.replace(/\D/g, '')
        maskeValue = maskeValue.replace(/^(\d{1})(\d)/, "$1.$2")
            return maskeValue
    }    

    /* Fun????o que ao Clicar no bota?? consultar dados, exibe as infoma????es de consulta
    na tabela*/

    const handleHistoryPrice = () => {
        if (valDateInitial > valDateFinal) {
            setEnableSubmit(false)
        } else if (simbolVal && valDateInitial && valDateFinal) {
            setEnableSubmit(true);
            loading()
            loadPrice()
            setShowPercentage(false);
        } 
    }

    /*Fun????o que ao clicar no bot??o transforma os campos de compra e venda em porcentagem */
    
    const handleConvertPrice = () => {
        loading()
        loadPrice()
        setShowPercentage(true);
    } 

    /*Funcao que cria validacao de campos obrigatorio */
    
    const handleBlur = (field: string, value: string) => {
        if (!value) {
        setErrors((prevState) => ({
            ...prevState,
            [field]: '*Campo ?? obrigat??rio',
        }));
        } else {
            setErrors((prevState) => ({
            }));
        }
    };

    return (
        <>
        <Flex
            direction='column'
            alignItems='center'
            justifyContent='space-between'
            w='100%'
            maxW='1200px'
            padding={['5', '10']} 
            border={['none', '1px solid #333333']}
            borderRadius='20px'
            boxShadow={['none', '1px 1px 5px black']}
            marginTop={['0', '10']}
        >
            <Text
                fontSize={["3xl","5xl"]}
                padding='2'
            >
                Hist??rico de cota????o
            </Text>
            <form
                onSubmit={handleSubmit}
            >
                <Flex
                    direction='column'
                    justify='space-between'
                >
                    <Box
                        display='flex'
                        alignItems='center'
                        justifyContent={['center', 'space-between']}
                        flexWrap={['wrap', 'inherit']}
                        mb='5'
                    >
                        <FormControl
                            w={['100%', '300px']}
                            h='120px'
                            maxW={['inherit', '300px']}
                            paddingBottom={['5', '10']} 
                            isInvalid={!!errors.simbolVal}>
                            <FormLabel htmlFor="simbolVal">Moeda:</FormLabel>
                            <Select 
                                id="simbolVal"
                                value={simbolVal}
                                onChange={(e) => setSimbolVal(e.target.value)}
                                onBlur={() => handleBlur('simbolVal', simbolVal)}
                                borderColor={errors.simbolVal ? 'red.500' : 'gray.500'}
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
                        <FormControl 
                            w={['100%', '300px']}
                            h='120px'
                            maxW={['inherit', '300px']}
                            paddingBottom={['5', '10']}
                            isInvalid={!!errors.valDateInitial}>
                            <FormLabel htmlFor="valDateInitial">Data Inicial:</FormLabel>
                            <Input
                                id="valDateInitial"
                                value={valDateInitial}
                                size="md"
                                type="date"
                                onChange={(event) => setValDateInitial(event.target.value)}
                                onBlur={() => handleBlur('valDateInitial', valDateInitial)}
                                borderColor={errors.valDateInitial ? 'red.500' : 'gray.500'}
                            />
                            <Box color="red.500" mt={2}>
                                {errors.valDateInitial}
                            </Box>
                        </FormControl>
                
                        <FormControl 
                            w={['100%', '300px']}
                            h='120px'
                            maxW={['inherit', '300px']}
                            margin='0' 
                            marginTop='0'
                            paddingBottom={['5', '10']} 
                            isInvalid={!!errors.valDateFinal}>
                            <FormLabel htmlFor="valDateFinal">Data Final:</FormLabel>
                            <Input
                                id="valDateFinal"
                                value={valDateFinal}
                                size="md"
                                type="date"
                                onChange={(event) => setValDateFinal(event.target.value)}
                                onBlur={() => handleBlur('valDateFinal', valDateFinal)}
                                borderColor={errors.valDateFinal ? 'red.500' : 'gray.500'}
                            />
                            <Box color="red.500" mt={2}>
                                {errors.valDateFinal}
                            </Box>
                        </FormControl>
                    </Box>
                    <Box
                        display='flex'
                        justifyContent={['center', 'space-between']}
                        flexWrap={['wrap', 'inherit']}
                        position='relative'
                    >
                    {isLoading && (
                    <Flex
                        w='100%'
                        h='100%'
                        bg='transparent'
                        pos='absolute'
                        top='0'
                        left='0'
                        right='0'
                        bottom='0'
                        margin='auto'
                        align='center'
                        justify='center'
                        zIndex='5'
                        background='whiteAlpha.700'
                    >
                        <Spinner
                        
                        thickness=' 4px'
                        speed='0.85s'
                        emptyColor='gray.500'
                        color='blue.800'
                        size='xl'

                        />
                    </Flex>
                    )}
                    
                        <Button
                            w={['100%', '300px']}
                            maxW={['inherit', '300px']}
                            marginBottom={['5', '5']}
                            colorScheme='red'
                            onClick={handleClearClick}
                        >Limpar</Button>
                        <Button 
                            w={['100%', '300px']}
                            maxW={['inherit', '300px']}
                            marginBottom={['5', '5']}
                            as='button'
                            type='submit'
                            onClick={handleHistoryPrice}
                            colorScheme='facebook'
                            isDisabled={!simbolVal || !valDateInitial || !valDateFinal}
                            >Consultar Cota????o
                        </Button>
                        <Button
                            w={['100%', '300px']}
                            maxW={['inherit', '300px']}
                            marginBottom={['5', '5']}
                            as='button'
                            type='submit'
                            onClick={handleConvertPrice}
                            colorScheme='green'
                            isDisabled={!enableSubmit}
                        >Tranformar Cota????o em %
                        </Button>
                        
                    </Box>
                    <Box
                        display='flex'
                        alignItems='center'
                        justifyContent={['center', 'space-between']}
                        flexWrap={['wrap', 'inherit']}
                        mt='5'
                    >
                        <FormControl 
                            w={['100%', '250px']}
                            maxW={['inherit', '300px']}
                            paddingBottom={['5', '10']} 
                        >
                            <FormLabel 
                                textAlign='center'
                                htmlFor="valDateFinal">Cota????o de compra:
                            </FormLabel>
                            <Input
                                size="md"
                                value={stringMask(searchCompra)}
                                onChange={(e) => setSearchCompra(e.target.value)}
                                borderColor='gray.500'
                            />
                        </FormControl>
                        <FormControl 
                            w={['100%', '250px']}
                            maxW={['inherit', '300px']}
                            paddingBottom={['5', '10']}
                        >
                            <FormLabel 
                                textAlign='center'
                                htmlFor="valDateInitial">Cota????o de venda:
                            </FormLabel>
                            <Input
                                size="md"
                                value={stringMask(searchVenda)}
                                onChange={(e) => setSearchVenda(e.target.value)}
                                borderColor='gray.500'
                            />
                        </FormControl>
                
                        <FormControl 
                            w={['100%', '250px']}
                            maxW={['inherit', '300px']}
                            paddingBottom={['5', '10']} 
                        >
                            <FormLabel 
                                textAlign='center'
                                htmlFor="valDateFinal">Data e hora da cota????o:
                            </FormLabel>
                            <Input
                                id="valDateFinal"
                                size="md"
                                type="date"
                                value={searchDate}
                                onChange={(e) => setSearchDate(e.target.value)}
                                borderColor='gray.500'
                            />
                        </FormControl>
                        <FormControl 
                            w={['100%', '250px']}
                            maxW={['inherit', '300px']}
                            paddingBottom={['5', '10']} 
                        >
                            <FormLabel 
                                textAlign='center'
                                htmlFor="valDateFinal">Nome:
                            </FormLabel>
                            <Input
                                id="valDateFinal"
                                size="md"
                                type="text"
                                value={searchName}
                                onChange={(e) => setSearchName(e.target.value)}
                                borderColor='gray.500'
                            />
                        </FormControl>
                    </Box>
                </Flex>
            </form>
            <TableContainer 
                w='100%'
                h={['inherit', '70vh']}
                minH={['300px', 'inherit']}
                overflowY='auto'
                borderRadius='10px'
                border='1px solid #DCDCDC'
            >
                <Table 
                    variant='striped' 
                    colorScheme='gray'
                    position='relative'
                >
                    <TableCaption
                        textAlign='start'
                    >
                        <Text>Total de Resultados: {listPrice.length}</Text>
                    </TableCaption>
                    <Thead>
                        <Tr
                            position='sticky'
                            top='0'
                            bg='blue.600'
                        >
                            <Th
                                color='white'
                            >Cota????o de compra:</Th>
                            <Th
                                color='white'
                            >Cota????o de Venda:</Th>
                            <Th
                                color='white'
                            >Data e hora da cota????o:</Th>
                            <Th
                                color='white'
                            >Nome:</Th>
                        </Tr>
                    </Thead>
                    <Tbody
                    overflow='hidden'
                    >
                        {filterData.map(item => {
                            return (
                                <Tr
                                height='100xp'
                                >
                                    <Td
                                    >{showPercentage ? toPercentage(item.cotacaoCompra) : item.cotacaoCompra}</Td>
                                    <Td>{showPercentage ? toPercentage(item.cotacaoVenda) : item.cotacaoVenda}</Td>
                                    <Td>{item.dataHoraCotacao}</Td>
                                    <Td>Justa</Td>
                                </Tr>
                            )
                        })}
                    </Tbody>
                </Table>
            </TableContainer>"
        </Flex>
      </>
    );
  };
