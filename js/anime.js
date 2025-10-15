let key = '';

let apiKey = document.getElementById('api-key');
if (sessionStorage.getItem("autosave")) {
    apiKey.value = sessionStorage.getItem("autosave");
}

apiKey.addEventListener("change", () => {
    sessionStorage.setItem("autosave", apiKey.value);
});

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
            synopsis.textContent="Syn"+i
            synopsis.id=synopsis.id+"_"+i  
            let anime_title=document.getElementById("anime_title");
            anime_title.textContent="Title"+i
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
            let classement_label=document.getElementById("classement_label");
            classement_label.id=classement_label.id+"_"+i;
            let nb_episodes_label=document.getElementById("nb_episodes_label");
            nb_episodes_label.id=nb_episodes_label.id+"_"+i;
        }   
    }
}

let envoyer = document.getElementById('envoyer')
let effacer = document.getElementById('effacer')
let rechercher = document.getElementById('rechercher')
let rechercher_genre = document.getElementById('rechercher-genre')
let genre_div = document.getElementById('genre-div')
let mode = document.getElementById('changement_mode')
let estModeSombre = false;
let titre = document.getElementById("titre")
let arriere_plan = document.body
let choix = document.getElementById('choix')
let critereChoisie
let nb_res = 0;
let genre_list=document.getElementById('genre-list')

choix.value=""
rechercher_genre.value=""
rechercher.value=""


/* gestion du choix du genre */
rechercher_genre.style.display='none'
genre_list.style.display='none'




document.addEventListener('click', (e) => {
  if (genre_div.contains(e.target)) {
    genre_list.style.display = 'inline';
  } else {
    genre_list.style.display = 'none';
  }
});




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

function isDarkMode (){
	return globalThis.matchMedia?.("(prefers-color-scheme:dark)").matches ?? false;
}
// Usage
estModeSombre =isDarkMode();

choix.addEventListener("change", ()=>{
    critereChoisie =selectionnerCritere();
    if(critereChoisie!='genre'){
        rechercher_genre.style.display='none'
        rechercher.style.display='inline-flex'
    } else {
        rechercher_genre.style.display='inline-flex'
        rechercher.style.display='none'

    }
})

mode.addEventListener('click', ()=>{
    if(estModeSombre == false){
        mode.setAttribute("value", "◐")
        estModeSombre = true
        sessionStorage.setItem("autosave",estModeSombre)
        changerCouleurSombre()
    }
    else{
        mode.setAttribute("value", "◐")
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
            choice = 'anime?page=1&size=10&genres=';
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
    if(choix.value=='Genre'){
        return getGenres()
    } else {
        return rechercher.value;
    }
}

function search() {
    key=document.getElementById("api-key").value
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
        alert("Une erreure est survenue, vérifier la clé ! Ou alors l'ID ou le Rang ne convient pas !");
    });
}

const form = document.getElementById("form")

form.addEventListener('submit', (event) => {
    event.preventDefault();
    search();
});

rechercher_genre.addEventListener('input', (event) =>{
    for (let genre_check of genre_list.children) {
        const checkbox_genre = genre_check.querySelector('input[type="checkbox"]');
        if(checkbox_genre.value.toLowerCase().includes(rechercher_genre.value.toLowerCase())){
            genre_check.style.display='flex'
        } else {
            genre_check.style.display='none'
        }
    }
})

function getGenres(){
    let string = ""
    for (let genre_check of genre_list.children) {
        const checkbox_genre = genre_check.querySelector('input[type="checkbox"]');
        if(checkbox_genre.checked){
            string=string+checkbox_genre.value+"%2C"
        }
    }
    if(string.length>3){
        string=string.slice(0, -3)
    }
    console.log(string)
    return string;
}

function jsonStep(data) {
    let i = 0;
    let string_genre = "";

    if(choix.value == "ID" || choix.value == "Rang") {
        nb_res=1
        générez_résultat(1);
        document.getElementById("anime_title_" + i).textContent = data.title;
        document.getElementById("alias_" + i).textContent = data.alternativeTitles;
        document.getElementById("synopsis_" + i).textContent = data.synopsis;
        document.getElementById("image_anime_" + i).src = data.image;
        if(data.genres.length>0){
            string_genre+=data.genres[0]
            for(let j = 1; j<data.genres.length; j++){
                string_genre+=", "+data.genres[j]
            }
        }
        console.log(data.hasEpisode)
        if(data.hasEpisode==true){
            document.getElementById("nb_episodes_" + i).textContent = data.episodes;
        } else {
            document.getElementById("nb_episodes_" + i).remove()
            document.getElementById("nb_episodes_label_" + i).remove()
        }
        if(data.hasRanking==true){
            document.getElementById("classement_" + i).textContent = data.ranking;
        } else {
            document.getElementById("classement_" + i).remove()
            document.getElementById("classement_label_" + i).remove()
        }
    } else {
        nb_res=data.data.length
        générez_résultat(data.data.length);
        data.data.forEach(element => {
            string_genre = ""
            document.getElementById("anime_title_" + i).textContent = element.title;
            document.getElementById("alias_" + i).textContent = element.alternativeTitles;
            document.getElementById("synopsis_" + i).textContent = element.synopsis;
            document.getElementById("image_anime_" + i).src = element.image;
            if(element.genres.length>0){
                string_genre+=element.genres[0]
                for(let j = 1; j<element.genres.length; j++){
                    string_genre+=" "+element.genres[j]
                }
            }
            document.getElementById("catégories_" + i).textContent = string_genre;
            if(element.hasEpisode=true){
                document.getElementById("nb_episodes_" + i).textContent = element.episodes;
            } else {
                document.getElementById("nb_episodes_" + i).remove()
                document.getElementById("nb_episodes_label_" + i).remove()
            }
            if(element.hasRanking=true){
                document.getElementById("classement_" + i).textContent = element.ranking;
            } else {
                document.getElementById("classement_" + i).remove()
                document.getElementById("classement_label_" + i).remove()
            }
            i++;
        });
    }
}