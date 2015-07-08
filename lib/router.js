//route d'accueil on lui donne le chemin /accueil puis le template a afficher accueil
Router.route('/pdv',function(){
	this.render('pdv');
});
//route pour afficher l'historique on lui donne le chemin /historique puis le template a afficher 
Router.route('/historique',function(){
	this.render('historique');
});

//route pour tester l'affichage par region
Router.route('/test',function(){
	this.render('test');
});


 /*
	//route par défaut à la racine / qui correspond à la page main.html
 Router.route('/',function(){ 
	this.render('Home');
}); */ 
//****************************AJOUT**************************
//route d'ajout
Router.map(function(){
	this.route('add',{			//choisi la route
		path:'/add',			//on définit le chemin de la route
		where:'server',
//fonction anonyme pour parser le body de la requete http post et récuperer les documents envoyés depuis Oracle
		action: function(){
			//console.log(request.body);		
			//var body = JSON.parse(this.request.body);
			var filename = this.params.filename;
			//console.log(filename); 
		    resp = {'id_oracle': this.request.body.id_oracle,
					'libelle' : this.request.body.libelle,
					'montant' : this.request.body.montant,
					'nbt': this.request.body.nbt,
					'region': this.request.body.region,
					'etat': this.request.body.etat}; 
					resp.montant = 0;
					resp.nbt = 0;
				//affichage du document récupérer dans la console.
			//console.log(body);	
			//console.log(resp);
			this.response.writeHead(200,{'Content-Type': 'application/json; charset=utf-8'});
			this.response.end(JSON.stringify(resp));
			//inserstion des données récupérés dans la base de données 
			BdPdv.insert(resp);
			//variable temp pour stocker l'historique et ajouter la date
			histo = {'id_oracle': this.request.body.id_oracle,
					'libelle' : this.request.body.libelle,
					'montant' : this.request.body.montant,
					'nbt': this.request.body.nbt,
					'region': this.request.body.region,
					'etat': this.request.body.etat,
					'Date':moment().format() }; 
					histo.montant = 0;
					histo.nbt = 0;
			//inserer les données dans la base de données historique
			HPdv.insert(histo);
			region = BdPdv.distinct("region");
			console.log(region);

		}
	});
});
// **************************UPDATE du montant et nombre de transactions************************
	//route d'update
Router.map(function(){
	this.route('update',{			//choisir la route
		path:'/update',			//on définit le chemin de la route / on envoi l'identifiant oracle dans la requete du body
		where:'server',
//fonction anonyme pour parser le body de la requete http post et récuperer les documents envoyés depuis Oracle
		action: function(){
			// on récupere l'id_oracle le montant et le nombre de transaction depuis le body dans la variable resp
			var filename = this.params.filename;  				
			resp = {'id_oracle' : this.request.body.id_oracle,
					'montant' : this.request.body.montant,
					'nbt': this.request.body.nbt};
				//Trouver le document dans mongo qui a le même id_oracle
			var mydoc = BdPdv.findOne({id_oracle:resp.id_oracle});
				//variable temp ou on ajoute l'ancien enregistrement + la date de modification
			var histo = {'id_oracle':mydoc.id_oracle,
						 'libelle':mydoc.libelle,
						 'montant':resp.montant,
						 'nbt':resp.nbt,
						 'region':mydoc.region,
						 'etat':mydoc.etat,
						 'Date':moment().format()

			};
				//insertion de l'ancien document dans la base de données historique
					HPdv.insert(histo);
				//Modification du docuement (montant et transaction)
			BdPdv.update(mydoc._id, {$set:{montant:resp.montant, nbt:resp.nbt}});
				//affichage du document récupérer dans la console.
			console.log('Document Updated');

			
			this.response.writeHead(200,{'Content-Type': 'application/json; charset=utf-8'});
			this.response.end(JSON.stringify(resp));		
		}
	});
});
// *************************UPDATE de l 'etat de connexion avec le serveur***************************
	//route d'update
Router.map(function(){
	this.route('etat',{			//choisir la route
		path:'/etat',			//on définit le chemin de la route / on envoi l'identifiant oracle dans la requete du body
		where:'server',
//fonction anonyme pour parser le body de la requete http post et récuperer les documents envoyés depuis Oracle
		action: function(){
			// on récupere l'id_oracle le montant et le nombre de transaction depuis le body dans la variable resp
			var filename = this.params.filename;  				
			resp = {'id_oracle' : this.request.body.id_oracle,
					'etat' : this.request.body.etat};
				//Trouver le document dans mongo qui a le même id_oracle
			var mydoc = BdPdv.findOne({id_oracle:resp.id_oracle});
			var histo = {'id_oracle':mydoc.id_oracle,
						 'libelle':mydoc.libelle,
						 'montant':mydoc.montant,
						 'nbt':mydoc.nbt,
						 'region':mydoc.region,
						 'etat':resp.etat,
						 'Date':moment().format()
						}
			console.log(mydoc._id);
				//Modification du docuement (montant et transaction)
			HPdv.insert(histo);
			BdPdv.update(mydoc._id, {$set:{etat:resp.etat}});
				//affichage du document récupérer dans la console.
			console.log('Etat Updated');
			this.response.writeHead(200,{'Content-Type': 'application/json; charset=utf-8'});
			this.response.end(JSON.stringify(resp));		
		}
	});
});
// *******************************Delete du document****************************
	//route de delete
Router.map(function(){
	this.route('delete',{			//choisir la route
		path:'/delete',			//on définit le chemin de la route / on envoi l'identifiant oracle dans la requete du body
		where:'server',
//fonction anonyme pour parser le body de la requete http post et récuperer les documents envoyés depuis Oracle
		action: function(){
			// on récupere l'id_oracle le montant et le nombre de transaction depuis le body dans la variable resp
			var filename = this.params.filename;  				
			resp = {'id_oracle' : this.request.body.id_oracle};
				//Trouver le document dans mongo qui a le même id_oracle
			var mydoc = BdPdv.findOne({id_oracle:resp.id_oracle});	
			console.log(mydoc._id);
				//Modification du docuement (montant et transaction)
			BdPdv.remove(mydoc._id);
				//affichage du document récupérer dans la console.
			console.log('Document deleted');
			
			this.response.writeHead(200,{'Content-Type': 'application/json; charset=utf-8'});
			this.response.end(JSON.stringify(resp));		
		}
	});
});