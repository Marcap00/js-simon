// # NUMERO RANDOM
/**
 * % Genera un numero random tra un minimo e un massimo (max incluso o no)
 * @param {number} min Minimo numero che può essere generato (default: 1)
 * @param {number} max Massimo numero che può essere generato (default: 100)
 * @param {boolean} isMaxIncluded Se il massimo è incluso o no
 * @returns {Nan|null|number} Numero casuale o null o NaN
 */
function getRandomNumber(min = 1, max = 100, isMaxIncluded = true) {
    if (isNaN(min) || isNaN(max)) {
        console.error('min e max devono essere numeri');
        return NaN;
    }

    if (min >= max) {
        console.error('min deve essere inferiore al max');
        return null;
    }

    if (isMaxIncluded) max++;
    return Math.floor(Math.random() * (max - min)) + min;
}


// # CREATE NODE
/**
 * % Funzione che crea un nodo del DOM
 * @param {string} type Tipo di elemento che vogliamo creare
 * @param {string} className Quali classi vogliamo dare all'elemento
 * @param {string|number} content Il tipo di content dell'elemento string o number
 * @returns {element} l'elemento che abbiamo creato
 */ 
function createNode(type, className = '', content = '') {
    const node = document.createElement(type);
    node.className = className;
    node.append(content);
    return node;
}


// Funzione che crea un nodo 
function createNodes(type, className, content, typeContent) {
    const node = document.createElement(type);
    node.className = className;
    if (content === 'object') {
        const subnode = document.createElement(typeContent);
        node.appendChild(subnode);
    }
    else if (typeof content === 'string' || typeof content === 'number') {
        node.append(content);
    }
    return node;
}
