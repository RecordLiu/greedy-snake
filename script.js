// 添加操作面板展开/收起功能
document.addEventListener('DOMContentLoaded', function() {
    // 为开始按钮添加漫画手绘风格
    const startButton = document.getElementById('startButton');
    if (startButton) {
        startButton.setAttribute('style', `
            background: #D0D0D0 !important;
            background-image: none !important;
            color: #505050 !important;
            padding: 12px 25px !important;
            border: 2px solid #A0A0A0 !important;
            border-radius: 8px !important;
            font-size: 18px !important;
            font-family: 'Comic Sans MS', cursive !important;
            cursor: pointer !important;
            box-shadow: 3px 3px 6px rgba(0,0,0,0.2) !important;
            position: absolute !important;
            left: 50% !important;
            top: 50% !important;
            transform: translate(-50%, -50%) !important;
            z-index: 100 !important;
            letter-spacing: 1px !important;
            text-shadow: 1px 1px 2px rgba(0,0,0,0.1) !important;
        `);
    }
    
    // u9ad8u4f18u5148u7ea7u8986u76d6u5f00u59cbu6309u94aeu7684CSSu6837u5f0f
    const styleEl = document.createElement('style');
    styleEl.innerHTML = `
        #startButton, 
        #startButton:hover,
        #canvasWrapper #startButton,
        body #gameContainer #canvasWrapper #startButton,
        html body #gameContainer #canvasWrapper #startButton {
            background: #D0D0D0 !important;
            background-image: none !important;
            background-color: #D0D0D0 !important;
            color: #505050 !important;
            padding: 12px 25px !important;
            border: 2px solid #A0A0A0 !important;
            border-radius: 8px !important;
            font-size: 18px !important;
            font-family: 'Comic Sans MS', cursive !important;
            cursor: pointer !important;
            box-shadow: 3px 3px 6px rgba(0,0,0,0.2) !important;
            position: absolute !important;
            left: 50% !important;
            top: 50% !important;
            transform: translate(-50%, -50%) !important;
            z-index: 100 !important;
            letter-spacing: 1px !important;
            text-shadow: 1px 1px 2px rgba(0,0,0,0.1) !important;
        }

        #startButton::after,
        #startButton:hover::after {
            display: none !important;
            content: none !important;
            background: none !important;
        }
    `;
    document.head.appendChild(styleEl);
    
    const instructionsToggle = document.getElementById('instructionsToggle');
    const gamePanel = document.getElementById('gamePanel');
    
    if (instructionsToggle && gamePanel) {
        // 调整游戏操作面板底部高度，增加20px
        const currentPanelHeight = getComputedStyle(gamePanel).height;
        const newHeight = (parseInt(currentPanelHeight) + 20) + 'px';
        gamePanel.style.height = newHeight;
        
        // 调整操作按钮的位置，放在面板垂直高度的一半
        instructionsToggle.style.top = '50%';
        instructionsToggle.style.transform = 'translateY(-50%)';
        
        // 检查是否是首次访问页面
        const isFirstVisit = localStorage.getItem('snakeGameFirstVisit') === null;
        
        // 首次访问时自动展开操作面板
        if (isFirstVisit) {
            gamePanel.classList.add('expanded');
            instructionsToggle.querySelector('span').textContent = '收起';
            // 记录已访问
            localStorage.setItem('snakeGameFirstVisit', 'visited');
        } else {
            // 非首次访问保持默认隐藏状态
            gamePanel.classList.remove('expanded');
            instructionsToggle.querySelector('span').textContent = '游戏操作';
        }
        
        // 点击按钮展开/收起操作面板
        instructionsToggle.addEventListener('click', function() {
            gamePanel.classList.toggle('expanded');
            
            // 更新按钮文本
            if (gamePanel.classList.contains('expanded')) {
                instructionsToggle.querySelector('span').textContent = '收起';
            } else {
                instructionsToggle.querySelector('span').textContent = '游戏操作';
            }
        });
    }
    
    // 初始化分数显示
    updateScoreDisplay();
    
    // 应用漫画风格到游戏标题和分数显示
    const gameTitle = document.querySelector('h1');
    if (gameTitle) {
        gameTitle.style.fontFamily = "'Comic Sans MS', cursive";
        gameTitle.style.color = '#505050';
        gameTitle.style.textShadow = '1px 1px 3px rgba(0,0,0,0.2)';
    }
    
    const scoreContainer = document.querySelector('.score-container');
    if (scoreContainer) {
        scoreContainer.style.fontFamily = "'Comic Sans MS', cursive";
        scoreContainer.style.border = '2px solid #A0A0A0';
        scoreContainer.style.borderRadius = '12px';
        scoreContainer.style.padding = '10px';
        scoreContainer.style.backgroundColor = '#F8F8F8';
        scoreContainer.style.boxShadow = '2px 2px 4px rgba(0,0,0,0.1)';
    }
});

