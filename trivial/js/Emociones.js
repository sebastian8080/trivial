let rigthAnswer = null;
let currentQuestionIndex = 0;

//CONTADORES DE LAS RESPUESTAS CORRECTAS E INCORRECTAS
let rigthAnswers = 0;
let wrongAnswers = 0;

//Variables para los audios
let audio;
let audio_section;

//Variables para obtener la respuesta y el objeto buttons
let respuesta, objeto;

//Variable para poner titulo
let titulo = "Las Emociones";

let imageQuestion;

const cuestionary = [
    {
        "audio_section": "../../audio/audio_emociones/musica_fondo.mp3",
        "audio_question": "../../audio/audio_emociones/asustado.mp3",
        "image_answer": ["../../img/imgemociones/chico_asustado.png", "../../img/imgemociones/emocion_duda.png"]
    },
    {
        "audio_question": "../../audio/audio_emociones/enano_sueño.mp3",
        "image_answer": ["../../img/imgemociones/enano_bostesando.png", "../../img/imgemociones/enano_feliz.png"]
    },
    {
        "audio_question": "../../audio/audio_emociones/persona_feliz.mp3",
        "image_answer": ["../../img/imgemociones/mujer_feliz.png", "../../img/imgemociones/hombre_sorprendido.png"]
    },
    {
        "audio_question": "../../audio/audio_emociones/persona_llorando.mp3",
        "image_answer": ["../../img/imgemociones/niño_llorando.png", "../../img/imgemociones/niño_enfermo.png"]
    },
    {
        "audio_question": "../../audio/audio_emociones/enamorado.mp3",
        "image_answer": ["../../img/imgemociones/sentimiento_amor.png", "../../img/imgemociones/niña_triste.png"]
    },
    {
        "audio_question": "../../audio/audio_emociones/enano_gruñon.mp3",
        "image_answer": ["../../img/imgemociones/enano_gruñon.png", "../../img/imgemociones/enano_timido.png"]
    },
    {
        "audio_question": "../../audio/audio_emociones/persona_dudando.mp3",
        "image_answer": ["../../img/imgemociones/emocion_duda1.png", "../../img/imgemociones/pensativa.png"]
    },
    {
        "audio_question": "../../audio/audio_emociones/persona_cansada.mp3",
        "image_answer": ["../../img/imgemociones/persona_cansada.png", "../../img/imgemociones/niño_enfermo.png"]
    },
    {
        "audio_question": "../../audio/audio_emociones/persona_triste.mp3",
        "image_answer": ["../../img/imgemociones/triste.png", "../../img/imgemociones/chica_feliz.png"]
    },
    {
        "audio_question": "../../audio/audio_emociones/enojo_intensamente.mp3",
        "image_answer": ["../../img/imgemociones/enojo_intensamente.png", "../../img/imgemociones/temor_intensamente.png"]
    },
    {
        "audio_question": "../../audio/audio_emociones/triste_intensamente.mp3",
        "image_answer": ["../../img/imgemociones/tristeza_intensamente.png", "../../img/imgemociones/desagrado_intensamente.png"]
    },
    {
        "audio_question": "../../audio/Cual_de_los_siguientes_animales_hace_el_siguiente_sonido.mp3",
        "image_answer": ["../../img/imgemociones/alegria_intensamente.png", "../../img/imgemociones/enojo_intensamente.png"]
    }
];
document.querySelector('#h1emociones').innerHTML = titulo;

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
    rigthAnswer = a[0];

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
    if (parentP.classList.contains('rigth') || parentP.classList.contains('wrong')) {
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