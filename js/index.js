jQuery(function( $ ) {	
	
	JXG.Options.board.minimizeReflow='none'		

	var board = JXG.JSXGraph.initBoard('edvi',{
			boundingbox:[-20,55,10,-15], //xmin,ymax,xmax,ymin
			keepaspectratio:true, 
			axis:false,			
			showCopyright:false,
			zoomX:1.2,  //En PC y iPad 1.5 es suficiente
			zoomY:1.2,  //En PC y iPad 1.5 es suficiente
			showNavigation:true,
			needsRegularUpdate: true, 
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

		//-----------------------------Dibuja ejes y fondo----------------------//
 
		var ejeX = board.create('axis', [[0,0], [1,0]],{

			ticks: {
				drawZero:true,
				ticksDistance:2,
				majorHeight:10,								
				label: {offset:[-5,-15]} 
			}

		});

		var backgroundUrl= "images/background_long.png";
 		var backgroundImg=board.create('image',[backgroundUrl,[-20,-33.5],[120,191]],{fixed:true, needsRegularUpdate: false, highlight:'false'}); 		
 		var posteUrl= "images/poste.gif";
 		var posteImg=board.create('image',[posteUrl,[50,0],[3,30]],{fixed:true,needsRegularUpdate: false, highlight: 'false'});
 		

		//------------------------Variables Animacion----------------//
		var resolucion=0.001; 
		var animId;
		var t=0;
		var t0;
		var dt;
		
		//------------------------Variables Escenario----------------//
		
		var pos0=new Vector2D(0,0);
		var pos1=new Vector2D(0,10);		
		var velo0= new Vector2D(25,0);		
		var g=9.8;
		var acc= new Vector2D(0,g);								 
		var tDrop=0;											 
		var animTime=Math.sqrt(2*pos0.y/acc.y)+tDrop;		
		var vIni=10;												 
		var k=0.5;		
		var dropD=50;

		//-------------------------Objeto en caída libre-------------//	
		
		ball = new Ball('00F8BC',1,0);
		ball.pos2D=pos0;
		ball.velo2D=velo0;		
		
		//-------------------------Gráfica Escenario-----------------//					
		
		var particle=board.create('point',[function(){return ball.x},function(){
			return ball.y;			
			}],{name:'', visible:true});		

		var urlCar= "images/car1.gif";
 		var urlCrane= "images/car2.gif";

 		var carImg=board.create('image',[urlCar,[function(){return ball.x-15.5},function() {return pos0.y;}],[16,7]],{fixed:true, highlight: 'false'});		 		
		
		//-------------------------Animación--------------------------//
		function play(){
			ball.pos2D=pos0;
			t = 0;		
			t0 = new Date().getTime(); 				
			animFrame();		
		};

		function animFrame(){
			animId=requestAnimationFrame(animFrame,board);
			onEachStep();
		};
				
		function onEachStep(){
			var t1 = new Date().getTime(); 
			dt = (t1-t0)*resolucion; 
			t0 = t1;
			if (dt>0.2) {dt=0;}; 					  		
			t += dt;					
			if (ball.x<100){						//Detiene la animación cuando se cumple el tiempo
				move();
			} else stop();			
		}

		function move(){		
			updatePosition()			
			board.update();
				
		};

		function stop(){			
			cancelAnimationFrame(animId);									
			t=animTime;
			ball.pos2D=pos0;			
			board.update();

		};

		function updatePosition(){												
				ball.pos2D = pos0.addScaled(velo0,t);
				ball.velo2D = velo0;						
		};


		//---------------------Botones-----------------------------------//
		
		$('#PlayBtn').click(function() {											
			play();				
		});

		$('#ResetBtn').click(function() {									
			ball.pos2D=pos0;			
			velo0= new Vector2D(vIni,0);
			acc= new Vector2D(0,g);								 //vector aceleración gravedad
			animTime=Math.sqrt(2*pos0.y/acc.y)+tDrop*1;
			t=0;
			ball.pos2D=pos0;			
			board.update();		
		});	
		
		$('#SendBtn').click(function() {									
			pregunta_1=$('.Pregunta_1 input:radio:checked').val();
			console.log(pregunta_1);
		});	

		
		//------------Recupera el valor de los sliders------------------//
		
		$("#sliderH").bind( "change", function(event, ui) {  		  		
			var h0=$(this).val();					//Buscar si se puede converir el valor directamente a un número.			
			$("#spanH").text("Height: " + $(this).val());
			pos0=new Vector2D(0,h0*1);			
			ball.pos2D=pos0;																				
			t=0;
			animTime=Math.sqrt(2*pos0.y/acc.y)+tDrop*1;									
			velo0= new Vector2D(vIni,0);
			acc= new Vector2D(0,g);
			board.update();			
		});

		$("#sliderG").bind( "change", function(event, ui) {  		  		
			g=$(this).val();					//Buscar si se puede converir el valor directamente a un número.						
			$("#spanG").text("Free fall acceleration: " + $(this).val());
			ball.pos2D=pos0;			
			velo0= new Vector2D(vIni,0);
			acc= new Vector2D(0,g*1);
			t=0;			
			animTime=Math.sqrt(2*pos0.y/acc.y)+tDrop*1;		//Tiempo de caida mas el recorrido					
			console.log("Gravity: "+ acc.y);
			console.log("Anitime: "+ animTime);
			board.update();	
		});

		$("#sliderV").bind( "change", function(event, ui) {  		  		
			vIni=$(this).val()*1;					//Buscar si se puede converir el valor directamente a un número.						
			$("#spanV").text("Constant Speed at drop: " + $(this).val());
			ball.pos2D=pos0;
			velo0= new Vector2D(vIni,0);
			acc= new Vector2D(0,g);
			t=0;			
						
			if(dropD>0 && vIni>0)
				tDrop=dropD/vIni;			
			else tDrop=0;

			if(dropD>0 && vIni==0) {
				
				tDrop=dropD/8;							
			}
				
			animTime=Math.sqrt(2*pos0.y/acc.y)+tDrop*1;		//Tiempo de caida mas el recorrido												
			console.log("Vini "+vIni);									
			board.update();		
		});

		$("#sliderD").bind( "change", function(event, ui) {  		  		
			distance=$(this).val();						//Buscar si se puede converir el valor directamente a un número.									
			dropD=distance*1;
			$("#spanD").text("Distance to drop the crane: " + $(this).val());			
			
			if(dropD>0 && vIni>0)
				tDrop=dropD/vIni;
			else tDrop=0;
									
			if(dropD>0 && vIni==0) {
				
				tDrop=dropD/8;
			}

			ball.pos2D=pos0;			
			velo0= new Vector2D(vIni,0);
			acc= new Vector2D(0,g*1);
			t=0;						
			animTime=Math.sqrt(2*pos0.y/acc.y)+tDrop;		//Tiempo de caida mas el recorrido	
			console.log("DistanceX: "+ dropD);
			console.log("Nuevo DropTime: "+ tDrop);
			console.log("Nuevo Anitime: "+ animTime);
			
			board.update();	
			
		});


		//--------------------------------------Login Lang--------------------------------------//


		//--------------------------------------Get Answers--------------------------------------//
		
		


}) 
