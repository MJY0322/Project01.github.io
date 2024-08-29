const player = {
    x: 100,
    y: 100,
    width: 64,
    height: 64,
    speed: 10,
    spriteSheet: new Image(),
    currentFrame: 0,
    frameTimer: 0,
    frameDuration: 120, // 120ms마다 프레임 변경
    directions: {
        down: 0,
        left: 1,
        right: 2,
        up: 3
    },
    currentDirection: 'down'
};

player.spriteSheet.src = 'spriteSheet/21_heropng33_0.png';

player.spriteSheet.onload = () => {
    // 스프라이트 시트 로드 완료 후 초기화 작업
    console.log('Sprite sheet loaded successfully');
};

const keys = {};

window.addEventListener('keydown', (e)=>{
    keys[e.code] = true;
});

window.addEventListener('keyup', (e)=>{
    keys[e.code] = false;
});

window.addEventListener('blur', () => {
    // 모든 키를 false로 초기화
    for (let key in keys) {
        keys[key] = false;
    }
});

function drawPlayer() {
    const frameSize = 32; // 프레임 사이즈
    const { x, y, width, height, spriteSheet, currentFrame, currentDirection } = player;
    const directionFrames = player.directions[currentDirection];
    const frameX = (currentFrame % 3) * frameSize; // 3 프레임으로 설정
    const frameY = directionFrames * frameSize;
    
    ctx.drawImage(
        spriteSheet,
        frameX, frameY, frameSize, frameSize,
        Math.floor(x - width / 2), Math.floor(y - height / 2), width, height
    );
}

function updateAnimation(timestamp) {
    if (!player.frameTimer) player.frameTimer = timestamp;
    const elapsed = timestamp - player.frameTimer;
    if (elapsed > player.frameDuration) {
        player.frameTimer = timestamp;
        player.currentFrame = (player.currentFrame + 1) % 3; // 3 프레임 애니메이션
    }
}

function playerMovement(){
    
    let dx = 0;
    let dy = 0;

    if (keys['KeyW']) {
        dy -= player.speed;
        player.currentDirection = 'up';
    }
    if (keys['KeyS']) {
        dy += player.speed;
        player.currentDirection = 'down';
    }
    if (keys['KeyA']) {
        dx -= player.speed;
        player.currentDirection = 'left';
    }
    if (keys['KeyD']) {
        dx += player.speed;
        player.currentDirection = 'right';
    }
    if(dx !== 0 && dy !== 0){
        dx /= Math.sqrt(2);
        dy /= Math.sqrt(2);
    }

    player.x += dx;
    player.y += dy;

    player.x = Math.max(player.width / 2, Math.min(canvas.width - player.width / 2, player.x));
    player.y = Math.max(player.height / 2, Math.min(canvas.height - player.height / 2, player.y));
}