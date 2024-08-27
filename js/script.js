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


// Funzione che genera un array
function generateArray(max, inputsElements) {
    for (let i = 0; i < max; i++) {
        const inputElement = inputsElements[i].value;
        if(!inputElement) {
            alert('Non hai scritto dei numeri');
            console.log(inputElement);
            return;
        }
        else inputsValue.push(parseInt(inputElement));
       
    } 
    return inputsValue;
}

// Funzione che genera un array di numeri casuali
function generateRandNumbArr(maxLength) {
    while(randomNumbers.length < maxLength) {
        const randomNumber = getRandomNumber(1, 50);
        if (!randomNumbers.includes(randomNumber)) randomNumbers.push(randomNumber);
    }
    return randomNumbers;
}

/**
 * % Funzione che crea X nodi
 * @param {number} max Il massimo di elementi che vogliamo creare
 * @returns {element} La catena di nodi che è stata creata
 */
function createXNodes(max) {
    for (let i = 0; i < max; i++) {
        const randomNumbers = generateRandNumbArr(maxLength);
        const randomNumber = randomNumbers[i];
        const randNumbChild = createNode('li', '', randomNumber);
        RandNumbElement.appendChild(randNumbChild);
    }
    return RandNumbElement;
}

// Funzione che crea x nodi
function createXinput(max) {
    for (let i = 0; i < max; i++) {
        const cols = createNodes('div', 'col-1');
        const input = document.createElement('input');
        input.className = ('form-control');
        input.type = 'number';
        cols.appendChild(input);
        inputsNumb.appendChild(cols);
    }
    return inputsNumb;
}

// Funzione che fa apparire gli elementi
function AppearElements() {
    // Cambiamo il testo dell h2
    h2.innerText = 'Inserisci i numeri che hai memorizzato.'
    // Facciamo scomparire il p con il counter
    p.innerHTML = '';
    // Facciamo scomparie i numeri random
    RandNumbElement.classList.add('d-none');
    // Facciamo apparire gli input
    inputsNumb.classList.remove('d-none');
    // Facciamo scomparire il bottone play
    buttonPlay.classList.add('d-none');
    // Facciamo apparire il bottone 
    buttonSubmit.classList.remove('d-none');
}

// Funzione che termina la partita
function endGame(interval) {
    // Imponiamo una condizione in counter === 0
    if(counter === 0) {
        // Stoppiamo dopo 30 secondi il counter
        clearInterval(interval, 30000);
        // Facciamo apparire gli elementi con una funzione
        AppearElements();
        // Mettiamo in ascolto il bottone submit sul click
        buttonSubmit.addEventListener('click', function(e) {
            // ! Blocchiamo il comportamento del form
            e.preventDefault();
            // Recuperiamo tutti gli input dal DOM
            const inputsElements = document.querySelectorAll('input');
            console.log(inputsElements);
            // Generiamo un array con gli elementi degli inputsELements
            const inputNumb = generateArray(inputsElements.length, inputsElements);
            if(!inputNumb) return;
            console.table(inputNumb);
            
            // Apro un ciclo per verificare se gli elementi dei due array sono uguali
            for(let i = 0; i < randomNumbers.length; i++) {
                // Se sono uguali aumento lo score
                if(randomNumbers.includes(inputNumb[i])) {
                    score += 1;
                }
            }
            // A seconda dei numeri uguali stampiamo il risultato in pagina
            const letter = score === 1 ? 'o' : 'i';
            result.innerText = `Hai indovinato ${score} numer${letter} su ${maxLength}!`;
        })
    }
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
const result = document.getElementById('result');

// Preparo le variabili
// Preparo il numero di elementi max da creare
const maxLength = 5;
let counter = 30;
let randomNumbers = [];
let inputsValue = [];
let score = 0;

// # Fase di gestione eventi
// Metto in ascolto sugli eventi il form con l'evento 'click'
buttonPlay.addEventListener('click', function() {
    
    // Disabilitiamo il bottone
    buttonPlay.disabled = true;

    // Richiamo la funzione che crea x nodi
    createXNodes(maxLength);
    console.table(randomNumbers);
    createXinput(maxLength);
    counterElement.innerText = counter;
    // Creiamo una timing function che agisce ogni 1 secondo
    const interval = setInterval(() => {
        // Chiamiamo la funzione di fine partita
        endGame(interval);
        counterElement.innerText = --counter;
    }, 1000);
})


