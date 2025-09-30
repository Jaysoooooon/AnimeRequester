let envoyer = document.getElementById('envoyer')
let effacer = document.getElementById('effacer')
let rechercher = document.getElementById('rechercher')
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
    
    HTMLFormElement.reset();
})