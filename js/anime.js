let envoyer = document.getElementById('envoyer')
let effacer = document.getElementById('effacer')
let rechercher = document.getElementById('rechercher')
let action = document.getElementById('action')
let aventure = document.getElementById('action')
let comedy = document.getElementById('action')
let romance = document.getElementById('action')
let caseChoisie = document.querySelectorAll('input[name = "checkbox"]')

/* fonction */

function recupererCaseCoche(){
    let choix = "";
    for(let i = 0; i< caseChoisie.length; i++){
        if(caseChoisie[i].checked){
            return caseChoisie[i]
        }
    }
}





/* fonction */





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



/* code pour effacer la recherche */

effacer.addEventListener('click', ()=>{
    
    location.reload()
})

recupererCaseCoche();