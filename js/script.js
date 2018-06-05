document.addEventListener('DOMContentLoaded', function(){
	
	// GENEROWANIE ID

	function randomString(){ 
		var chars = '0123456789abcdefghiklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXTZ';
		var str = '';
		for (var i = 0; i<10; i++){
			str += chars[Math.floor(Math.random() * chars.length)];
		}
		return str;
	}

	// GENEROWANIE TEMPLATEK

	function generateTemplate(name, data, basicElement) { 
		var template = document.getElementById(name).innerHTML;
		var element = document.createElement(basicElement || 'div');

		Mustache.parse(template);
		element.innerHTML = Mustache.render(template, data);

		return element;
	}

	// PODSTAWOWE KLASY I OBIEKT TABLICY

	var columnContext;

	document.querySelector('#submitNewCard').addEventListener('click', function(){
		var nameCardInput = document.querySelector('.card-creating-container input')
		var descCardInput = document.querySelector('.card-creating-container textarea')
		var name = nameCardInput.value
		var desc = descCardInput.value
		if (!name){
			alert('Wpisz nazwę!')
			return
		}
		var card = new Card(name, desc)
		columnContext.addCard(card);
		document.getElementById("overlay").style.display = "none";
		document.querySelector('#overlay .card-creating-container').style.display = 'none'
	});

	function Column(name) {
		var self = this;

		this.id = randomString();
		this.name = name;
		this.element = generateTemplate('column-template', { name: this.name, id: this.id });

		//PODPINANIE ZDARZEŃ


		this.element.querySelector('.column').addEventListener('click', function (event) {
			console.log(event.target)
			if (event.target.classList.contains('fa-trash-alt')) {
			  self.removeColumn();
			}

			if (event.target.classList.contains('add-card')) {
				columnContext = self;
				document.getElementById("overlay").style.display = "block";
				document.querySelector('#overlay .card-creating-container').style.display = 'block'
			}

		});	
		
	}

	Column.prototype = {
		addCard: function(card) {
		    this.element.querySelector('ul').appendChild(card.element);
		},
		removeColumn: function() {
			this.element.parentNode.removeChild(this.element);
		}
	};

	function Card(header, description) {
		var self = this;

		this.id = randomString();
		this.header = header;
		this.description = description;
		this.element = generateTemplate('card-template', { header: this.header, description: this.description }, 'li');

		this.element.querySelector('.card').addEventListener('click', function (event) {
			event.stopPropagation();

			if (event.target.classList.contains('fa-trash-alt')) {
				self.removeCard();
			}
		});
		
	}
	Card.prototype = {
			removeCard: function() {
				this.element.parentNode.removeChild(this.element);
		    }
		}
	// OBIEKT TABLICY

	var board = {
		name: 'Kanban Board',
		addColumn: function(column) {
			this.element.appendChild(column.element);
			initSortable(column.id);
		},
		element: document.querySelector('#board .column-container')
	};
	function initSortable(id) {
		var el = document.getElementById(id);
		var sortable = Sortable.create(el, {
			group: 'kanban',
			sort: true
		});
	}

	document.querySelector('#board .create-column').addEventListener('click', function(){
		document.getElementById("overlay").style.display = "block";
		document.querySelector('#overlay .col-creating-container').style.display = 'block'
	});


	document.querySelector('#overlay .submit-col-name').addEventListener('click', function(){
		var inputEl = document.querySelector('.col-creating-container input')
		var name = inputEl.value
		if (!name){
			alert('Wpisz nazwę!')
			return
		}
		var column = new Column(name)
		board.addColumn(column);
		document.getElementById("overlay").style.display = "none";
	});
	document.querySelector('.exit-button').addEventListener('click', function(){
		document.getElementById("overlay").style.display = "none";
		document.getElementByClass('.col-creating-container').style.display = 'none'
	});
	document.querySelector('.exit-button2').addEventListener('click', function(){
		document.getElementById("overlay").style.display = "none";
		document.querySelector('.card-creating-container').style.display = 'none'
	});


	// CREATING COLUMNS
	var todoColumn = new Column('To do');
	var doingColumn = new Column('Doing');
	var doneColumn = new Column('Done');

	// ADDING COLUMNS TO THE BOARD
	board.addColumn(todoColumn);
	board.addColumn(doingColumn);
	board.addColumn(doneColumn);

	// CREATING CARDS
	var card1 = new Card('New task', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam vitae velit cursus, elementum quam id, fringilla nibh. Integer ex nulla, scelerisque ac eros consectetur, dapibus viverra nisl. Sed velit tortor, malesuada non sodales sit amet, tempor eu lorem.');
	var card2 = new Card('Latest task', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam vitae velit cursus, elementum quam id, fringilla nibh. Integer ex nulla, scelerisque ac eros consectetur, dapibus viverra nisl. Sed velit tortor, malesuada non sodales sit amet, tempor eu lorem.');

	// ADDING CARDS TO COLUMNS
	todoColumn.addCard(card1);
	doingColumn.addCard(card2);

});

