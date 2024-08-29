/** @type {HTMLCanvasElement} */
var canvas = document.getElementById('canvas');

/** @type {CanvasRenderingContext2D} */ 
var ctx = canvas.getContext('2d');

// 캔버스 스타일
canvas.setAttribute('width','500');
canvas.setAttribute('height','500');
canvas.style.border = '1px solid black';
ctx.imageSmoothingEnabled = false;

const fps = 60;
const interval = 1000 / fps;
let lastTime = 0;

function gameLoop(timestamp) {
    // 처음 호출되었을 때 lastTime을 설정
    if (!lastTime) {
        lastTime = timestamp;
    }

    const elapsed = timestamp - lastTime;

    if (elapsed > interval) {
        lastTime += interval;
        // 여기에 업데이트 및 렌더링 코드를 추가하면 됩니다.
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        playerMovement();
        updateAnimation(timestamp);
        drawPlayer();
    }
    requestAnimationFrame(gameLoop); // 다음 프레임 요청
}

gameLoop(0);
