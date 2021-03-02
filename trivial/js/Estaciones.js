let rigthAnswer = null;
let currentQuestionIndex = 0;

//CONTADORES DE LAS RESPUESTAS CORRECTAS E INCORRECTAS
let rigthAnswers = 0;
let wrongAnswers = 0;

//VARIABLE GLOBAL PARA REPRODUCIR Y PARAR EL AUDIO
let audio;
let audio_section;

//Variables para obtener la respuesta del button y la imagen
let respuesta, objeto;

//Variable para poner el titulo
let titulo = "Las Estaciones";

//Variable para la imageQuestion
let imageQuestion;

const cuestionary = [
    {
        "audio_section": "../../audio/audio_estaciones/musica_fondo.mp3",
        "audio_question": "../../audio/audio_estaciones/que_epoca_hace_mas_frio.mp3",
        "image_answer": ["../../img/imgestaciones/invierno2.jpg", "../../img/imgestaciones/verano.jpg"]
    },
    {
        "audio_question": "../../audio/audio_estaciones/osos_hibernan.mp3",
        "image_answer": ["../../img/imgestaciones/invierno2.png", "../../img/imgestaciones/primavera2.png"]
    },
    {
        "image_question": "../../img/imgestaciones/castillo_de_arena.png",
        "audio_question": "../../audio/audio_estaciones/jugar_castillo_arena.mp3",
        "image_answer": ["../../img/imgestaciones/playa_verano2.png", "../../img/imgestaciones/invierno.png"]
    },
    {
        "image_question": "../../img/imgestaciones/muñeco_de_nieve.png",
        "audio_question": "../../audio/audio_estaciones/muñeco_nieve.mp3",
        "image_answer": ["../../img/imgestaciones/invierno3.png", "../../img/imgestaciones/otoño2.jpg"]
    },
    {
        "image_question": "../../img/imgestaciones/hoja_otoño.png",
        "audio_question": "../../audio/audio_estaciones/hojas_caen_de_arbol.mp3",
        "image_answer": ["../../img/imgestaciones/otoño.jpg", "../../img/imgestaciones/primavera.jpg"]
    },
    {
        "image_question": "../../img/imgestaciones/cometa.png",
        "audio_question": "../../audio/audio_estaciones/volar_cometa.mp3",
        "image_answer": ["../../img/imgestaciones/verano.jpg", "../../img/imgestaciones/invierno2.jpg"]
    },
    {
        "image_question": "../../img/imgestaciones/flor_primavera.png",
        "audio_question": "../../audio/audio_estaciones/salen_flores.mp3",
        "image_answer": ["../../img/imgestaciones/primavera.jpg", "../../img/imgestaciones/otoño.jpg"]
    },
    {
        "image_question": "../../img/imgestaciones/niños_jugando_otoño.png",
        "audio_question": "../../audio/audio_estaciones/niños_juegan_otoño.mp3",
        "image_answer": ["../../img/imgestaciones/otoño3.jpg", "../../img/imgestaciones/primavera2.jpg"]
    },
    {
        "audio_question": "../../audio/audio_estaciones/clima_caliente_verano.mp3",
        "image_answer": ["../../img/imgestaciones/verano2.jpg", "../../img/imgestaciones/invierno.jpg"]
    },
    {
        "image_question": "../../img/imgestaciones/niña_arropada.png",
        "audio_question": "../../audio/audio_estaciones/arropada_invierno.mp3",
        "image_answer": ["../../img/imgestaciones/invierno4.png", "../../img/imgestaciones/verano3.png"]
    }
];

document.querySelector('#h1estaciones').innerHTML = titulo;

//Funcion para ver que boton del mouse presiona, segun eso se manda la respuesta
function detectarBoton(event) {
    if (event.button == 2) {
        respuesta = document.getElementById("img2").getAttribute("src");
        document.oncontextmenu = document.body.oncontextmenu = function () { return false };
    } else if (event.button == 0) {
        respuesta = document.getElementById("img1").getAttribute("src");
    }
    objeto = document.getElementById("grid1");
    evaluateAnswer(respuesta, objeto);
}


const printHTMLQuestion = (i) => {
        const q = cuestionary[i];
        let a = q.image_answer;
        imageQuestion = q.image_question;
        rigthAnswer = a[0];

        if (imageQuestion != null) {
            document.querySelector('#imgQuestion').setAttribute("src", imageQuestion);
            document.querySelector('#imgQuestion').style.display = 'block';
            document.querySelector('.jumbotron').style.display = 'none';
        } else {
            document.querySelector('#imgQuestion').style.display = 'none';
            document.querySelector('.jumbotron').style.display = 'block';
        }

        a = a.sort((a, b) => Math.floor(Math.random() * 3) - 1);

        audio = new Audio(q.audio_question);
        audio.play();

        let idimageQuestion = 1;
        let idimage = 1;

        const htmlAnswerArray = a.map(currentA =>
            `<button id="answer${idimageQuestion++}"><img id="img${idimage++}" src="${currentA}"></img></button>`,
        );

        const htmlAnswer = htmlAnswerArray.join(' ');
        document.querySelector('#grid1').innerHTML = htmlAnswer;
        document.querySelector('#btnNext').disabled = true;
}

const evaluateAnswer = (answer, obj) => {
    const parentP = obj.parentNode;
    
    if (parentP.classList.contains("rigth") || parentP.classList.contains("wrong")) {
        parentP.classList.remove('rigth', 'wrong');
    }

    if (answer == rigthAnswer) {
        audio.pause();
        parentP.classList.add('rigth');
        rigthAnswers++;
        document.querySelector('.rigthCounter').innerHTML = rigthAnswers;
        document.querySelector('#btnNext').disabled = false;
        if(arrayNumerosGenerados.length < 10){
            let numero = generarNumeroAleatorio();
            printHTMLQuestion(numero);
        } else {
            audio_section.pause();
            document.querySelector('.jumbotron').style.display = 'block';
            document.querySelector('.container').style.display = 'none';
            document.querySelector('#parrafoIntentos').innerHTML = rigthAnswers + wrongAnswers;
            document.querySelector('#parrafoCorrectas').innerHTML = rigthAnswers;
            document.querySelector('#parrafoIncorrectas').innerHTML = wrongAnswers;
            document.querySelector('.alert').style.display = 'block';
            document.querySelector('#btnNext').remove();
        }
        
    } else {
        parentP.classList.add('wrong');
        wrongAnswers++;
        document.querySelector('.wrongCounter').innerHTML = wrongAnswers;
    }
}

const iniciarTest = _ => {
    let numero = generarNumeroAleatorio();
    printHTMLQuestion(numero);
    document.querySelector('#btnIniciar').style.display = 'none';
    document.querySelector('.container').style.display = 'block';
    document.querySelector('#btnNext').style.display = 'none';

    const q = cuestionary[0];
    audio_section = new Audio(q.audio_section);
    audio_section.play();
}

let numeroGenerado, numeroComprobado;
let arrayNumerosGenerados = [];

function generarNumeroAleatorio() {
    numeroGenerado = Math.floor(Math.random() * cuestionary.length);
    console.log(numeroGenerado);
    console.log(arrayNumerosGenerados);
    if (arrayNumerosGenerados.includes(numeroGenerado)) {
        generarNumeroAleatorio();
    } else {
        arrayNumerosGenerados.push(numeroGenerado);
        numeroComprobado = numeroGenerado;
    }
    return numeroComprobado;
}
