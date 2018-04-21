console.log("hello")
//row is element col is margin
function threeBalls(row, col, player, r, c){
	var elementExists = document.getElementById("spin_"+r+'_'+c)
	if(!!elementExists){
		elementExists.remove();
	}
    var spin = document.createElement("div");
	var rot = document.createElement("div");
	spin.setAttribute("id", 'spin_'+r+'_'+c)
	spin.setAttribute('class', 'spinner')
	spin.setAttribute('style', 'margin-left:'+ col +'%;');
	rot.setAttribute("id", 'rot_'+r+'_'+c)
	rot.setAttribute('class', 'rotator');
	row.appendChild(spin);
	spin.appendChild(rot);
	var b1 = document.createElement("div");
	var b2 = document.createElement("div");
	var b3 = document.createElement("div");
	b1.setAttribute('class','ball'+player+ ' ball-1');
	b1.setAttribute('id', 'ball1_'+r+'_'+c)
	b2.setAttribute('class','ball'+player+ ' ball-2');
	b2.setAttribute('id', 'ball2_'+r+'_'+c)
	b3.setAttribute('class','ball'+player+ ' ball-3');
	b3.setAttribute('id', 'ball3_'+r+'_'+c)
	rot.appendChild(b1);
	rot.appendChild(b2);
	rot.appendChild(b3);
}
function twoBalls(row,col, player, r,c){
	var elementExists = document.getElementById("spin_"+r+'_'+c)
	if(!!elementExists){
		elementExists.remove();
	}
    var spin = document.createElement("div");
	var rot = document.createElement("div");
    spin.setAttribute("id", 'spin_'+r+'_'+c)
	spin.setAttribute('class', 'spinner')
	spin.setAttribute('style', 'margin-left:'+ col +'%;');
	rot.setAttribute("id", 'rot_'+r+'_'+c)
	rot.setAttribute('class', 'rotator');
	row.appendChild(spin);
	spin.appendChild(rot);
	var b1 = document.createElement("div");
	var b2 = document.createElement("div");
	b1.setAttribute('class','ball'+player+ ' ball-1');
	b1.setAttribute('id', 'ball1_'+r+'_'+c)
	b2.setAttribute('class','ball'+player+ ' ball-2');
	b2.setAttribute('id', 'ball2_'+r+'_'+c)
	rot.appendChild(b1);
	rot.appendChild(b2);
}
function oneBall(row,col, player,r,c){
	var elementExists = document.getElementById("spin_"+r+'_'+c)
	if(!!elementExists){
		elementExists.remove();
	}
    var spin = document.createElement("div");
	var rot = document.createElement("div");
    spin.setAttribute("id", 'spin_'+r+'_'+c)
	spin.setAttribute('class', 'spinner')
	spin.setAttribute('style', 'margin-left:'+ col +'%;');
	rot.setAttribute("id", 'rot_'+r+'_'+c)
	rot.setAttribute('class', 'rotator');
	row.appendChild(spin);
	spin.appendChild(rot);
	var b1 = document.createElement("div");
	b1.setAttribute('class','ball'+player+ ' ball-1');
	b1.setAttribute('id', 'ball1_'+r+'_'+c)
	rot.appendChild(b1);
}
function zeroBall(row,col, player,r,c){
	var elementExists = document.getElementById("spin_"+r+'_'+c)
	if(!!elementExists){
		elementExists.remove();
	}
    var spin = document.createElement("div");
	var rot = document.createElement("div");
    spin.setAttribute("id", 'spin_'+r+'_'+c)
	spin.setAttribute('class', 'spinner')
	spin.setAttribute('style', 'margin-left:'+ col +'%;');
	rot.setAttribute("id", 'rot_'+r+'_'+c)
	rot.setAttribute('class', 'rotator');
	row.appendChild(spin);
	spin.appendChild(rot);
}
function windowToMargin(c){		
	     var x = window.matchMedia("(min-width: 1200px)")
	     var y = window.matchMedia("(min-width: 992px)")
	     var z = window.matchMedia("(min-width: 768px)")
	     var g = window.matchMedia("(min-width: 600px)")
	     if(x.matches || y.matches ){
	     	m = 6*c+4.2
	     }
	     else if(z.matches){
	     	m = 9*c+4.2
	     }
	     else{
	     	m = 12*c+4.2
	     }
	     return m;
}
function removeBalls(rotId){
	var node = document.getElementById(rotId);
	while (node.firstChild) {
    	node.removeChild(node.firstChild);
	}
}
function threshold(r, c, numBallsInElement){
	if((r==0 && c==0) || (r==0 && c==6) || (r==10 && c==0) || (r==10 && c==6) ){
		if(numBallsInElement == 1){
			return true
		}
	}
	else if(r==0 || c==0 || r==10 || c==6){
		if(numBallsInElement == 2){
			return true;
		}
	}
	else if(numBallsInElement == 3){
		return true;
	}
	else{
		return false;
	}	
}
function correct(r, c, player, or, oc){
	if(r>=0 && r<=10 && c>=0 && c<=6){
		removeBalls("rot_"+or+"_"+oc);
		rot = document.getElementById("rot_"+r+'_'+c);
		rot.removeAttribute("class");
		balls = rot.childNodes;
		numBallsInElement = balls.length;
		var row = document.getElementById("row"+r);
		var col = windowToMargin(c);
		if(threshold(r, c, numBallsInElement)){
			var cell = document.getElementById(r+"_"+c);
			var b1 = document.getElementById("ball1_"+r+'_'+c)
			var b2 = document.getElementById("ball2_"+r+'_'+c)
			var b3 = document.getElementById("ball3_"+r+'_'+c)
			if(!!b1 && !!b2 && !!b3){
				threeBalls(row, col, player, r, c);
			}
			else if(!!b1 && !!b2){
				twoBalls(row, col, player, r, c);
			}
			else if(!!b1){
				oneBall(row, col, player, r, c);
			}			
		setTimeout(function(){
			magic(cell, "yes")
		},200);
		}
		else{
			removeBalls("rot_" + r + "_" + c);
			if(numBallsInElement == 0) oneBall(row, col, player, r, c);
			else if(numBallsInElement == 1) twoBalls(row, col, player, r, c);
			else if(numBallsInElement == 2) threeBalls(row, col, player, r, c);
		}
	}
}
function animateBalls(rot, r, c, n, b, player){
	if(n==3){
		//createfakeball
		var fakeball = document.createElement("div");
		fakeball.setAttribute('class','ball'+player+ ' ball-1');
		rot.appendChild(fakeball)

		var b1 = document.getElementById("ball1_"+r+'_'+c)
		var b2 = document.getElementById("ball2_"+r+'_'+c)
		var b3 = document.getElementById("ball3_"+r+'_'+c)
	
		//add ball-right to ball 1.

		b1.classList.add("ball-right");
		//add ball-2-left to fakeball
		fakeball.classList.add("ball-left");
		//add ball-3-top to ball 2
		b2.classList.add("ball-top");
		b3.classList.add("ball-down");
		
		setTimeout(function(){
			correct(r, c+1, player, r, c)
			correct(r, c-1, player, r, c)
			correct(r+1, c, player, r, c)
			correct(r-1, c, player, r, c)
		},600);
		


	}
	if(n==2){
		//createfakeball
		var fakeball = document.createElement("div");
		fakeball.setAttribute('class','ball'+player+ ' ball-1');
		rot.appendChild(fakeball)

		var b1 = document.getElementById("ball1_"+r+'_'+c)
		var b2 = document.getElementById("ball2_"+r+'_'+c)
		
		//add ball-right to ball 1.
		if(r==0){
			fakeball.classList.add("ball-right");
			b1.classList.add("ball-left");
			b2.classList.add("ball-down");

		}
		else if(c == 0){
			fakeball.classList.add("ball-top");
			b1.classList.add("ball-right");
			b2.classList.add("ball-down");

		}
		else if(r == 10){
			fakeball.classList.add("ball-top");
			b1.classList.add("ball-right");
			b2.classList.add("ball-left");

		}
		else if(c==6){
			fakeball.classList.add("ball-top");
			b1.classList.add("ball-down");
			b2.classList.add("ball-left");
		}

		setTimeout(function(){
			correct(r, c+1, player, r, c)
			correct(r, c-1, player, r, c)
			correct(r+1, c, player, r, c)
			correct(r-1, c, player, r, c)
		},600);
		
	}
		if(n==1){
		//createfakeball
		var fakeball = document.createElement("div");
		fakeball.setAttribute('class','ball'+player+ ' ball-1');
		rot.appendChild(fakeball)

		var b1 = document.getElementById("ball1_"+r+'_'+c)
		fakeball.classList.add(b1.classList[1]);

		//add ball-right to ball 1.
		if(r==0 && c==0){
			fakeball.classList.add("ball-right");
			b1.classList.add("ball-down");
		}
		else if(r == 10 && c==0){
			fakeball.classList.add("ball-top");
			b1.classList.add("ball-right");
		}
		else if(r == 10 && c==6){
			fakeball.classList.add("ball-top");
			b1.classList.add("ball-left");
		}
		else{
			fakeball.classList.add("ball-left");
			b1.classList.add("ball-down");
		}

		setTimeout(function(){
			correct(r, c+1, player, r, c)
			correct(r, c-1, player, r, c)
			correct(r+1, c, player, r, c)
			correct(r-1, c, player, r, c)
		},300);
	}

}
function magic(elem, noob){
	r = parseInt(elem.id.split("_")[0]);
	c = parseInt(elem.id.split("_")[1]);
	// console.log(r, c)
	// for(var i=0; i<11; i++){
	// 	for(var j= 0; j<7; j++){
	// 		if(turn == 0) col = n1
	// 		else col = n2
	// 		var cell = document.getElementById(i+"_"+j);
	// 		cell.style.border = "1px solid "+ gridColour[col];
	// 	}
	// }

	rot = document.getElementById("rot_"+r+'_'+c);
	rot.removeAttribute("class");
	balls = rot.childNodes;
	numBallsInElement = balls.length;
	// console.log(balls, numBallsInElement)
	if(threshold(r, c, numBallsInElement)){
		var str = balls[0].classList[0]
		player = str.substring(4, 7)

		if((noob == "yes") || (prevTurn == 1 && turn == 0 && player == player1 || prevTurn == 0 && turn == 1 && player == player2)){
			if(noob == "no"){
				for(var i=0; i<11; i++){
					for(var j= 0; j<7; j++){
						if(turn == 1) col = n1
						else col = n2
						var cell = document.getElementById(i+"_"+j);
						cell.style.border = "1px solid "+ gridColour[col];
					}
				}

			if(turn == 0){
				turn = 1;
				prevTurn = 0;
			}
			else if(turn == 1){
				turn = 0;
				prevTurn = 1;
			}
		}
		animateBalls(rot, r, c, numBallsInElement, balls, player);
		}
	}
	else{
		rot = document.getElementById("rot_"+r+'_'+c);
		rot.removeAttribute("class");
		balls = rot.childNodes;
		if(balls.length == 0){
			for(var i=0; i<11; i++){
				for(var j= 0; j<7; j++){
					if(turn == 1) col = n1
					else col = n2
					var cell = document.getElementById(i+"_"+j);
					cell.style.border = "1px solid "+ gridColour[col];
				}
			}
			if(turn == 0 && prevTurn == 1){
				player = player1;
				turn = 1;
				prevTurn = 0;
			}		
			else if(turn == 1 && prevTurn == 0){
				player = player2;
				turn = 0;
				prevTurn = 1;
			}	
			var row = document.getElementById("row"+r);
			var col = windowToMargin(c);
			removeBalls("rot_" + r + "_" + c);
			if(numBallsInElement == 0) oneBall(row, col, player, r, c);
		}
		else{
			var str = balls[0].classList[0]
			player = str.substring(4, 7)
		}
		// else if(turn == 2){
		// 	player = P3;
		// 	turn = 3;
		// }	
		// else if(turn == 3){
		// 	player = P4;
		// 	turn = 5;
		// }
		// else if(turn == 4){
		// 	player = P5;
		// 	turn = 0;
		// }		
		if(prevTurn == 1 && turn == 0 && player == player1 || prevTurn == 0 && turn == 1 && player == player2){
			for(var i=0; i<11; i++){
				for(var j= 0; j<7; j++){
					if(turn == 1) col = n1
					else col = n2
					var cell = document.getElementById(i+"_"+j);
					cell.style.border = "1px solid "+ gridColour[col];
				}
			}
			if(turn == 0){
				turn = 1;
				prevTurn = 0;
			}
			else if(turn == 1){
				turn = 0;
				prevTurn = 1;
			}
			var row = document.getElementById("row"+r);
			var col = windowToMargin(c);
			removeBalls("rot_" + r + "_" + c);
			if(numBallsInElement == 0) oneBall(row, col, player, r, c);
			else if(numBallsInElement == 1) twoBalls(row, col, player, r, c);
			else if(numBallsInElement == 2) threeBalls(row, col, player, r, c);
		}
	}
	// if(threshold)

	// else
}
function createRandomBoard(r, c, row, col){
	if((r==0 && c==0) || (r==0 && c==6) || (r==10 && c==0) || (r==10 && c==6) ){
		var a = Math.floor(Math. random() * 2)
		if(a == 0){
			zeroBall(row,col,'P5', r, c)
		}
		if(a == 1){
			oneBall(row,col,'P2', r, c)
		}
	}
	else if(r==0 || c==0 || r==10 || c==6){
		var a = Math.floor(Math. random() * 3)
		if(a == 0){
			zeroBall(row,col,'P1', r, c)
		}
		if(a == 1){
			oneBall(row,col,'P2', r, c)
		}
		if(a == 2){
			twoBalls(row,col,'P4', r, c)
		}
	}
	else {
		var a = Math.floor(Math. random() * 4)
		if(a == 0){
			zeroBall(row,col,'P2', r, c)
		}
		if(a == 1){
			oneBall(row,col,'P1', r, c)
		}
		if(a == 2){
			twoBalls(row,col,'P3', r, c)
		}
		if(a == 3){
			threeBalls(row,col,'P2', r, c)
		}
	}
}
var playersRange = ["P1", "P2", "P3", "P4"];
var gridColour = ['#4b0ee87d', '#410ee8c9', '#3fdbca','#ef649f'];
n1 = Math.floor(Math.random() * 4)
n2 = Math.floor(Math.random() * 4)
while(n1==n2){
	n1 = Math.floor(Math.random() * 4)
	n2 = Math.floor(Math.random() * 4)
}
var player1 = playersRange[n1];
var player2 = playersRange[n2];

