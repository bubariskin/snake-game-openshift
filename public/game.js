const canvas = document.getElementById('game');
const ctx = canvas.getContext('2d');

const gridSize = 20;
const tileCount = canvas.width / gridSize;

let snake = [{ x: 10, y: 10 }];
let vx = 1;
let vy = 0;
let apple = { x: 5, y: 5 };
let tailLength = 5;

document.addEventListener('keydown', (e) => {
  switch (e.key) {
    case 'ArrowLeft':
      if (vx !== 1) { vx = -1; vy = 0; }
      break;
    case 'ArrowRight':
      if (vx !== -1) { vx = 1; vy = 0; }
      break;
    case 'ArrowUp':
      if (vy !== 1) { vx = 0; vy = -1; }
      break;
    case 'ArrowDown':
      if (vy !== -1) { vx = 0; vy = 1; }
      break;
  }
});

function gameLoop() {
  const head = { x: snake[0].x + vx, y: snake[0].y + vy };

  // Зациклене поле
  if (head.x < 0) head.x = tileCount - 1;
  if (head.x >= tileCount) head.x = 0;
  if (head.y < 0) head.y = tileCount - 1;
  if (head.y >= tileCount) head.y = 0;

  snake.unshift(head);
  while (snake.length > tailLength) {
    snake.pop();
  }

  // Яблуко
  if (head.x === apple.x && head.y === apple.y) {
    tailLength++;
    apple.x = Math.floor(Math.random() * tileCount);
    apple.y = Math.floor(Math.random() * tileCount);
  }

  // Зіткнення з тілом
  for (let i = 1; i < snake.length; i++) {
    if (snake[i].x === head.x && snake[i].y === head.y) {
      tailLength = 5;
      snake = [{ x: 10, y: 10 }];
      vx = 1;
      vy = 0;
      break;
    }
  }

  // Рендер
  ctx.fillStyle = '#000';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.fillStyle = '#0f0';
  snake.forEach(seg => {
    ctx.fillRect(seg.x * gridSize, seg.y * gridSize, gridSize - 2, gridSize - 2);
  });

  ctx.fillStyle = '#f00';
  ctx.fillRect(apple.x * gridSize, apple.y * gridSize, gridSize - 2, gridSize - 2);
}

setInterval(gameLoop, 100);
