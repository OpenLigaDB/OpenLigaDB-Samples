var jsdom = require('jsdom').jsdom;

var exposedProperties = ['window', 'navigator', 'document'];

global.document = jsdom('');
global.window = document.defaultView;
Object.keys(document.defaultView).forEach((property) => {
    if (typeof global[property] === 'undefined') {
        exposedProperties.push(property);
        global[property] = document.defaultView[property];
    }
});

// Seit Node 18 ist `navigator` ein Getter-only-Global, eine direkte Zuweisung
// würde daher einen TypeError werfen. defineProperty funktioniert in alten
// und neuen Node-Versionen.
Object.defineProperty(global, 'navigator', {
    value: {
        userAgent: 'node.js'
    },
    writable: true,
    configurable: true
});