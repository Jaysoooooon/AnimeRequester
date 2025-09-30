let envoyer = document.getElementById('envoyer')
let effacer = document.getElementById('effacer')
let rechercher = document.getElementById('rechercher')
if ("content" in document.createElement("template")) {
    let template=document.getElementById("template_anime_card")
    let all=document.getElementById("all")
    for(let i = 0; i<10; i++){
        let clone = document.importNode(template.content, true);
        all.appendChild(clone);
        let synopsis=document.getElementById("synopsis")
        synopsis.textContent="syn"+i
        synopsis.id=synopsis.id+"_"+i



    }
    
    
}



/* code pour effacer la recherche */

effacer.addEventListener('click', ()=>{
    
    HTMLFormElement.reset();
})