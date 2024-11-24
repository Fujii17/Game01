const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

canvas.width = 400;
canvas.height = 400;

const boxSize = 20;
let snake = [{ x: 200, y: 200 }];
let direction = 'RIGHT';
let food = { x: getRandomCoord(canvas.width), y: getRandomCoord(canvas.height) };
let score = 0;

document.addEventListener('keydown', changeDirection);

function getRandomCoord(max) {
  return Math.floor((Math.random() * max) / boxSize) * boxSize;
}

function changeDirection(event) {
  const key = event.keyCode;
  if (key === 37 && direction !== 'RIGHT') direction = 'LEFT';
  if (key === 38 && direction !== 'DOWN') direction = 'UP';
  if (key === 39 && direction !== 'LEFT') direction = 'RIGHT';
  if (key === 40 && direction !== 'UP') direction = 'DOWN';
}

function drawGame() {
  ctx.fillStyle = 'black';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.fillStyle = 'red';
  ctx.fillRect(food.x, food.y, boxSize, boxSize);

  for (let i = 0; i < snake.length; i++) {
    ctx.fillStyle = i === 0 ? 'lime' : 'green';
    ctx.fillRect(snake[i].x, snake[i].y, boxSize, boxSize);
  }

  const head = { ...snake[0] };
  if (direction === 'LEFT') head.x -= boxSize;
  if (direction === 'RIGHT') head.x += boxSize;
  if (direction === 'UP') head.y -= boxSize;
  if (direction === 'DOWN') head.y += boxSize;

  if (head.x === food.x && head.y === food.y) {
    score++;
    food = { x: getRandomCoord(canvas.width), y: getRandomCoord(canvas.height) };
  } else {
    snake.pop();
  }

  snake.unshift(head);

  if (
    head.x < 0 || head.x >= canvas.width ||
    head.y < 0 || head.y >= canvas.height ||
    snake.slice(1).some(segment => segment.x === head.x && segment.y === head.y)
  ) {
    alert(`Game Over! Score: ${score}`);
    snake = [{ x: 200, y: 200 }];
    direction = 'RIGHT';
    score = 0;
    food = { x: getRandomCoord(canvas.width), y: getRandomCoord(canvas.height) };
  }

  requestAnimationFrame(drawGame);
}

drawGame();
