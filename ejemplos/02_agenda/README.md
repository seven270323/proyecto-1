# Ejemplos: Contador

Este ejemplo es la versión sin comentarios del código usado en la lección [13 Agenda](https://github.com/Zona-Tres/sui-first-steps/tree/master/tutoriales/13_agenda).

## Desplegando el contrato

* [Instalar la Sui CLI](https://github.com/Zona-Tres/sui-first-steps/)
* Clonar el repositorio y navegar al directorio del proyecto.
    ```sh
    cd ejemplos/02_agenda
    ```
* Inicializar el proyecto para poder interactuar con la Blockchain de Sui/
    ```sh
    sui init
    ```
* Fondear tu cuenta (opcional).
    ```sh
    sui account fund-with-faucet --account default
    ```
* Compilar el proyecto.
    ```sh
    sui move compile --named-addresses cuenta=default
    ```
* Desplegar el proyecto.
    ```sh
    sui move publish --named-addresses cuenta=default
    ```

## Interactuando con el contrato

Los métodos son:

* **`inicializar`**
    ```sh
    sui move run --function-id 'default::agenda::inicializar'
    ```
* **`agregar_registro`**
    ```sh
    sui move run --function-id 'default::agenda::agregar_registro' --args 'String:Juan' u64:4444444444 'String:juan_ito' 'String:juan_ito@gmail.com' address:0xFE00 --assume-yes
    ```
* **`obtener_registro`**
    ```sh
    sui move view --function-id 'default::agenda::obtener_registro' --args address:default 'String:Juan'
    ```
* **`modificar_telefono`**
    ```sh
    sui move run --function-id 'default::agenda::modificar_telefono' --args 'String:Juan' u64:4444444445
    ```
* **`modificar_discord`**
    ```sh
    sui move run --function-id 'default::agenda::modificar_discord' --args 'String:Juan' 'String:juan_john' --assume-yes
    ```
* **`modificar_correo`**
    ```sh
    sui move run --function-id 'default::agenda::modificar_correo' --args 'String:Juan' 'String:juan_john@gmail.com' --assume-yes
    ```
* **`modificar_direccion`**
    ```sh
    sui move run --function-id 'default::agenda::modificar_direccion' --args 'String:Juan' address:0xBEBE --assume-yes
    ```
* **`modificar_nombre`**
    ```sh
    sui move run --function-id 'default::agenda::modificar_nombre' --args 'String:Juan' 'String:John' --assume-yes
    ```