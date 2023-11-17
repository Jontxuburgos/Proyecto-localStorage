// Variables
const formulario = document.querySelector('#formulario');
const listaTweets = document.querySelector('#lista-tweets');
let tweets = [];

//Event Listeners
eventListeners();

function eventListeners() {
    formulario.addEventListener('submit', agregarTweet);
}

//Funciones

function agregarTweet(e) {
    e.preventDefault();

    //Textarea donde escribe el usuario
    const tweet = document.querySelector('#tweet').value;

    //Validacion
    if(tweet === ''){
        mostrarError('Un mensaje no puede ir vacio')
        return;
    }
    console.log('Agregando tweet')
};

//mostrar Error

function mostrarError(error) {
    const mensajeError = document.createElement('p');
    mensajeError.textContent = error;
    mensajeError.classList.add('error');

    //Insertarlo
    const contenido = document.querySelector('#contenido');
    contenido.appendChild(mensajeError);

    setTimeout(() => {
        mensajeError.remove();
    }, 3000);
};