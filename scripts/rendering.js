
class Panel {
	/*
	parameters
		string divId
			text for ID of div that game renders in
		number resX,
		number resY
			vars for HTML canvas resolution
			?need auto option?
		(func) startup
			called when user starts the game
		number layers = 2
			number of layers to create
	
	attributes
		array(html canvas) figures
			the canvases you draw to
		array(html canvas) shadows
			the canvases presented on page
		array(canvas ctx) figureContexts
			contexts for figures
		array(canvas ctx) shadowContexts
			contexts for shadows
	
	methods
		illuminate
			reveals changes by painting the buffer canvas to the display canvas
		pose
			generic, for drawing to the buffer canvas
		
	*/
	constructor(divId, resX, resY, startup, layers = 2) {
		
		this._layers = 2;
		
		const root = document.getElementById(divId);
		//style root
		root.style.aspectRatio = resX/resY;
		root.style.position = "relative"; //for layering: https://www.shecodes.io/athena/50922-how-to-make-an-absolute-box-responsive-with-css#:~:text=To%20make%20an%20absolute%20position%20box%20responsive%2C%20you%20should%20use,parent%20container%20and%20adjust%20accordingly.
		
		const wall = document.createElement("div");
		wall.style.display = "none";
		root.appendChild(wall);
		
		const figures = [];
		const shadows = [];
		const figureContexts = [];
		const shadowContexts = [];
		
		//create canvases
		for (let i = 0; i < layers; i++) {
			const sh = document.createElement("canvas");
			sh.width = resX;
			sh.height = resY;
			//style
			sh.style.width = "100%";
			sh.style.height = "100%";
			sh.style.zIndex = i; //layering
			sh.style.position = "absolute"; //layering
			
			shadows[i] = sh;
			wall.appendChild(sh);
			
			const shcx = sh.getContext("2d");
			shcx.imageSmoothingEnabled = false;
			shadowContexts[i] = shcx;
			
			const fig = document.createElement("canvas");
			fig.width = resX;
			fig.height = resY;
			
			const figcx = fig.getContext("2d");
			figcx.imageSmoothingEnabled = false;
			figureContexts[i] = figcx;
			
			figures[i] = fig;
		}
		
		this._figures = figures;
		this._figureContexts = figureContexts;
		this._shadows = shadows;
		this._shadowContexts = shadowContexts;

		
		const btn = document.createElement("button");
		btn.textContent = "start";
		btn.id = "startButton";
		btn.style.width = "100%";
		btn.style.height = "100%";
		btn.onclick = 
			function() {
				wall.style.display = "block";
				//this.style.display = "none";
				this.remove();
				
				startup();
			}
		root.appendChild(btn);	
		
	}
	illuminate() {
		for (let i = 0; i < this._layers; i++) {
			this._shadowContexts[i].drawImage(this._figures[i], 0,0);
		}
	}
	illuminateOnly(layer=1) {
		this._shadowContexts[layer].drawImage(this._figures[layer], 0,0);
		//clear drawing canvas
	}
	pose(layer=1) {
		return this._figureContexts[layer]
	}
}

const game = new Panel("cave", 300,300);

game.pose(0).fillRect(0,0, 300,300);

game.pose(1).fillStyle = "#904545";
game.pose(1).fillRect(10,10, 50,50);
game.illuminate();