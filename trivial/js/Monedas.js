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

let titulo = "Las Monedas";

let imageQuestion;

const cuestionary = [
    {
        "audio_section": "../../audio/audio_animales/Musica_fondo.mp3",
        "audio_question": "../../audio/audio_monedas/centavo.mp3",
        "image_answer": ["../../img/imgmonedas/centavo.png", "../../img/imgmonedas/5centavos.png"] //Ya esta audio
    },
    {
        "audio_question": "../../audio/audio_monedas/10centavos.mp3",
        "image_answer": ["../../img/imgmonedas/10centavos.png", "../../img/imgmonedas/25centavos.png"] // Ya esta audio
    },
    {
        "audio_question": "../../audio/audio_monedas/50centavos.mp3",
        "image_answer": ["../../img/imgmonedas/50centavos.png", "../../img/imgmonedas/dolar.png"] // Ya esta el sonido
    },
    {
        "audio_question": "../../audio/audio_monedas/dolar.mp3",
        "image_answer": ["../../img/imgmonedas/1dolar.jpeg", "../../img/imgmonedas/billete5dolares.jpg"] // Ya esta
    },
    {
        "audio_question": "../../audio/audio_monedas/10dolares.mp3",
        "image_answer": ["../../img/imgmonedas/billete10dolares.jpg", "../../img/imgmonedas/billete20dolares.jpg"]  //Ya esta el audio
    },
    {
        "audio_question": "../../audio/audio_monedas/50dolares.mp3",
        "image_answer": ["../../img/imgmonedas/billete50dolares.jpg", "../../img/imgmonedas/billete100dolares.jpg"] // Ya esta el audio
    },
    {
        "audio_question": "../../audio/audio_monedas/25centavos.mp3",
        "image_answer": ["../../img/imgmonedas/25centavos.png", "../../img/imgmonedas/5centavos.png"] //YA
    },
    {
        "audio_question": "../../audio/audio_monedas/dolar_monedas.mp3",
        "image_answer": ["../../img/imgmonedas/dolar.png", "../../img/imgmonedas/centavo.png"] // YA
    },
    {
        "audio_question": "../../audio/audio_monedas/dolar_mayor_valor.mp3",
        "image_answer": ["../../img/imgmonedas/1dolar.jpeg", "../../img/imgmonedas/50centavos.png"] //YA
    },
    {
        "audio_question": "../../audio/audio_monedas/billete_5_dolares.mp3",
        "image_answer": ["../../img/imgmonedas/billete5dolares.jpg", "../../img/imgmonedas/billete20dolares.jpg"]//YA
    },
    {
        "image_question": "../../img/imgmonedas/Monedas.png",
        "audio_question": "../../audio/audio_monedas/suma50centavos.mp3",
        "image_answer": ["../../img/imgmonedas/50centavos.png", "../../img/imgmonedas/5centavos.png"] // YA
    },
    {
        "image_question": "../../img/imgmonedas/Suma5Centavos.png",
        "audio_question": "../../audio/audio_monedas/suma10centavos.mp3",
        "image_answer": ["../../img/imgmonedas/10centavos.png", "../../img/imgmonedas/25centavos.png"]// YA
    },
    {
        "image_question": "../../img/imgmonedas/Suma25Centavos.png",
        "audio_question": "../../audio/audio_monedas/sumadolar.mp3",
        "image_answer": ["../../img/imgmonedas/dolar.png", "../../img/imgmonedas/centavo.png"] //YA
    },
    {
        "image_question": "../../img/imgmonedas/SumaCentavos25.png",
        "audio_question": "../../audio/audio_monedas/suma25centavos.mp3",
        "image_answer": ["../../img/imgmonedas/25centavos.png", "../../img/imgmonedas/50centavos.png"] //YA
    }
];

document.querySelector('#h1monedas').innerHTML = titulo;

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