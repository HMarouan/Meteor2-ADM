//le template historique.js ou nous allons créer la logique du template pdv
Template.historique.helpers({
	//on attribue à la variable allListObjects la fonction qui récupère tous les documents de notre collection
	'HList': function(){				
		return HPdv.find({}).fetch();
	}
});
