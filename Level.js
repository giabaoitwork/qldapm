class Level {
    constructor(id, row, col, bonus_score, minus_score) {
        this.id = id;
        this.row = row;
        this.col = col;
        this.bonus_score = bonus_score;
        this.minus_score = minus_score;
    }
}
module.exports = Level;