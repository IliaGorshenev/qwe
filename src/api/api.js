import axios from 'axios'

export default class PostService {
    static async getAll() {
        const response = await axios.get('https://jsonplaceholder.typicode.com/users')
        return response
    }
    
    static async getAllCandidates() {
        const response = await axios.get('http://www.andrea7y.beget.tech/api/v1/userdata/?city=Saint%20Petersburg&job=Backend')
        return response
    }
}