let envoyer = document.getElementById('envoyer')
let effacer = document.getElementById('effacer')
let rechercher = document.getElementById('rechercher')
let choix = document.getElementById('choix')
let test = document.getElementById('test')
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
    test.textContent = selectionnerCritere();


if ("content" in document.createElement("template")) {
    let template=document.getElementById("template_anime_card")
    let all=document.getElementById("all")
    let clone = document.importNode(template.content, true);
    all.appendChild(clone);
    let synopsis=document.getElementById("synopsis")
    synopsis.textContent="syn1"
    synopsis.id="2"
    clone = document.importNode(template.content, true);
    all.appendChild(clone);
    synopsis=document.getElementById("synopsis")
    synopsis.textContent="syn2"
    
}

    test.textContent = effacer.getAttribute("")   



/* code pour effacer la recherche */

effacer.addEventListener('click', ()=>{
    
    location.reload()
})

recupererCaseCoche();