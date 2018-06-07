// BOARD ELEMENT
var board = {
	name: 'Kanban Board',
	addColumn: function(column) {
		this.element.appendChild(column.element);
		initSortable(column.id);
	},
	element: document.querySelector('#board .column-container')
};

document.querySelector('#board .create-column').addEventListener('click', function(){
	document.getElementById("overlay").style.display = "block";
	document.querySelector('#overlay .col-creating-container').style.display = 'block'
});

document.querySelector('#overlay .submit-col-name').addEventListener('click', function(){
	var inputEl = document.querySelector('.col-creating-container input')
	var name = inputEl.value
	var data = new FormData();

	data.append('name', name);

	fetch(baseUrl + '/column',{
		method: 'POST',
		headers: myHeaders,
		body: data,
	})

		.then(function(resp) {
			return resp.json();
		})
		.then(function(resp) {
			var column = new Column(resp.id, name);
			board.addColumn(column);
		});

	if (!name){
		alert('Wpisz nazwę!')
		return
	}
	document.getElementById("overlay").style.display = "none";
});


document.querySelector('.exit-button').addEventListener('click', function(){
	document.getElementById("overlay").style.display = "none";
	document.getElementByClass('.col-creating-container').style.display = 'none'
});


//SORTABLE
function initSortable(id) {
	var el = document.getElementById(id);
	var sortable = Sortable.create(el, {
		group: 'kanban',
		sort: true
	});
}