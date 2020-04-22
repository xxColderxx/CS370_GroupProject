

var scoring = {
	'Easy': 10,
	'Medium': 15,
	'Hard': 20,
	'Hell': 30
};

var speeds = {
	'Easy': 3,
	'Medium': 5,
	'Hard': 8,
	'Hell': 13
};


//Ball Starting speed. (Not random, but can be changed if necessary.)

//Random ball bouncing direction


//initialize all the variables. Including the Ball, Character, and background.
var canvas = document.getElementById("canvas"),
	ctx = canvas.getContext("2d");

var difficulty = document.getElementById('difficulty');
var score_element = document.getElementById('score');
var time = document.getElementById('time');

var first_time = true;

//Character's startup position
var x = Math.random() * canvas.width,
	y = Math.random() * canvas.height,
	//Ball's startup position
	bx = Math.random() * canvas.width,
	by = Math.random() * canvas.height,
	//Ball's specs
	ballRadius = 25,
	dx = 5,
	dy = -5,

	bbx = Math.random() * canvas.width,
	bby = Math.random() * canvas.height,
	bballRadius = 25,
	ddx = 5,
	ddy = -5,
	


	velY = 0,
	velX = 0,
	speed = 30,
	score = 0,
	start_time = -30000,
	friction = 0.98,
	keys = [];

function set_ball(){
	bx = ballRadius + Math.random() * (canvas.width - ballRadius);
	by = ballRadius + Math.random() * (canvas.height - ballRadius);
	var angle = Math.random() * Math.PI * 2;
	dx = 2 * speeds[difficulty.value] * Math.cos(angle);
	dy = 2 * speeds[difficulty.value] * Math.sin(angle);
}
 
function set_bball(){
	bbx = bballRadius + Math.random() * (canvas.width - bballRadius);
	bby = bballRadius + Math.random() * (canvas.height - bballRadius);
	var angleb = Math.random() * Math.PI * 2;
	ddx = 2 * speeds[difficulty.value] * Math.cos(angleb);
	ddy = 2 * speeds[difficulty.value] * Math.sin(angleb);
}




function updateScore(){
	var scoreValue = document.getElementById("score").innerHTML;
	$.ajax({
		method:'POST',
		url:"./php/update-score.php",
		data:{inputScore:scoreValue},
		dataType:"json",
		success:function(status) {
				$("#scoreTable").empty();
				var html = "";
				$.each(status["scores"],function(i,v){
					html += "<tr><td>"+v.username+"</td><td>"+v.score+"</td></tr>";
				});
				$("#scoreTable").append(html);
			} 
	})
	
	// document.getElementById("inputScore").value = scoreValue;
	// document.getElementById("updateScoreForm").submit();
}

function update_Character() {
	requestAnimationFrame(update_Character);


	if(Date.now() - start_time < 30000){
		if (keys[38]) {
			if (velY > -speed) {
				velY--;
			}
		}

		if (keys[40]) {
			if (velY < speed) {
				velY++;
			}
		}
		if (keys[39]) {
			if (velX < speed) {
				velX++;
			}
		}
		if (keys[37]) {
			if (velX > -speed) {
				velX--;
			}
		}

		velY *= friction;
		y += velY;
		velX *= friction;
		x += velX;

		if (x >= 595) {
			x = 595;
		} else if (x <= 5) {
			x = 5;
		}

		if (y > 595) {
			y = 595;
		} else if (y <= 5) {
			y = 5;
		}

		moving_Ball();
		moving_Bball();

		ctx.clearRect(0, 0, canvas.width, canvas.height);
		ctx.lineWidth = 2;
		ctx.strokeStyle = "#003366";

		drawCharacter();
		drawBall();
		drawBball();

		time.textContent = Math.round(30 - (Date.now() - start_time)/1000);
		

		if(Math.abs(x - bx) < ballRadius*2 && Math.abs(y - by) < ballRadius*2){
			score += scoring[difficulty.value];
			score_element.textContent = score;
			set_ball();
		}  

		
		if(Math.abs(x - bbx) < bballRadius*2 && Math.abs(y - bby) < bballRadius*2){
			score -= scoring[difficulty.value];
			score_element.textContent = score;
			set_bball();
		}  

		
		

	}else{
		ctx.clearRect(0, 0, canvas.width, canvas.height);
		ctx.textAlign = 'center';
		ctx.font = '48px serif';
		if(first_time){
			ctx.fillText('Welcome to the Game', 300, 300, 600);
		}else{
			ctx.fillText('Game Over', 300, 200, 600);
			ctx.fillText('Score: ' + score, 300, 300, 600);
		}
		ctx.font = '24px serif';
		ctx.fillText('Select difficulty or click reset', 300, 400, 600);
	}
}

