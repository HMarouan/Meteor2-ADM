//route d'accueil on lui donne le chemin /accueil puis le template a afficher accueil
Router.route('/pdv',function(){
	this.render('pdv');
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
			var filename = this.params.filename;  				
			resp = {'id_oracle': this.request.body.id_oracle,
					'libelle' : this.request.body.libelle,
					'montant' : this.request.body.montant,
					'nbt': this.request.body.nbt,
					'region': this.request.body.region,
					'etat': this.request.body.etat};
				//affichage du document récupérer dans la console.
			console.log(resp);
			this.response.writeHead(200,{'Content-Type': 'application/json; charset=utf-8'});
			this.response.end(JSON.stringify(resp));
			//inserstion des données récupérés dans la base de données 
			BdPdv.insert(resp);
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
			console.log(mydoc._id);
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
			etatc = resp.etat;
				//Trouver le document dans mongo qui a le même id_oracle
			var mydoc = BdPdv.findOne({id_oracle:resp.id_oracle});	
			console.log(mydoc._id);
				//Modification du docuement (montant et transaction)
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