// 获取画布和上下文
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// 设置画布样式 - 漫画手绘风格
canvas.style.backgroundColor = '#f5f5f5'; // 更浅的灰色背景
canvas.style.borderRadius = '12px'; // 增加画布圆角
canvas.style.border = '3px solid #D0D0D0'; // 添加灰色边框
canvas.style.boxShadow = '4px 4px 8px rgba(0,0,0,0.1)'; // 添加轻微阴影
ctx.imageSmoothingEnabled = true; // 启用图像平滑
ctx.imageSmoothingQuality = 'high'; // 设置平滑质量

// 绘制手绘风格网格背景函数
function drawHandDrawnGrid() {
    const gridLineWidth = 0.3;
    ctx.strokeStyle = '#E0E0E0';
    ctx.lineWidth = gridLineWidth;
    
    // 画水平线
    for (let y = 0; y <= canvas.height; y += gridSize) {
        ctx.beginPath();
        // 模拟手绘不规则线条
        ctx.moveTo(0, y + (Math.random() * 0.3));
        for (let x = 0; x <= canvas.width; x += 20) {
            ctx.lineTo(x, y + (Math.random() - 0.5) * 0.3);
        }
        ctx.stroke();
    }
    
    // 画垂直线
    for (let x = 0; x <= canvas.width; x += gridSize) {
        ctx.beginPath();
        // 模拟手绘不规则线条
        ctx.moveTo(x + (Math.random() * 0.3), 0);
        for (let y = 0; y <= canvas.height; y += 20) {
            ctx.lineTo(x + (Math.random() - 0.5) * 0.3, y);
        }
        ctx.stroke();
    }
}

// 游戏设置
const gridSize = 20;
let obstacleMoveCount = 0; // 用于控制障碍物移动速度
const obstacleSpeedFactor = 2; // 障碍物移动速度因子（比蛇快2倍）

// 障碍物
let obstacles = [];
let obstacleDirections = []; // 存储每个障碍物的移动方向

// 生成障碍物
function generateObstacle() {
  let obstacleCount;
  const selectedMode = document.querySelector('input[name="gameMode"]:checked').value;
  if (selectedMode === 'medium') {
    obstacleCount = 20;
  } else if (selectedMode === 'hard') {
    obstacleCount = 10;
  } else {
    obstacleCount = 0;
  }
  
  obstacles = [];
  obstacleDirections = [];
  
  for (let i = 0; i < obstacleCount; i++) {
        let obstacle;
        let validPosition = false;
        let attempts = 0;
        
        do {
            obstacle = {
                x: Math.floor(Math.random() * tileCount),
                y: Math.floor(Math.random() * tileCount)
            };
            attempts++;
            
            // 增加蛇头位置检测
            let check =  snake.some(segment => segment.x === obstacle.x && segment.y === obstacle.y) ||
      (food.x === obstacle.x && food.y === obstacle.y) ||
      obstacles.some(obs => obs.x === obstacle.x && obs.y === obstacle.y);

            validPosition = !snake.some(segment => 
                Math.abs(segment.x - obstacle.x) < 2 && 
                Math.abs(segment.y - obstacle.y) < 2
            ) && check;

        } while (!validPosition && attempts < 100);
    obstacles.push(obstacle);
    // 为每个障碍物随机初始化一个移动方向（只允许水平或垂直移动）
    const isHorizontal = Math.random() < 0.5;
    obstacleDirections.push({
      dx: isHorizontal ? (Math.random() < 0.5 ? -1 : 1) : 0,
      dy: isHorizontal ? 0 : (Math.random() < 0.5 ? -1 : 1)
    });
  }
}

const tileCount = canvas.width / gridSize;

// 分数
let score = 0;

// 游戏状态
let gameStarted = false;
let gameSpeed = 250;
let snakeHasMoved = false; // 添加标志来跟踪蛇是否已经移动
let gamePaused = false; // 新增暂停标志

// 蛇的初始位置和速度
let snake = [
    { x: 10, y: 10 }
];
let dx = 0;
let dy = 0;

