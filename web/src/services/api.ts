import axios from 'axios';


//por que não usar o fetch? porque o axios permite criar
//uma baseurl, que é uma url que vai se repetir em todas as 
//requisições
const api = axios.create({
    baseURL: 'http://localhost:3333'
});

export default api;
