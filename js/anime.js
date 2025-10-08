let key = prompt("Déposer votre clé d'API ici pour faire des recherches");

function générez_résultat(){
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
let critereChoisie

/* fonction */
function selectionnerCritere(){
    

    switch(choix.value){
        case "ID":
            return "id";
        case "Nom de l'anime":
            return "nom";
        case "Genre":
            return "genre";
        case "Rang":
            return "rang";
        default:
            return null;
    }

}

/* fonction */

choix.addEventListener("change", ()=>{
    critereChoisie =selectionnerCritere();
     
})



/* code pour effacer la recherche */

effacer.addEventListener('click', ()=>{
    location.reload();
})

/* fetch API */

const choice = '';
switch(untruc) {
    case 'Genre':
        choice = 'genre';
    case 'ID':
        choice = 'anime/by-id/';
    case 'Nom':
        choice = 'search=';
    case 'Rank':
        choice = 'anime/by-ranking/'
}

const data = fetch('https://anime-db.p.rapidapi.com/anime?page=1&size=10&' + choice)
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
    });
