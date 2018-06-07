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
	
	var data = new FormData();
	data.append('name', name + spliter + desc);
	data.append('bootcamp_kanban_column_id', columnContext.id);

	fetch(baseUrl + '/card',{
		method: 'POST',
		headers: myHeaders,
		body: data,
	})
		.then(function(res){
			return res.json();
		})
		.then(function(resp){
			if(resp.error){
				throw resp;
			}
			var card = new Card(resp.id, name + spliter + desc);
    		columnContext.addCard(card);
		})
		.catch(function(err){
			console.log(err)
		})
	document.getElementById("overlay").style.display = "none";
	document.querySelector('#overlay .card-creating-container').style.display = 'none'
});

function Column(id, name) {
	var self = this;

	this.id = id;
	this.name = name;
	this.element = generateTemplate('column-template', { name: this.name, id: this.id });

	//PODPINANIE ZDARZEŃ


	this.element.querySelector('.column').addEventListener('click', function (event) {
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
		var self = this;
  		fetch(baseUrl + '/column/' + self.id, { method: 'DELETE', headers: myHeaders })
    		.then(function(resp) {
      			return resp.json();
    		})
    		.then(function(resp) {
      			self.element.parentNode.removeChild(self.element);
    		});
	}
};

document.querySelector('.exit-button2').addEventListener('click', function(){
	document.getElementById("overlay").style.display = "none";
	document.querySelector('.card-creating-container').style.display = 'none'
});