class Level {
    constructor(id, row, col, bonusScore, minusScore) {
        this.id = id;
        this.row = row;
        this.col = col;
        this.bonusScore = bonusScore;
        this.minusScore = minusScore;
    }
}
module.exports = Level;