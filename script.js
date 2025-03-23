// Fetch the canvas and context from the html.
const canvas = document.querySelector("#mainCanvas");
const context = canvas.getContext("2d");

// Resize the canvas to match the window size.
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Set context styles.
context.font = "50px Courier New";
context.textAlign = "center";


// Main game classes.
class Paddle {
    constructor(x, y, width, height, color) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.color = color;

        this.maxSpeed = 300;
        this.speedY = 0;

        this.score = 0;
    }

    update(dt) {
        this.y += dt * this.speedY;

        // Upper and lower boundaries.
        if (this.y < 0) {
            this.y = 0;
        } else if (this.y + this.height > canvas.height) {
            this.y = canvas.height - this.height;
        }
    }

    draw() {
        context.fillStyle = this.color;
        context.fillRect(this.x, this.y, this.width, this.height);
    }
}

class Ball {
    constructor(x, y, radius, color) {
        this.homeX = x;
        this.homeY = y;
        this.radius = radius;
        this.color = color;

        this.reset();
    }

    update(dt) {
        // Update position based on velocity.
        this.x += dt * this.velocity.x * this.speed;
        this.y += dt * this.velocity.y * this.speed;

        // Bounce on the vertical (top & bottom) boundaries.
        if (this.y - this.radius < 0) {
            this.y = this.radius;
            this.velocity.y *= -1;
        } else if (this.y + this.radius > canvas.height) {
            this.y = canvas.height - this.radius;
            this.velocity.y *= -1;
        }

        // If either of the paddle misses the ball.
        if (this.x + this.radius < 0) {
            computerPaddle.score++;
            this.reset();
        } else if (this.x - this.radius> canvas.width) {
            userPaddle.score++;
            this.reset();
        }

        // Check for collision.
        if (checkCollision(userPaddle, this)) {
            this.velocity.x *= -1;
            this.x = userPaddle.x + userPaddle.width + this.radius;
        } else if (checkCollision(computerPaddle, this)) {
            this.velocity.x *= -1;
            this.x = computerPaddle.x - this.radius;            
        } // NOTE: Other than reversing velocity, updating x
          // prevents the ball from sticking to the paddles.
    }

    draw() {
        context.fillStyle = this.color;
        context.beginPath();
        context.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        context.fill();
    }

    // Helper methods.
    reset() {
        this.x = this.homeX;
        this.y = this.homeY;
        
        // Direct the ball to a random direction.
        const position = {
            x: (Math.random() < 0.5)? -10 : canvas.width + 10,
            y: Math.random() * canvas.height
        }
        const angle = Math.atan2(
            position.y - this.y,
            position.x - this.x
        );

        this.speed = 100;
        this.velocity = {
            x: Math.cos(angle),
            y: Math.sin(angle)
        };

        /* NOTE: This logic of directing the ball into a
         | random location uses trigonometry to help direct
         | the ball into a random position inside the canvas.
         | that is either on the leftmost side or the rightmost.
         | It uses Math.atan2(y, x) to find the radian pointing
         | to the picked random location. Then it uses sine and
         | cosine functions to find the velocity that directs
         | to that location. By the way, I didn't use the internet
         | or any resources to figure this way out. I applied this
         | technique from my knowledge I gained when I was some
         | time ago curious about what is Math.atan2().
        */
    }
}


// Initialize game objects.
const userPaddle = new Paddle(20, 450, 10, 100, "white");
const computerPaddle = new Paddle(canvas.width - 20, 450, 10, 100, "white");

const ball = new Ball(canvas.width * 0.5, canvas.height * 0.5, 10);

computerPaddle.maxSpeed = ball.speed;

// Helper methods.
function moveComputerPaddle() {
    const difference = ball.y - computerPaddle.y - computerPaddle.height * 0.5;

    if (Math.abs(difference) > computerPaddle.height * 0.5) {
        computerPaddle.speedY = Math.sign(difference) * computerPaddle.maxSpeed;
    } // NOTE: This prevents jittering (shaky and unnatural movement).
}

function checkCollision(rect, circle) {
    // Find the closest point on the rectrangle to the circle.
    const closestX = Math.max(rect.x, Math.min(circle.x, rect.x + rect.width));
    const closestY = Math.max(rect.y, Math.min(circle.y, rect.y + rect.height));

    // Calculate the distance between closest and circle.
    const distanceX = circle.x - closestX;
    const distanceY = circle.y - closestY;

    // If they collided, the distance is never more than the circle radius.
    return Math.hypot(distanceX, distanceY) <= circle.radius;
}

function drawBoundaryLine() {
    context.strokeStyle = "white";
    context.lineWidth = 5;
    context.setLineDash([20, 20]);
    context.beginPath();

    context.moveTo(canvas.width * 0.5, 0);
    context.lineTo(canvas.width * 0.5, canvas.height);

    context.stroke();
}

function drawText(text, x, y, color) {
    context.fillStyle = color;
    context.fillText(text, x, y);
}


// Keyboard event listeners.
document.addEventListener("keydown", event => {
    if (event.key === "ArrowUp") {
        userPaddle.speedY = -userPaddle.maxSpeed;
    } else if (event.key === "ArrowDown") {
        userPaddle.speedY = userPaddle.maxSpeed;
    }
});

document.addEventListener("keyup", _ => {
    userPaddle.speedY = 0;
});

// Touch event listeners.
document.addEventListener("touchstart", event => {
    if (event.touches[0].clientY < canvas.height * 0.5) {
        userPaddle.speedY = -userPaddle.maxSpeed;
    } else {
        userPaddle.speedY = userPaddle.maxSpeed;
    }
});

document.addEventListener("touchmove", event => {
    if (event.touches[0].clientY < canvas.height * 0.5) {
        userPaddle.speedY = -userPaddle.maxSpeed;
    } else {
        userPaddle.speedY = userPaddle.maxSpeed;
    }
});

document.addEventListener("touchend", _ => {
    userPaddle.speedY = 0;
});


// Main game loop.
let lastTime = 0;
function animate(currentTime = performance.now()) {
    requestAnimationFrame(animate);
    
    const dt = (currentTime - lastTime) * 0.001;
    lastTime = currentTime;

    context.clearRect(0, 0, canvas.width, canvas.height);

    // Draw the boundary.
    drawBoundaryLine();

    // Draw the scores.
    drawText(userPaddle.score, canvas.width * 0.25, canvas.height * 0.5);
    drawText(computerPaddle.score, canvas.width * 0.75, canvas.height * 0.5);

    // Update paddles.
    userPaddle.update(dt);
    userPaddle.draw();

    moveComputerPaddle();
    computerPaddle.update(dt);
    computerPaddle.draw();

    // Update the ball.
    ball.update(dt);
    ball.draw();
}

animate();