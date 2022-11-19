//Canvas info
var c = document.getElementById("foreground_canvas");
var ctx = c.getContext("2d");
var w = 0;
var h = 0;

//Nodes info


//---------------------------Utility functions--------------------------
function resize(){
	w = window.innerWidth;
	h = window.innerHeight;

	ctx.canvas.width  = w;
  	ctx.canvas.height = h;

  	render();
 }

 function calculate_nodes(){
	/*Process:
		1) Get obstacles and walls
		2) Define/Calculate node positions
		3) Calculate connections between nodes
	
	Two options -> (1) Precalculate node positions + connections (2) Caclulate in real time (solves resizing problem)

	Caclulation optimization:
	3 categories of connections:
		(1) Walk connections
		(2) Jump connections
		(3) Throw connections

	(1) Walk connections
		- Probably generated with nodes
		- Can you walk on walls? Maybe shoud implement that (----!----)

	Lets talk about node generation
		- Nodes linear interpolation on walls and floors
		- Allows for generation of walk connections
		- Need to define walls and floors
			- Canvas walls and floors -> easy to define
			- Obstacle walls and floors -> Defined with box around obstacle (top and sides)

	(2) Jump connectiona
	-------- Thought process 1 - Hypothesis -> no obstacle in jump path ------
		- Use most efficient path
		- Before each jump velocity = 0
		- Formula process :
	
		Info we have : g gravity, h height to jump, d distance to jump (- for left, + for right)
		Info we need : vx vy - intial velocity for jump

		For vy - E = mgh and E = mv**2 (I think)
			=> vy = sqrt(gh) (----i----)
		
		For vx, 1st get dt (time to destination)
			d = vdt => dt = h/vy => d = vx * h / vy => vx = vy * d/h (----i----)

	This one (up) should probably be used for floor to wall (maybe wall to wall),
		However this means you cant jump a wall to go to another behind it (----!----)
		Furthermore you still need to check for obstacle after calculating the jump
	
	-------- Thought process 2 - Hypothesis -> obstacle in jump path ------

			

	Resizing!
		Priblem here because some nodes need to go and connections can change -> be created/disappear
	...
	*/
 }

//-------------------------Main functions-------------------------------
var prevT = 0;
function update(t){
	var dt = t - prevT;
	prevT = t;
}

function render(){
	//Clear canvas
	ctx.clearRect(0, 0, c.width, c.height);
}

resize();

calculate_nodes();
render();

;(() => {

  function main(dt) {
    stopMain = window.requestAnimationFrame(main);

    update(dt);
    render();
  }

//   main(window.performance.now()/1000);
})();