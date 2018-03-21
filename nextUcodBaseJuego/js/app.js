//funcion que permite destellos de color en el titulo
function parpadear(selector) {
	$(selector).animate({opacity: '1',}, {step: function () {$(this).css('color', 'white');},queue: true})
		.animate({opacity: '1'}, {step: function () {$(this).css('color', 'yellow');parpadear('h1.main-titulo');},queue: true})
		.animate({opacity: '1'}, {step: function () {$(this).css('color', 'white');	},queue: true})
		.animate({opacity: '1'}, {step: function () {$(this).css('color', 'yellow');},queue: true}, 600).delay(1000);}
// funcion de números al azar
function numeros_azar(minimo, maximo) {minimo = Math.ceil(minimo);maximo = Math.floor(maximo);return Math.floor(Math.random() * (maximo - minimo)) + minimo;}
// definicion de variables para filas  o columas
function obtener_arreglos(tipo, indice) {var columna1 = $('.col-1').children();	var columna2 = $('.col-2').children();var columna3 = $('.col-3').children();var columna4 = $('.col-4').children();var columna5 = $('.col-5').children();var columna6 = $('.col-6').children();var columna7 = $('.col-7').children();
	var cantidad_columnas = $([columna1, columna2, columna3, columna4,columna5, columna6, columna7	]);
	if (typeof indice === 'number') {var fila_mod = $([columna1.eq(indice), columna2.eq(indice), columna3.eq(indice),columna4.eq(indice), columna5.eq(indice), columna6.eq(indice),columna7.eq(indice)]);}
	else {indice = '';}
	if (tipo === 'columns') {return cantidad_columnas;} 
	else if (tipo === 'rows' && indice !== '') {return fila_mod;}}
// filas
function fila_modelos(indice) {
	var fila_mod = obtener_arreglos('rows', indice);return fila_mod;}
// colunmnas
function cantidad_columnas(indice) {var columna_modelos = obtener_arreglos('columns');return columna_modelos[indice];
}
//verificar si hay tres dulces del mismo tipo en línea
function verificacion() {
	for (var loco = 0; loco < 7; loco++) {var dulces_pantalla = 0;
		var pos = [];
		var extraCandyPosition = [];
		var columna_modelos = cantidad_columnas(loco);
		var comparisonValue = columna_modelos.eq(0);
		var gap = false;
		for (var i = 1; i < columna_modelos.length; i++) {
			var srcComparison = comparisonValue.attr('src');
			var srcCandy = columna_modelos.eq(i).attr('src');

			if (srcComparison != srcCandy) {
				if (pos.length >= 3) {
					gap = true;
				} else {
					pos = [];
				}
				dulces_pantalla = 0;
			} else {
				if (dulces_pantalla == 0) {
					if (!gap) {
						pos.push(i - 1);
					} else {
						extraCandyPosition.push(i - 1);
					}
				}
				if (!gap) {
					pos.push(i);
				} else {
					extraCandyPosition.push(i);
				}
				dulces_pantalla += 1;
			}
			comparisonValue = columna_modelos.eq(i);
		}
		if (extraCandyPosition.length > 2) {
			pos = $.merge(pos, extraCandyPosition);
		}
		if (pos.length <= 2) {
			pos = [];
		}
		candyCount = pos.length;
		if (candyCount >= 3) {
			deleteColumnCandy(pos, columna_modelos);
			setScore(candyCount);
		}
	}
}
function deleteColumnCandy(pos, columna_modelos) {
	for (var i = 0; i < pos.length; i++) {
		columna_modelos.eq(pos[i]).addClass('delete');
	}
}

// Valida si hay dulces que deben eliminarse en una fila
function rowValidation() {
	for (var perro = 0; perro < 6; perro++) {
		var dulces_pantalla = 0;
		var pos = [];
		var extraCandyPosition = [];
		var fila_mod = fila_modelos(perro);
		var comparisonValue = fila_mod[0];
		var gap = false;
		for (var i = 1; i < fila_mod.length; i++) {
			var srcComparison = comparisonValue.attr('src');
			var srcCandy = fila_mod[i].attr('src');

			if (srcComparison != srcCandy) {
				if (pos.length >= 3) {
					gap = true;
				} else {
					pos = [];
				}
				dulces_pantalla = 0;
			} else {
				if (dulces_pantalla == 0) {
					if (!gap) {
						pos.push(i - 1);
					} else {
						extraCandyPosition.push(i - 1);
					}
				}
				if (!gap) {
					pos.push(i);
				} else {
					extraCandyPosition.push(i);
				}
				dulces_pantalla += 1;
			}
			comparisonValue = fila_mod[i];
		}
		if (extraCandyPosition.length > 2) {
			pos = $.merge(pos, extraCandyPosition);
		}
		if (pos.length <= 2) {
			pos = [];
		}
		candyCount = pos.length;
		if (candyCount >= 3) {
			deleteHorizontal(pos, fila_mod);
			setScore(candyCount);
		}
	}
}
function deleteHorizontal(pos, fila_mod) {
	for (var i = 0; i < pos.length; i++) {
		fila_mod[pos[i]].addClass('delete');
	}
}

