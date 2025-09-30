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