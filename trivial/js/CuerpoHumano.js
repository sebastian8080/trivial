let rigthAnswer = null;
let currentQuestionIndex = 0;

//CONTADORES DE LAS RESPUESTAS CORRECTAS E INCORRECTAS
let rigthAnswers = 0;
let wrongAnswers = 0;

let opcion;
let opciones = [];

const cuestionary = [
    {
        "audio_question": "../../audio/Cual_de_los_siguientes_animales_hace_el_siguiente_sonido.mp3",
        "image_answer": ["../../img/imgcuerpohumano/boca.png", "../../img/imgcuerpohumano/cerebro.png"]
    },
    {
        "audio_question": "../../audio/Cual_de_los_siguientes_animales_hace_el_siguiente_sonido.mp3",
        "image_answer": ["../../img/imgcuerpohumano/corazon.png", "../../img/imgcuerpohumano/estomago.png"]
    },
    {
        "audio_question": "../../audio/Cual_de_los_siguientes_animales_hace_el_siguiente_sonido.mp3",
        "image_answer": ["../../img/imgcuerpohumano/intestino.png", "../../img/imgcuerpohumano/mano.png"]
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

const printHTMLQuestion = (i) => {
    //currentQuestionIndex++;
    let longitud_array = Object.keys(cuestionary).length;

    if (currentQuestionIndex <= longitud_array) {
        const q = cuestionary[i];
        let a = q.image_answer;
        rigthAnswer = a[0];

        a = a.sort((a, b) => Math.floor(Math.random() * 3) - 1);

        let audio = new Audio(q.audio_question);
        audio.play();

        let grid = 1;

        const htmlAnswerArray = a.map(currentA =>
            opciones[opciones.length] = `<button id="answer" class="btn btn-primary" onClick="evaluateAnswer('${currentA}', this)"><img src="${currentA}"></img></button>`,
        );

        opciones.forEach(() => {
            const htmlAnswer = htmlAnswerArray.join(' ');
            document.querySelector('#grid' + grid).innerHTML = htmlAnswer;
            grid++;
        })

        //Quede haciendo esta funcion que me pone en ambos grid pero me pone las dos imagenes

        document.querySelector('#btnNext').disabled = true;

    } else {
        alert("Juego terminado");
        document.querySelector('#btnNext').remove();
    }

}

const evaluateAnswer = (answer, obj) => {
    document.querySelectorAll('#answer').forEach(a => a.classList.remove('rigth', 'wrong'));
    const parentP = obj.parentNode;
    if (answer == rigthAnswer) {
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

