var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');

canvas.width = window.innerWidth - 100;
canvas.height = window.innerHeight - 100;

var font = '25px serif';

var boxSize = 50;

class Square {
    constructor(){
        this.num = 2;
        this.width = boxSize;
        this.height = boxSize;
    }

    draw(){

        ctx.fillStyle = '#efe4da';
        ctx.fillRect(this.x, this.y, this.width, this.height);

        ctx.fillStyle = 'black';
        ctx.font = font;
        ctx.fillText(this.num, this.x + this.width / 3, this.y + this.height / 3 * 2);
    }
}

var square = [];
for(var y = 0; y < 4; y++)
{
    for(var x = 0; x < 4; x++)
    {
        var s = new Square();
        s.y = 50 + y * (boxSize + 10);
        s.x = 50 + x * (boxSize + 10);

        square.push(s);
    }
}

square.forEach(a => { a.draw() });

ctx.fillStyle = 'black';
ctx.font = font;
ctx.fillText('SCORE : ', 20, 20);


