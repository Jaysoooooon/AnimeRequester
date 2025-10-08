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
let mode = document.getElementById('changement_mode')
let estModeSombre = false;
let titre = document.getElementById("titre")
let arriere_plan = document.body

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

    location.reload()
})

