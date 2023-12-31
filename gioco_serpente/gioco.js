window.onload = function ()
{
    var canvasWidth = 900;
    var canvasHeight = 600;
    var blockSize = 30;
    var ctx;
    var delay = 200;
    var applee;
    var snakee;
    var widthInBlocks = canvasWidth/blockSize;
    var heightInBlocks = canvasHeight/blockSize;
    var score;
    var timeout;
    
    init();
    function init()
        {
var canvas = document.createElement('canvas');
canvas.width = canvasWidth;
canvas.height = canvasHeight;
canvas.style.border = " 12px solid dodgerblue";
canvas.style.margin = "28px auto";
canvas.style.display = "block";
canvas.style.backgroundColor = "rgb(155, 221, 329)";
document.body.appendChild(canvas);
ctx = canvas.getContext('2d');
snakee = new Snake([[6,4], [5,4], [4,4]], "right");
applee = new Apple([10,10]);
score = 0;
refreshCanvas();
    }
    function restart()
    {
snakee = new Snake([[6,4], [5,4],[4,4]], "right");
applee= new Apple([10,10]);
score = 0;
clearTimeout(timeout);
refreshCanvas();

    }
function refreshCanvas()
{
    snakee.advance();
    if(snakee.checkCollision())
{   gameOver();
    }
    else
    {
        if(snakee.isEatingApple(applee))
        {
            score +=1;
            snakee.ateApple = true;
            do{
                applee.setNewPosition();
            }
            while(applee.isOnSnake(snakee))
        }
    ctx.clearRect(0,0,canvasWidth,canvasHeight);
    drawScore();
    snakee.draw();
    applee.draw();
    timeout = setTimeout(refreshCanvas, delay);
    }
}
function gameOver() {
    ctx.save();
    ctx.font = "bold 68px sans-serif";
    ctx.fillStyle = "black";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.strokeStyle = "white";
    ctx.lineWidth = 5;
    var centreX = canvasWidth/2;
    var centreY = canvasHeight/2;
    ctx.strokeText("Game Over", centreX, centreY-180);
    ctx.fillText("Game Over",centreX, centreY-180);
    ctx.font = "bold 30px sans-serif";
    ctx.strokeText("Premi la barra spaziatrice per riprodurre di nuovo", centreX, centreY-120);
    ctx.fillText("Premi la barra spaziatrice per riprodurre di nuovo", centreX, centreY-120);
    ctx.restore();
}
function drawScore()
{
    ctx.save();
    ctx.font = "bold 200px sans-serif";
    ctx.fillStyle = "dodgerblue";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    var centreX = canvasWidth/2;
    var centreY = canvasHeight/2;
    ctx.fillText(score.toString(), centreX, centreY);
    ctx.restore();
}
function drawBlock(ctx, position, i, body_length, direction,position_q) {
    if(i > 0 && i < body_length - 1) {
        var x = position[0] * blockSize;
        var y = position[1] * blockSize; 
        ctx.fillRect(x, y, blockSize, blockSize);
    } else {
        if((direction === "up" && i === 0) || (position_q[1] === position[1] + 1 && i === body_length - 1 )) {
            var x = position[0] * blockSize;
            var y = position[1] * blockSize;
            var radius = blockSize / 2;
            ctx.fillRect(x, y + radius, blockSize, blockSize / 2);
            ctx.beginPath();
            var x = position[0] * blockSize + radius;
            var y = position[1] * blockSize + radius;
            ctx.arc(x, y, radius, 0, Math.PI, true);
            ctx.fill();
        }
        else if ((direction === "right" && i === 0) || (position_q[0] = position[0] - 1 && i === body_length - 1)) {
            var x = position[0] * blockSize;
            var y = position[1] * blockSize;
            ctx.fillRect(x, y, blockSize / 2, blockSize);
            ctx.beginPath();
            var radius = blockSize / 2;
            var x = position[0] * blockSize + radius;
            var y = position[1] * blockSize + radius;
            ctx.arc(x, y, radius, Math.PI / 2, (Math.PI * 3) / 2, true);
            ctx.fill();
        } else if ((direction === "down" && i === 0) || (position_q[1] === position[1] - 1 && i === body_length - 1)) {
            var x = position[0] * blockSize;
            var y = position[1] * blockSize;
            var radius = blockSize / 2;
            ctx.fillRect(x, y, blockSize, blockSize / 2);
            ctx.beginPath();
            var x = position[0] * blockSize + radius;
            var y = position[1] * blockSize + radius;
            ctx.arc(x, y, radius, Math.PI , Math.PI * 2, true);
            ctx.fill();
        } else if ((direction == "left" && i === 0) || (position_q[0] === position[0] + 1 && i === body_length - 1)) {
            var x = position[0] * blockSize;
            var y = position[1] * blockSize;
            var radius = blockSize / 2;
            ctx.fillRect(x + radius,y, blockSize / 2 , blockSize);
            ctx.beginPath();
            var x = position[0] * blockSize + radius;
            var y = position[1] * blockSize + radius;
            ctx.arc(x, y, radius, (Math.PI * 3) / 2 , (Math.PI * 5) / 2, true);
            ctx.fill();
        } 
    }
}
 function Snake(body, direction) {
    this.body = body;
    this.direction = direction;
    this.ateApple = false;
    this.draw = function () {
        ctx.save();
        for (var i = 0; i < this.body.length; i++) {
            if( i % 2 === 0 && i > 1) {
                ctx.fillStyle = "#ffccbc";
            } else if (i === 0) {
                ctx.fillStyle = "#ffccbc";
            } else {
                ctx.fillStyle = "#ffccbc";
            }
            if( i === 0)
            drawBlock(ctx, this.body[i],  i, this.body.length, this.direction, [300, 300]);
                else
                drawBlock(ctx, this.body[i],i,this.body.length,this.direction,this.body[i - 1]);
        }
        ctx.restore();
    };
    this.advance = function () {
        var nextPosition = this.body[0].slice();
        switch(this.direction) {
            case "left":
                nextPosition[0] -= 1;
                break;
                case "right":
                    nextPosition[0] += 1;
                    break;
            case "down":
                nextPosition[1] += 1;
                break;
            case "up":
                nextPosition[1] -= 1;
                break;
            default:
                throw "Invalid Direction";
        }
        this.body.unshift(nextPosition);
        if(!this.ateApple) this.body.pop();
        else this.ateApple = false;
    };
    this.setDirection = function (newDirection) {
        var allowedDirections;
        switch(this.direction) {
            case "left":
            case "right":
                allowedDirections = ["up", "down"];
                break;
            case "down":
            case "up":
                allowedDirections = ["left", "right"];
                break;
            default:
                throw "Invalid Direction";
        }
    if (allowedDirections.indexOf(newDirection) > -1) {
        this.direction = newDirection;
    }
    };
    this.checkCollision = function () {
        var wallCollision = false;
        var snakeCollision = false;
        var head =this.body[0];
        var rest = this.body.slice(1);
        var snakeX = head[0];
        var snakeY = head[1];
        var minX = 0;
        var minY = 0;
        var maxX = widthInBlocks - 1;
        var maxY = heightInBlocks - 1;
        var isNotBetweenHorizontallWalls = snakeX < minX || snakeX > maxX;
        var isNotBetweeVerticalWalls = snakeY < minY || snakeY > maxY;
        if(isNotBetweenHorizontallWalls || isNotBetweeVerticalWalls){
            wallCollision = true;
        }
        for (var i = 0; i < rest.length; i++) {
            if(snakeX === rest[i][0] && snakeY === rest[i][1])
            {
                snakeCollision = true;
            }
        }
        return wallCollision || snakeCollision;
    };
    this.isEatingApple = function (appleToEat) {
        var head = this.body[0];
        if (
            head[0] === appleToEat.position[0] &&
            head[1] === appleToEat.position[1]
        )
        return true;
        else return false;
    };

 }
 function Apple(position) {
    this.position = position;
    this.draw = function () 
    {
        ctx.save();
        ctx.fillStyle = "#01579b";
        ctx.beginPath();
        var radius = blockSize/2;
        var x = this.position[0]* blockSize + radius;
        var y = this.position[1]*blockSize + radius;
        ctx.arc(x,y,radius,0,Math.PI*2, true);
        ctx.fill();
        ctx.restore();
    }
    this.setNewPosition = function()
    {
        var newX = Math.round(Math.random() * (widthInBlocks - 1));
        var newY = Math.round(Math.random() * (heightInBlocks - 1));
        this.position = [newX, newY];
    }
    this.isOnSnake = function(snakeToCheck)
    {
        var isOnSnake= false;
        for(var i = 0; i < snakeToCheck.body.length ; i++)
        {
            if(this.position[0] === snakeToCheck.body[i][0] && this.position[1] === snakeToCheck.body[i][1])
            {
                isOnSnake = true;
            }
        }
        return isOnSnake;
    }

 }
 document.onkeydown = function handleKeydown(e)
 {
    var key = e.keyCode;
    var newDirection;
    switch(key)
    {
        case 37:
            newDirection = "left";
            break;
        case 38:
            newDirection = "up";
            break;
        case 39:
            newDirection = "right";
            break;
        case 40:
            newDirection = "down";
            break;
        case 32:
            restart();
            break;
            default:
                return;
    }
    snakee.setDirection(newDirection);
 };
};