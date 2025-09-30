let envoyer = document.getElementById('envoyer')
let effacer = document.getElementById('effacer')
let rechercher = document.getElementById('rechercher')
let caseChoisie = document.querySelectorAll('input[name = "checkbox"]')
let test = document.getElementById('test')

/* fonction */

function recupererCaseCoche(){
    let choix = "";
    for(let i = 0; i< caseChoisie.length; i++){
        if(caseChoisie[i].checked){
            console.log("bonjour")
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

    test.textContent = effacer.getAttribute("")   



/* code pour effacer la recherche */

effacer.addEventListener('click', ()=>{
    
    location.reload()
})

recupererCaseCoche();