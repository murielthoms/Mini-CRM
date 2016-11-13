var express = require('express');
var bodyParser = require('body-parser');
var fs = require('fs');

var app = express();

app.use(express.static(__dirname + '/public'));
app.use(bodyParser());


app.post('/users', function(req, res){
	
// fs = interagir dossier système; 
// 1 argument:nom du dossier 2eme argument:callback;
// le callback prend 2 fonctions: err,data.
fs.readFileSync('public/crm.json', 'utf8',function(err,data){
	if (err){
		return console.log('fichier non trouvé');
	}
		// je transforme chaine de caractère en objet;
		var body = req.body;
		console.log(body);

		// contient le nombre d'éléments de l'objet;
		body.id = body.customers.length+1;
		// ajout des nouveaux éléments dans l'objet
		data.customers.push(body);
		// je retransforme l'objet en chaine de caractère
		var jsonObj = JSON.stringify(data);

		// ecrire  fichier modifié (nomDuFichier, contenu, erreur)
		fs.writeFile('public/crm.json',jsonObj,'utf8', function(err){
			if(err){
				return	console.log(err);

			}

		})
	});
res.json('envoi réussi!')

});
app.listen(2345, function(){
	console.log(' ça fonctionne...ou pas!');

});
