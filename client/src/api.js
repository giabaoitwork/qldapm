
import axios from "axios";
var api = axios.create({
    baseURL: 'http://localhost:4000',
});

class CallApi {
    getLevel(id) {
        return api.get(`/api/level/${id}`)
    }

}
export default new CallApi();
