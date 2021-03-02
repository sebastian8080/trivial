let rigthAnswer = null;
let currentQuestionIndex = 0;

//CONTADORES DE LAS RESPUESTAS CORRECTAS E INCORRECTAS
let rigthAnswers = 0;
let wrongAnswers = 0;

//Variables para los audio
let audio, audio_section;

//Variables para obtener la respuesta y el objeto button
let respuesta, objeto;

//Variable para el titulo
let titulo = "Higiene y Salud";

let imageQuestion;

const cuestionary = [
    {
        "audio_section": "../../audio/audio_higiene/Musica_fondo.mp3",
        "image_question": "../../img/imghigiene/comer.png",
        "audio_question": "../../audio/audio_higiene/lavarse_manos.mp3",
        "image_answer": ["../../img/imghigiene/lavarse_manos.png", "../../img/imghigiene/cepillarse_dientes.png"]
    },
    {
        "image_question": "../../img/imghigiene/niño_sucio.jpg",
        "audio_question": "../../audio/audio_higiene/bañarse.mp3",
        "image_answer": ["../../img/imghigiene/niño_duchandose.jpg", "../../img/imghigiene/niño_durmiendo.jpg"]
    },
    {
        "image_question": "../../img/imghigiene/comer2.jpg",
        "audio_question": "../../audio/audio_higiene/cepillarse_dientes.mp3",
        "image_answer": ["../../img/imghigiene/cepillarse_dientes2.png", "../../img/imghigiene/peinarse.png"]
    },
    {
        "image_question": "../../img/imghigiene/germenes.png",
        "audio_question": "../../audio/audio_higiene/gel_antibacterial.mp3",
        "image_answer": ["../../img/imghigiene/gel_antibacterial.png", "../../img/imghigiene/comer.png"]
    },
    {
        "image_question": "../../img/imghigiene/cepillarse_dientes3.png",
        "audio_question": "../../audio/audio_higiene/vaso_de_agua.mp3",
        "image_answer": ["../../img/imghigiene/vaso_de_agua.png", "../../img/imghigiene/grifo_de_agua.png"]
    },
    {
        "image_question": "../../img/imghigiene/distanciamiento.png",
        "audio_question": "../../audio/audio_higiene/distanciamiento.mp3",
        "image_answer": ["../../img/imghigiene/2metros.jpg", "../../img/imghigiene/1metro.jpg"]
    },
    {
        "image_question": "../../img/imghigiene/gripe.png",
        "audio_question": "../../audio/audio_higiene/mascarilla.mp3",
        "image_answer": ["../../img/imghigiene/mascarilla.png", "../../img/imghigiene/sin_mascarilla.png"]
    },
    {
        "audio_question": "../../audio/audio_higiene/estornudar.mp3",
        "image_answer": ["../../img/imghigiene/toser_bien.png", "../../img/imghigiene/toser_mal.png"]
    },
    {
        "audio_question": "../../audio/audio_higiene/dormir_pronto.mp3",
        "image_answer": ["../../img/imghigiene/dormir_pronto.jpg", "../../img/imghigiene/jugar_juegos.jpg"]
    },
    {
        "audio_question": "../../audio/audio_higiene/alimentacion_sana.mp3",
        "image_answer": ["../../img/imghigiene/comida_sana.png", "../../img/imghigiene/comida_chatarra.png"]
    }
];

document.querySelector("#h1higiene").innerHTML = titulo;

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
    document.querySelector("#grid1").innerHTML = htmlAnswer;
    document.querySelector('#btnNext').disabled = true;
}

const evaluateAnswer = (answer, obj) => {
    const parentP = obj.parentNode;
    if (parentP.classList.contains("rigth") || parentP.classList.contains("wrong")) {
        parentP.classList.remove('rigth', 'wrong');
    }
    if (answer == rigthAnswer) {
        parentP.classList.add('rigth');
        rigthAnswers++;
        document.querySelector('.rigthCounter').innerHTML = rigthAnswers;
        document.querySelector('#btnNext').disabled = false;
        if (arrayNumerosGenerados.length < 10) {
            let numero = generarNumeroAleatorio();
            printHTMLQuestion(numero);
        } else {
            audio_section.pause();
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

