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
let titulo = "Los Animales";

//Variable para la imageQuestion
let imageQuestion;

        const cuestionary = [
            {
                "audio_section" : "../../audio/audio_animales/Musica_fondo.mp3",
                "audio_question": "../../audio/audio_animales/Cual_de_los_siguientes_animales_hace_el_siguiente_sonido.mp3",
                "image_answer": ["../../img/imganimales/vaca_animada.png", "../../img/imganimales/caballo_animado.png"]
            },
            {
                "audio_question": "../../audio/audio_animales/Cual_de_los_siguientes_animales_hace_este_sonido.mp3",
                "image_answer": ["../../img/imganimales/buho_animado.png", "../../img/imganimales/aguila_animada.png"]   
            },
            {
                "audio_question": "../../audio/audio_animales/Cual_de_estos_dos_animales_hace_el_siguiente_sonido.mp3",
                "image_answer": ["../../img/imganimales/cerdo_animado.png", "../../img/imganimales/vaca_animada.png"]
            },
            {
                "audio_question": "../../audio/audio_animales/Que_animal_hace_asi.mp3",
                "image_answer": ["../../img/imganimales/caballo_animado.png", "../../img/imganimales/rinoceronte_animado.png"]
            },
            {
                "audio_question": "../../audio/audio_animales/Audio_ballena.mp3",
                "image_answer": ["../../img/imganimales/ballena_animada.png", "../../img/imganimales/delfin_animado.png"]
            },
            {
                "audio_question": "../../audio/audio_animales/Audio_elefante.mp3",
                "image_answer": ["../../img/imganimales/elefante_animado.png", "../../img/imganimales/jirafa_animada.png"]
            },
            {
                "audio_question": "../../audio/audio_animales/Audio_pato.mp3",
                "image_answer": ["../../img/imganimales/pato_animado.png", "../../img/imganimales/gallina_animada.png"]
            },
            {
                "audio_question": "../../audio/audio_animales/Audio_perro.mp3",
                "image_answer": ["../../img/imganimales/perro_animado.png", "../../img/imganimales/gato_animado.png"]
            },
            {
                "audio_question": "../../audio/audio_animales/Audio_leon.mp3",
                "image_answer": ["../../img/imganimales/leon_animado.png", "../../img/imganimales/oso_animado.png"]
            },
            {
                "audio_question": "../../audio/audio_animales/Audio_gato.mp3",
                "image_answer": ["../../img/imganimales/gato_animado2.png", "../../img/imganimales/raton_animado.png"]
            }
        ];

        //Poniendo el titulo en la seccion
        document.querySelector('#h1animales').innerHTML = titulo;

        //Funcion para ver que boton del mouse presiona, segun eso se manda la respuesta
        function detectarBoton(event){
            if(event.button == 2){
                respuesta = document.getElementById("img2").getAttribute("src");
                document.oncontextmenu = document.body.oncontextmenu = function(){ return false }; //No permite que se abra el menu al presionar click derecho
            } else if (event.button == 0){
                respuesta = document.getElementById("img1").getAttribute("src");
            }
            objeto = document.getElementById("grid1");
            evaluateAnswer(respuesta, objeto);
        }
        

        //Imprime las preguntas segun vaya avanzando
        const printHTMLQuestion = (i) => {
            //currentQuestionIndex++;
            let longitud_array = Object.keys(cuestionary).length;

            // if(currentQuestionIndex <= longitud_array - 1){
                if(arrayNumerosGenerados.length <= 10){
                console.log("currenQuestionIndex: " + currentQuestionIndex + " longitud_array: " + longitud_array);
                const q = cuestionary[i];
                let a = q.image_answer;
                imageQuestion = q.image_question;
                rigthAnswer = a[0];

                if(imageQuestion != null){
                    document.querySelector('#imgQuestion').setAttribute("src", imageQuestion);
                    document.querySelector('#imgQuestion').style.display = 'block';
                } else {
                    document.querySelector('#imgQuestion').style.display = 'none';
                }

                a = a.sort((a, b) => Math.floor(Math.random() * 3) -1);

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

            } else {
                audio_section.pause();
                document.querySelector('#parrafoIntentos').innerHTML = rigthAnswers + wrongAnswers;
                document.querySelector('#parrafoCorrectas').innerHTML = rigthAnswers;
                document.querySelector('#parrafoIncorrectas').innerHTML = wrongAnswers;
                document.querySelector('.alert').style.display = 'block';
                document.querySelector('#btnNext').remove();
                setTimeout(function(){
                    window.location.href = "../../sections.html";
                }, 5000);   
            }
        }

        const evaluateAnswer = (answer, obj) => {
            const parentP = obj.parentNode;
            /*
                Al añadir este if ya me cambia de color 
                al cambiar la pregunta, pero no le quita
                la clase
            */
            if(parentP.classList.contains("rigth") || parentP.classList.contains("wrong")){
                parentP.classList.remove('rigth', 'wrong');
            }

            console.log(parentP);
            if (answer == rigthAnswer) {
                audio.pause();
                parentP.classList.add('rigth');
                rigthAnswers++;
                document.querySelector('.rigthCounter').innerHTML = rigthAnswers;
                document.querySelector('#btnNext').disabled = false;
                let numero = generarNumeroAleatorio();
                console.log('Siguientes numeros generados -> ' + numero);
                // currentQuestionIndex++;
                printHTMLQuestion(numero);
            } else {
                parentP.classList.add('wrong');
                wrongAnswers++;
                document.querySelector('.wrongCounter').innerHTML = wrongAnswers;
            }
        }

        const iniciarTest = _ => {
            let numero = generarNumeroAleatorio();
            console.log('Primer numero generado -> ' + numero);
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