// 食物的位置
function getRandomFoodPosition() {
    let pos;
    let attempts = 0;
    do {
        pos = {
            x: Math.floor(Math.random() * tileCount),
            y: Math.floor(Math.random() * tileCount)
        };
        attempts++;
        // 检查是否与蛇身或障碍物重叠
    } while (
        (snake.some(segment => segment.x === pos.x && segment.y === pos.y) ||
        obstacles.some(obs => obs.x === pos.x && obs.y === pos.y)) && 
        attempts < 100
    );
    
    // 如果在100次尝试后仍未找到合适位置，强制寻找非障碍物位置
    if (obstacles.some(obs => obs.x === pos.x && obs.y === pos.y)) {
        let safeX, safeY;
        let found = false;
        
        // 穷举搜索安全位置
        for (let x = 0; x < tileCount && !found; x++) {
            for (let y = 0; y < tileCount && !found; y++) {
                if (!obstacles.some(obs => obs.x === x && obs.y === y) &&
                    !snake.some(segment => segment.x === x && segment.y === y)) {
                    safeX = x;
                    safeY = y;
                    found = true;
                }
            }
        }
        
        if (found) {
            pos.x = safeX;
            pos.y = safeY;
        }
    }
    return pos;
}

let food = getRandomFoodPosition();

// 开始按钮事件
const startButton = document.getElementById('startButton');
startButton.addEventListener('click', () => {
    gameStarted = true;
    
    // 添加对开始按钮的CSS覆盖
    const styleOverride = document.createElement('style');
    styleOverride.textContent = `
        #startButton {
            background: #D0D0D0 !important;
            background-image: none !important;
            color: #505050 !important;
            padding: 12px 25px !important;
            border: 2px solid #A0A0A0 !important;
            border-radius: 8px !important;
            font-size: 18px !important;
            font-family: 'Comic Sans MS', cursive !important;
            box-shadow: 3px 3px 6px rgba(0,0,0,0.2) !important;
        }
    `;
    document.head.appendChild(styleOverride);
    
    startButton.style.display = 'none';
    document.querySelectorAll('input[name="gameMode"]').forEach(radio => radio.disabled = true);
    food = getRandomFoodPosition();
});

// 游戏难度选择事件
const modeSelect = document.querySelectorAll('input[name="gameMode"]');
modeSelect.forEach(radio => {
    radio.addEventListener('change', (e) => {
        switch(e.target.value) {
            case 'easy':
                gameSpeed = 250;
                obstacles = [];
                food = getRandomFoodPosition();
                break;
            case 'medium':
                gameSpeed = 200;
                obstacles = [];
                generateObstacle();
                food = getRandomFoodPosition();
                break;
            case 'hard':
                gameSpeed = 150;
                obstacles = [];
                generateObstacle();
                food = getRandomFoodPosition();
                break;
        }
        // 更新分数显示，显示当前所选难度的得分记录
        updateScoreDisplay();
    });
});

// 游戏主循环
let gameRunning = true;

// 更新分数显示（按难度区分）
function updateScoreDisplay() {
    const selectedMode = document.querySelector('input[name="gameMode"]:checked').value;
    
    // 更新最高分
    const highScore = localStorage.getItem(`snakeHighScore_${selectedMode}`) || 0;
    document.getElementById('highScore').textContent = highScore;
}

function gameLoop() {
    if (gameRunning) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = '#f5f5f5'; // 更浅的灰色背景
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        drawHandDrawnGrid(); // 添加手绘网格背景
    }

    if (gameStarted) {
        if (!gamePaused) { // 只有未暂停时才移动
            // 先移动障碍物和蛇
            moveObstacles();
            moveSnake();
            // 然后检查碰撞
            checkCollision();
        }
        // 如果游戏仍在运行才继续绘制
        if (gameRunning) {
            drawObstacles();
            drawSnake();
            drawFood();
        }
    } else if (!gameRunning) {
        drawHandDrawnGrid(); // 添加手绘网格背景
        drawObstacles();
        drawSnake();
        drawFood();
    }

    setTimeout(gameLoop, gameSpeed);
}

