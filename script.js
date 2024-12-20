const canvas = document.getElementById('christmasTree');
const ctx = canvas.getContext('2d');

// 设置canvas尺寸
function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener('resize', resizeCanvas);

// 初始化变量
let pos = { x: 0, y: 0 };
let angle = 0;
const n = 100.0;

// 基本绘图函数
function forward(distance) {
    const newX = pos.x + Math.cos(angle * Math.PI / 180) * distance;
    const newY = pos.y + Math.sin(angle * Math.PI / 180) * distance;
    ctx.beginPath();
    ctx.moveTo(pos.x, pos.y);
    ctx.lineTo(newX, newY);
    ctx.stroke();
    pos.x = newX;
    pos.y = newY;
}

function backward(distance) {
    forward(-distance);
}

function right(deg) {
    angle += deg;
}

function left(deg) {
    angle -= deg;
}

// 画五角星
function drawStar() {
    ctx.fillStyle = 'yellow';
    ctx.strokeStyle = 'orange';
    ctx.lineWidth = 2;
    ctx.beginPath();
    const startX = pos.x;
    const startY = pos.y;
    
    for (let i = 0; i < 5; i++) {
        forward(n/5);
        right(144);
        forward(n/5);
        left(72);
    }
    
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
}

// 画彩灯
function drawLight() {
    if (Math.random() < 0.033) {
        ctx.fillStyle = 'tomato';
        ctx.beginPath();
        ctx.arc(pos.x, pos.y, 6, 0, Math.PI * 2);
        ctx.fill();
    } else if (Math.random() < 0.033) {
        ctx.fillStyle = 'orange';
        ctx.beginPath();
        ctx.arc(pos.x, pos.y, 3, 0, Math.PI * 2);
        ctx.fill();
    }
}

// 画树
function tree(d, s) {
    if (d <= 0) return;
    
    ctx.strokeStyle = 'dark green';
    ctx.lineWidth = 10;
    
    forward(s);
    tree(d - 1, s * 0.8);
    right(120);
    tree(d - 3, s * 0.5);
    drawLight();
    right(120);
    tree(d - 3, s * 0.5);
    right(120);
    backward(s);
}

// 画雪花
function drawSnow() {
    ctx.strokeStyle = 'white';
    ctx.lineWidth = 2;
    
    for (let i = 0; i < 200; i++) {
        const x = Math.random() * canvas.width;
        const y = Math.random() * canvas.height * 0.8;
        const size = Math.random() * 9 + 1;
        
        ctx.beginPath();
        for (let j = 0; j < 6; j++) {
            const angle = (j * 60) * Math.PI / 180;
            ctx.moveTo(x, y);
            ctx.lineTo(
                x + Math.cos(angle) * size,
                y + Math.sin(angle) * size
            );
        }
        ctx.stroke();
    }
}

// 画装饰
function drawDecorations() {
    for (let i = 0; i < 200; i++) {
        const a = 200 - Math.random() * 400;
        const b = 10 - Math.random() * 20;
        const x = pos.x + b;
        const y = pos.y - a;
        
        ctx.fillStyle = Math.random() < 0.5 ? 'tomato' : 'wheat';
        ctx.beginPath();
        ctx.arc(x, y, 2, 0, Math.PI * 2);
        ctx.fill();
    }
}

// 主绘制函数
function drawChristmasTree() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // 设置初始位置
    pos = {
        x: canvas.width * 0.5,
        y: canvas.height * 0.8
    };
    angle = -90;  // 向上

    // 画树干
    ctx.lineWidth = 10;
    forward(3 * n);
    
    // 画星星
    drawStar();
    
    // 回到树干底部
    backward(n * 4.8);
    
    // 画树和装饰
    tree(15, n);
    drawDecorations();
    
    // 画雪花
    drawSnow();
}

// 初始化
drawChristmasTree();

// 每秒重绘一次，实现动态效果
setInterval(drawChristmasTree, 1000);

// 点击刷新
canvas.addEventListener('click', drawChristmasTree);