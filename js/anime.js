let key = '';

while(key == '') {
    key = prompt("Déposer votre clé d'API ici pour faire des recherches");
}

function générez_résultat(nb_res){
    if ("content" in document.createElement("template")) {
        let template=document.getElementById("template_anime_card")
        let all=document.getElementById("all")
        for(let i = 0; i<nb_res; i++){
            let clone = document.importNode(template.content, true);
            all.appendChild(clone);
            let synopsis=document.getElementById("synopsis")
            synopsis.textContent="syn"+i
            synopsis.id=synopsis.id+"_"+i
            let anime_title=document.getElementById("anime_title");
            anime_title.textContent="title"+i
            anime_title.id=anime_title.id+"_"+i
            let image_anime=document.getElementById("image_anime");
            image_anime.id=image_anime.id+"_"+i;
            let catégories=document.getElementById("catégories");
            catégories.id=catégories.id+"_"+i
            let classement=document.getElementById("classement");
            classement.id=classement.id+"_"+i;
            let nb_episodes=document.getElementById("nb_episodes");
            classement.id=classement.id+"_"+i;
        }   
    }
}
générez_résultat(10)

let envoyer = document.getElementById('envoyer')
let effacer = document.getElementById('effacer')
let rechercher = document.getElementById('rechercher')

let choix = document.getElementById('choix')

/* code pour effacer la recherche */

effacer.addEventListener('click', ()=>{
    location.reload();
})

/* fetch API */
function getChoice() {
    let choice = '';
    switch(choix.value) {
        case 'Genre':
            choice = 'anime?page=1&size=10&genre=';
            return choice;
        case 'ID':
            choice = 'anime/by-id/';
            return choice;
        case 'Nom':
            choice = 'anime?page=1&size=10&search=';
            return choice;
        case 'Rang':
            choice = 'anime/by-ranking/'
            return choice;
        default:
            return null;
    }
}

function getSearchElement() {
    return rechercher.value;
}

function search() {
    const data = fetch('https://anime-db.p.rapidapi.com/' + getChoice() + getSearchElement(), {
        headers: {
            'x-rapidapi-key': key
        }
    })
    .then(response => {
        if(!response.ok) {
            throw new Error('La Response du réseau n est pas ok');
        }
        return response.json();
    })
    .then(data => {
        console.log(data);
    })
    .catch(error => {
        console.error('Il y a un problème avec l opération fetch', error);
        alert("Une erreure est survenue, vérifier la clé !");
        key = prompt("Déposer votre clé d'API ici pour faire des recherches");
    });
}

envoyer.addEventListener('click', () => {
    search();
})