the("pres.sistolica.primtrim").onkeyup = function(e){
    if ( e.key == "Enter" ) {
        e.preventDefault();
        the("pres.diastolica.primtrim").focus()
    }
    if (isNaN(this.value) == false){
        var unTercioPSis = this.value / 3;
        var unTercioPDias = "";
        var pMedia = "";

        if (isNaN(the("pres.diastolica.primtrim").value) == false){
            unTercioPDias = the("pres.diastolica.primtrim").value / 3;
        }

        if (unTercioPDias > 0){
            pMedia = Math.trunc((unTercioPDias * 2) + (unTercioPSis));
        }

        the("pres.media.primtrim").value = pMedia;
    }
}

the("pres.diastolica.primtrim").onkeyup = function(e){
    if ( e.key == "Enter" ) {
        e.preventDefault();
        the("respuesta_uterina_derecha_prim").focus()
    }

    if (isNaN(the("pres.sistolica.primtrim").value) == false){
        var unTercioPSis = the("pres.sistolica.primtrim").value / 3;
        var unTercioPDias = "";
        var pMedia = "";

        if (isNaN(the("pres.diastolica.primtrim").value) == false){
            unTercioPDias = the("pres.diastolica.primtrim").value / 3;
        }

        if (unTercioPDias > 0){
            pMedia = Math.trunc((unTercioPDias * 2) + (unTercioPSis));
        }

        the("pres.media.primtrim").value = pMedia;
    }
}

the("respuesta_uterina_derecha_prim").onkeyup = function(e){
    if ( e.key == "Enter" ) {
        e.preventDefault();
        the("respuesta_uterina_izquierda_prim").focus()
    }
    let ut = pctut(this.value);
    the("respuesta_uterina_derecha_percentil_prim").innerHTML = ut.pct;

    let aui = parseFloat(the("respuesta_uterina_izquierda_prim").value);
    let aud = parseFloat(this.value);
    let utprom = ((aui + aud) / 2);
    the("respuesta_uterina_promedio_prim").value = utprom.toFixed(2);
    the("respuesta_uterina_promedio_prim").onchange();
};

the("respuesta_uterina_izquierda_prim").onkeyup = function(e){
    if ( e.key == "Enter" ) {
        e.preventDefault();
        the("graficoUterinasPrim").focus()
    }
    let ut = pctut(this.value);
    the("respuesta_uterina_izquierda_percentil_prim").innerText = ut.pct;

    let aui = parseFloat(this.value);
    let aud = parseFloat(the("respuesta_uterina_derecha_prim").value);
    let utprom = ((aui + aud) / 2);
    the("respuesta_uterina_promedio_prim").value = utprom.toFixed(2);
    the("respuesta_uterina_promedio_prim").onchange();
};

the("respuesta_uterina_promedio_prim").onchange = function(e){
    if (Number.isNaN(this.value) == false){
        let ut = pctut(this.value);
        the("respuesta_uterina_promedio_percentil_prom").innerHTML = ut.pct;
        the("respuesta_uterina_promedio_rango_prim").value = (ut.rango.min + " - " + ut.rango.max);
    }
};


function the(id){
    return document.getElementById(id)
}

