jQuery(function( $ ) {	
	
	JXG.Options.board.minimizeReflow='none'		

	var board = JXG.JSXGraph.initBoard('edvi',{
			boundingbox:[-1,10,19,-1], //xmin,ymax,xmax,ymin			
			keepaspectratio:false, 
			axis:false,	
			grid: false,		
			showCopyright:false,
			zoomX:1.2,  //En PC y iPad 1.5 es suficiente
			zoomY:1.2,  //En PC y iPad 1.5 es suficiente
			showNavigation:true,
			needsRegularUpdate: false, 
	  		fixed: false,
	  		numberPointsLow:100,
	  		numberPointsHigh:100,				
			pan: {
				needShift: false,
				needTwoFingers: false,
				enabled: true
			},
			zoom : {
				factorX : 1.5,   
				factorY : 1,   
				 wheel: false,
			}
		});			

		//-----------------------------Dibuja ejes----------------------//
 
		var ejeX = board.create('axis', [[0,0], [1,0]],{

			ticks: {
				drawZero:false,
				ticksDistance:0.5,
				minorTicks:5,
				majorHeight:10,								
				label: {offset:[-5,-15]} 
			}

		});

		ejeX.removeAllTicks();

		board.create('ticks', [ejeX, 1], { // The number here is the distance between Major ticks
			grid:false,
			strokeColor:'#ccc',
			majorHeight:12, // Need this because the JXG.Options one doesn't apply
			drawLabels:true, // Needed, and only works for equidistant ticks
			label: {offset: [-4, -15]},
			minorTicks:0, // The NUMBER of small ticks between each Major tick
			drawZero:false
 			}		
		);



		var ejeY = board.create('axis', [[0,0], [0,1]],{

			ticks: {
				minorTicks:5,
				ticksDistance:0.1,
				majorHeight:20,								
				label: {offset:[-30,-1]},
				drawZero:false
			}

		});
 		


		//--------------------------Anima la sucesión---------------------//
/* 		function animaSucesion(){  
		suma=0;
		serie=[];
		for (var i = 1; i < 20; i++) {
			suma=suma+1/i;
			serie.push(suma)
		}
		console.log(serie);

		for(var i = 1; i < 20; i++) {
		board.create('point',[i,serie[i-1]], {});
		
 		//suma=suma+1/i;
 		console.log("i: " +i); 
 		console.log("suma: " +suma); 

 				}
 		}	*/





		function animaSucesion(){                                         //https://stackoverflow.com/questions/3583724/how-do-i-add-a-delay-in-a-javascript-loop
 		(async () => {
  				suma=0;
				serie=[];
				iteraciones=500
				for (var i = 1; i < iteraciones; i++) {
					suma=suma+f(i);
					serie.push(suma)
				}
  				console.log(serie);
  				for(let i = 1; i < iteraciones; i++) {
    			await new Promise(resolve => setTimeout(() => {
      			board.create('point',[i,serie[i-1]], {name:""});
      			resolve();
    			}, 200));
  			}
		})();	
		}

		function f(x){
			return 1/x;
		}




		//---------------------Botones-----------------------------------//
		
		$('#PlayBtn').click(function() {											
			animaSucesion();				
		});

		$('#ResetBtn').click(function() {											
			board.update();		
		});	
		


		
		//------------Recupera el valor de los inputs------------------//
		


		
		


}) 
