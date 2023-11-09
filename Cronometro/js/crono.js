
	var centesimas = 0;
	var segundos = 0;
	var minutos = 0;
	var horas = 0;
	var limite_1=0;
	var limite_2=0;
	var limite_3=0;

	
	function inicioP(){
		limite_1=4;
		limite_2=7;
		$('#lblModo').text("Preguntas ");
		inicio();
	}

	function inicioE(){
		limite_1=5;
		limite_2=8;
		$('#lblModo').text("Exposicion ");
		inicio();
	}
	
	function inicio () {
				
		console.log(limite_1);
		console.log(limite_2);
		

		control = setInterval(cronometro,10);
		document.getElementById("inicio").disabled = true;
		document.getElementById("parar").disabled = false;
		document.getElementById("continuar").disabled = true;
		document.getElementById("reinicio").disabled = false;
		
		$('#lblLimite1').text("Aviso 1: "+limite_1 );
		$('#lblLimite2').text("Aviso 2: "+limite_2 );
	}
	
	function parar () {
		clearInterval(control);
		document.getElementById("parar").disabled = true;
		document.getElementById("continuar").disabled = false;
	}
	function reinicio () {
		clearInterval(control);
		centesimas = 0;
		segundos = 0;
		minutos = 0;
		horas = 0;
		//Centesimas.innerHTML = ":00";
		Segundos.innerHTML = ":00";
		Minutos.innerHTML = ":00";
		Horas.innerHTML = "00";
		document.getElementById("inicio").disabled = false;
		document.getElementById("parar").disabled = true;
		document.getElementById("continuar").disabled = true;
		document.getElementById("reinicio").disabled = true;
	}
	function cronometro () {
		if (centesimas < 99) {
			centesimas++;
			if (centesimas < 10) { centesimas = "0"+centesimas }
			//Centesimas.innerHTML = ":"+centesimas;
		}
		if (centesimas == 99) {
			centesimas = -1;
		}
		if (centesimas == 0) {
			segundos ++;
			if (segundos < 10) { segundos = "0"+segundos }
			Segundos.innerHTML = ":"+segundos;
		}
		if (segundos == 59) {
			segundos = -1;
		}

		if(minutos<limite_1){$('#flag').css('background',"#3aad02");}
		if(minutos>=limite_1 && minutos<limite_2){$('#flag').css('background',"#F1C40F");}
		if(minutos>=limite_2){$('#flag').css('background',"#CB4335");}

		if ( (centesimas == 0)&&(segundos == 0) ) {
			minutos++;
			if (minutos < 10) { minutos = "0"+minutos }
			Minutos.innerHTML = ":"+minutos;
		}
		if (minutos == 59) {
			minutos = -1;
		}

		if ( (centesimas == 0)&&(segundos == 0)&&(minutos == 0) ) {
			horas ++;
			if (horas < 10) { horas = "0"+horas }
			Horas.innerHTML = horas;
		}
	}