// 绘制蛇 - 漫画手绘风格
function drawSnake() {
    // 确保有蛇可以绘制
    if (snake.length === 0) return;
    
    // 绘制蛇身 (除了头部的所有部分)
    ctx.fillStyle = '#A0A0A0'; // 灰色系
    ctx.strokeStyle = '#606060'; // 深灰色描边
    ctx.lineWidth = 1.5;
    
    for (let i = 1; i < snake.length; i++) {
        const segment = snake[i];
        ctx.beginPath();
        
        // 手绘效果的方块
        const offsetX = Math.random() * 0.5;
        const offsetY = Math.random() * 0.5;
        
        ctx.roundRect(
            segment.x * gridSize + 3 + offsetX, 
            segment.y * gridSize + 3 + offsetY, 
            gridSize - 6, 
            gridSize - 6,
            6 // 圆角
        );
        ctx.fill();
        ctx.stroke();
    }
    
    // 单独绘制蛇头，使用更深的灰色以区分
    ctx.fillStyle = '#707070'; // 深灰色
    ctx.beginPath();
    ctx.roundRect(
        snake[0].x * gridSize + 3, 
        snake[0].y * gridSize + 3, 
        gridSize - 6, 
        gridSize - 6,
        6 // 圆角
    );
    ctx.fill();
    ctx.stroke();
    
    // 添加漫画风格的眼睛
    const eyeSize = 3;
    const eyeOffset = 5;
    
    // 左眼 - 白色部分
    ctx.fillStyle = 'white';
    ctx.beginPath();
    ctx.arc(
        snake[0].x * gridSize + eyeOffset + 2, 
        snake[0].y * gridSize + eyeOffset + 2,
        eyeSize,
        0,
        Math.PI * 2
    );
    ctx.fill();
    
    // 左眼 - 黑色瞳孔
    ctx.fillStyle = 'black';
    ctx.beginPath();
    ctx.arc(
        snake[0].x * gridSize + eyeOffset + 2, 
        snake[0].y * gridSize + eyeOffset + 2,
        eyeSize/2,
        0,
        Math.PI * 2
    );
    ctx.fill();
    
    // 右眼 - 白色部分
    ctx.fillStyle = 'white';
    ctx.beginPath();
    ctx.arc(
        snake[0].x * gridSize + gridSize - eyeOffset - 2, 
        snake[0].y * gridSize + eyeOffset + 2,
        eyeSize,
        0,
        Math.PI * 2
    );
    ctx.fill();
    
    // 右眼 - 黑色瞳孔
    ctx.fillStyle = 'black';
    ctx.beginPath();
    ctx.arc(
        snake[0].x * gridSize + gridSize - eyeOffset - 2, 
        snake[0].y * gridSize + eyeOffset + 2,
        eyeSize/2,
        0,
        Math.PI * 2
    );
    ctx.fill();
}

function drawFood() {
    // 绘制食物 - 漫画手绘风格圆形
    ctx.fillStyle = '#E0E0E0'; // 浅灰色
    ctx.strokeStyle = '#A0A0A0'; // 灰色描边
    ctx.lineWidth = 1.5;
    
    // 主体
    ctx.beginPath();
    ctx.arc(
        food.x * gridSize + gridSize/2,
        food.y * gridSize + gridSize/2,
        gridSize/2 - 4,
        0,
        Math.PI * 2
    );
    ctx.fill();
    ctx.stroke();
    
    // 添加简单的高光效果
    ctx.fillStyle = 'white';
    ctx.beginPath();
    ctx.arc(
        food.x * gridSize + gridSize/2 - 2,
        food.y * gridSize + gridSize/2 - 2,
        gridSize/6,
        0,
        Math.PI * 2
    );
    ctx.fill();
}

// 移动蛇
function moveSnake() {
    // 保存移动前的完整蛇，用于碰撞恢复
    const originalSnake = snake.map(segment => ({...segment}));
    
    const head = { x: snake[0].x + dx, y: snake[0].y + dy };
    
    // 检查是否吃到食物
    if (head.x === food.x && head.y === food.y) {
        // 增加分数
        score++;
        // 更新页面上的分数
        const scoreElement = document.getElementById('score');
        if (scoreElement) {
            scoreElement.textContent = score;
        }

        // 生成新的食物
        food = getRandomFoodPosition();
    } else {
        // 移除蛇的尾部
        snake.pop();
    }
    
    // 将新的头部添加到蛇身
    snake.unshift(head);
    
    // 保存移动后的蛇状态，包括原始长度信息
    lastValidSnake = {
        before: originalSnake,
        after: snake.map(segment => ({...segment}))
    };
}

