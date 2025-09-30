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

/* code pour effacer la recherche */

effacer.addEventListener('click', ()=>{
    HTMLFormElement.reset();
})