const canvas = document.getElementById('game');
const ctx = canvas.getContext('2d');
const scoreElement = document.getElementById('score');

const gridSize = 20;
const tileCount = canvas.width / gridSize;

let snake = [{ x: 10, y: 10 }];
let vx = 1;
let vy = 0;

let apple = { x: 5, y: 5 };
let tailLength = 5;
let score = 0;

document.addEventListener('keydown', (e) => {

  if (['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown'].includes(e.key)) {
    e.preventDefault();
  }

  switch (e.key) {

    case 'ArrowLeft':
      if (vx !== 1) {
        vx = -1;
        vy = 0;
      }
      break;

    case 'ArrowRight':
      if (vx !== -1) {
        vx = 1;
        vy = 0;
      }
      break;

    case 'ArrowUp':
      if (vy !== 1) {
        vx = 0;
        vy = -1;
      }
      break;

    case 'ArrowDown':
      if (vy !== -1) {
        vx = 0;
        vy = 1;
      }
      break;
  }
});

function randomApple() {
  apple.x = Math.floor(Math.random() * tileCount);
  apple.y = Math.floor(Math.random() * tileCount);
}

function resetGame() {
  tailLength = 5;
  snake = [{ x: 10, y: 10 }];

  vx = 1;
  vy = 0;

  score = 0;
  scoreElement.textContent = '000';

  randomApple();
}

function gameLoop() {

  const head = {
    x: snake[0].x + vx,
    y: snake[0].y + vy
  };

  // вихід з іншого боку екрана
  if (head.x < 0) head.x = tileCount - 1;
  if (head.x >= tileCount) head.x = 0;

  if (head.y < 0) head.y = tileCount - 1;
  if (head.y >= tileCount) head.y = 0;

  snake.unshift(head);

  while (snake.length > tailLength) {
    snake.pop();
  }

  // їжа
  if (head.x === apple.x && head.y === apple.y) {

    tailLength++;

    score += 10;

    scoreElement.textContent =
      score.toString().padStart(3, '0');

    randomApple();
  }

  // зіткнення із собою
  for (let i = 1; i < snake.length; i++) {

    if (
      snake[i].x === head.x &&
      snake[i].y === head.y
    ) {
      resetGame();
      return;
    }
  }

  // LCD background
  ctx.fillStyle = '#a8b88a';
  ctx.fillRect(
    0,
    0,
    canvas.width,
    canvas.height
  );

  // Snake
  ctx.fillStyle = '#263123';

  snake.forEach(segment => {

    ctx.fillRect(
      segment.x * gridSize + 2,
      segment.y * gridSize + 2,
      gridSize - 4,
      gridSize - 4
    );

  });

  // Food
  ctx.fillStyle = '#263123';

  ctx.fillRect(
    apple.x * gridSize + 5,
    apple.y * gridSize + 5,
    gridSize - 10,
    gridSize - 10
  );
}

setInterval(gameLoop, 120);
