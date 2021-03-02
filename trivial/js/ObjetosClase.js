let rigthAnswer = null;
let currentQuestionIndex = 0;

//CONTADORES DE LAS RESPUESTAS CORRECTAS E INCORRECTAS
let rigthAnswers = 0;
let wrongAnswers = 0;

//Variables para el audio de fondo y para el audio de la pregunta
let audio;
let audio_section;

//Variables para despues de detectar el boton del raton mandarlas a la funcion evaluateAnswer
let respuesta, objeto;

let titulo = "Objetos de la Clase"

let imageQuestion;

const cuestionary = [
    {
        "audio_section": "../../audio/audio_objetos_clase/musica_fondo.mp3",
        "audio_question": "../../audio/audio_objetos_clase/boligrafo_borrador.mp3",
        "image_answer": ["../../img/imgobjetosclase/boligrafo.png", "../../img/imgobjetosclase/borrador.png"]
    },
    {
        "audio_question": "../../audio/audio_objetos_clase/carpeta_cartuchera.mp3",
        "image_answer": ["../../img/imgobjetosclase/carpeta.png", "../../img/imgobjetosclase/cartuchera.png"]
    },
    {
        "audio_question": "../../audio/audio_objetos_clase/cuaderno_corrector.mp3",
        "image_answer": ["../../img/imgobjetosclase/cuaderno.png", "../../img/imgobjetosclase/corrector.png"]
    },
    {
        "audio_question": "../../audio/audio_objetos_clase/sacapuntas_grapadora.mp3",
        "image_answer": ["../../img/imgobjetosclase/sacapuntas.png", "../../img/imgobjetosclase/grapadora.png"]
    },
    {
        "audio_question": "../../audio/audio_objetos_clase/mochila_goma.mp3",
        "image_answer": ["../../img/imgobjetosclase/mochila.png", "../../img/imgobjetosclase/pega.png"]
    },
    {
        "audio_question": "../../audio/audio_objetos_clase/pizarron_pupitre.mp3",
        "image_answer": ["../../img/imgobjetosclase/pizarron.png", "../../img/imgobjetosclase/pupitre.png"]
    },
    {
        "audio_question": "../../audio/audio_objetos_clase/regla_tijera.mp3",
        "image_answer": ["../../img/imgobjetosclase/regla.png", "../../img/imgobjetosclase/tijera.png"]
    },
    {
        "audio_question": "../../audio/audio_objetos_clase/borrador_lapiz.mp3",
        "image_answer": ["../../img/imgobjetosclase/borrador.png", "../../img/imgobjetosclase/lapiz.png"]
    },
    {
        "audio_question": "../../audio/audio_objetos_clase/tijera_pega.mp3",
        "image_answer": ["../../img/imgobjetosclase/tijera.png", "../../img/imgobjetosclase/pega.png"]
    },
    {
        "audio_question": "../../audio/audio_objetos_clase/basurero_pupitre.mp3",
        "image_answer": ["../../img/imgobjetosclase/basurero.png", "../../img/imgobjetosclase/pupitre.png"]
    },
    {
        "audio_question": "../../audio/audio_objetos_clase/Calculadora.mp3",
        "image_answer": ["../../img/imgobjetosclase/calculadora.png", "../../img/imgobjetosclase/regla.png"]
    },
    {
        "image_question": "../../img/imgfigurasgeometricas/circulo.png",
        "audio_question": "../../audio/audio_objetos_clase/compas.mp3",
        "image_answer": ["../../img/imgobjetosclase/compas.png", "../../img/imgobjetosclase/tijera.png"]
    },
    {
        "audio_question": "../../audio/audio_objetos_clase/Pinturas.mp3",
        "image_answer": ["../../img/imgobjetosclase/lapices_de_colores.png", "../../img/imgobjetosclase/corrector.png"]
    },
    {
        "audio_question": "../../audio/audio_objetos_clase/Mapa.mp3",
        "image_answer": ["../../img/imgobjetosclase/mapa_mundo.png", "../../img/imgobjetosclase/calendario.png"]
    },
    {
        "image_question": "../../img/imgobjetosclase/pizarra_blanca.png",
        "audio_question": "../../audio/audio_objetos_clase/Pizarra.mp3",
        "image_answer": ["../../img/imgobjetosclase/marcador.png", "../../img/imgobjetosclase/lapiz.png"]
    }
];

document.querySelector("#h1objetosclase").innerHTML = titulo;

function detectarBoton(event){
    if(event.button == 2){
        respuesta = document.getElementById("img2").getAttribute("src");
        document.oncontextmenu = document.body.oncontextmenu = function(){ return false};
    } else if (event.button == 0){
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
        
        document.querySelector("#btnNext").disabled = true;
}

const evaluateAnswer = (answer, obj) => {
    const parentP = obj.parentNode;

    if(parentP.classList.contains("rigth") || parentP.classList.contains("wrong")){
        parentP.classList.remove('rigth', 'wrong');
    }

    if (answer == rigthAnswer) {
        audio.pause();
        parentP.classList.add('rigth');
        rigthAnswers++;
        document.querySelector('.rigthCounter').innerHTML = rigthAnswers;
        document.querySelector('#btnNext').disabled = true;
        if(arrayNumerosGenerados.length < 10){
            // currentQuestionIndex++;
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

function generarNumeroAleatorio(){
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