function pctut(uterina) {
    'use strict';
    let a = [];
    let b = [];
	a[0]=1.23; a[1]=1.18; a[2]=1.11; a[3]=1.05;a[4]=0.99; a[5]=0.94; a[6]=0.89; a[7]=0.85; a[8]=0.81; a[9]=0.78; a[10]=0.74; a[11]=0.71; a[12]=0.69; a[13]=0.66; a[14]=0.64; a[15]=0.62; a[16]=0.6; a[17]=0.58; a[18]=0.56; a[19]=0.55; a[20]=0.54; a[21]=0.52; a[22]=0.51; a[23]=0.51; a[24]=0.51; a[25]=0.49; a[26]=0.48; a[27]=0.48; a[28]=0.47; a[29]=0.47; a[30]=0.47;
	b[0]=2.84; b[1]=2.71; b[2]=2.53; b[3]=2.38;b[4]=2.24; b[5]=2.11; b[6]=1.99; b[7]=1.88;b[8]=1.79; b[9]=1.71; b[10]=1.61; b[11]=1.54;b[12]=1.47; b[13]=1.41; b[14]=1.35; b[15]=1.3;b[16]=1.25; b[17]=1.21;b[18]=1.17; b[19]=1.13;b[20]=1.11; b[21]=1.06;b[22]=1.04; b[23]=1.01; b[24]=0.99; b[25]=0.97;b[26]=0.95; b[27]=0.94;b[28]=0.92; b[29]=0.91; b[30]=0.91;
    
    let eg = the("semanas").value;
	uterina = uterina.toString(); 
    uterina = uterina.replace(",", ".");
    uterina = parseFloat(uterina);

    let respuesta = {
        pct: 0,
        raw: 0,
        rango: {
            min:0,
            max:0
        }
    }

    if (eg < 10 || eg > 40) {
        return respuesta;
	}
	else {
		eg = eg - 10;
        let uno = 0, dos = 0;
        
		if (uterina > 0){
			eg = parseInt(eg);
			uno = b[eg] - a[eg];
			dos = uterina - a[eg];
			uterina = parseInt(90 / (uno) * (dos) + 5);

            respuesta.raw = uterina;

			if (uterina > 95){
				uterina = '> 95';
			}
			else if (uterina < 5){
				uterina = '< 5';
            }

            respuesta.pct = uterina;
            respuesta.rango.min = a[eg];
            respuesta.rango.max = b[eg];
            return respuesta;
        }
    }
}

the("graficoUterinasPrim").onclick = function(){
    var edadGestacional = the("semanas").value;

    if (edadGestacional < 10){
        alert("Edad Gestacional inferior a 10 semanas");
        return false;
    }

    the("modalBody").innerHTML = '<div id="graficoArtUtDerView"></div>';

    Highcharts.chart("graficoArtUtDerView", {
        chart: {
            height: 290
        },
        title: {
            text: 'IP Promedio Arterias Uterinas',
            x: -20,
                style: {
                fontSize: '14px'
            }
        },
        plotOptions: {
            series: {
                enableMouseTracking: false
            }
        },
        yAxis: {
            title: { text: 'Valor IP' },
            tickPositions: [0.1, 0.5, 1, 1.5, 2, 2.5, 3]
        },
        colors: ['#313131', '#313131', '#313131'],
        xAxis: {
            categories: ['10','11','12','13','14','15','16','17','18','19','20','21','22','23','24','25','26','27','28','29','30','31','32','33','34','35','36','37','38','39','40'] 
        },
        credits: { enabled: false },
        series: [{
            type: "line",
            name: 'Pct. 5',
            marker: { enabled: false },
            data: [1.23,1.18,1.11,1.05,0.99,0.94,0.89,0.85,0.81,0.78,0.74,0.71,0.69,0.66,0.64,0.62,0.6,0.58,0.56,0.55,0.54,0.52,0.51,0.51,0.51,0.49,0.48,0.48,0.47,0.47,0.47]
        }, {
            type: "line",
            name: 'Pct. 95',
            marker: { enabled: false },
            data: [2.84,2.71,2.53,2.38,2.24,2.11,1.99,1.88,1.79,1.71,1.61,1.54,1.47,1.41,1.35,1.3,1.25,1.21,1.17,1.13,1.11,1.06,1.04,1.01,0.99,0.97,0.95,0.94,0.92,0.91,0.91]
        }, {
            type: "line",
                name: 'Arteria Promedio',
                dashStyle: "Dot",
                marker: { symbol: 'square' },
                lineWidth: 0,
            data: (function () {
                    // generate an array of random data
                    var data = [];
                    var edadGest = the("semanas").value;
                    for (i = 10; i < edadGest; i ++ ) {
                        data.push({
                            y: 0,
                        });
                    }
                    var aud = the("respuesta_uterina_promedio_prim").value;
                    aud = aud.toString();
                    aud = aud.replace(",", ".");
                    aud = parseFloat(aud);
                    
                    data.push({
                            y: aud,
                        });
                    for (i = (edadGest +1); i < 39; i ++ ) {
                        data.push({
                            y: 0,
                        });
                    }
                    return data;
                }())
            }]
    });
};