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
        
        // this.num[0][0] = 2;
        // this.num[1][0] = 2;
        // this.num[2][0] = 2;
        // this.num[3][0] = 2;

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
    checkEnd(){        
        var arr = [[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0]]; //this.num.slice();

        for(var i=0; i < 4; i++)
            for(var j=0; j < 4; j++)
                arr[i][j] = this.num[i][j];

        for(var i = 0; i < 4; i++)
            for(var j = 1; j < 4; j++)
                if(this.move(arr, i, j, this.LEFT) == 1)
                    return false;
       
        for(var i = 0; i < 4; i++)
            for(var j = 3; j >= 0; j--)
                if(this.move(arr, i, j, this.RIGHT) == 1)
                    return false;
    
        for(var i = 0; i < 4; i++)
            for(var j = 1; j < 4; j++)
                if(this.move(arr, j, i, this.UP) == 1)
                    return false;
    
        for(var i = 0; i < 4; i++)
            for(var j = 3; j >= 0; j--)
                if(this.move(arr, j, i, this.DOWN) == 1)
                    return false;

        return true;
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

    move(num, y, x, direction) {
        var moved = 0;
        var merged = 0;

        while(true)
        {
            var nextY = y + this.dir[direction][0];
            var nextX = x + this.dir[direction][1];

            // console.log ('N:' + nextY + ',' + nextX);
            
            // 범위 체크
            if(nextY < 0 || nextY >= 4 || nextX < 0 || nextX >= 4)
                break;

            if(merged == 1)
                break;

            if(num[y][x] != 0)
            {
                // 같으면 합친다.
                if(merged == 0 && num[y][x] == num[nextY][nextX])
                {
                    num[nextY][nextX] = 2 * num[y][x];
                    num[y][x] = 0;
                    moved = 1;
                    merged = 1;
                }
                else 
                {
                    // 0인 경우
                    if(num[nextY][nextX] == 0){
                        num[nextY][nextX] = num[y][x];
                        num[y][x] = 0;
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
            for(var j = 1; j < 4; j++)
                ret += this.move(this.num, i, j, this.LEFT);
        return ret;
    }

    moveRight() {
        var ret = 0;
        for(var i = 0; i < 4; i++)
            for(var j = 3; j >= 0; j--)
                ret += this.move(this.num,i, j, this.RIGHT);
        return ret;
    }

    moveUp(){
        var ret = 0;
        for(var i = 0; i < 4; i++)
            for(var j = 1; j < 4; j++)
                ret += this.move(this.num,j, i, this.UP);
        return ret;
    }

    moveDown(){
        var ret = 0;
        for(var i = 0; i < 4; i++)
            for(var j = 3; j >= 0; j--)
                ret += this.move(this.num,j, i, this.DOWN);
        return ret;
    }
}


var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');

// canvas.width = window.innerWidth - 100;
// canvas.height = window.innerHeight - 100;



var game = new GameManager();
game.init();


var font = 'bold 45px Verdana';
var fontColor = '#786c5e';
var boxSize = 130;

var colorDic = {
    0 : '#ffffff',
    2 : '#efe4da',
    4 : '#ece0ca',
    8 : '#f2b278',
    16 : '#f59565',
    32 : '#f97a5f',            
    64 : '#f75c3d',
    128 : '#edce73',
    256 : '#eec750', 
    512 : '#eec750',
    1024 : '#efe4da',
    2048 : '#f0cb73',
};

var fontDic = {
    0 : 'bold 75px Verdana',
    2 : 'bold 75px Verdana',
    4 : 'bold 75px Verdana',
    8 : 'bold 75px Verdana',
    16 : 'bold 60px Verdana',
    32 : 'bold 60px Verdana',
    64 : 'bold 60px Verdana',
    128 : 'bold 45px Verdana',
    256 : 'bold 45px Verdana',
    512 : 'bold 45px Verdana',
    1024 : 'bold 30px Verdana',
    2048 : 'bold 30px Verdana',
    4096 : 'bold 30px Verdana',
    8192 : 'bold 30px Verdana',
    16384 :  'bold 15px Verdana',

};

class Square {
    constructor(){
        this.num = 2;
        this.width = boxSize;
        this.height = boxSize;
    }

    getColor(number){
        var num = parseInt(number);
        if(num >= 2048)
            return fontDic['2048'];
        return colorDic[number];
    }

    getFront(number){        
        var num = parseInt(number);
        if(num >= 16384)
            return fontDic['16384'];
        return fontDic[number];
    }

    draw(){

        ctx.fillStyle = this.getColor(String(this.num));
        ctx.fillRect(this.x, this.y, this.width, this.height);

        if(this.num == 0)
            return;

        ctx.fillStyle = fontColor;
        ctx.font = this.getFront(this.num);
        ctx.textAlign="center"; 
        ctx.textBaseline = "middle";
        ctx.fillText(this.num, this.x + this.width / 2, this.y + this.height / 2);
        // ctx.fillText(this.num, this.x + this.width / 3, this.y + this.height / 3 * 2);
    }
}

var score_offset = 100;
var square = [];
var thick = 20;
for(var y = 0; y < 4; y++)
{
    var ss= [];
    for(var x = 0; x < 4; x++)
    {
        var s = new Square();
        s.y = 20 + boxSize + y * (boxSize + thick);
        s.x = 50 + x * (boxSize + thick);
        ss.push(s);
    }

    square.push(ss);
}



// console.log(square);

function drawAll()
{
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    ctx.fillStyle = 'black';
    ctx.font = font;
    ctx.textAlign="left"; 
    ctx.fillText('SCORE : ' + game.getScore(), 40, score_offset - 10);
    
    ctx.fillStyle = '#faf8f0';
    ctx.fillRect( 20 , score_offset + 20, boxSize * 4 + thick * 6, boxSize * 4 + thick * 4 + 20 + thick );
    
    ctx.fillStyle = '#bdafa2';
    ctx.fillRect( 35 , score_offset + 35, boxSize * 4 + thick * 4 + 10, boxSize * 4 + thick * 4 + 10 );

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

function move(key)
{
    var ret = 0;

    // if(false) { 
    if ( game.checkEnd() == true){        
        var element = document.getElementById('inform');
        element.innerText = 'Game Over!!';
        return ;
    }


    if(key == 'ArrowDown'){        
        ret = game.moveDown();
    }

    if(key == 'ArrowUp'){        
        ret = game.moveUp();
    }

    if(key == 'ArrowLeft'){        
        ret = game.moveLeft();
    }

    if(key == 'ArrowRight'){
        ret = game.moveRight();
    }

    if(ret == 0)
        return;

    game.createRandomNum();

    drawAll();

}

function moveUp(){
    move('ArrowUp');
}

function moveDown(){
    move('ArrowDown');
}

function moveLeft(){
    move('ArrowLeft');
}

function moveRight(){
    move('ArrowRight');
}

function restart(){
    game.init();
    drawAll();
    var element = document.getElementById('inform');
    element.innerText = 'Press Up, Down, Left, Right Arrow Key or Button';
}


document.addEventListener('keydown', (event) => {
    move(event.key);
});

// document.getElementById("DownBtn").onclick = function () {
// move('ArrowDown');
// };
