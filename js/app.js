// Variables
const formulario = document.querySelector('#formulario');
const listaTweets = document.querySelector('#lista-tweets');
let tweets = [];

//Event Listeners
eventListeners();

function eventListeners() {
    formulario.addEventListener('submit', agregarTweet);

    //Cuando el documento está listo
    document.addEventListener('DOMContentLoaded', () => {
        tweets = JSON.parse( localStorage.getItem('tweets')) || [];
        console.log(tweets);
        crearHTML();
    });
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
    const tweetObj = {
        id: Date.now(),
        tweet
    }
    //Añadir al array de tweets
    tweets = [...tweets, tweetObj];

    //Crear HTML

    crearHTML();

    //Reiniciar el form
    formulario.reset();
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


function crearHTML() {

    limpiarHTMl();

    if (tweets.length > 0) {
        tweets.forEach( tweet => {
            //agregar boton eliminar
            const btnEliminar = document.createElement('a');
            btnEliminar.classList.add('borrar-tweet');
            btnEliminar.innerText = 'X';

            //Añadir la funcion de eliminar
            btnEliminar.onclick = () => {
                borrarTweet(tweet.id);
            }

            //crear HTML

            const li = document.createElement('li');
            
            //añadir text
            li.innerText = tweet.tweet;

            //Asignar el boton
            li.appendChild(btnEliminar);

            //insertar en el HTMl 
            listaTweets.appendChild(li);
        })
    }
    sincronizarStorage();
};

//Agrega los tweets al local Storage
function sincronizarStorage() {
    localStorage.setItem('tweets', JSON.stringify(tweets));
}

//Elimina el tweet
function borrarTweet(id) {
    tweets = tweets.filter( tweet => tweet.id !== id);

    crearHTML();
}

//limpiar HTMl
function limpiarHTMl() {
    while (listaTweets.firstChild) {
        listaTweets.removeChild(listaTweets.firstChild)
    }
}