//contador de puntuacion muestra la puntuacion
function setScore(candyCount) {
	var score = Number($('#score-text').text());
	switch (candyCount) {
		case 3:
			score += 25;
			break;
		case 4:
			score += 50;
			break;
		case 5:
			score += 75;
			break;
		case 6:
			score += 100;
			break;
		case 7:
			score += 200;
	}
	$('#score-text').text(score);
}

//pone los elemento caramelo en el tablero
function checkBoard() {
	fillBoard();
}

function fillBoard() {
	var top = 6;
	var column = $('[class^="col-"]');

	column.each(function () {
		var candys = $(this).children().length;
		var agrega = top - candys;
		for (var i = 0; i < agrega; i++) {
			var candyType = numeros_azar(1, 5);
			if (i === 0 && candys < 1) {
				$(this).append('<img src="image/' + candyType + '.png" class="element"></img>');
			} else {
				$(this).find('img:eq(0)').before('<img src="image/' + candyType + '.png" class="element"></img>');
			}
		}
	});
	addCandyEvents();
	setValidations();
}

// Si hay dulces que borrar
function setValidations() {
	verificacion();
	rowValidation();
	// Si hay dulces que borrar
	if ($('img.delete').length !== 0) {
		deletesCandyAnimation();
	}
}


//punto 7. interacción del usuario con el elemento caramelo es drag and drop
//efecto de movimiento entre los caramelos
function addCandyEvents() {
	$('img').draggable({
		containment: '.panel-tablero',
		droppable: 'img',
		revert: true,
		revertDuration: 500,
		grid: [100, 100],
		zIndex: 10,
		drag: constrainCandyMovement
	});
	$('img').droppable({
		drop: swapCandy
	});
	enableCandyEvents();
}

function disableCandyEvents() {
	$('img').draggable('disable');
	$('img').droppable('disable');
}

function enableCandyEvents() {
	$('img').draggable('enable');
	$('img').droppable('enable');
}

//hace que el caramelo sea solido al moverse
function constrainCandyMovement(event, candyDrag) {
	candyDrag.position.top = Math.minimo(100, candyDrag.position.top);
	candyDrag.position.bottom = Math.minimo(100, candyDrag.position.bottom);
	candyDrag.position.left = Math.minimo(100, candyDrag.position.left);
	candyDrag.position.right = Math.minimo(100, candyDrag.position.right);
}

//reemplaza a los caramelos anteriores
function swapCandy(event, candyDrag) {
	var candyDrag = $(candyDrag.draggable);
	var dragSrc = candyDrag.attr('src');
	var candyDrop = $(this);
	var dropSrc = candyDrop.attr('src');
	candyDrag.attr('src', dropSrc);
	candyDrop.attr('src', dragSrc);

	setTimeout(function () {
		checkBoard();
		if ($('img.delete').length === 0) {
			candyDrag.attr('src', dragSrc);
			candyDrop.attr('src', dropSrc);
		} else {
			updateMoves();
		}
	}, 500);

}

function checkBoardPromise(result) {
	if (result) {
		checkBoard();
	}
}

//valida la puntuacion por cantidad de elementos en linea
function updateMoves() {
	var actualValue = Number($('#movimientos-text').text());
	var result = actualValue += 1;
	$('#movimientos-text').text(result);
}

//eliminacion automatica de los elementos
function deletesCandyAnimation() {
	disableCandyEvents();
	$('img.delete').effect('pulsate', 400);
	$('img.delete').animate({
			opacity: '0'
		}, {
			duration: 300
		})
		.animate({
			opacity: '0'
		}, {
			duration: 400,
			complete: function () {
				deletesCandy()
					.then(checkBoardPromise)
					.catch(showPromiseError);
			},
			queue: true
		});
}

//llenado automatico de los espacios con elementos 
function showPromiseError(error) {
	console.log(error);
}

function deletesCandy() {
	return new Promise(function (resolve, reject) {
		if ($('img.delete').remove()) {
			resolve(true);
		} else {
			reject('No se pudo eliminar Candy...');
		}
	})
}

//punto 4 y 6. temporizador y boton reiniciar
//cambia el aspecto de la página
//final del juego
function endGame() {
	$('div.panel-tablero, div.time').effect('fold');
	$('h1.main-titulo').addClass('title-over')
		.text('Gracias por jugar!');
	$('div.score, div.moves, div.panel-score').width('100%');
	
}

// inicia el juego
function initGame() {

	parpadear('h1.main-titulo');

	$('.btn-reinicio').click(function () {
		if ($(this).text() === 'Reiniciar') {
			location.reload(true);
		}
		checkBoard();
		$(this).text('Reiniciar');
		$('#timer').startTimer({
			onComplete: endGame
		})
	});
}

// Prepara el juego
$(function() {
	initGame();
	
});