// 移动障碍物
function moveObstacles() {
    const selectedMode = document.querySelector('input[name="gameMode"]:checked').value;
    if (selectedMode !== 'hard' || !gameStarted || !snakeHasMoved) return;

    // 控制障碍物移动速度
    obstacleMoveCount++;
    if (obstacleMoveCount % obstacleSpeedFactor !== 0) return;

    for (let i = 0; i < obstacles.length; i++) {
        const obstacle = obstacles[i];
        const direction = obstacleDirections[i];
        
        // 计算新的位置
        let newX = obstacle.x + direction.dx;
        let newY = obstacle.y + direction.dy;
        
        // 检查是否撞到边界
        if (newX < 0 || newX >= tileCount) {
            direction.dx *= -1;
            newX = obstacle.x + direction.dx;
        }
        if (newY < 0 || newY >= tileCount) {
            direction.dy *= -1;
            newY = obstacle.y + direction.dy;
        }
        
        // 检查是否与食物重叠
        if (newX === food.x && newY === food.y) {
            // 如果会与食物重叠，改变方向
            if (direction.dx !== 0) {
                // 如果是水平移动，改为垂直移动
                direction.dx = 0;
                direction.dy = Math.random() < 0.5 ? -1 : 1;
            } else {
                // 如果是垂直移动，改为水平移动
                direction.dx = Math.random() < 0.5 ? -1 : 1;
                direction.dy = 0;
            }
            newX = obstacle.x + direction.dx;
            newY = obstacle.y + direction.dy;
        }
        
        // 检查是否与蛇身重叠（不包括蛇头）
        let bodyCollision = false;
        for (let j = 1; j < snake.length; j++) {
            if (newX === snake[j].x && newY === snake[j].y) {
                bodyCollision = true;
                break;
            }
        }
        
        // 如果与蛇身重叠，改变方向
        if (bodyCollision) {
            // 尝试不同的移动方向
            const originalDx = direction.dx;
            const originalDy = direction.dy;
            
            // 尝试4个可能的方向，直到找到一个不会碰撞的方向
            const possibleDirections = [
                {dx: 1, dy: 0},
                {dx: -1, dy: 0},
                {dx: 0, dy: 1},
                {dx: 0, dy: -1}
            ];
            
            // 随机打乱方向顺序，使行为更自然
            possibleDirections.sort(() => Math.random() - 0.5);
            
            let foundSafeDirection = false;
            for (const newDir of possibleDirections) {
                // 跳过原来的方向
                if (newDir.dx === originalDx && newDir.dy === originalDy) continue;
                
                // 计算这个方向的新位置
                const testX = obstacle.x + newDir.dx;
                const testY = obstacle.y + newDir.dy;
                
                // 检查新位置是否安全（不与边界、食物或蛇身重叠）
                if (testX < 0 || testX >= tileCount || testY < 0 || testY >= tileCount) continue;
                if (testX === food.x && testY === food.y) continue;
                
                let safeFromBody = true;
                for (let j = 1; j < snake.length; j++) {
                    if (testX === snake[j].x && testY === snake[j].y) {
                        safeFromBody = false;
                        break;
                    }
                }
                
                if (safeFromBody) {
                    // 找到安全方向，更新方向和位置
                    direction.dx = newDir.dx;
                    direction.dy = newDir.dy;
                    newX = testX;
                    newY = testY;
                    foundSafeDirection = true;
                    break;
                }
            }
            
            // 如果没有找到安全方向，就原地不动一回合
            if (!foundSafeDirection) {
                newX = obstacle.x;
                newY = obstacle.y;
            }
        }
        
        // 检查是否与蛇头碰撞
        if (newX === snake[0].x && newY === snake[0].y) {
            // 如果障碍物将要移动到蛇头的位置，触发游戏结束
            showGameOverUI();
            gameRunning = false;
            // 重置移动方向
            dx = 0;
            dy = 0;
            return; // 立即结束障碍物移动函数
        }
        
        // 更新障碍物位置
        obstacle.x = newX;
        obstacle.y = newY;
    }
}

// 绘制障碍物 - 漫画手绘风格
function drawObstacles() {
    ctx.fillStyle = '#808080'; // 中灰色
    ctx.strokeStyle = '#505050'; // 深灰色描边
    ctx.lineWidth = 1.5;
    
    obstacles.forEach(obstacle => {
        // 绘制手绘风格的方块障碍物
        ctx.beginPath();
        const offsetX = Math.random() * 0.5;
        const offsetY = Math.random() * 0.5;
        
        ctx.roundRect(
            obstacle.x * gridSize + 3 + offsetX, 
            obstacle.y * gridSize + 3 + offsetY, 
            gridSize - 6, 
            gridSize - 6,
            4 // 较小的圆角
        );
        ctx.fill();
        ctx.stroke();
        
        // 添加交叉线条纹理
        ctx.strokeStyle = '#606060';
        ctx.lineWidth = 0.8;
        
        // 对角线1
        ctx.beginPath();
        ctx.moveTo(obstacle.x * gridSize + 4, obstacle.y * gridSize + 4);
        ctx.lineTo(obstacle.x * gridSize + gridSize - 4, obstacle.y * gridSize + gridSize - 4);
        ctx.stroke();
        
        // 对角线2
        ctx.beginPath();
        ctx.moveTo(obstacle.x * gridSize + gridSize - 4, obstacle.y * gridSize + 4);
        ctx.lineTo(obstacle.x * gridSize + 4, obstacle.y * gridSize + gridSize - 4);
        ctx.stroke();
    });
}

