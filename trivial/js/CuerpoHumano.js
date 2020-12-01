let rigthAnswer = null;
let currentQuestionIndex = 0;

//CONTADORES DE LAS RESPUESTAS CORRECTAS E INCORRECTAS
let rigthAnswers = 0;
let wrongAnswers = 0;

//Variables para los audio
let audio, audio_section;

//Variables para obtener la respuesta y el objeto button
let respuesta, objeto;

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

function detectarBoton(event){
    if(event.button == 2){
        respuesta = document.getElementById("img2").getAttribute("src");
        document.oncontextmenu = document.body.oncontextmenu = function(){return false};
    }else if(event.button == 0){
        respuesta = document.getElementsById("img1").getAttribute("src");
    }
    objeto = document.getElementsById("grid1");
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
            Falta el audio_section
        */

        let idimageQuestion = 1;
        let idimage = 1;

        const htmlAnswerArray = a.map(currentA =>
            `<button id="answer${idimageQuestion++}" class="btn btn-primary" onClick="evaluateAnswer('${currentA}', this)"><img id="img${idimage++}" src="${currentA}"></img></button>`,
        );

        const htmlAnswer = htmlAnswerArray.join(' ');
        document.querySelector("#grid1").innerHTML = htmlAnswer;

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

