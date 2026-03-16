import axios from 'axios'

const api = axios.create({
    baseURL: 'https://api.themoviedb.org/3/',
    params: {
        api_key: '3dbab29599a6283b36f03b51165ee2af',
        language: 'pt-BR',
        page: 1
    }
})

export default api