let key = '';

while(key == '') {
    key = prompt("Déposer votre clé d'API ici pour faire des recherches");
}

function générez_résultat(nb_res){
    let div_card = document.getElementById("card-div")
    while(div_card.hasChildNodes()){
        div_card.removeChild(div_card.firstChild)
    }

    if ("content" in document.createElement("template")) {
        let template=document.getElementById("template_anime_card")
        let div_card=document.getElementById("card-div")
        for(let i = 0; i<nb_res; i++){
            let clone = document.importNode(template.content, true);
            div_card.appendChild(clone);
            let synopsis=document.getElementById("synopsis")
            synopsis.textContent="syn"+i
            synopsis.id=synopsis.id+"_"+i
            let anime_title=document.getElementById("anime_title");
            anime_title.textContent="title"+i
            anime_title.id=anime_title.id+"_"+i
            let alias=document.getElementById("alias");
            alias.textContent="alias"+i
            alias.id=alias.id+"_"+i
            let image_anime=document.getElementById("image_anime");
            image_anime.id=image_anime.id+"_"+i;
            let catégories=document.getElementById("catégories");
            catégories.id=catégories.id+"_"+i
            let classement=document.getElementById("classement");
            classement.id=classement.id+"_"+i;
            let nb_episodes=document.getElementById("nb_episodes");
            nb_episodes.id=nb_episodes.id+"_"+i;
        }   
    }
}

let envoyer = document.getElementById('envoyer')
let effacer = document.getElementById('effacer')
let rechercher = document.getElementById('rechercher')
let mode = document.getElementById('changement_mode')
let estModeSombre = false;
let titre = document.getElementById("titre")
let arriere_plan = document.body

let choix = document.getElementById('choix')

let critereChoisie

let nb_res = 0;

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

function changerCouleurSombre(){
   
    
    document.documentElement.style.colorScheme = 'dark'
}

function changerCouleurClaire(){
   
    document.documentElement.style.colorScheme = 'light'
}
/* fonction */



function isDarkMode (){

	globalThis.matchMedia?.("(prefers-color-scheme:dark)").matches ?? false;
}
// Usage
 estModeSombre =isDarkMode();





choix.addEventListener("change", ()=>{
    critereChoisie =selectionnerCritere();
     
})

mode.addEventListener('click', ()=>{
   


    if(estModeSombre == false){
        mode.setAttribute("value", "mode clair")
        estModeSombre = true
        sessionStorage.setItem("autosave",estModeSombre)
        changerCouleurSombre()
    }
    else{
        mode.setAttribute("value", "mode sombre")
        estModeSombre = false
        sessionStorage.setItem("autosave",estModeSombre)
        changerCouleurClaire()
    }
})



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
        case 'Nom de l\'anime':
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
        jsonStep(data);
    })
    .catch(error => {
        console.error('Il y a un problème avec l opération fetch', error);
        alert("Une erreure est survenue, vérifier la clé !");
        key = prompt("Déposer votre clé d'API ici pour faire des recherches");
    });
}

envoyer.addEventListener('click', () => {
    search();
});

function jsonStep(data) {
    let i = 0;
    
    if(choix.value == "ID" || choix.value == "Rang") {
        nb_res=1
        générez_résultat(1);
        document.getElementById("anime_title_" + i).textContent = data.title;
        document.getElementById("alias_" + i).textContent = data.alternativeTitles;
        document.getElementById("synopsis_" + i).textContent = data.synopsis;
        document.getElementById("image_anime_" + i).src = data.image;
        document.getElementById("catégories_" + i).textContent = data.genres;
        document.getElementById("classement_" + i).textContent = data.ranking;
        document.getElementById("nb_episodes_" + i).textContent = data.episodes;
    } else {
        nb_res=data.data.length
        générez_résultat(data.data.length);
        data.data.forEach(element => {
            document.getElementById("anime_title_" + i).textContent = element.title;
            document.getElementById("alias_" + i).textContent = element.alternativeTitles;
            document.getElementById("synopsis_" + i).textContent = element.synopsis;
            document.getElementById("image_anime_" + i).src = element.image;
            document.getElementById("catégories_" + i).textContent = element.genres;
            document.getElementById("classement_" + i).textContent = element.ranking;
            document.getElementById("nb_episodes_" + i).textContent = element.episodes;
            i++;
        });
    }
}