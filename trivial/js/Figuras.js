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
let titulo = "Las Figuras Geométricas";

//Variable para la imageQuestion
let imageQuestion;
const cuestionary = [
    {
        "audio_section": "../../audio/audio_animales/Musica_fondo.mp3",
        "audio_question": "../../audio/audio_figuras/cuadrado.mp3",
        "image_answer": ["../../img/imgfigurasgeometricas/cuadrado.png", "../../img/imgfigurasgeometricas/hexagono.png"]
    },
    {
        "audio_question": "../../audio/audio_figuras/triangulo.mp3",
        "image_answer": ["../../img/imgfigurasgeometricas/triangulo.png", "../../img/imgfigurasgeometricas/rombo.png"]
    },
    {
        "audio_question": "../../audio/audio_figuras/circulo.mp3",
        "image_answer": ["../../img/imgfigurasgeometricas/circulo.png", "../../img/imgfigurasgeometricas/ovalo2.png"]
    },
    {
        "audio_question": "../../audio/audio_figuras/esfera.mp3",
        "image_answer": ["../../img/imgfigurasgeometricas/esfera.png", "../../img/imgfigurasgeometricas/circulo1.png"]
    },
    {
        "image_question": "../../img/imgfigurasgeometricas/cilindro_papel.png",
        "audio_question": "../../audio/audio_figuras/cilindro.mp3",
        "image_answer": ["../../img/imgfigurasgeometricas/cilindro.png", "../../img/imgfigurasgeometricas/cono.png"]
    },
    {
        "audio_question": "../../audio/audio_figuras/rectangulo.mp3",
        "image_answer": ["../../img/imgfigurasgeometricas/rectangulo.png", "../../img/imgfigurasgeometricas/cuadrado1.png"]
    },
    {
        "image_question": "../../img/imgfigurasgeometricas/cubo_regalo.png",
        "audio_question": "../../audio/audio_figuras/cubo.mp3",
        "image_answer": ["../../img/imgfigurasgeometricas/cubo.png", "../../img/imgfigurasgeometricas/pentagono_3d.png"]
    },
    {
        "image_question": "../../img/imgfigurasgeometricas/cono_trafico.png",
        "audio_question": "../../audio/audio_figuras/cono.mp3",
        "image_answer": ["../../img/imgfigurasgeometricas/cono1.png", "../../img/imgfigurasgeometricas/piramide.png"]
    },
    {   
        "image_question": "../../img/imgfigurasgeometricas/fruta_circular.png",
        "audio_question": "../../audio/audio_figuras/fruta_circular.mp3",
        "image_answer": ["../../img/imgfigurasgeometricas/circulo.png", "../../img/imgfigurasgeometricas/ovalo2.png"]
    },
    {
        "image_question": "../../img/imgfigurasgeometricas/triangulo_tienda_acampar.png",
        "audio_question": "../../audio/audio_figuras/tienda_triangular.mp3",
        "image_answer": ["../../img/imgfigurasgeometricas/triangulo.png", "../../img/imgfigurasgeometricas/cilindro.png"]
    }
];

document.querySelector('#h1figuras').innerHTML = titulo;

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