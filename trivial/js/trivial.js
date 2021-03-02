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
let titulo = "Los Animales";

//Variable para la imageQuestion
let imageQuestion;

const cuestionary = [
    {
        "audio_section": "../../audio/audio_animales/Musica_fondo.mp3",
        "audio_question": "../../audio/audio_animales/Audio_vaca.mp3",
        "image_answer": ["../../img/imganimales/vaca_animada.png", "../../img/imganimales/caballo_animado.png"]
    },
    {
        "audio_question": "../../audio/audio_animales/Cual_de_los_siguientes_animales_hace_este_sonido.mp3",
        "image_answer": ["../../img/imganimales/buho_animado.png", "../../img/imganimales/aguila_animada.png"]
    },
    {
        "audio_question": "../../audio/audio_animales/Cual_de_estos_dos_animales_hace_el_siguiente_sonido.mp3",
        "image_answer": ["../../img/imganimales/cerdo_animado.png", "../../img/imganimales/vaca_animada.png"]
    },
    {
        "audio_question": "../../audio/audio_animales/Que_animal_hace_asi.mp3",
        "image_answer": ["../../img/imganimales/caballo_animado.png", "../../img/imganimales/rinoceronte_animado.png"]
    },
    {
        "audio_question": "../../audio/audio_animales/Audio_ballena.mp3",
        "image_answer": ["../../img/imganimales/ballena_animada.png", "../../img/imganimales/delfin_animado.png"]
    },
    {
        "audio_question": "../../audio/audio_animales/Audio_elefante.mp3",
        "image_answer": ["../../img/imganimales/elefante_animado.png", "../../img/imganimales/jirafa_animada.png"]
    },
    {
        "audio_question": "../../audio/audio_animales/Audio_pato.mp3",
        "image_answer": ["../../img/imganimales/pato_animado.png", "../../img/imganimales/gallina_animada.png"]
    },
    {
        "audio_question": "../../audio/audio_animales/Audio_perro.mp3",
        "image_answer": ["../../img/imganimales/perro_animado.png", "../../img/imganimales/gato_animado.png"]
    },
    {
        "audio_question": "../../audio/audio_animales/Audio_leon.mp3",
        "image_answer": ["../../img/imganimales/leon_animado.png", "../../img/imganimales/oso_animado.png"]
    },
    {
        "audio_question": "../../audio/audio_animales/Audio_gato.mp3",
        "image_answer": ["../../img/imganimales/gato_animado2.png", "../../img/imganimales/raton_animado.png"]
    },
    {
        "audio_question": "../../audio/audio_animales/Rana.mp3",
        "image_answer": ["../../img/imganimales/rana.png", "../../img/imganimales/grillo.png"]
    },
    {
        "audio_question": "../../audio/audio_animales/Grillo.mp3",
        "image_answer": ["../../img/imganimales/grillo.png", "../../img/imganimales/oveja.png"]
    },
    {
        "audio_question": "../../audio/audio_animales/Gaviota.mp3",
        "image_answer": ["../../img/imganimales/gaviota.png", "../../img/imganimales/gallo.png"]
    },
    {
        "audio_question": "../../audio/audio_animales/Mono.mp3",
        "image_answer": ["../../img/imganimales/mono.png", "../../img/imganimales/oso_animado.png"]
    },
    {
        "audio_question": "../../audio/audio_animales/Oveja.mp3",
        "image_answer": ["../../img/imganimales/oveja.png", "../../img/imganimales/elefante_animado.png"]
    },
    {
        "audio_question": "../../audio/audio_animales/Gallo.mp3",
        "image_answer": ["../../img/imganimales/gallo.png", "../../img/imganimales/buho_animado.png"]
    },
    {
        "audio_question": "../../audio/audio_animales/Halcon.mp3",
        "image_answer": ["../../img/imganimales/aguila_animada.png", "../../img/imganimales/gallina_animada.png"]    
    }
];

document.querySelector('#h1animales').innerHTML = titulo;

function detectarBoton(event) {
    if (event.button == 2) {
        respuesta = document.getElementById("img2").getAttribute("src");
        document.oncontextmenu = document.body.oncontextmenu = function () { return false }; //No permite que se abra el menu al presionar click derecho
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
        parentP.classList.remove('rigth', 'wrong');  //ESTE IF ES PARA LAS CLASES DE COLOR ROJO Y VERDE
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
