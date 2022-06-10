<h1>Créez un réseau social d'entreprise</h1>

------------------

<h2>Informations générales</h2> 

Projet 7 OPENCLASSROOMS - Formation Développeur Web

But : construire le front-end et back-end du réseau social interne de l'entreprise Groupomania, permettant de faciliter les intéractions entre collègues, grâce notamment à l'échange d'images/gifs/textes.

Périmètre :
- la présentation des fonctionnalités doit être simple
- la création d’un compte doit être simple et possible depuis un téléphone mobile
- le profil doit contenir très peu d’informations pour que sa complétion soit rapide
- la suppression du compte doit être possible
- l’accès à un forum où les salariés publient des contenus multimédias doit être présent
- l’accès à un forum où les salariés publient des textes doit être présent
- les utilisateurs doivent pouvoir facilement repérer les dernières participations des employés
- le ou la chargé-e de communication Groupomania doit pouvoir modérer les interactions entre salariés


------------------

<h2>Compétences développées</h2>

- Authentifier un utilisateur et maintenir sa session
- Personnaliser le contenu envoyé à un client web
- Gérer un stockage de données à l'aide de SQL
- Implémenter un stockage de données sécurisé en utilisant SQL


------------------

<h2>Technologies</h2>

- Javascript
- Node.js
- Vue.js
- BootstrapVue
- MySQL

------------------

<h2>Site live</h2>

A venir

------------------

<h2>Site en local</h2>

Front : A faire dans le dossier /front

npm install
- Pour lancer l'application : npm run serve
- Pour couper l'application : Ctrl + C

---

Back : A faire dans le dossier /back

- Installation MySQL et création d'une BDD.
- Création dossier /images
- npm install
- Création d'un fichier .env avec comme modele le fichier .env_sample
- Pour la migration des tables vers la BDD locale : npx sequelize-cli db:migrate
- Pour la migration de certaines informations dans la BDD: npx sequelize-cli db:seed:all
- Les informations migrées sont: 
 utilisateur admin // mail:admin@groupomania.com password:AdministratoR2022\*
- Pour lancer le serveur : node server
- Pour couper le serveur : Ctrl + C
