var dftbutton= document.getElementById("dftButton");
var dftexp = document.getElementById("dft");
var idftexp = document.getElementById("idft");
var idftbutton = document.getElementById("idftButton");
var dftreset = document.getElementById("dftreset");
var idftreset = document.getElementById("idftreset");
var graphsdft = document.getElementById("graphsDft");
var graphsidft = document.getElementById("graphsIdft");
var dftChart1  = document.getElementById("mychart1");
var dftChart2  = document.getElementById("mychart2");
var dftChart3  = document.getElementById("mychart3");
var dftChart4  = document.getElementById("mychart4");
var dftChart5  = document.getElementById("mychart5");
var dftChart6  = document.getElementById("mychart6");
var dftChart7  = document.getElementById("mychart7");
var dftChart8  = document.getElementById("mychart8");
var progressdft = document.getElementById("progressdft")
var progressidft = document.getElementById("progressidft")

dftbutton.onclick = function() {dft()};
idftbutton.onclick = function() {idft()};
dftreset.onclick = function() {dodftreset()};
idftreset.onclick = function() {doidftreset()};


function dft()

 {
 		progressdft.style.width = "20%"	;
 		graphsdft.innerHTML = "";
 		ch = "";
 		var dftstring = dftexp.value;
		var dftnumbers = dftstring.split(" ").map(Number);
		N = dftnumbers.length;
		var result = [];

		for (var k = 0; k < N; k++)
		{
			var tempResult = math.complex(0, 0);
			for(var n = 0; n < N; n++)
			{	
				//console.log("dftnumbers["+n+"]")
				//console.log(dftnumbers[n])
				//console.log("math.cos")
				//console.log( math.complex ( math.cos(-2*math.pi*k*n/N), math.sin(-2*math.pi*k*n/N) ))
				tempResult = math.add(tempResult, math.multiply(math.complex ( math.cos(-2*math.pi*k*n/N), math.sin(-2*math.pi*k*n/N) ), dftnumbers[n]));
				//console.log("tempResult")
				//console.log(tempResult)
				//console.log(math.re(result), math.im(result)); 		

			}

		result.push(tempResult);
		//console.log("result["+k+"]")
		//console.log(math.re(result), math.im(result));
		graphsdft.innerHTML += "X[" + k + "]" + "\t" +"=" + "\t";
		if(math.im(result[k]) < 0) ch = "-"
		else ch = "+"
		graphsdft.innerHTML += math.re(result[k]).toFixed(2).toString() + "\t" + ch + "\t" + Math.abs(math.im(result[k])).toFixed(2).toString() + " i" + "<br />"; 
		}
		var x1 = [];
		var x2 = [];
		var y1 = [];
		var y2 = [];
		var x3 = [];
		var y3 = [];
		var x4 = [];
		var y4 = [];
		for (var i = 0; i < N; i++){
  				x1.push(i);
  				y1.push(dftnumbers[i]);
  				x2.push(math.re(result[i]).toFixed(2)) ;
				y2.push(math.im(result[i]).toFixed(2)) ;
				x3.push(i) ;
				y3.push(math.abs(result[i])) ;
				x4.push(i) ;
				y4.push(math.tanh(math.im(result[i]) / math.re(result[i]))) ;

   			}
   		progressdft.style.width = "90%";
		var trace1 = {
			
			x: x1,
			y: y1,
  			mode: 'markers',
  			type: 'bar',};
		var layout = {
	  		title: 'x[n] sequence',
	  		xaxis: {
		    	title: 'n',
		    	titlefont: {	
		      		family: 'Courier New, monospace',
		      		size: 18,
		      		color: '#7f7f7f'
	    		}
	  		},
	  		yaxis: {
	    		title: 'x[n]',
	    		titlefont: {
	      			family: 'Courier New, monospace',
	      			size: 18,
	      			color: '#7f7f7f'
	    		}
	  		}};
		var trace2 = {
			
			x: x2,
			y: y2,
  			mode: 'markers',
  			type: 'scatter',};
		var layout2 = {
	  		title: 'Complex Plane',
	  		xaxis: {
		    	title: 'real X[k]',
		    	titlefont: {	
		      		family: 'Courier New, monospace',
		      		size: 18,
		      		color: '#7f7f7f'
	    		}
	  		},
	  		yaxis: {
	    		title: 'imaginary X[k]',
	    		titlefont: {
	      			family: 'Courier New, monospace',
	      			size: 18,
	      			color: '#7f7f7f'
	    		}
	  		}};
		var trace3 = {
			
			x: x3,
			y: y3,
  			mode: 'markers',
  			type: 'bar',};
		var layout3 = {
	  		title: 'Magnitude Spectrum',
	  		xaxis: {
		    	title: 'k',
		    	titlefont: {	
		      		family: 'Courier New, monospace',
		      		size: 18,
		      		color: '#7f7f7f'
	    		}
	  		},
	  		yaxis: {
	    		title: 'MOD( X[k] )',
	    		titlefont: {
	      			family: 'Courier New, monospace',
	      			size: 18,
	      			color: '#7f7f7f'
	    		}
	  		}};
		var trace4 = {
			
			x: x4,
			y: y4,
  			mode: 'markers',
  			type: 'bar',};
		var layout4 = {
	  		title: 'Phase Spectrum',
	  		xaxis: {
		    	title: 'k',
		    	titlefont: {	
		      		family: 'Courier New, monospace',
		      		size: 18,
		      		color: '#7f7f7f'
	    		}
	  		},
	  		yaxis: {
	    		title: 'Phase ( X[k] )',
	    		titlefont: {
	      			family: 'Courier New, monospace',
	      			size: 18,
	      			color: '#7f7f7f'
	    		}
	  		}};
		var data = [trace1];
		var data2 = [trace2];
		var data3 = [trace3];
		var data4 = [trace4];
			dftChart1.style.display = 'block';
			dftChart2.style.display = 'block';
			dftChart3.style.display = 'block';
			dftChart4.style.display = 'block';
		Plotly.newPlot('mychart1', data, layout);
		Plotly.newPlot('mychart2', data2, layout2);
		Plotly.newPlot('mychart3', data3, layout3);
		Plotly.newPlot('mychart4', data4, layout4);
		progressdft.style.width = "100%";
		

 }

