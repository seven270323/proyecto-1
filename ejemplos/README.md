# Ejemplos

En este directorio encontrarás los ejemplos completos y sin comentarios utilizados en los distintos tutoriales del repositorio.

Además, se irán agregando distintos ejemplos que puedes utilizar como guía para tu certificación en el programa **Sui Backend Expert** ó agregarles un frontend para el programa **Sui Frontend Expert**.

## Corriendo los ejemplos

Cada ejemplo tiene su propia documentación, además puedes encontrar instrucciones más detadas para el despliegue en la lección [11 Almacenamiento Global](https://github.com/Zona-Tres/sui-first-steps/tree/master/tutoriales/11_almacenamiento_global).

En terminos generales necesitas:

* [Instalar la Sui CLI](https://github.com/Zona-Tres/sui-first-steps/)
* Clonar el repositorio y navegar al directorio del proyecto.
    ```sh
    ## Por ejemplo
    cd ejemplos/01_contador
    ```
* Inicializar el proyecto para poder interactuar con la Blockchain de Sui/
    ```sh
    sui init
    ```
* Compilar el proyecto.
    ```sh
    sui move compile --named-addresses cuenta=default
    ```
* Desplegar el proyecto.
    ```sh
    sui move publish --named-addresses cuenta=default
    ```
* Interactuar con el contrato.
    * Utilizando la [Sui CLI](https://github.com/Zona-Tres/sui-first-steps/tree/master/tutoriales/11_almacenamiento_global).
    * Utilizando el [Sui Explorer](https://explorer.suilabs.com/).

> :information_source: Recuerda que puedes encontrar más información sobre estos programas de ceritfiación en el Discord de [Zona Tres](https://discord.gg/zonatres).