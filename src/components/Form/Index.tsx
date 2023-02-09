import { useEffect, useState } from 'react';
import { 
    Flex, 
    Text, 
    FormControl,  
    Select,
    Input,
    Button 
} from '@chakra-ui/react'
import { PriceProps } from '../../types/ItemProps';
import moment from 'moment';


interface SimbolProps {
    nomeFormatado: string,
    simbolo: string,
    tipoMoeda: string,
}

export const Form = () => { 
    const [listSimbol, setListSimbol] = useState<SimbolProps[]>([])

    const [listPrice, setListPrice] = useState<PriceProps | null>(null)
    const [simbolVal, setSimbolVal] = useState('')

    const [valDateInitial, setValDateInitial] = useState('')

    const [valDateFinal, setValDateFinal] = useState('')

    async function loadApiSimbol() {
        const responseSimbol = await fetch('https://olinda.bcb.gov.br/olinda/servico/PTAX/versao/v1/odata/Moedas')
        const dataSimbol = await responseSimbol.json()
        setListSimbol(dataSimbol.value)
    }

    async function loadPrice() {
        setListPrice(null)

        let dateFormaInitial = moment(valDateInitial).format('MM-DD-YYYY')
        let dateFormaFinal = moment(valDateFinal).format('MM-DD-YYYY')

        const responsePrice = await fetch(`https://olinda.bcb.gov.br/olinda/servico/PTAX/versao/v1/odata/CotacaoMoedaPeriodo(moeda=@moeda,dataInicial=@dataInicial,dataFinalCotacao=@dataFinalCotacao)?@moeda='${simbolVal}'&@dataInicial='${dateFormaInitial}'&@dataFinalCotacao='${dateFormaFinal}'&$top=100&$format=json`)
        const dataPrice = await responsePrice.json()


        const { cotacaoCompra, cotacaoVenda, dataHoraCotacao, loja } = dataPrice.value

        const priceData: PriceProps = {
            cotacaoCompra,
            cotacaoVenda,
            dataHoraCotacao,
          
            
        }

        setListPrice(priceData)
    }

    useEffect(() =>  {
        loadApiSimbol()
    }, [])

    
    const hanleHistoryPrice = () => {
        loadPrice()
        console.log(listPrice?.dataHoraCotacao)

    }


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
                        placeholder=''                         
                        maxW='300px'
                        onChange={(e) => setSimbolVal(e.target.value)}
                        value={simbolVal}
                    >
                        <option >Selecione a Moeda</option>
                        {listSimbol.map(item => {
                            return (
                                <option >{item.simbolo}</option>
                            )
                        })}
                    </Select>
                    <Input
                        placeholder="Selecione a Data Inicial"
                        size="md"
                        type="date"
                        maxW='300px'
                        onChange={(e) => setValDateInitial(e.target.value)}

                    />
                    <Input
                        placeholder="Selecione a Data Final"
                        size="md"
                        type="date"
                        maxW='300px'
                        onChange={(e) => setValDateFinal(e.target.value)}

                    />
                    <Button colorScheme='blue'>Limpar</Button>
                    <Button 
                        onClick={() => hanleHistoryPrice()}
                        colorScheme='blue'>Consultar Dados</Button>

                </Flex>

            </FormControl>
            
        </Flex>
    )
}