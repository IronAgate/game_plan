
const game = new Panel("cave", 1000,1000, color="#dddde4");



function onaclick(e) {
	
	const cv = game.bgShadow;
	
	const rect = cv.getBoundingClientRect();
	
	console.log(cv.width, cv.offsetWidth);
	console.log(rect.left, rect.top);
	
	let x = e.clientX - rect.left;
	let y = e.clientY - rect.top;
	
	
	console.log(x,y);
	
	x *= cv.width/cv.offsetWidth;
	y *= cv.height/cv.offsetHeight;
	
	//canvCoords = (clientPos - elementPos) * (elementWidth / elementCssWidth)
	
	game.poseFg().fillRect(x - 5, y-5, 10, 10);
	game.illuminateFg();
}


function t_startup() {
//	game.poseBg().fillRect(0,0, 300,300);
	game.poseFg().fillStyle = "#a05060";
	//game.poseFg().fillRect(125,125, 50,50);

	//game.illuminate()
	
	game.wall.addEventListener("mousedown", onaclick);
	
	
}

game.ignite(t_startup);