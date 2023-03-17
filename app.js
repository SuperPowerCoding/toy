// import { GameManager } from './GameEngine.js'
const GameManager = require('./GameManager.js');
var game = new GameManager();

const express = require('express')
var cors = require('cors')
const app = express()
const port = 3000


game.init()

app.use(cors())

app.get('/', (req, res) => {
    // res.send('Hello World')
    // res.sendFile('index.html')
    // res.send('<h1>1234</h1>')
    
})

app.get('/2048/:cmd', (req, res) => {
    const {cmd} = req.params
    console.log(cmd)

    var check = 0;
    switch(cmd)
    {
        case 'ArrowUp'  : 
            check += game.moveUp(); 
            break;
        case 'ArrowDown': 
            check += game.moveDown(); 
            break;
        case 'ArrowRight': 
            check += game.moveRight(); 
            break;
        case 'ArrowLeft': 
            check += game.moveLeft(); 
            break;
        case 'init'     : 
            game.init();
            check = 1;
            break;
    }

    // console.log(check)

    if(check != 0)
        game.createRandomNum();
    
    var ret = {
        0 : game.getNum(0,0),
        1 : game.getNum(0,1),
        2 : game.getNum(0,2),
        3 : game.getNum(0,3),
       
        4 : game.getNum(1,0),
        5 : game.getNum(1,1),
        6 : game.getNum(1,2),
        7 : game.getNum(1,3),
        
        8 : game.getNum(2,0),
        9 : game.getNum(2,1),
        10 : game.getNum(2,2),
        11 : game.getNum(2,3),

        12 : game.getNum(3,0),
        13 : game.getNum(3,1),
        14 : game.getNum(3,2),
        15 : game.getNum(3,3),

        score : game.getScore(),
        end : game.checkEnd(),
        valid : ret != 0
    }
    // console.log(ret)

    res.send(ret)
})  


app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)    
})