// 检查碰撞
// 创建再来一局按钮 - 漫画手绘风格
const restartButton = document.createElement('button');
restartButton.id = 'restartButton';
restartButton.textContent = '再来一局';
restartButton.style.backgroundColor = '#D0D0D0';
restartButton.style.color = '#505050';
restartButton.style.padding = '10px 20px';
restartButton.style.margin = '10px';
restartButton.style.border = '2px solid #A0A0A0';
restartButton.style.borderRadius = '8px';
restartButton.style.fontSize = '16px';
restartButton.style.fontFamily = "'Comic Sans MS', cursive";
restartButton.style.cursor = 'pointer';
restartButton.style.boxShadow = '2px 2px 4px rgba(0,0,0,0.2)';

// 添加CSS规则禁用悬浮效果
const style = document.createElement('style');
style.textContent = `
  #restartButton:hover {
    background-color: #4CAF50 !important;
    transform: none !important;
    box-shadow: 0 4px 8px rgba(0,0,0,0.2) !important;
  }
`;
document.head.appendChild(style);

// 创建重新选择按钮 - 漫画手绘风格
const reselectButton = document.createElement('button');
reselectButton.id = 'reselectButton';
reselectButton.textContent = '重新选择';
reselectButton.style.backgroundColor = '#D0D0D0';
reselectButton.style.color = '#505050';
reselectButton.style.padding = '10px 20px';
reselectButton.style.margin = '10px';
reselectButton.style.border = '2px solid #A0A0A0';
reselectButton.style.borderRadius = '8px';
reselectButton.style.fontSize = '16px';
reselectButton.style.fontFamily = "'Comic Sans MS', cursive";
reselectButton.style.cursor = 'pointer';
reselectButton.style.boxShadow = '2px 2px 4px rgba(0,0,0,0.2)';
reselectButton.addEventListener('click', () => {
    location.reload();
});

canvas.parentElement.style.position = 'relative';
const buttonContainer = document.createElement('div');
buttonContainer.id = 'restartContainer';
buttonContainer.style.position = 'absolute';
buttonContainer.style.top = '62%'; // 调整位置，放在游戏结束信息下方
buttonContainer.style.left = '50%';
buttonContainer.style.transform = 'translate(-50%, -50%)';
buttonContainer.style.zIndex = '100';
buttonContainer.style.display = 'none';
buttonContainer.style.gap = '20px';
buttonContainer.style.flexDirection = 'row'; // 改为水平排列
buttonContainer.style.flexWrap = 'wrap'; // 允许换行
buttonContainer.style.justifyContent = 'center'; // 水平居中
buttonContainer.appendChild(reselectButton);
buttonContainer.appendChild(restartButton);
canvas.parentElement.appendChild(buttonContainer);

// 用于保存碰撞前的蛇状态
let lastValidSnake = {
    before: [], // 移动前的蛇
    after: []   // 移动后的蛇
};

function checkCollision() {
    // 获取当前头部
    const head = snake[0];
    
    // 碰撞检测
    let collision = false;
    let boundaryCollision = false;
    
    // 检查障碍物碰撞
    if (obstacles.some(obs => obs.x === head.x && obs.y === head.y)) {
        collision = true;
    }
    
    // 检查边界碰撞
    if (head.x < 0 || head.x >= tileCount || head.y < 0 || head.y >= tileCount) {
        collision = true;
        boundaryCollision = true;
    }

    // 检查自我碰撞
    for (let i = 1; i < snake.length; i++) {
        if (head.x === snake[i].x && head.y === snake[i].y) {
            collision = true;
            break;
        }
    }

    if (collision) {
        // 如果是边界碰撞，创建一个新的蛇，头部在屏幕内，其余部分保持原样
        if (boundaryCollision) {
            // 获取移动前的蛇 (保持长度不变)
            const beforeMove = lastValidSnake.before;
            
            // 创建一个新的蛇数组
            const fixedSnake = [];
            
            // 添加修正后的头部
            let fixedHead = {...head};
            if (fixedHead.x < 0) fixedHead.x = 0;
            if (fixedHead.x >= tileCount) fixedHead.x = tileCount - 1;
            if (fixedHead.y < 0) fixedHead.y = 0;
            if (fixedHead.y >= tileCount) fixedHead.y = tileCount - 1;
            fixedSnake.push(fixedHead);
            
            // 添加原始蛇身体的每个部分（除了最后一个，以保持长度）
            // 确保使用移动前的蛇，这样我们保持原来的长度
            for (let i = 0; i < beforeMove.length; i++) {
                fixedSnake.push({...beforeMove[i]});
            }
            
            // 更新蛇为修复的版本
            snake = fixedSnake;
        } else {
            // 非边界碰撞，使用移动前的状态
            snake = lastValidSnake.before.map(segment => ({...segment}));
        }
        
        // 按当前难度保存分数
        const selectedMode = document.querySelector('input[name="gameMode"]:checked').value;
        showGameOverUI();
        gameRunning = false;
        // 碰撞后重置移动方向
        dx = 0;
        dy = 0;
    }
    // 移除了游戏进行中的最高分更新逻辑
}

