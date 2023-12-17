
const game = new Panel("cave", 300,300, color="#dddde4");



function onaclick(e) {
	
	
	const x = e.offsetX;
	const y = e.offsetY;
	
	game.poseFg().fillRect(x - 3, y-3, 3, 3);
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