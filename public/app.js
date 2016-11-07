(function(){
	"use.strict";
	var app = {
		init: function(){

			this.recupDonnees();
		},
		
		recupDonnees: function(){
			$.ajax('/crm.json')
			.done(this.success)
			.fail(this.echec);
		},

		success: function(data){
			console.log(data.customers[0].id);
			var donnees = data.customers.length;
			for(var i=0; i<donnees; i++){
				var obj = data.customers[i];
				for(prop in obj){
					var coordonnees= prop + " : " + obj[prop];
					$('#informations').append('<ul><li>' + coordonnees + '</li></ul>');

				}
			}
		},



	};
	$(document).ready(function(){

		app.init();  
	});
}());