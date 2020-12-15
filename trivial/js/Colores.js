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

let titulo = "Los Colores";

const cuestionary = [
    {
        "audio_question": "../../audio/Cual_de_los_siguientes_animales_hace_el_siguiente_sonido.mp3",
        "image_answer": ["../../img/imgcolores/auto_rojo.png", "../../img/imgcolores/auto_negro.png"]
    },
    {
        "audio_question": "../../audio/Cual_de_los_siguientes_animales_hace_el_siguiente_sonido.mp3",
        "image_answer": ["../../img/imgcolores/flor_azul.png", "../../img/imgcolores/flor_rosa.png"]
    },
    {
        "audio_question": "../../audio/Cual_de_los_siguientes_animales_hace_el_siguiente_sonido.mp3",
        "image_answer": ["../../img/imgcolores/pera_verde.png", "../../img/imgcolores/naranja.png"]
    },
    {
        "audio_question": "../../audio/Cual_de_los_siguientes_animales_hace_el_siguiente_sonido.mp3",
        "image_answer": ["../../img/imgcolores/ardilla_cafe.png", "../../img/imgcolores/pez_morado.png"]
    },
    {
        "audio_question": "../../audio/Cual_de_los_siguientes_animales_hace_el_siguiente_sonido.mp3",
        "image_answer": ["../../img/imgcolores/sol.png", "../../img/imgcolores/luna_blanca.png"]
    },
    {
        "audio_question": "../../audio/Cual_de_los_siguientes_animales_hace_el_siguiente_sonido.mp3",
        "image_answer": ["../../img/imgcolores/pelota_naranja.png", "../../img/imgcolores/pelota_morada.png"]
    },
    {
        "audio_question": "../../audio/Cual_de_los_siguientes_animales_hace_el_siguiente_sonido.mp3",
        "image_answer": ["../../img/imgcolores/blusa_celeste.png", "../../img/imgcolores/blusa_verde.png"]
    },
    {
        "audio_question": "../../audio/Cual_de_los_siguientes_animales_hace_el_siguiente_sonido.mp3",
        "image_answer": ["../../img/imgcolores/cebra_blanco_negro.png", "../../img/imgcolores/jaguar_naranja.png"]
    },
    {
        "audio_question": "../../audio/Cual_de_los_siguientes_animales_hace_el_siguiente_sonido.mp3",
        "image_answer": ["../../img/imgcolores/durazno_naranja.png", "../../img/imgcolores/uva_morada.png"]
    },
    {
        "audio_question": "../../audio/Cual_de_los_siguientes_animales_hace_el_siguiente_sonido.mp3",
        "image_answer": ["../../img/imgcolores/flamengo_rosado.png", "../../img/imgcolores/mono_cafe.png"]
    }
];

document.querySelector('#h1colores').innerHTML = titulo;

// window.onbeforeunload = function(){
//     return confirm("Seguro que quieres salir");
// }

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

    if (currentQuestionIndex <= longitud_array - 1) {
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
        let intentos = rigthAnswers + wrongAnswers;
        alert("Juego terminado" + "Intentos: " + intentos + " Correctas: " + rigthAnswers + " Incorrectas: " + wrongAnswers);
        document.querySelector('#btnNext').remove();
        window.location.href = "../../sections.html";
        audio_section.pause();
    }

}

const evaluateAnswer = (answer, obj) => {
    //document.querySelectorAll('#grid1').forEach(a => a.classList.remove('rigth', 'wrong'));
    const parentP = obj.parentNode;
    if(parentP.classList.contains('rigth') || parentP.classList.contains('wrong')){
        parentP.classList.remove('rigth', 'wrong');
    }
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

function mandarMensaje(){
    alert("Juego terminado");
}
