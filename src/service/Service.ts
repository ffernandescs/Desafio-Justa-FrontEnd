import axios from "axios"

export const apiSimbol = axios.create({
    baseURL: "https://olinda.bcb.gov.br/olinda/servico/PTAX/versao/v1/odata/Moedas"
})