let rigthAnswer = null;
let currentQuestionIndex = 0;

//CONTADORES DE LAS RESPUESTAS CORRECTAS E INCORRECTAS
let rigthAnswers = 0;
let wrongAnswers = 0;

//Variables para los audios
let audio;
let audio_section;

//Variables para obtener la respuesta y el objeto buttons
let respuesta, objeto;

//Variable para poner titulo
let titulo = "Las Emociones";

        const cuestionary = [
            {
                "audio_question": "../../audio/Cual_de_los_siguientes_animales_hace_el_siguiente_sonido.mp3",
                "image_answer": ["../../img/imgemociones/chico_asustado.png", "../../img/imgemociones/hombre_enojado.png"]
            },
            {
                "audio_question": "../../audio/Cual_de_los_siguientes_animales_hace_el_siguiente_sonido.mp3",
                "image_answer": ["../../img/imgemociones/hombre_sorprendido.png", "../../img/imgemociones/mujer_feliz.png"]
            },
            {
                "audio_question": "../../audio/Cual_de_los_siguientes_animales_hace_el_siguiente_sonido.mp3",
                "image_answer": ["../../img/imgemociones/leon_triste.png", "../../img/imgemociones/rinoceronte_animado.png"]
            },
            {
                "audio_question": "../../audio/Cual_de_los_siguientes_animales_hace_el_siguiente_sonido.mp3",
                "image_answer": ["../../img/imgemociones/aguila_animada.png", "../../img/imgemociones/buho_animado.png"]
            },
            {
                "audio_question": "../../audio/Cual_de_los_siguientes_animales_hace_el_siguiente_sonido.mp3",
                "image_answer": ["../../img/imgemociones/delfin_animado.png", "../../img/imgemociones/ballena_animada.png"]
            },
            {
                "audio_question": "../../audio/Cual_de_los_siguientes_animales_hace_el_siguiente_sonido.mp3",
                "image_answer": ["../../img/imgemociones/elefante_animado.png", "../../img/imgemociones/jirafa_animada.png"]
            },
            {
                "audio_question": "../../audio/Cual_de_los_siguientes_animales_hace_el_siguiente_sonido.mp3",
                "image_answer": ["../../img/imgemociones/gallina_animada.png", "../../img/imgemociones/pato_animado.png"]
            },
            {
                "audio_question": "../../audio/Cual_de_los_siguientes_animales_hace_el_siguiente_sonido.mp3",
                "image_answer": ["../../img/imgemociones/perro_animado.png", "../../img/imgemociones/gato_animado.png"]
            },
            {
                "audio_question": "../../audio/Cual_de_los_siguientes_animales_hace_el_siguiente_sonido.mp3",
                "image_answer": ["../../img/imgemociones/leon_animado.png", "../../img/imgemociones/oso_animado.png"]
            }
        ];
        document.querySelector('#h1emociones').innerHTML = titulo;

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

            if(currentQuestionIndex <= longitud_array){
                const q = cuestionary[i];
                let a = q.image_answer;
                rigthAnswer = a[0];

                a = a.sort((a, b) => Math.floor(Math.random() * 3) -1);

                audio = new Audio(q.audio_question);
                audio.play();

                /*
                    Aqui falta el audio_section
                */
            
                let idimageQuestion = 1;
                let idimage = 1;

                const htmlAnswerArray = a.map(currentA =>
                   `<button id="answer${idimageQuestion++}"><img id="img${idimage++}" src="${currentA}"></img></button>`,   
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

        const iniciarTest = _ =>{
            printHTMLQuestion(currentQuestionIndex);
            document.querySelector('#btnIniciar').style.display = 'none';
            document.querySelector('.container').style.display = 'block';
            document.querySelector('#btnNext').style.display = 'none';
        }
        
        