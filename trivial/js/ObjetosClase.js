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

const cuestionary = [
    {
        "audio_question": "../../audio/audio_animales/Audio_ballena.mp3",
        "image_answer": ["../../img/imgobjetosclase/boligrafo.png", "../../img/imgobjetosclase/borrador.png"]
    },
    {
        "audio_question": "../../audio/Cual_de_los_siguientes_animales_hace_el_siguiente_sonido.mp3",
        "image_answer": ["../../img/imgobjetosclase/carpeta.png", "../../img/imgobjetosclase/cartuchera.png"]
    },
    {
        "audio_question": "../../audio/Cual_de_los_siguientes_animales_hace_el_siguiente_sonido.mp3",
        "image_answer": ["../../img/imgobjetosclase/corrector.png", "../../img/imgobjetosclase/cuaderno.png"]
    },
    {
        "audio_question": "../../audio/Cual_de_los_siguientes_animales_hace_el_siguiente_sonido.mp3",
        "image_answer": ["../../img/imgobjetosclase/grapadora.png", "../../img/imgobjetosclase/lapiz.png"]
    },
    {
        "audio_question": "../../audio/Cual_de_los_siguientes_animales_hace_el_siguiente_sonido.mp3",
        "image_answer": ["../../img/imgobjetosclase/mochila.png", "../../img/imgobjetosclase/pega.png"]
    },
    {
        "audio_question": "../../audio/Cual_de_los_siguientes_animales_hace_el_siguiente_sonido.mp3",
        "image_answer": ["../../img/imgobjetosclase/pizarron.png", "../../img/imgobjetosclase/pupitre.png"]
    },
    {
        "audio_question": "../../audio/Cual_de_los_siguientes_animales_hace_el_siguiente_sonido.mp3",
        "image_answer": ["../../img/imgobjetosclase/regla.png", "../../img/imgobjetosclase/tijera.png"]
    },
    {
        "audio_question": "../../audio/Cual_de_los_siguientes_animales_hace_el_siguiente_sonido.mp3",
        "image_answer": ["../../img/imgobjetosclase/borrador.png", "../../img/imgobjetosclase/grapadora.png"]
    },
    {
        "audio_question": "../../audio/Cual_de_los_siguientes_animales_hace_el_siguiente_sonido.mp3",
        "image_answer": ["../../img/imgobjetosclase/tijera.png", "../../img/imgobjetosclase/pega.png"]
    }
];

document.querySelector(".jumbotron").innerHTML = titulo;

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
    //currentQuestionIndex++;
    let longitud_array = Object.keys(cuestionary).length;

    if (currentQuestionIndex <= longitud_array) {
        const q = cuestionary[i];
        let a = q.image_answer;
        rigthAnswer = a[0];

        a = a.sort((a, b) => Math.floor(Math.random() * 3) - 1);

        audio = new Audio(q.audio_question);
        audio.play();

        /*
            Aqui faltaria el audio para el fondo
        */

        let idimageQuestion = 1;
        let idimage = 1;

        const htmlAnswerArray = a.map(currentA =>
            `<button id="answer${idimageQuestion++}" class="btn btn-primary" onClick="evaluateAnswer('${currentA}', this)"><img id="img${idimage++}" src="${currentA}"></img></button>`,
        );

        const htmlAnswer = htmlAnswerArray.join(' ');
        document.querySelector('#grid1').innerHTML = htmlAnswer;
        
        document.querySelector("#btnNext").disabled = true;
    } else {
        alert("Juego terminado");
        document.querySelector('#btnNext').remove();
        window.location.href = "../../sections.html";
    }

}

const evaluateAnswer = (answer, obj) => {

    document.querySelectorAll('#grid1').forEach(a => a.classList.remove('rigth', 'wrong'));
    const parentP = obj.parentNode;
    if (answer == rigthAnswer) {
        audio.pause();
        parentP.classList.add('rigth');
        rigthAnswers++;
        document.querySelector('.rigthCounter').innerHTML = rigthAnswers;
        document.querySelector('#btnNext').disabled = true;
        currentQuestionIndex++;
        printHTMLQuestion(currentQuestionIndex);
    } else {
        parentP.classList.add('wrong');
        wrongAnswers++;
        document.querySelector('.wrongCounter').innerHTML = wrongAnswers;
    }
}

const iniciarTest = _ => {
    printHTMLQuestion(currentQuestionIndex);
    document.querySelector('#btnIniciar').style.display = 'none';
    document.querySelector('.container').style.display = 'block';
    document.querySelector('#btnNext').style.display = 'none';
}

