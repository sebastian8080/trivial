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
let titulo = "El Cuerpo Humano";

let imageQuestion;

const cuestionary = [
    {
        "audio_section": "../../audio/audio_cuerpo_humano/musica_fondo.mp3",
        "audio_question": "../../audio/audio_cuerpo_humano/Cerebro.mp3",
        "image_answer": ["../../img/imgcuerpohumano/cerebro.png", "../../img/imgcuerpohumano/boca.png"]
    },
    {
        "audio_question": "../../audio/audio_cuerpo_humano/Corazon.mp3",
        "image_answer": ["../../img/imgcuerpohumano/corazon.png", "../../img/imgcuerpohumano/estomago.png"]
    },
    {
        "audio_question": "../../audio/audio_cuerpo_humano/Mano.mp3",
        "image_answer": ["../../img/imgcuerpohumano/mano.png", "../../img/imgcuerpohumano/intestino.png"]
    },
    {
        "audio_question": "../../audio/audio_cuerpo_humano/Nariz.mp3",
        "image_answer": ["../../img/imgcuerpohumano/nariz.png", "../../img/imgcuerpohumano/ojo.png"]
    },
    {
        "audio_question": "../../audio/audio_cuerpo_humano/Oreja.mp3",
        "image_answer": ["../../img/imgcuerpohumano/oreja.png", "../../img/imgcuerpohumano/pie.png"]
    },
    {
        "audio_question": "../../audio/audio_cuerpo_humano/Pulmones.mp3",
        "image_answer": ["../../img/imgcuerpohumano/pulmones.png", "../../img/imgcuerpohumano/riñon.png"]
    },
    {
        "audio_question": "../../audio/audio_cuerpo_humano/Boca.mp3",
        "image_answer": ["../../img/imgcuerpohumano/lengua.png", "../../img/imgcuerpohumano/nariz.png"]
    },
    {
        "audio_question": "../../audio/audio_cuerpo_humano/Pierna.mp3",
        "image_answer": ["../../img/imgcuerpohumano/pierna.png", "../../img/imgcuerpohumano/mano.png"]
    },
    {
        "audio_question": "../../audio/audio_cuerpo_humano/Intestino.mp3",
        "image_answer": ["../../img/imgcuerpohumano/intestino.png", "../../img/imgcuerpohumano/cerebro.png"]
    },
    {
        "image_question": "../../img/imgcuerpohumano/guantes.png",
        "audio_question": "../../audio/audio_cuerpo_humano/utilizar_guantes.mp3",
        "image_answer": ["../../img/imgcuerpohumano/mano.png", "../../img/imgcuerpohumano/pie1.png"]
    },
    {
        "image_question": "../../img/imgcuerpohumano/flor.png",
        "audio_question": "../../audio/audio_cuerpo_humano/olor_flor.mp3",
        "image_answer": ["../../img/imgcuerpohumano/nariz.png", "../../img/imgcuerpohumano/oreja.png"]
    },
    {
        "image_question": "../../img/imgcuerpohumano/helado.png",
        "audio_question": "../../audio/audio_cuerpo_humano/sabor_helado.mp3",
        "image_answer": ["../../img/imgcuerpohumano/lengua.png", "../../img/imgcuerpohumano/ojo.png"]
    },
    {
        "image_question": "../../img/imgcuerpohumano/musica.png",
        "audio_question": "../../audio/audio_cuerpo_humano/escuchar_musica.mp3",
        "image_answer": ["../../img/imgcuerpohumano/oreja.png", "../../img/imgcuerpohumano/ojo.png"]
    }
];

document.querySelector("#h1cuerpohumano").innerHTML = titulo;

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

    if(imageQuestion != null) {
        document.querySelector('#imgQuestion').setAttribute("src", imageQuestion);
        document.querySelector('#imgQuestion').style.display = 'block';
        document.querySelector('.jumbotron').style.display = 'none';
    } else {
        document.getElementById('imgQuestion').style.display = 'none';
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