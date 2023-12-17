
import axios from "axios";
var api = axios.create({
    baseURL: 'http://localhost:4000',
});

class CallApi {
    getLevel(id) {
        return api.get(`/api/level/${id}`)
    }

    getGame(id) {
        return api.get(`/api/game/${id}`)
    }

    getRound(gameId, levelId) {
        return api.post('/api/round', { gameId: gameId, levelId: levelId })
    }

}
export default new CallApi();
