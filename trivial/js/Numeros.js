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
        "image_question": "../../img/imgnumeros/personas.png",
        "audio_question": "../../audio/Cual_de_los_siguientes_animales_hace_el_siguiente_sonido.mp3",
        "image_answer": ["../../img/imgnumeros/4.png", "../../img/imgnumeros/5.png"]
    },
    {
        "audio_question": "../../audio/Cual_de_los_siguientes_animales_hace_el_siguiente_sonido.mp3",
        "image_answer": ["../../img/imgcuerpohumano/corazon.png", "../../img/imgcuerpohumano/estomago.png"]
    },
    {
        "audio_question": "../../audio/Cual_de_los_siguientes_animales_hace_el_siguiente_sonido.mp3",
        "image_answer": ["../../img/imgcuerpohumano/mano.png", "../../img/imgcuerpohumano/intestino.png"]
    },
    {
        "audio_question": "../../audio/Cual_de_los_siguientes_animales_hace_el_siguiente_sonido.mp3",
        "image_answer": ["../../img/imgcuerpohumano/nariz.png", "../../img/imgcuerpohumano/ojo.png"]
    },
    {
        "audio_question": "../../audio/Cual_de_los_siguientes_animales_hace_el_siguiente_sonido.mp3",
        "image_answer": ["../../img/imgcuerpohumano/oreja.png", "../../img/imgcuerpohumano/pie.png"]
    },
    {
        "audio_question": "../../audio/Cual_de_los_siguientes_animales_hace_el_siguiente_sonido.mp3",
        "image_answer": ["../../img/imgcuerpohumano/pulmones.png", "../../img/imgcuerpohumano/riñon.png"]
    },
    {
        "audio_question": "../../audio/Cual_de_los_siguientes_animales_hace_el_siguiente_sonido.mp3",
        "image_answer": ["../../img/imgcuerpohumano/lengua.png", "../../img/imgcuerpohumano/nariz.png"]
    },
    {
        "audio_question": "../../audio/Cual_de_los_siguientes_animales_hace_el_siguiente_sonido.mp3",
        "image_answer": ["../../img/imgcuerpohumano/pierna.png", "../../img/imgcuerpohumano/mano.png"]
    },
    {
        "audio_question": "../../audio/Cual_de_los_siguientes_animales_hace_el_siguiente_sonido.mp3",
        "image_answer": ["../../img/imgcuerpohumano/cerebro.png", "../../img/imgcuerpohumano/intestino.png"]
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
    } else {
        document.querySelector('#imgQuestion').style.display = 'none';
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
            document.querySelector('#parrafoIntentos').innerHTML = rigthAnswers + wrongAnswers;
            document.querySelector('#parrafoCorrectas').innerHTML = rigthAnswers;
            document.querySelector('#parrafoIncorrectas').innerHTML = wrongAnswers;
            document.querySelector('.alert').style.display = 'block';
            document.querySelector('#btnNext').remove();
            setTimeout(function () {
                window.location.href = "../../sections.html";
            }, 5000);

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