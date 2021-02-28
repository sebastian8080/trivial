let rigthAnswer = null;
let currentQuestionIndex = 0;

//CONTADORES DE LAS RESPUESTAS CORRECTAS E INCORRECTAS
let rigthAnswers = 0;
let wrongAnswers = 0;

//VARIABLES GLOBAL PARA REPRODUCIR Y PARAR EL AUDIO
let audio;
let audio_section;

//Variables para obtener la respuesta y el objeto button
let respuesta, objeto;

let titulo = "Los Colores";

//Variable para la image_question
let imageQuestion;

const cuestionary = [
    {
        "audio_section": "../../audio/audio_colores/musica_fondo.mp3",
        "audio_question": "../../audio/audio_colores/rojo.mp3",
        "image_answer": ["../../img/imgcolores/auto_rojo.png", "../../img/imgcolores/auto_negro.png"]
    },
    {
        "audio_question": "../../audio/audio_colores/azul.mp3",
        "image_answer": ["../../img/imgcolores/flor_azul.png", "../../img/imgcolores/flor_rosa.png"]
    },
    {
        "audio_question": "../../audio/audio_colores/verde.mp3",
        "image_answer": ["../../img/imgcolores/pera_verde.png", "../../img/imgcolores/naranja.png"]
    },
    {
        "audio_question": "../../audio/audio_colores/cafe.mp3",
        "image_answer": ["../../img/imgcolores/ardilla_cafe.png", "../../img/imgcolores/pez_morado.png"]
    },
    {
        "audio_question": "../../audio/audio_colores/amarillo.mp3",
        "image_answer": ["../../img/imgcolores/sol.png", "../../img/imgcolores/luna_blanca.png"]
    },
    {
        "image_question": "../../img/imgcolores/pelota_naranja.png",
        "audio_question": "../../audio/audio_colores/pelota_naranja.mp3",
        "image_answer": ["../../img/imgcolores/color_naranja.png", "../../img/imgcolores/color_morado.png"]
    },
    {
        "image_question": "../../img/imgcolores/blusa_celeste.png",
        "audio_question": "../../audio/audio_colores/blusa_celeste.mp3",
        "image_answer": ["../../img/imgcolores/color_celeste.jpg", "../../img/imgcolores/color_verde_claro.jpg"]
    },
    {
        "audio_question": "../../audio/audio_colores/blanco_negro.mp3",
        "image_answer": ["../../img/imgcolores/cebra_blanco_negro.png", "../../img/imgcolores/jaguar_naranja.png"]
    },
    {
        "image_question": "../../img/imgcolores/uva_morada.png",
        "audio_question": "../../audio/audio_colores/fruta_morada.mp3",
        "image_answer": ["../../img/imgcolores/colormorado.png", "../../img/imgcolores/color_lacre.jpg"]
    },
    {
        "image_question": "../../img/imgcolores/flamengo_rosado.png",
        "audio_question": "../../audio/audio_colores/animal_rosado.mp3",
        "image_answer": ["../../img/imgcolores/color_rosado.jpg", "../../img/imgcolores/color_crema.jpg"]
    }
];

document.querySelector('#h1colores').innerHTML = titulo;

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
        document.querySelector('#imgQuestion').setAttribute('src', imageQuestion);
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
        `<button id="answer${idimageQuestion++}" class="btn btn-primary" onClick="evaluateAnswer('${currentA}', this)"><img id="img${idimage++}" src="${currentA}"></img></button>`,
    );

    const htmlAnswer = htmlAnswerArray.join(' ');
    document.querySelector('#grid1').innerHTML = htmlAnswer;
    document.querySelector('#btnNext').disabled = true;
}

const evaluateAnswer = (answer, obj) => {
    const parentP = obj.parentNode;

    if (parentP.classList.contains('rigth') || parentP.classList.contains('wrong')) {
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
