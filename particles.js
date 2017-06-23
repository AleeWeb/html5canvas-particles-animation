var canvas = document.querySelector('canvas');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

var c = canvas.getContext('2d');   //context variable


var mouse = {
  x: undefined,
  y: undefined
}
window.addEventListener('mousemove',
  function(event) {
    mouse.x = event.x;
    mouse.y = event.y;
})

//Object Oriented Programming
//JavaScript Object below is CAPITALIZED to indicate this is an Object
function Circle(x, y, dx, dy, radius) {
  this.x = x;   //Each circle has its own x and y value and separate positioning
	this.y = y;
	this.dx = dx;
	this.dy = dy;
	this.radius = radius;

	//create method within Object to actually put x and y parameters to use
		this.draw = function() {
			c.beginPath();
			c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
			c.strokeStyle = 'blue';
			c.stroke();
			c.fill();
		}

		this.update = function() {
			if (this.x + this.radius > innerWidth || this.x - this.radius < 0) {
				this.dx = -this.dx;  //reverses circle to boune left to right
			}

			if (this.y + this.radius > innerHeight || this.y - this.radius < 0) {
				this.dy = -this.dy;  //to bounce up and down
			}
				this.x += this.dx; //Add 1 on to X.
				this.y += this.dy;

        //interactivity occurs
      if (mouse.x - this.x < 50 && mouse.x - this.x > -50
        && mouse.y - this.y < 50 && mouse.y - this.y > -50
      ) {
        this.radius += 1;
      } else if(this.radius > 2){
        this.radius -= 1;
        }

			this.draw();
	}
}

var circleArray = [];

for (var i = 0; i < 100; i++) {
	 var radius = 30;
	 var x = Math.random() * (innerWidth - radius * 2) + radius;
	 var y = Math.random() * (innerHeight - radius * 2) + radius;
	 var dx = (Math.random() - 0.5);
	 var dy = (Math.random() - 0.5);
	circleArray.push(new Circle(x, y, dx, dy, radius)); //pushes a new circle every time the array is ran
}

function animate() {
	requestAnimationFrame(animate);
	c.clearRect(0,0,innerWidth, innerHeight);


	for (var i = 0; i < circleArray.length; i++) {
		circleArray[i].update();
	}
}

animate();
