var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');

// canvas.width = window.innerWidth - 100;
// canvas.height = window.innerHeight - 100;

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


var square = [];
var score_offset = 100;
var thick = 20;
var boxSize = 130;

var outer =  {
    x : 20,
    y : 20 + score_offset,
    width : boxSize * 4 + thick * 7,
    height : boxSize * 4 + thick * 7,
}

var inner =  {
    x : outer['x'] + thick,
    y : outer['y'] + thick,
    width : boxSize * 4 + thick * 5,
    height : boxSize * 4 + thick * 5,
}

for(var y = 0; y < 4; y++)
{
    var ss= [];
    for(var x = 0; x < 4; x++)
    {
        var s = new Square();
        s.y = inner['y'] + thick + y * (boxSize + thick);
        s.x = inner['x'] + thick + x * (boxSize + thick);
        ss.push(s);
    }

    square.push(ss);
}



// console.log(square);

function drawAll(data)
{
    console.log(data)

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    ctx.fillStyle = 'black';
    ctx.font = font;
    ctx.textAlign="left"; 
    ctx.fillText('SCORE : ' + data['score'], 40, score_offset - 10);
    
    ctx.fillStyle = '#faf8f0';
    
    ctx.fillRect( outer['x'] , outer['y'], outer['width'], outer['height'] );
    
    ctx.fillStyle = '#bdafa2';
    ctx.fillRect( inner['x'], inner['y'], inner['width'], inner['height']);

    for(var y = 0; y < 4; y++) 
    {
        for(var x = 0; x < 4; x++)
        {
            // square[y][x].num = game.getNum(y,x);
            var pos = y * 4 + x            
            square[y][x].num = data[String(pos)];
            square[y][x].draw();
        }
    } 
}

// drawAll();

restart()

function restart(){
    var element = document.getElementById('inform') || {};  // loading null error 방지
    element.innerText = 'Press Up, Down, Left, Right Arrow Key or Button';
    
    fetch(`http://localhost:3000/2048/init`)
        .then((response) => response.json())
        .then((data) => {
            action(data);
        });
}

function action(data){
    console.log(`recv : ${data}`)
    drawAll(data)
    if(data['end'] == true){
        var element = document.getElementById('inform');
        element.innerText = 'Game Over!!';
        return ;
    }
}

document.addEventListener('keydown', (event) => {
    var cmd = event.key

    fetch(`http://localhost:3000/2048/${cmd}`)
        .then((response) => response.json())
        .then((data) => {
            action(data);            
        });
});

// document.getElementById("DownBtn").onclick = function () {
// move('ArrowDown');
// };
