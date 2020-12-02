var x = document.getElementById('ventanaAyuda');

const abrirAyuda = () => {
    if (x.style.visibility == "visible") {
        x.style.visibility = "hidden";
    } else {
        x.style.visibility = "visible";
    }
}