function dodftreset(){
	progressidft.style.width = "1%";
	graphsdft.innerHTML = "";
	dftChart1.style.display = 'none';
	dftChart2.style.display = 'none';
	dftChart3.style.display = 'none';
	dftChart4.style.display = 'none';
	dftexp.value = "";}

function idft(){
		progressidft.style.width = "20%"	;
 		graphsidft.innerHTML = "";
 		var idftstring = idftexp.value;
		var idftnumbers = math.complex(idftstring.split(" "));
		N = idftnumbers.length;
		//console.log(N)
		//console.log(idftnumbers)
		var result = [];
		for (var k = 0; k < N; k++)
		{
			var tempResult = math.complex(0, 0);
			for(var n = 0; n < N; n++)
			{	
				//console.log("dftnumbers["+n+"]")
				//console.log(idftnumbers[n])
				//console.log("math.cos")
				//console.log( math.complex ( math.cos(-2*math.pi*k*n/N), math.sin(-2*math.pi*k*n/N) ))
				tempResult = math.add(tempResult, math.multiply(math.complex ( math.cos(2*math.pi*k*n/N), math.sin(2*math.pi*k*n/N) ), idftnumbers[n]));
				//console.log("tempResult")
				//console.log(tempResult)
				//console.log(math.re(result), math.im(result)); 		

			}

		result.push(math.complex(math.re(tempResult)/N, math.im(tempResult)/N));
		//console.log("result["+k+"]")
		//console.log(math.re(result), math.im(result));
		graphsidft.innerHTML += "x[" + k + "]" + "\t" +"=" + "\t";
		if(math.im(result[k]) < 0) ch = "-"
		else ch = "+"
		graphsidft.innerHTML += math.re(result[k]).toFixed(2).toString() + "\t" + ch + "\t" + Math.abs(math.im(result[k])).toFixed(2).toString() + " i" + "<br />"; 
		}


		var x1 = [];
		var x2 = [];
		var y1 = [];
		var y2 = [];
		var x3 = [];
		var y3 = [];
		var x4 = [];
		var y4 = [];
		for (var i = 0; i < N; i++){
  				x1.push(math.re(idftnumbers[i]));
  				y1.push(math.im(idftnumbers[i]));
  				x2.push(math.re(result[i]).toFixed(2)) ;
				y2.push(math.im(result[i]).toFixed(2)) ;
				x3.push(i) ;
				y3.push(math.abs(result[i])) ;
				x4.push(i) ;
				y4.push(math.tanh(math.im(result[i]) / math.re(result[i]))) ;

   			}
   		progressidft.style.width = "90%";
		var trace1 = {
			
			x: x1,
			y: y1,
  			mode: 'markers',
  			type: 'scatter',};
		var layout = {
	  		title: 'X[k] sequence',
	  		xaxis: {
		    	title: 'real X[k]',
		    	titlefont: {	
		      		family: 'Courier New, monospace',
		      		size: 18,
		      		color: '#7f7f7f'
	    		}
	  		},
	  		yaxis: {
	    		title: 'img X[k]',
	    		titlefont: {
	      			family: 'Courier New, monospace',
	      			size: 18,
	      			color: '#7f7f7f'
	    		}
	  		}};
		var trace2 = {
			
			x: x2,
			y: y2,
  			mode: 'markers',
  			type: 'scatter',};
		var layout2 = {
	  		title: 'Complex Plane',
	  		xaxis: {
		    	title: 'real x[n]',
		    	titlefont: {	
		      		family: 'Courier New, monospace',
		      		size: 18,
		      		color: '#7f7f7f'
	    		}
	  		},
	  		yaxis: {
	    		title: 'imaginary x[n]',
	    		titlefont: {
	      			family: 'Courier New, monospace',
	      			size: 18,
	      			color: '#7f7f7f'
	    		}
	  		}};
		var trace3 = {
			
			x: x3,
			y: y3,
  			mode: 'markers',
  			type: 'bar',};
		var layout3 = {
	  		title: 'Magnitude Spectrum',
	  		xaxis: {
		    	title: 'k',
		    	titlefont: {	
		      		family: 'Courier New, monospace',
		      		size: 18,
		      		color: '#7f7f7f'
	    		}
	  		},
	  		yaxis: {
	    		title: 'MOD( x[n] )',
	    		titlefont: {
	      			family: 'Courier New, monospace',
	      			size: 18,
	      			color: '#7f7f7f'
	    		}
	  		}};
		var trace4 = {
			
			x: x4,
			y: y4,
  			mode: 'markers',
  			type: 'bar',};
		var layout4 = {
	  		title: 'Phase Spectrum',
	  		xaxis: {
		    	title: 'k',
		    	titlefont: {	
		      		family: 'Courier New, monospace',
		      		size: 18,
		      		color: '#7f7f7f'
	    		}
	  		},
	  		yaxis: {
	    		title: 'Phase ( x[n] )',
	    		titlefont: {
	      			family: 'Courier New, monospace',
	      			size: 18,
	      			color: '#7f7f7f'
	    		}
	  		}};
		var data = [trace1];
		var data2 = [trace2];
		var data3 = [trace3];
		var data4 = [trace4];
			dftChart5.style.display = 'block';
			dftChart6.style.display = 'block';
			dftChart7.style.display = 'block';
			dftChart8.style.display = 'block';
		Plotly.newPlot('mychart5', data, layout);
		Plotly.newPlot('mychart6', data2, layout2);
		Plotly.newPlot('mychart7', data3, layout3);
		Plotly.newPlot('mychart8', data4, layout4);
		progressidft.style.width = "100%";}

function doidftreset(){
	progressidft.style.width = "1%";
	graphsidft.innerHTML = "";
	dftChart5.style.display = 'none';
	dftChart6.style.display = 'none';
	dftChart7.style.display = 'none';
	dftChart8.style.display = 'none';
	idftexp.value = "";}