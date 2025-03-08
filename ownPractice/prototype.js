// Fundamental Prototypes
console.log("Object Prototype:", Object.prototype);
console.log("Function Prototype:", Function.prototype);
console.log("Array Prototype:", Array.prototype);
console.log("String Prototype:", String.prototype);
console.log("Number Prototype:", Number.prototype);
console.log("Boolean Prototype:", Boolean.prototype);

// Specialized Prototypes
console.log("Symbol Prototype:", Symbol.prototype);
console.log("BigInt Prototype:", BigInt.prototype);
console.log("Date Prototype:", Date.prototype);
console.log("RegExp Prototype:", RegExp.prototype);
console.log("Error Prototype:", Error.prototype);

// Collection Prototypes
console.log("Map Prototype:", Map.prototype);
console.log("Set Prototype:", Set.prototype);
console.log("WeakMap Prototype:", WeakMap.prototype);
console.log("WeakSet Prototype:", WeakSet.prototype);

// Structured Data Prototypes
console.log("ArrayBuffer Prototype:", ArrayBuffer.prototype);
console.log("DataView Prototype:", DataView.prototype);
console.log("TypedArray Prototype:", Object.getPrototypeOf(Uint8Array.prototype)); // Base prototype for typed arrays

// Web API Prototypes (Only in Browsers)
if (typeof window !== "undefined") {
    console.log("Window Prototype:", Window.prototype);
    console.log("Document Prototype:", Document.prototype);
    console.log("HTMLElement Prototype:", HTMLElement.prototype);
    console.log("Node Prototype:", Node.prototype);
    console.log("Event Prototype:", Event.prototype);
    console.log("Promise Prototype:", Promise.prototype);
    console.log("Fetch Prototype:", Object.getPrototypeOf(fetch)); // fetch doesn't have a direct prototype
    console.log("WebSocket Prototype:", WebSocket.prototype);
    console.log("Storage Prototype:", Storage.prototype);
}

// Other Prototypes
console.log("JSON Object (not a prototype):", JSON);
console.log("Math Object (not a prototype):", Math);
