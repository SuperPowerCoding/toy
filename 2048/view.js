// <script type = "module" src="./model.js"></script>
// import {GameManager} from './model.js';

// var model = require('./model.js');
class GameManager
{
    constructor(){
        this.score = 0;
        this.num = [];

        for( var i = 0 ; i < 4; i++)
        {
            var sub = [];

            for( var j = 0 ; j < 4; j++)
            {
                sub.push(0);
            }
            this.num.push(sub);
        }

        this.dir = [[-1, 0], [+1, 0], [0, -1], [0, +1]];
        this.UP = 0;
        this.DOWN = 1;
        this.LEFT = 2;
        this.RIGHT = 3;
    }

    init(){
        
        for( var i = 0 ; i < 4; i++)        
            for( var j = 0 ; j < 4; j++)
                this.num[i][j] = 0;
        
        this.createRandomNum();
    }

    getRandomInt(max)
    {
        var n = Math.floor(Math.random() * 100) % max;
        return n;
    }

    createRandomNum(){
        
        var n = (this.getRandomInt(2) + 1) * 2;
        
        while(true){
            var pos = this.getRandomInt(16);
            var y = Math.floor(pos / 4);
            var x = Math.floor(pos % 4);

           
            if(this.num[y][x] == 0){
                this.num[y][x] = n;
                return;
            }
        }
    }

    // 움직여도 소용 없는 상황
    // 
    checkEnd(){

    }

    getNum(y,x){
        return this.num[y][x];
    }

    getScore()
    {
        this.score = 0;
        for( var i = 0 ; i < 4; i++)        
            for( var j = 0 ; j < 4; j++)
                this.score += this.num[i][j];
        
        return this.score;
    }

    move(y, x, direction) {
        var moved = 0;

        while(true)
        {
            console.log ('Cur:' + y + ',' + x);
            var nextY = y + this.dir[direction][0];
            var nextX = x + this.dir[direction][1];

            // console.log ('N:' + nextY + ',' + nextX);
            
            // 범위 체크
            if(nextY < 0 || nextY >= 4 || nextX < 0 || nextX >= 4)
                break;

            if(this.num[y][x] != 0)
            {
                // 같으면 합친다.
                if(this.num[y][x] == this.num[nextY][nextX])
                {
                    this.num[nextY][nextX] = 2 * this.num[y][x];
                    this.num[y][x] = 0;
                    moved = 1;
                }
                else 
                {
                    // 0인 경우
                    if(this.num[nextY][nextX] == 0){
                        this.num[nextY][nextX] = this.num[y][x];
                        this.num[y][x] = 0;
                        moved = 1;
                    }
                }
            }

            y = nextY;
            x = nextX;
        }

        return moved;
    }

    moveLeft(){
        var ret =0 ;
        for(var i = 0; i < 4; i++)
            ret += this.move(i, 3, this.LEFT);
        return ret;
    }

    moveRight() {
        var ret = 0;
        for(var i = 0; i < 4; i++)
            ret += this.move(i, 0, this.RIGHT);
        return ret;
    }

    moveUp(){
        var ret = 0;
        for(var i = 0; i < 4; i++)
            ret += this.move(3, i, this.UP);
        return ret;
    }

    moveDown(){
        var ret = 0;
        for(var i = 0; i < 4; i++)
            ret += this.move(0, i, this.DOWN);
        return ret;
    }
}


var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');

canvas.width = window.innerWidth - 100;
canvas.height = window.innerHeight - 100;



var game = new GameManager();
game.init();


var font = 'bold 25px Verdana';
var fontColor = '#786c5e';
var boxSize = 50;

var colorDic = {
    0 : '#ffffff',
    2 : '#efe4da',
    4 : '#ece0ca',
    8 : '#f2b278',
    16 : '#f59565',
    32 : '#f97a5f',            
    64 : '#f75c3d',
    128 : '#edce73',
    256 : '#eec750', //
    512 : '#eec750',
    1024 : '#efe4da',
    2048 : '#f0cb73',
};

// console.log(colorDic);

class Square {
    constructor(){
        this.num = 2;
        this.width = boxSize;
        this.height = boxSize;
    }

    getColor(number){

        // console.log(number);

        // console.log(number + ',' + colorDic[number]);
        return colorDic[number];
    }

    draw(){

        ctx.fillStyle = this.getColor(String(this.num));
        ctx.fillRect(this.x, this.y, this.width, this.height);

        if(this.num == 0)
            return;

        ctx.fillStyle = fontColor;
        ctx.font = font;
        ctx.fillText(this.num, this.x + this.width / 3, this.y + this.height / 3 * 2);
    }
}

var square = [];
for(var y = 0; y < 4; y++)
{
    var ss= [];
    for(var x = 0; x < 4; x++)
    {
        var s = new Square();
        s.y = boxSize + y * (boxSize + 10);
        s.x = boxSize + x * (boxSize + 10);
        ss.push(s);
    }

    square.push(ss);
}



var score = {
    x : 20, 
    y : 20,

    draw(num) {
        ctx.fillStyle = 'black';
        ctx.font = font;        
        ctx.fillText('SCORE : ' + num, this.x, this.y);
    }
}

// console.log(square);

function drawAll()
{
    score.draw(game.getScore());

    ctx.fillStyle = '#faf8f0';
    ctx.fillRect( 25 , 25, boxSize * 4 + 10 * 4 + 20 + 20, boxSize * 4 + 10 * 4 + 20 + 20 );
    
    ctx.fillStyle = '#bdafa2';
    ctx.fillRect( 35 , 35, boxSize * 4 + 10 * 4 + 20, boxSize * 4 + 10 * 4 + 20 );

    for(var y = 0; y < 4; y++) 
    {
        for(var x = 0; x < 4; x++)
        {
            square[y][x].num = game.getNum(y,x);
            square[y][x].draw();
        }
    } 
}

drawAll();

document.addEventListener('keydown', (event) => {
    // console.log(event);
    
    var ret = 0;

    if(event.key == 'ArrowDown'){        
        ret = game.moveDown();
    }

    if(event.key == 'ArrowUp'){        
        ret = game.moveUp();
    }

    if(event.key == 'ArrowLeft'){        
        ret = game.moveLeft();
    }

    if(event.key == 'ArrowRight'){
        ret = game.moveRight();
    }

    if(ret == 0)
        return;

    // ctx.fillStyle = 'white';
    // ctx.fillRect(0, 0, ctx.width, ctx.height);
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    game.createRandomNum();

    drawAll();

});
