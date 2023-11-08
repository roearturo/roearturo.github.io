
	var centesimas = 0;
	var segundos = 0;
	var minutos = 0;
	var horas = 0;
	var limite_1=0;
	var limite_2=0;
	var limite_3=0;

	function inicio () {
		limite_1=$("#minuto_1").val()*1;
		limite_2=$("#minuto_2").val()*1;
		limite_3=$("#minuto_3").val()*1;
		console.log(limite_1);
		console.log(limite_2);
		console.log(limite_3);

		control = setInterval(cronometro,10);
		document.getElementById("inicio").disabled = true;
		document.getElementById("parar").disabled = false;
		document.getElementById("continuar").disabled = true;
		document.getElementById("reinicio").disabled = false;
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
		Centesimas.innerHTML = ":00";
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
			Centesimas.innerHTML = ":"+centesimas;
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

		if (minutos < limite_1) {
			$('#flag').css('background',"#229954");
		}else if (minutos < limite_2) {
				$('#flag').css('background',"#F1C40F");
				} else	if (minutos <limite_3) {
					$('#flag').css('background',"#CB4335");
				}

/*		if (segundos < 10) {
			$('#flag').css('background',"#229954");
		}else if (segundos < 20) {
				$('#flag').css('background',"#F1C40F");
				} else	if (segundos <25) {
					$('#flag').css('background',"#CB4335");
				}*/


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
