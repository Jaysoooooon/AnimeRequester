let rechercher = document.getElementById('rechercher')
let effacer = document.getElementById('effacer')
let search = document.getElementById('search')




/* code pour effacer la recherche */

effacer.addEventListener('click', ()=>{
    search.reset();
    HTMLFormElement.reset();
})

/*code pour lancer la recherche*/ 