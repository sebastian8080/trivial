//FUNCION PARA HACER VISIBLE EL CUADRO DE AYUDA
var x = document.getElementById('alertAyuda');

const abrirAyuda = () => {
    if (x.style.visibility == "visible") {
        x.style.visibility = "hidden";
    } else {
        x.style.visibility = "visible";
    }
}
//---------------------------------

const secciones = [
    {
        "seccion_name": "LOS ANIMALES",
        "imagen": "img/imgsections/tema_animales.png",
        "url":"trivial/html/trivial.html"
    },
    {
        "seccion_name": "OBJETOS DE LA CLASE",
        "imagen": "img/imgsections/tema_clase.png",
        "url": "trivial/html/ObjetosClase.html" 
    },
    {
        "seccion_name": "LOS COLORES",
        "imagen": "img/imgsections/tema_colores.png",
        "url": "trivial/html/Colores.html"
    },
    {
        "seccion_name": "LAS ESTACIONES",
        "imagen": "img/imgsections/tema_estaciones.jpg",
        "url": "trivial/html/Estaciones.html"
    },
    {
        "seccion_name": "EL CUERPO HUMANO",
        "imagen": "img/imgsections/tema_cuerpo_humano.png",
        "url": "trivial/html/CuerpoHumano.html"
    },
    {
        "seccion_name": "LAS EMOCIONES",
        "imagen": "img/imgsections/tema_emociones.jpg",
        "url": "trivial/html/Emociones.html"
    },
    {
        "seccion_name": "LAS FIGURAS GEOMETRICAS",
        "imagen": "img/imgsections/tema_figuras_geometicas.png",
        "url": "trivial/html/Figuras.html"
    },
    {
        "seccion_name": "LAS MONEDAS",
        "imagen": "img/imgsections/tema_monedas.png",
        "url": "trivial/html/Monedas.html"
    },
    {
        "seccion_name": "LOS NÚMEROS",
        "imagen": "img/imgsections/tema_numeros.png",
        "url": "trivial/html/Numeros.html"
    },
    {
        "seccion_name": "HIGIENE Y SALUD",
        "imagen": "img/imgsections/higiene.png",
        "url": "trivial/html/Higiene.html"
    }
];

let titulo = "Secciones";
document.querySelector('#h1Sections').innerHTML = titulo;

const htmlSectionsArray = secciones.map(seccion => 
    `
    <div class="col-sm-4">
        <div class="card">
            <div class="card-header">
                <a href="${seccion.url}"><img src="${seccion.imagen}" alt=""></a>
            </div>
            <div class="card-body">
                <p>${seccion.seccion_name}</p>
            </div>
        </div>
    </div>
    `
);

const htmlSections = htmlSectionsArray.join(' ');
document.querySelector("#rowSections").innerHTML = htmlSections;

