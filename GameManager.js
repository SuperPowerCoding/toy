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

        // this.createRandomNum();
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
};

module.exports = GameManager;