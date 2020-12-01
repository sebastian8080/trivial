let rigthAnswer = null;
let currentQuestionIndex = 0;

//CONTADORES DE LAS RESPUESTAS CORRECTAS E INCORRECTAS
let rigthAnswers = 0;
let wrongAnswers = 0;

//VARIABLES GLOBAL PARA REPRODUCIR Y PARAR EL AUDIO
let audio;
let audio_section;

//Variables para obtener la respuesta y el objeto button
let respuesta, objeto;

const cuestionary = [
    {
        "audio_question": "../../audio/Cual_de_los_siguientes_animales_hace_el_siguiente_sonido.mp3",
        "image_answer": ["../../img/imgcolores/arcoiris.png", "../../img/imgcolores/auto_rojo.png"]
    },
    {
        "audio_question": "../../audio/Cual_de_los_siguientes_animales_hace_el_siguiente_sonido.mp3",
        "image_answer": ["../../img/imgcolores/globo_negro.png", "../../img/imgcolores/hoja_verde.png"]
    },
    {
        "audio_question": "../../audio/Cual_de_los_siguientes_animales_hace_el_siguiente_sonido.mp3",
        "image_answer": ["../../img/imgcolores/luna_blanca.png", "../../img/imgcolores/mandarina_naranja.png"]
    },
    {
        "audio_question": "../../audio/Cual_de_los_siguientes_animales_hace_el_siguiente_sonido.mp3",
        "image_answer": ["../../img/imgcolores/nubes_celeste.png", "../../img/imgcolores/pez_morado.png"]
    },
    {
        "audio_question": "../../audio/Cual_de_los_siguientes_animales_hace_el_siguiente_sonido.mp3",
        "image_answer": ["../../img/imgcolores/sol.png", "../../img/imgcolores/tronco_cafe.png"]
    },
    {
        "audio_question": "../../audio/Cual_de_los_siguientes_animales_hace_el_siguiente_sonido.mp3",
        "image_answer": ["../../img/imgcolores/flores_rosas.png", "../../img/imgcolores/hoja_verde.png"]
    },
    {
        "audio_question": "../../audio/Cual_de_los_siguientes_animales_hace_el_siguiente_sonido.mp3",
        "image_answer": ["../../img/imgcolores/crayon_azul.png", "../../img/imgcolores/nubes_celeste.png"]
    },
    {
        "audio_question": "../../audio/Cual_de_los_siguientes_animales_hace_el_siguiente_sonido.mp3",
        "image_answer": ["../../img/imgcolores/conejo_plomo.png", "../../img/imgcolores/jaguar_naranja.png"]
    },
    {
        "audio_question": "../../audio/Cual_de_los_siguientes_animales_hace_el_siguiente_sonido.mp3",
        "image_answer": ["../../img/imgcolores/campana_dorada.png", "../../img/imgcolores/sofa_verde_agua.png"]
    }
];

function detectarBoton(event){
    if(event.button == 2){
        respuesta = document.getElementById("img2").getAttribute("src");
        document.oncontextmenu = document.body.oncontextmenu = function(){return false};
    } else if(event.button == 0){
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

        audio_section = new Audio(q.audio_section);

        //Variable para ponerle un id al boton de la respuesta
        let idimageQuestion = 1;
        let idimage = 1;

        const htmlAnswerArray = a.map(currentA =>
            `<button id="answer${idimageQuestion++}" class="btn btn-primary" onClick="evaluateAnswer('${currentA}', this)"><img id="img${idimage++}" src="${currentA}"></img></button>`,
        );

        const htmlAnswer = htmlAnswerArray.join(' ');
        document.querySelector('#grid1').innerHTML = htmlAnswer;

        document.querySelector('#btnNext').disabled = true;

    } else {
        alert("Juego terminado");
        document.querySelector('#btnNext').remove();
        window.location.href = "../../sections.html";
        audio_section.pause();
    }

}

const evaluateAnswer = (answer, obj) => {
    document.querySelectorAll('#grid1').forEach(a => a.classList.remove('rigth', 'wrong'));
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