function drawCharacter(){
	ctx.beginPath();
	ctx.arc(x, y - 12, 12, 0, Math.PI * 2);
	ctx.moveTo(x - 12, y + 6);
	ctx.lineTo(x + 12, y + 6);
	ctx.moveTo(x, y);
	ctx.lineTo(x, y + 12);
	ctx.lineTo(x - 12, y + 24);
	ctx.moveTo(x, y + 12);
	ctx.lineTo(x + 12, y + 24);
	ctx.stroke();
}

function drawBall(){
	ctx.beginPath();
	ctx.arc(bx, by, ballRadius, 0, Math.PI*2);
	ctx.stroke();
	ctx.beginPath();
	ctx.arc(bx - 1.33*ballRadius, by, ballRadius, -Math.PI*1/4, Math.PI*1/4);
	ctx.stroke();
	ctx.beginPath();
	ctx.arc(bx + 1.33*ballRadius, by, ballRadius, Math.PI*3/4, Math.PI*5/4);
	ctx.stroke();
}

//second ball suppose to have different color
function drawBball(){
	ctx.beginPath();
	ctx.arc(bbx, bby, ballRadius, 0, Math.PI*2 );
	ctx.strokeStyle = 'red';
	ctx.stroke();
	ctx.beginPath();
	ctx.arc(bbx - 1.33*ballRadius, bby, ballRadius, -Math.PI*1/4, Math.PI*1/4);
	ctx.strokeStyle = 'red';
	ctx.stroke();
	ctx.beginPath();
	ctx.arc(bbx + 1.33*ballRadius, bby, ballRadius, Math.PI*3/4, Math.PI*5/4);
	ctx.strokeStyle = 'red';
	ctx.stroke();
	
}

function moving_Ball(){
	if(bx + dx > canvas.width-ballRadius || bx + dx < ballRadius){
		dx = -dx;
	}
	if(by + dy > canvas.height-ballRadius || by + dy < ballRadius){
		dy = -dy;
	}

	bx += dx;
	by += dy;
}

function moving_Bball(){
	if(bbx + ddx > canvas.width-bballRadius || bbx + ddx < bballRadius){
		ddx = -ddx;
	}
	if(bby + ddy > canvas.height-bballRadius || bby + ddy < bballRadius){
		ddy = -ddy;
	}

	bbx += ddx;
	bby += ddy;
}

function reset(){
	start_time = Date.now();
	score = 0;
	score_element.textContent = score;
	x = Math.random() * canvas.width;
	y = Math.random() * canvas.height;
	set_ball();
	set_bball();
	first_time = false;
}

update_Character();

difficulty.addEventListener('change', function(){
		difficulty.blur();
		reset();
		});

document.getElementById('reset').addEventListener('click', function(){
		reset();
		});

//Keyboard function update.

document.body.addEventListener("keydown", function (e) {
		keys[e.keyCode] = true;
		});
document.body.addEventListener("keyup", function (e) {
		keys[e.keyCode] = false;
		});

//Ball movement


//bounce the ball off each wall
//draw background.(Or can be imported)  

