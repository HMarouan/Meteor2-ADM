//le template pdv.js ou nous allons créer la logique du template pdv
Template.pdv.helpers({
	//on attribue à la variable allListObjects la fonction qui récupère tous les documents de notre collection
	'allListObjects': function(){				
		return BdPdv.find({}).fetch();
	}
});

/*Template.pdv.helpers({
		'color' : function(){
		var green = 'green';
		var red = 'red';
		var yellow = 'yellow'
		if(resp.etat === 'vert'){
				return etat;
			} else if(etatc === 'rouge'){
				return red;
			} 	else 
				return yellow;
			}
		}); */
