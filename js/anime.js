let key = prompt("Déposer votre clé d'API ici pour faire des recherches");
let search = document.getElementById('search');
let getSearch = search.getAttribute('recherche');

const data = null;

const xhr = new XMLHttpRequest();
xhr.withCredentials = true;

xhr.addEventListener('readystatechange', function () {
	if (this.readyState === this.DONE) {
		console.log(this.responseText);
	}
});

xhr.setRequestHeader('x-rapidapi-key', key);
xhr.setRequestHeader('x-rapidapi-host', 'anime-db.p.rapidapi.com');

function searchAnime() {
}

//Obtenir tout
function getAll() {
    xhr.open('GET', 'https://anime-db.p.rapidapi.com/anime?page=1&size=10&search=Fullmetal&genres=Fantasy%2CDrama&sortBy=ranking&sortOrder=asc');
}

//Obtenir les genres
function getGenre() {
    xhr.open('GET', 'https://anime-db.p.rapidapi.com/genre');
}

//Obtenir un anime en le classant
function getAnimeClassement() {
    xhr.open('GET', 'https://anime-db.p.rapidapi.com/anime/by-ranking/1');
}

//Obtenir par identifiant
function getID() {
    xhr.open('GET', 'https://anime-db.p.rapidapi.com/anime/by-id/1');
}

xhr.send(data);