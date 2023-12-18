
class Panel {
	/*
	parameters
		string divId
			text for ID of div that game renders in
		number resX,
		number resY
			vars for HTML canvas resolution
			?need auto option?
	
	attributes
		X,
		Y
			canvas dimensions
			from resX, resY
		bgShadow,
		bgShadowContext
			for rendering background
			the actual display canvas
		bgFigure,
		bgFigureContext
			for rendering the background
			frame buffer before display
		fgShadow,
		fgShadowContext,
			for rendering foreground
			actual display canvas
		fgFigure,
		figFigureContext
			for rendering foreground
			frame buffer before display
		
	
	methods
		ignite
			preps to start game by creating the start button
		illuminate
			reveals changes by painting the figure canvas to the shadow canvas
		pose
			generic, for drawing to the buffer canvas
		
	*/
	constructor(divId, resX, resY, color="#000") {
		
		this.X = resX;
		this.Y = resY;
		
		const wall = document.getElementById(divId);
		this.wall = wall;
		//style wall
		wall.style.aspectRatio = resX/resY;
		wall.style.position = "relative"; //for layering: https://www.shecodes.io/athena/50922-how-to-make-an-absolute-box-responsive-with-css#:~:text=To%20make%20an%20absolute%20position%20box%20responsive%2C%20you%20should%20use,parent%20container%20and%20adjust%20accordingly.
		wall.style.backgroundColor = color;
		wall.style.touchAction = "manipulation";
		
		function makeCanvas(z) {
			const sh = document.createElement("canvas");
			sh.width = resX;
			sh.height = resY;
			//style
			sh.style.display = "none";
			sh.style.width = "100%";
			sh.style.height = "100%";
			sh.style.zIndex = z; //layering
			sh.style.position = "absolute"; //layering
			wall.appendChild(sh);
			
			const shcx = sh.getContext("2d");
			shcx.imageSmoothingEnabled = false;
			
			const fig = new OffscreenCanvas(resX, resY);
			const figcx = fig.getContext("2d");
			figcx.imageSmoothingEnabled = false;
			
			return [sh, shcx, fig, figcx];
		}
		
		[this.bgShadow, 
			this.bgShadowContext, 
			this.bgFigure, 
			this.bgFigureContext
		] = makeCanvas(0);
		[this.fgShadow, 
			this.fgShadowContext, 
			this.fgFigure, 
			this.fgFigureContext
		] = makeCanvas(1);
		
			
	}
	ignite(startup) {
		//start button
		const btn = document.createElement("button");
		btn.textContent = "start";
		btn.id = "startButton";
		btn.style.width = "100%";
		btn.style.height = "100%";
		const bg = this.bgShadow;
		const fg = this.fgShadow;
		btn.onclick = 
			function() {
				bg.style.display = "block";
				fg.style.display = "block";
				//this.style.display = "none";
				this.remove();
				
				startup();
			}
		this.wall.appendChild(btn);
	}
	paintWall(color) {
		this.wall.style.backgroundColor = color;
	}
	illuminate() {
		this.bgShadowContext.drawImage(this.bgFigure, 0,0);
		this.fgShadowContext.drawImage(this.fgFigure, 0,0);
	}
	illuminateFg() {
		this.fgShadowContext.drawImage(this.fgFigure, 0,0);
	}
	illuminateBg() {
		this.bgShadowContext.drawImage(this.bgFigure, 0,0);
	}
	poseFg() {
		return this.fgFigureContext;
	}
	poseBg() {
		return this.bgFigureContext;
	}
	
	poseBgImage(image) {
		this.bgFigureContext.drawImage(image, 0,0, this.X,this.Y);
	}
}

class Input {
	constructor(root) {
		this.root = root
		//if root is element with low z index, wont detect clicks from under other elements
		
	}
	
	recieveDownAt(f) {
		this.root.addEventListener("mousedown", f);
	}
	recieveUpAt(f) {
		this.root.addEventListener("mouseup", f);
	}
	
	translate_to_canv(x,y) {
		const rect = this.root.getBoundingClientRect();
		//canvCoords = (clientPos - elementPos) * (elementWidth / elementCssWidth)
		return [
			(x - rect.left) * (this.root.width / this.root.offsetWidth)
			, (y- rect.top) * (this.root.height / this.root.offsetHeight)
		]
	}
}


