var x = document.getElementById('ventanaAyuda');

function abrirAyuda(){
    if (x.style.visibility === "hidden") {
        x.style.visibility = "visible";
    } else {
        x.style.visibility = "hidden";
    }
}
