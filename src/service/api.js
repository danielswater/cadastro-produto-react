import axios from "axios";

const api = axios.create({
    baseURL: 'http://localhost:5000'
})

export const service = {
    getProdutos: () => {
        return api.get('/api/produtos')
    },
    postProduto: (produto) => {
        return api.post('/api/add-produtos', produto)
    }
}