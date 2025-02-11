/*
	2C = Two of Clubs (Treboles)
	2D = Two of Diamons (Diamantes)
	2H = Two of Hearts (Corazones)
	2S = Two of Spades (Espadas)
*/
const miJuego = (() => {
	'use strict'
	let baraja = [];
	const tipos = ['C','D','H','S']
	const especiales = ['A','J','Q','K']
	let puntosJugador = 0,
		puntosComputadora = 0;

	//apuntar al HTML
	const btnNuevo = document.querySelector('#btnNuevo');
	const btnPedir = document.querySelector('#btnPedir');
	const btnDetener = document.querySelector('#btnDetener');
	const puntosHTML = document.querySelectorAll('small');
	const divCartasJugador = document.querySelector('#jugador-cartas');
	const divCartasComputadora = document.querySelector('#computadora-cartas');

	//funcion para crear una baraja
	const crearBaraja = () => {
		for(let i=2 ; i<=10; i++){
			for( let tipo of tipos){
				baraja.push(i + tipo)
			}
		}

		for(let tipo of tipos){
			for(let esp of especiales){
				baraja.push(esp + tipo)
			}
		}
		//console.log(baraja);
		baraja = _.shuffle(baraja);
		console.log(baraja);

		return baraja;
	};

	crearBaraja();

	//funcion para tomar una carta
	const pedirCarta = () => {
		
		if(baraja.length === 0){
			throw 'No hay mas cartas en la baraja'
		}

		const carta = baraja.pop()
		console.log(baraja);
		console.log(carta);
		return carta
	}

	//pedirCarta()

	//funcion valor de una carta
	const valorCarta = (carta) => {
		const valor = carta.substring(0, carta.length-1);
		return (isNaN(valor)) ? (valor === 'A') ? 11 : 10
				: valor * 1
		/*let puntos = 0;

		 if(isNaN(valor)){
		 	puntos = (valor === 'A') ? 11 : 10;
		 }
		 else{
		 	
		 	puntos = valor * 1;
		 	console.log("Es un numero")
		 }

		 console.log('Valor: '+ puntos);

		 return puntos;*/
	}

	//const valor = valorCarta(pedirCarta());
	//console.log(valor);

	const turnoComputadora = (puntosMinimos) => {
		do{
			const carta = pedirCarta();
			puntosComputadora += valorCarta(carta);

			puntosHTML[1].innerText = puntosComputadora;

			const imgCarta = document.createElement('img');
			imgCarta.src = `assets/cartas/${carta}.png`;
			imgCarta.classList.add('carta');

			divCartasComputadora.append(imgCarta);

			if(puntosMinimos>21){
				break;
			}
		}while(puntosComputadora<puntosMinimos && (puntosComputadora<=21 ))

		let mensaje = (puntosComputadora === puntosMinimos) ? 'Niguno gano :)' 
					: (puntosComputadora > 21) ? 'Jugador GANA!!'
					: (puntosJugador > 21 || puntosComputadora > puntosMinimos) ? 'Computadora GANA!!' : ''

		setTimeout(() => alert(mensaje), 500)
	}

	//eventos
	btnPedir.addEventListener('click', () => {
		const carta = pedirCarta();
		puntosJugador += valorCarta(carta);

		puntosHTML[0].innerText = puntosJugador;

		const imgCarta = document.createElement('img');
		imgCarta.src = `assets/cartas/${carta}.png`;
		imgCarta.classList.add('carta');

		divCartasJugador.append(imgCarta);

		if(puntosJugador>21){
			console.warn("Lo siento mucho pero perdiste!!");
			btnPedir.disabled = true;
			btnDetener.disabled = true
			turnoComputadora(puntosJugador);
		}else if(puntosJugador === 21){
			console.warn("21!!!Ganaste!!!");
			btnPedir.disabled = true;
			btnDetener.disabled = true;
			turnoComputadora(puntosJugador);
		}

	})

	btnDetener.addEventListener('click', ()=>{
			btnPedir.disabled = true;
			btnDetener.disabled = true;
			turnoComputadora(puntosJugador);
	});

	btnNuevo.addEventListener('click', () => {
		console.clear();
		baraja = [];
		crearBaraja();

		btnPedir.disabled = false;
		btnDetener.disabled = false;

		puntosJugador = 0;
		puntosComputadora = 0;

		puntosHTML[0].innerText = puntosJugador;
		puntosHTML[1].innerText = puntosComputadora;

		divCartasJugador.innerHTML ='';
		divCartasComputadora.innerHTML ='';

	})
})();