function showGameOverUI() {
    // 蛇的状态在checkCollision中已经设置好了
    gameRunning = false;
    gameStarted = false;
    
    // 强制按正确顺序绘制
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = '#f5f5f5';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    drawHandDrawnGrid(); // 添加手绘网格背景
    drawObstacles();
    drawSnake();
    drawFood();

    // 创建蒙层
    const overlay = document.createElement('div');
    overlay.id = 'gameOverOverlay';
    overlay.style.position = 'fixed';
    overlay.style.top = '0';
    overlay.style.left = '0';
    overlay.style.width = '100%';
    overlay.style.height = '100%';
    overlay.style.backgroundColor = 'rgba(0, 0, 0, 0.5)';
    overlay.style.display = 'flex';
    overlay.style.justifyContent = 'center';
    overlay.style.alignItems = 'center';
    overlay.style.zIndex = '1000';

    // 创建模态窗口
    const modal = document.createElement('div');
    modal.id = 'gameOverModal';
    modal.style.backgroundColor = 'white';
    modal.style.padding = '20px';  // 从30px减小到20px
    modal.style.borderRadius = '12px';  // 从15px减小到12px
    modal.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.2)';
    modal.style.textAlign = 'center';
    modal.style.fontFamily = "'Comic Sans MS', cursive";
    modal.style.position = 'relative';
    modal.style.minWidth = '250px';  // 从300px减小到250px

    // 添加游戏结束标题
    const title = document.createElement('h2');
    title.textContent = '游戏结束';
    title.style.color = '#505050';
    title.style.marginBottom = '15px';  // 从20px减小到15px
    title.style.fontSize = '24px';  // 从28px减小到24px
    modal.appendChild(title);

    // 添加最终得分
    const scoreText = document.createElement('p');
    scoreText.textContent = `最终得分: ${score}`;
    scoreText.style.color = '#505050';
    scoreText.style.fontSize = '18px';  // 从20px减小到18px
    scoreText.style.marginBottom = '20px';  // 从30px减小到20px
    modal.appendChild(scoreText);

    // 创建按钮容器
    const buttonContainer = document.createElement('div');
    buttonContainer.style.display = 'flex';
    buttonContainer.style.justifyContent = 'center';
    buttonContainer.style.gap = '12px';  // 从15px减小到12px

    // 重新选择按钮
    const reselectButton = document.createElement('button');
    reselectButton.textContent = '重新选择';
    reselectButton.style.padding = '8px 16px';  // 从10px 20px减小到8px 16px
    reselectButton.style.fontSize = '14px';  // 从16px减小到14px
    reselectButton.style.backgroundColor = '#D0D0D0';
    reselectButton.style.color = '#505050';
    reselectButton.style.border = '2px solid #A0A0A0';
    reselectButton.style.borderRadius = '6px';  // 从8px减小到6px
    reselectButton.style.cursor = 'pointer';
    reselectButton.style.fontFamily = "'Comic Sans MS', cursive";
    reselectButton.style.transition = 'all 0.3s ease';
    reselectButton.onclick = () => {
        location.reload();
    };

    // 再来一局按钮
    const restartButton = document.createElement('button');
    restartButton.textContent = '再来一局';
    restartButton.style.padding = '8px 16px';  // 从10px 20px减小到8px 16px
    restartButton.style.fontSize = '14px';  // 从16px减小到14px
    restartButton.style.backgroundColor = '#D0D0D0';
    restartButton.style.color = '#505050';
    restartButton.style.border = '2px solid #A0A0A0';
    restartButton.style.borderRadius = '6px';  // 从8px减小到6px
    restartButton.style.cursor = 'pointer';
    restartButton.style.fontFamily = "'Comic Sans MS', cursive";
    restartButton.style.transition = 'all 0.3s ease';
    restartButton.onclick = () => {
        const selectedMode = document.querySelector('input[name="gameMode"]:checked').value;
        document.body.removeChild(overlay);
        resetGame(selectedMode);
    };

    // 添加按钮悬停效果
    const addHoverEffect = (button) => {
        button.onmouseover = () => {
            button.style.transform = 'scale(1.05)';
        };
        button.onmouseout = () => {
            button.style.transform = 'scale(1)';
        };
    };

    addHoverEffect(reselectButton);
    addHoverEffect(restartButton);

    // 将按钮添加到容器
    buttonContainer.appendChild(reselectButton);
    buttonContainer.appendChild(restartButton);
    modal.appendChild(buttonContainer);

    // 将模态窗口添加到蒙层
    overlay.appendChild(modal);

    // 将蒙层添加到页面
    document.body.appendChild(overlay);

    // 在游戏结束时更新最高分（按当前难度）
    const selectedMode = document.querySelector('input[name="gameMode"]:checked').value;
    let highScore = localStorage.getItem(`snakeHighScore_${selectedMode}`) || 0;
    if (score > highScore) {
        localStorage.setItem(`snakeHighScore_${selectedMode}`, score);
        // 更新显示的最高分
        document.getElementById('highScore').textContent = score;
    }

    // 隐藏开始按钮
    startButton.style.display = 'none';
}