var turn = 0;//turn is eq to number of players.
var prevTurn = 1;
var grid = document.createElement('table');
grid.className = 'grid';
document.getElementById("frame").appendChild(grid);

for (var r=0; r<11; r++){
	var row = document.createElement("div");
	row.setAttribute('class','padding-row-top')
	row.setAttribute('id',"row"+r)
	document.getElementById("frame").appendChild(row);
	var tr = grid.appendChild(document.createElement('tr'))
	for (var c=0; c<7; c++){
		 var cell = tr.appendChild(document.createElement('td'))
		 cell.setAttribute("id", r+"_"+c)
	     cell.addEventListener('click',(function(){
	     	magic(this, "no");
        }));

	    col = windowToMargin(c)
	    // zeroBall(row,col,'P2', r, c)
	    createRandomBoard(r, c, row, col)
	 //    if((r==0 && c==0) || (r==0 && c==6) || (r==10 && c==0) || (r==10 && c==6)){
	 //    	zeroBall(row,col,'P4', r, c)
	 //    }
	 //    else if(r==0 && c==1){
	 //    	twoBalls(row, col,'P1', r, c)
	 //    }
		// else if((c+r) %2 == 0)
		// 	threeBalls(row,col,'P1', r, c)
		// else if((c+r) %3 == 0)
		// 	twoBalls(row,col,'P2', r, c)
		// else
		// 	oneBall(row,col,'P4', r, c)
	}
}