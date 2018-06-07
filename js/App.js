var spliter = '/$#@'

// MAIN FUNCTIONS


//GENERATE ID
function randomString(){ 
	var chars = '0123456789abcdefghiklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXTZ';
	var str = '', i;
	for (i = 0; i<10; i++){
		str += chars[Math.floor(Math.random() * chars.length)];
	}
	return str;
}

//GENERATE TEMPLATE

function generateTemplate(name, data, basicElement) { 
	var template = document.getElementById(name).innerHTML;
	var element = document.createElement(basicElement || 'div');

	Mustache.parse(template);
	element.innerHTML = Mustache.render(template, data);

	return element;
}


var baseUrl = 'https://kodilla.com/pl/bootcamp-api';
var myHeaders = {
	'X-Client-Id': '3257',
	'X-Auth-Token': '25a26292f61e4d7d2ebbe5ccaa9013b6'
};

fetch(baseUrl + '/board', { headers: myHeaders })
	.then(function(resp) {
		return resp.json();
	})
	.then(function(resp) {
		setupColumns(resp.columns);
	});

function setupColumns(columns) {
	columns.forEach(function(column){
		var col = new Column(column.id, column.name);
		board.addColumn(col)
		setupCards(col, column.cards);
	})
}

function setupCards(col, cards){
	cards.forEach(function (card){
		var card0bj = new Card(card.id, card.name);
		col.addCard(card0bj);
	})
}