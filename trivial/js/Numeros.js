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
let titulo = "Los Números";

//Variable para la image_question
let imageQuestion;

const cuestionary = [
    {
        "audio_section": "../../audio/audio_numeros/musica_fondo.mp3",
        "image_question": "../../img/imgnumeros/personas.png",
        "audio_question": "../../audio/audio_numeros/4personas.mp3",
        "image_answer": ["../../img/imgnumeros/4.png", "../../img/imgnumeros/5.png"]
    },
    {
        "image_question": "../../img/imgnumeros/figuras.png",
        "audio_question": "../../audio/audio_numeros/9.mp3",
        "image_answer": ["../../img/imgnumeros/9.png", "../../img/imgnumeros/7.png"]
    },
    {
        "image_question": "../../img/imgnumeros/familia.png",
        "audio_question": "../../audio/audio_numeros/5.mp3",
        "image_answer": ["../../img/imgnumeros/5.png", "../../img/imgnumeros/6.png"]
    },
    {
        "image_question": "../../img/imgnumeros/vestido.png",
        "audio_question": "../../audio/audio_numeros/1.mp3",
        "image_answer": ["../../img/imgnumeros/1.png", "../../img/imgnumeros/7.png"]
    },
    {
        "image_question": "../../img/imgnumeros/monos.png",
        "audio_question": "../../audio/audio_numeros/3.mp3",
        "image_answer": ["../../img/imgnumeros/3.png", "../../img/imgnumeros/2.png"]
    },
    {
        "image_question": "../../img/imgnumeros/enanos.png",
        "audio_question": "../../audio/audio_numeros/7.mp3",
        "image_answer": ["../../img/imgnumeros/7.png", "../../img/imgnumeros/8.png"]
    },
    {
        "image_question": "../../img/imgnumeros/frutas.png",
        "audio_question": "../../audio/audio_numeros/6.mp3",
        "image_answer": ["../../img/imgnumeros/6.png", "../../img/imgnumeros/4.png"]
    },
    {
        "image_question": "../../img/imgnumeros/globos.jpg",
        "audio_question": "../../audio/audio_numeros/8.mp3",
        "image_answer": ["../../img/imgnumeros/8.png", "../../img/imgnumeros/9.png"]
    },
    {
        "image_question": "../../img/imgnumeros/manzanas.png",
        "audio_question": "../../audio/audio_numeros/4.mp3",
        "image_answer": ["../../img/imgnumeros/4.png", "../../img/imgnumeros/3.png"]
    },
    {
        "image_question": "../../img/imgnumeros/tren.png",
        "audio_question": "../../audio/audio_numeros/2.mp3",
        "image_answer": ["../../img/imgnumeros/2.png", "../../img/imgnumeros/5.png"]
    },
    {
        "audio_question": "../../audio/audio_numeros/#",
        "image_question": ["../../img/imgnumeros/suma.png", "../../img/imgnumeros/resta.png"]
    },
    {
        "audio_question": "../../audio/audio_numeros/#",
        "image_question": ["../../img/imgnumeros/resta.png", "../../img/imgnumeros/multipliacion.png"]
    },
    {
        "audio_question": "../../audio/audio_numeros/#",
        "image_question": ["../../img/imgnumeros/multiplicacion.png", "../../img/imgnumeros/suma.png"]
    },
    {
        "audio_question": "../../audio/audio_numeros/#",
        "image_question": ["../../img/imgnumeros/division.png", "../../img/imgnumeros/resta.png"]
    }
];

document.querySelector("#h1numeros").innerHTML = titulo;

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
        audio.pause();
        parentP.classList.add('rigth');
        rigthAnswers++;
        document.querySelector('.rigthCounter').innerHTML = rigthAnswers;
        document.querySelector('#btnNext').disabled = false;
        if (arrayNumerosGenerados.length < 10) {
            let numero = generarNumeroAleatorio();
            printHTMLQuestion(numero);
        } else {
            audio_section.pause();
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