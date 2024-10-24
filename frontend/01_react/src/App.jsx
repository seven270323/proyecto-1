// Comenzamos importando las funciones necesarias.
import { useEffect, useState } from "react"; // En este caso, importamos desde la librería react las funciones useEffect y useState
// Estas funciones son la base de React, y se llaman hooks. Puedes reconocer un hook porque usualmente su nombre comienza con use.
// Es posible crear tus propios hooks, pero es no se tocará en el tutorial.
// Si quieres leer más sobre hooks puedes hacerlo acá: https://es.react.dev/reference/react/hooks

// Ahora, declaramos la app. Esta función va a regresar algo muy similar a html.
// Cualquier cosa que regrese este tipo de sintaxis se le llama componente.
// Existen 2 tipos de componentes: de clase y funcionales. Este de abajo está definido como una función. Por lo que es un componente funcional.
// Si quieres leer más sobre componentes puedes hacerlo acá: https://es.react.dev/reference/react/Component
function App() {
  // Vamos a hacer uso del primer hook: useState. La sintaxis puede parecer rara, pero simplemente estamos descomponiendo lo que regresa el useState.
  // Este hook regresa 2 cosas: un lugar donde se almacena algo, y una función para modificar lo que tenemos almacenado.
  // Puedes nombrarlas como gustes. En este caso los nombramos valor, y setValor. Usualmente llamamos a estas funciones con un nombre, y el propio nombre precedido por la palabra set.
  const [valor, setValor] = useState(0) // Por ultimo, inicializamos el valor que estamos creando con useState, en este caso a 0.
  // A todo lo que se almacena de esta manera en React se le llama estado.
  // Piensa que valor es simplemente una variable, y que setValor es una función que modifica lo que está almacenado en esta variable.
  // La diferencia entre una variable normal, y un estado, es que React va a reaccionar a cambios hechos en el estado.
  // Puedes leer más sobre useState acá: https://es.react.dev/reference/react/useState

  // Y aquí podremos ver un ejemplo de estas reacciones. El siguiente hook que veremos es useEffect.
  // useEffect ejecuta una pieza de código dependiendo de a qué está configurado para reaccionar.
  useEffect(() => { // En realidad estamos creando una función anónima aquí. Así que podemos decir que esta es la función que se ejecutará cuando useEffect reaccione a algo.
    console.log("El contador fue cambiado.") // Un simple console.log haciendonos saber cuando el valor del contador ha sido cambiado.
  }, [valor]) // Aquí podemos definir a qué estará reaccionando nuestra función useEffect. Es un arreglo, por lo que podríamos agregar múltiples estados.
  // Y useEffect ejecutaría la función cada que alguno de esos valores sea cambiado con su respectiva función set.
  // O podría estar vacío, lo cual haría que useEffect se ejecute una sola vez (en realidad dos, pero no importa) al momento de cargar esta App, es decir, este componente.
  // Puedes leer más sobre useEffect acá: https://es.react.dev/reference/react/useEffect

  // Vamos a definir algunas funciones para interactuar con el contador.
  // La primera, la llamaremos aumentarContador.
  const aumentarContador = () => {
    setValor(valor + 1) // Simplemente tomamos la función para modificar el valor, setValor, y le pasamos el nuevo valor a almacenar en la 'variable' valor.
    // Esta acción es llamada modificar estado.
  }
  
  // La siguiente función es muy similar a la anterior, simplemente en vez de aumentar 1 el contador, vamos a restarle 1.
  const decrementarContador = () => {
    setValor(valor - 1) // Recuerda que estamos modificando el estado. Esto significa que React va a reaccionar a esto más abajo.
  }

  // Y una última función muy similar a las anteriores. Pero ahora en vez de tomar el valor que ya teníamos, vamos a insertar uno propio, un 0.
  const reset = () => {
    setValor(0)
  }

  // Esta función va a regresar esta sintaxis muy parecida a html. No es html como tal, su nombre es JavaScript XML, o JSX.
  // Aquí definimos que es lo que la app va a mostrar al usuario. En este caso es una app muy sencilla: un párrafo donde mostraremos el valor actual del contador,
  // Y 3 botones, cada uno conectado con una de las funciones de arriba. Todo esto envuelto en un div que va a actuar como un contenedor.
  return (
    <div>
      {/* En vez de mostrar un texto, usamos las llaves para indicar que escribiremos código dentro del párrafo. */}
      {/* En este caso, sólo estamos mostrando 'la variable'. Y, cada vez que cambiemos el estado usando setValor, React reaccionará y mostrará el nuevo valor. */}
      <p>{valor}</p>
      {/* Acá tenemos los botones. En vez de tener que configurar un escuchador de eventos para cada uno, React se lo asigna cuando le decimos a que queremos que reaccione. */}
      {/* Aquí usamos la propiedad onClick, es decir, que este botón ejecutará su función asignada cuando se le haga click. */}
      <button onClick={aumentarContador}>+</button>
      <button onClick={decrementarContador}>-</button>
      <button onClick={reset}>Reset</button>
    </div>
  );

  // Y así tenemos una App muy sencilla. Pero cada uno de sus componentes hace algo muy importante en enseñarte el comportamiento de React.
  // ¿Ahora entiendes porqué React se llama React? Reacciona a cambios y modifica el html acorde a ellos.
}

// Por último, exportamos la función para que otros archivos puedan llamarla. En este caso, el único archivo que la llama es main.jsx.
export default App

// Durante los siguientes tutoriales usaremos este conocimiento como base. Así que si algo no queda del todo claro, no te preocupes, seguiremos viendo React conforme avance el curso.
