const canvas = document.getElementById('canvas');
const context = canvas.getContext("2d");

// resize the canvas to fill browser window dynamically
window.addEventListener('resize', resizeCanvas, false);

function resizeCanvas() {
        canvas.width = window.innerWidth - 8;
        canvas.height = window.innerHeight - 8;
        drawStuff();
}
resizeCanvas();

function drawStuff() {
    context.beginPath();
    context.arc(95, 50, 40, 0, 2 * Math.PI);
    context.stroke();
}