let rigthAnswer = null;
let currentQuestionIndex = 0;

//CONTADORES DE LAS RESPUESTAS CORRECTAS E INCORRECTAS
let rigthAnswers = 0;
let wrongAnswers = 0;

//
let audio;
let audio_section;

const cuestionary = [
    {
        "audio_question": "../../audio/Cual_de_los_siguientes_animales_hace_el_siguiente_sonido.mp3",
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

        let grid = 1;

        const htmlAnswerArray = a.map(currentA =>
            `<button id="answer" class="btn btn-primary" onClick="evaluateAnswer('${currentA}', this)"><img src="${currentA}"></img></button>`,
        );

        const htmlAnswer = htmlAnswerArray.join(' ');
        document.querySelector('#grid' + grid).innerHTML = htmlAnswer;
        //grid++;

        //Quede haciendo esta funcion que me pone en ambos grid pero me pone las dos imagenes

        document.querySelector('#btnNext').disabled = true;

    } else {
        alert("Juego terminado");
        document.querySelector('#btnNext').remove();
        window.location.href = "../../sections.html";
    }

}

const evaluateAnswer = (answer, obj) => {

    document.querySelectorAll('#answer').forEach(a => a.classList.remove('rigth', 'wrong'));
    const parentP = obj.parentNode;
    if (answer == rigthAnswer) {
        audio.pause();
        parentP.classList.add('rigth');
        rigthAnswers++;
        document.querySelector('.rigthCounter').innerHTML = rigthAnswers;
        document.querySelector('#btnNext').disabled = false;
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

