jQuery(function( $ ) {	
	
	JXG.Options.board.minimizeReflow='none'		

	var board = JXG.JSXGraph.initBoard('edvi',{
			boundingbox:[-1,4,20,-1], //xmin,ymax,xmax,ymin			
			keepaspectratio:false, 
			axis:false,	
			grid: false,		
			showCopyright:false,
			zoomX:1.2,  //En PC y iPad 1.5 es suficiente
			zoomY:1.2,  //En PC y iPad 1.5 es suficiente
			showNavigation:true,
			needsRegularUpdate: false, 
	  		fixed: true,
	  		numberPointsLow:100,
	  		numberPointsHigh:100,				
			pan: {
				needShift: false,
				needTwoFingers: false,
				enabled: false
			},
			zoom : {
				factorX : 1,   
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
 		

		//---------------------------Dibuja rectas épsilon--------------------//

		var epsilon=0.5

		var p1_eps=board.create('point',[0,1-epsilon],{
			name:''
		});
		var p2_eps=board.create('point',[0,1+epsilon],{
			name:''
		});

		var recta1 = board.create('line',[p1_eps,p2_eps], {
			straightFirst:false, 
			straightLast:false, 
			strokeWidth:4,

		});

		//---------------------------Dibuja rectángulo épsilon--------------------//
		
		var p3_eps=board.create('point',[30,1-epsilon],{
			name:''
		});
		var p4_eps=board.create('point',[30,1+epsilon],{
			name:''
		});


		var poly = board.create('polygon',[p1_eps,p2_eps,p4_eps,p3_eps], { 
			borders:{strokeColor:'black',
					dash:2,
					},
			fillOpacity:0.05,
			fillColor:"blue",
		});



 		
		function play(){                                         //https://stackoverflow.com/questions/3583724/how-do-i-add-a-delay-in-a-javascript-loop
 		(async () => {
  				for(let i = 1; i < 18; i++) {
    			await new Promise(resolve => setTimeout(() => {
      			board.create('point',[i,function(x){
 				return i/(i+1);}], {name:''});
      			resolve();
    			}, 100));
  			}
		})();	
		}











		//---------------------Botones-----------------------------------//
		
		$('#PlayBtn').click(function() {											
			play();				
		});

		$('#ResetBtn').click(function() {											
			board.update();		
		});	
		
		$('#SendBtn').click(function() {									
			
		});	

		
		//------------Recupera el valor de los sliders------------------//
		
		$("#sliderH").bind( "change", function(event, ui) {  		  		
						
			$("#spanH").text("Height: " + $(this).val());
		
			board.update();			
		});

		$("#sliderG").bind( "change", function(event, ui) {  		  		
		
			board.update();	
		});

		$("#sliderV").bind( "change", function(event, ui) {  		  		
									
			board.update();		
		});

		$("#sliderD").bind( "change", function(event, ui) {  		  		
		
			
			board.update();	
			
		});


		
		


}) 
