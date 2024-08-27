/* 
Descrizione:
Visualizzare in pagina 5 numeri casuali. Da lì parte un timer di 30 secondi.

Dopo 30 secondi i numeri scompaiono e appaiono invece 5 input in cui l'utente deve inserire i numeri che ha visto precedentemente, nell'ordine che preferisce.

Dopo che sono stati inseriti i 5 numeri, il software dice quanti e quali dei numeri da indovinare sono stati individuati.

NOTA: non è importante l'ordine con cui l'utente inserisce i numeri, basta che ne indovini il più possibile.

BONUS 1:
Inseriamo la validazione: se l'utente mette due numeri uguali o inserisce cose diverse da numeri lo blocchiamo in qualche modo.

BONUS 2:
Generiamo gli input da JS, invece di scriverli nel codice
*/

// Funzione che genera un array di numeri casuali
function generateRandNumbArr(maxLength) {
    const randomNumbers = [];
    while(randomNumbers.length < maxLength) {
        const randomNumber = getRandomNumber(1, 50);
        if (!randomNumbers.includes(randomNumber)) randomNumbers.push(randomNumber);
    }
    return randomNumbers;
}


/**
 * % Funzione che crea x nodi
 * @param {number} max Il massimo di elementi che vogliamo creare
 * @returns {element} La catena di nodi che è stata creata
 */
function createXNode(max) {
    for (let i = 0; i < max; i++) {
        const randomNumbers = generateRandNumbArr(maxLength);
        const randomNumber = randomNumbers[i];

        const randNumbChild = createNode('li', '', randomNumber);
        
        
        RandNumbElement.appendChild(randNumbChild);
        
        
    }
    return RandNumbElement;
}

// # fase di preparazione
// Recuperiamo gli elementi dal DOM
const form = document.querySelector('form');
const RandNumbElement = document.getElementById('random-number');
const counterElement = document.getElementById('counter');
const inputsNumb = document.getElementById('inputs');
const buttonPlay = document.getElementById('button-play');
const buttonSubmit = document.getElementById('button-submit');
const h2 = document.querySelector('h2');
const p = document.querySelector('p');

// Preparo le variabili
// Preparo il numero di elementi max da creare
const maxLength = 5;
let counter = 10;
let randomNumbers = [];

// # Fase di gestione eventi
// Metto in ascolto sugli eventi il form con l'evento 'click'
buttonPlay.addEventListener('click', function() {
    
    // Disabilitiamo il bottone
    buttonPlay.classList.add('d-none');

    // Richiamo la funzione che crea x nodi
    createXNode(maxLength);
    // Creiamo una timing function che agisce ogni 1 secondo
    const interval = setInterval(() => {
        // Imponiamo una condizione in counter === 0
        if(counter === 0) {
            // Stoppiamo dopo 30 secondi il counter
            clearInterval(interval, 10000);
            // Cambiamo il testo dell h2
            h2.innerText = 'Inserisci i numeri che ricordi.'
            // Facciamo scomparire il p con il counter
            p.classList.add('d-none');
            // Facciamo scomparie i numeri random
            RandNumbElement.classList.add('d-none');
            // Facciamo apparire gli input
            inputsNumb.classList.remove('d-none');

            buttonSubmit.classList.remove('d-none');
            buttonSubmit.addEventListener('click', function(e) {
                // ! Blocchiamo il comportamento del form
                e.preventDefault();
                const inputsElements = document.querySelectorAll('input');
                console.log(inputsElements)
                const inputsValue = [];
                for (let i = 0; i < inputsElements.length; i++) {
                    inputsValue.push(inputsElements.value);
                } 
                console.table(inputsValue)
            })

        }
        counterElement.innerText = counter--;
    }, 1000);
    

})
