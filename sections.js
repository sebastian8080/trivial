var x = document.getElementById('ventanaAyuda');

function abrirAyuda(){
    if (x.style.visibility === "hidden") {
        x.style.visibility = "visible";
    }
}
document.getElementById('btnCerrarAyuda').addEventListener("click", () => {
    x.style.visibility = "hidden";
});