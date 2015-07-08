//si la base de données pdv est vide on insére ces données 	
	if (BdPdv.find().count() === 0) {
  BdPdv.insert({
   	id_oracle: '1',
   	libelle: 'Rabat',
   	montant: '0',
   	nbt: '0',
   	region: 'Rabat',
   	etat: 'green'

  });

  BdPdv.insert({
    id_oracle: '2',
   	libelle: 'Casa',
   	montant: '0',
   	nbt: '0',
   	region: 'Casa',
   	etat: 'green'
  });

  BdPdv.insert({
    id_oracle: '3',
   	libelle: 'Laayoune',
   	montant: '0',
   	nbt: '0',
   	region: 'Sahara',
   	etat: 'green'
  });
}

//si la base de données historique est vide on insére ces données
if (HPdv.find().count() === 0) {
  HPdv.insert({
    id_oracle: '1',
    libelle: 'Rabat',
    montant: '0',
    nbt: '0',
    region: 'Rabat',
    etat: 'green',
    date: moment().format()

  });

  HPdv.insert({
    id_oracle: '2',
    libelle: 'Casa',
    montant: '0',
    nbt: '0',
    region: 'Casa',
    etat: 'green',
    date: moment().format()
  });

  HPdv.insert({
    id_oracle: '3',
    libelle: 'Laayoune',
    montant: '0',
    nbt: '0',
    region: 'Sahara',
    etat: 'green',
    date: moment().format()
  });
}