
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

    addGame(suggest, gameTime) {
        return api.post('/api/create_game', { suggest: suggest, gameTime: gameTime })
    }

    addRounds(gameId, levelId, src, srcOther) {
        return api.post('api/create_round', { gameId: gameId, levelId: levelId, src: src, srcOther: srcOther })
    }

    getMaxLevel() {
        return api.get('/api/maxLevel')
    }

    upload(file, gameId, levelId) {
        const formData = new FormData();
        formData.append('image', file);
        formData.append('gameId', gameId)
        formData.append('levelId', levelId)
        return api.post('/api/upload', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        })
    }

    saveUser(name, phone, email, time, score, gameId) {
        return api.post('/api/save_user', { name: name, phone: phone, email: email, score: score, time: time, game_id: gameId })
    }

    getRank(id) {
        return api.get(`/api/rank/${id}`)
    }

    getUser(id) {
        return api.get(`/api/player/${id}`)
    }

}
export default new CallApi();
