
const rend = new Cave("cave", 8*40,8*40, 40);
const inp = new Input(rend.fgShadow);


function onaclick(e) {
	const [x,y] = inp.translate_to_canv(e.clientX, e.clientY);
	document.getElementById("testout").textContent = "down: " + x + ', ' + y;
	
	rend.poseFg().fillRect(x-5, y-5, 10, 10);
	rend.illuminateFg();
}
function onunclick(e) {
	const [x,y] = inp.translate_to_canv(e.clientX, e.clientY);
	
	document.getElementById("testout").textContent = "up: " + x + ', ' + y;
}


function t_startup() {
	
	//rend.poseFg().fillStyle = "#a05060";
	//rend.poseFg().fillRect(125,125, 4,4);
	
	rend.paintWall("#000");
	
	inp.recieveDownAt(onaclick);
	inp.recieveUpAt(onunclick);
	
	const sil = new Silhouette(rend, rend.fgFigureContext, "img_slime", 1,1);
	
	sil.pose(0,0);
	rend.illuminateFg();
	
	
}

rend.ignite(t_startup);