// 再来一局按钮点击事件
restartButton.addEventListener('click', () => {
    const selectedMode = document.querySelector('input[name="gameMode"]:checked').value;
    document.getElementById('restartContainer').style.display = 'none';
    resetGame(selectedMode);
});

function resetGame(mode) {
    // 重置游戏状态
    gameRunning = true;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = '#f5f5f5'; // 更浅的灰色背景
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    drawHandDrawnGrid(); // 添加手绘网格背景
    // 强制绘制初始画面
    drawSnake();
    drawFood();
    drawObstacles();
    snake = [{ x: 10, y: 10 }];
    dx = 0;
    dy = 0;
    score = 0;
    document.getElementById('score').textContent = score;
    
    // 根据模式设置游戏速度
    switch(mode) {
        case 'easy':
            gameSpeed = 250;
            obstacles = [];
            break;
        case 'medium':
            gameSpeed = 200;
            generateObstacle();
            break;
        case 'hard':
            gameSpeed = 150;
            generateObstacle();
            break;
    }
    
    // 生成新食物
    food = getRandomFoodPosition();
    
    // 重新开始游戏
    gameStarted = true;

    document.querySelectorAll('input[name="gameMode"]').forEach(radio => radio.disabled = true); // 保持模式选择禁用
    buttonContainer.style.display = 'none'; // 隐藏按钮容器

    // 重置蛇移动标记
    snakeHasMoved = false;
    
    // 更新分数显示
    updateScoreDisplay();
}

// 处理键盘输入
document.addEventListener('keydown', function(event) {
    if (event.key === 's' || event.key === 'S') {
        if (gameStarted && gameRunning) {
            gamePaused = !gamePaused;
        }
        return;
    }
    if (gamePaused && (event.key === 'ArrowUp' || event.key === 'ArrowDown' || event.key === 'ArrowLeft' || event.key === 'ArrowRight')) {
        gamePaused = false; // 方向键自动恢复
    }
    switch (event.key) {
        case 'ArrowUp':
            if (dy === 0) {
                dx = 0;
                dy = -1;
                snakeHasMoved = true; // 标记蛇已经移动
            }
            break;
        case 'ArrowDown':
            if (dy === 0) {
                dx = 0;
                dy = 1;
                snakeHasMoved = true; // 标记蛇已经移动
            }
            break;
        case 'ArrowLeft':
            if (dx === 0) {
                dx = -1;
                dy = 0;
                snakeHasMoved = true; // 标记蛇已经移动
            }
            break;
        case 'ArrowRight':
            if (dx === 0) {
                dx = 1;
                dy = 0;
                snakeHasMoved = true; // 标记蛇已经移动
            }
            break;
    }
});

// 启动游戏
gameLoop();

// 在页面加载完成后初始化分数显示
document.addEventListener('DOMContentLoaded', function() {
    // 初始化时根据当前选中的难度显示对应的分数记录
    updateScoreDisplay();
});