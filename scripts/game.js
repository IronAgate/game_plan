
const game = new Panel("cave", 1000,1000, color="#dddde4");
const inp = new Input(game.fgShadow);


function onaclick(e) {
	
	const [x,y] = inp.translate_to_canv(e.clientX, e.clientY);
	document.getElementById("testout").textContent = "down: " + x + ', ' + y;
	
	game.poseFg().fillRect(x - 5, y-5, 10, 10);
	game.illuminateFg();
}
function onunclick(e) {
	const [x,y] = inp.translate_to_canv(e.clientX, e.clientY);
	
	document.getElementById("testout").textContent = "up: " + x + ', ' + y;
}


function t_startup() {
	game.poseFg().fillStyle = "#a05060";
	game.poseFg().fillRect(125,125, 50,50);

	game.illuminate()
	
	
	inp.recieveDownAt(onaclick);
	inp.recieveUpAt(onunclick);
	
}

game.ignite(t_startup);