# Detector de Mutantes ADN 🧬

¡Hola! Soy Roberto, y este es el proyecto que he desarrollado para el detector de mutantes. Se trata de una aplicación sencilla pero robusta construida con **Angular**, diseñada para identificar si un ADN humano tiene rasgos mutantes basándose en sus bases nitrogenadas.

## ¿De qué trata el proyecto?

El objetivo es detectar si hay más de una secuencia de cuatro letras iguales (A, T, C, G) en cualquier dirección: horizontal, vertical o diagonal. Si se encuentra más de una, ¡entonces tenemos un mutante!

## ¿Cómo está construido?

He decidido usar una estructura moderna y limpia:

1.  **Angular (Standalone Components):** He configurado el proyecto para usar componentes independientes. Esto hace que sea mucho más ligero y fácil de entender, evitando la complejidad de los módulos tradicionales.
2.  **Servicio Centralizado (`ADNValidatorService`):** Toda la "magia" del algoritmo vive aquí. He separado la lógica de la vista para que el código sea ordenado y podamos probar el algoritmo sin depender de lo que pasa en la pantalla.
3.  **Interfaz Intuitiva:** He diseñado una vista única donde puedes pegar tu secuencia de ADN, verla organizada en una cuadrícula y obtener el resultado al instante con una respuesta visual clara.

## El Algoritmo 🧠

El algoritmo escanea la matriz de ADN buscando patrones de 4 letras seguidas. Se detiene en cuanto encuentra la segunda coincidencia para ser lo más eficiente posible. He incluido validaciones para asegurar que el ADN siempre sea una matriz cuadrada (NxN) y que solo contenga los caracteres permitidos.

## Cómo ponerlo en marcha 🚀

Para ejecutar este proyecto en tu equipo, solo necesitas seguir estos pasos:

1.  Asegúrate de tener instalado [Node.js](https://nodejs.org/).
2.  Instala las dependencias necesarias:
    ```bash
    npm install
    ```
3.  Inicia el servidor de desarrollo:
    ```bash
    npm start
    ```
4.  Abre tu navegador en `http://localhost:4200/` y ¡listo!

### Ejecutar pruebas 🧪

Si quieres verificar que todo funciona correctamente, puedes ejecutar las pruebas unitarias que he preparado:
```bash
npm test
```

---
*Espero que disfrutes probando esta herramienta tanto como yo disfruté creándola.*
