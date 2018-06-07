function Card(id, name) {
	var self = this;
	const [n,d] = name.split(spliter)
	this.id = id;
	this.name = n || 'No name given';
	this.description = d;
	this.element = generateTemplate('card-template', { header: this.name, description: this.description }, 'li');

	this.element.querySelector('.card').addEventListener('click', function (event) {
		event.stopPropagation();

		if (event.target.classList.contains('fa-trash-alt')) {
			self.removeCard();
		}
	});
		
}
Card.prototype = {
	removeCard: function() {
		var self = this;

		fetch(baseUrl + '/card/' + self.id, { method: 'DELETE', headers: myHeaders })
			.then(function(resp) {
				return resp.json();
			})
			.then(function(resp) {
				self.element.parentNode.removeChild(self.element);
			})
	}
}