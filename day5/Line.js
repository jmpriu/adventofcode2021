class Point {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
}
class Line {
    a = null;
    b = null;
    isHorizontal = false
    isVertical = false
    // x1,y1 -> x2,y2
    constructor(lineString) {
        const points = lineString.split(' -> ');
        this.a = new Point(...points[0].split(',').map(Number));
        this.b = new Point(...points[1].split(',').map(Number));
        this.isHorizontal = this.a.y === this.b.y;
        this.isVertical = this.a.x === this.b.x;
    }

    // Part 1
    getPointsLine() {
        const points = [];
        if (this.isHorizontal) {
            const y = this.a.y;
            let start, end;
            if (this.a.x > this.b.x) {
                start = this.b.x;
                end = this.a.x;
            } else {
                start = this.a.x;
                end = this.b.x;
            }
            for (let x = start; x <= end; x++) {
                points.push(new Point(x, y));
            }
        } else if (this.isVertical) {
            const x = this.a.x;
            let start, end;
            if (this.a.y > this.b.y) {
                start = this.b.y;
                end = this.a.y;
            } else {
                start = this.a.y;
                end = this.b.y;
            }
            for (let y = start; y <= end; y++) {
                points.push(new Point(x, y));
            }
        }
        return points;
    }
    // Part 2
    getPontsLineWithDiagonal() {
        const points = [];
        const xInc = this.a.x > this.b.x ? -1 : this.a.x < this.b.x ? 1 : 0;
        const yInc = this.a.y > this.b.y ? -1 : this.a.y < this.b.y ? 1 : 0;
        let x = this.a.x;
        let y = this.a.y;
        while (x !== this.b.x || y !== this.b.y) {
            points.push(new Point(x, y));
            x += xInc;
            y += yInc;
        }
        points.push(new Point(this.b.x, this.b.y));
        return points;
    }

}

module.exports = { Line, Point };