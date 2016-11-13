(function(){
	"use.strict";
	var app = {

		init: function(){
			this.ajaxDonnees();
			$('form').on('submit',this.handleForm.bind(this));
		},

		ajaxDonnees: function(){
			$.ajax('/crm.json').done(this.afficheDonnees);
		},

		afficheDonnees: function(data){
			var donnees = data.customers.length;
			for(var i=0; i<donnees; i++){
				var obj = data.customers[i];
				for(prop in obj){
					var coordonnees= prop + " : " + obj[prop];
					$('#informations').append('<ul>' + coordonnees + '</ul>');
				}
			}
		},

		handleForm: function(event){
			event.preventDefault();
			var nom = $('#nom').val();
			var prenom = $('#prenom').val();
			var phone = $('#phone').val();
			var mail = $('#mail').val();
			var description = $('#description').val();
			this.submitForm({nom:nom, prenom:prenom, phone:phone, mail:mail, description:description});
		},

		submitForm: function(data){
			$.ajax({
				type:"POST",
				url:$("form").attr("action"),
				data: data,
				success : this.success
			})
		}, 

		success: function(){
			console.log('very good!');
		}	
	};

	$(document).ready(function(){

		 app.init();  
	});
}());