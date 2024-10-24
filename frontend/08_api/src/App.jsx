// Aunque vamos a interactuar con Aptos, no vamos a usar ninguna de las librerías de Aptos. Esta vez usaremos una librería para gestionar solicitudes HTTP.
import axios from 'axios'
import { useState } from 'react' // Y usaremos el hook useState para almacenar información.

// Vamos a seguir utilizando el contrato advanced_todo_list
const CONTRATO = "0xcb8b57d6f98f4295fc261eddca12af69988e5a2a02e0359e5f2ab71e57277de4"
// Y esta vez vamos a hacer solicitudes a la API de Aptos. Esta es la URL. Puedes ver más información en el README de este tutorial.
const URL = "https://api.testnet.aptoslabs.com/v1"

// Como siempre, nuestro componente funcional.
function App() {
  // Y definiremos 2 estados con 2 arreglos vacíos. Uno para almacenar métodos, y otro para almacenar transacciones.
  // Esta vez es necesario inicializarlos vacíos para evitar errores en el rendereado de componentes de nuestra app.
  const [metodos, setMetodos] = useState([])
  const [transacciones, setTransacciones] = useState([])

  // En esta primer función, consultaremos la API de Aptos. 
  const queryApiModule = async () => {
    // Usaremos la librería de axios, y enviaremos una solicitud get. Es el equivalente a ejecutar una función de vista en blockchain.
    // Vamos a generar una cadena para la consulta, usando la URL de arriba, el endpoint accounts, vamos a consultar una cuenta.
    // Después le agregamos el CONTRATO, que básicamente es una cuenta con código desplegado.
    // En este caso lo único que queremos hacer es listar los métodos disponibles en este contrato, así que le decimos que queremos consultar un módulo
    // Y por último el módulo que queremos consultar, es decir, el nombre del contrato, en este caso: advanced_todo_list
    const response = await axios.get(`${URL}/accounts/${CONTRATO}/module/advanced_todo_list`)

    // Imprimimos la respuesta en consola para que puedas ver todos los detalles
    console.log(response)
    // Pero sólo guardaremos las funciones expuestas del módulo consultado. Esto será relevante más abajo.
    setMetodos(response.data.abi.exposed_functions)
  }

  // La segunda función consulta al indexador de Aptos. Es la misma API, pero con un endpoint diferente.
  // Recuerda que hay más información sobre esto en el README del tutorial.
  const queryIndexer = async (event) => {
    // Esta línea es necesaria para que la página no se actualice automáticamente, dado a que abajo usaremos un componente <form>.
    event.preventDefault()
    
    // De nuevo, como el de abajo es un <form>, podemos acceder a todos los elementos dentro de este componente. En este caso queremos el valor del input declarado abajo.
    // Para poder acceder a él necesitamos nombrarlo con el tag name. En este caso le pusimos cuenta. Por último accedemos a su valor.
    const cuenta = event.target.elements.cuenta.value

    // Y de nuevo usamos la librería axios. En este caso, aunque es una consulta, vamos a usar POST dado a que la api así lo requiere.
    // Este query lo generamos utilizando la herramienta Hasura. Más información en el README.
    // De nuevo, crearemos una cadena con la url para la consulta, usando la constante URL que definimos arriba, y agregandole graphql al final.
    // Por último, nota que tambien agregamos la cuenta a consultar con la constante que generamos arriba usando los elementos del <form>.
    const response = await axios.post(`${URL}/graphql`, { 
      query: `query MyQuery {
        account_transactions(
          where: {account_address: {_eq: "${cuenta}"}}
        ) {
          account_address
          user_transaction {
            block_height
            entry_function_id_str
            epoch
            expiration_timestamp_secs
            gas_unit_price
            max_gas_amount
            parent_signature_type
            sender
            sequence_number
            timestamp
            version
          }
          transaction_version
        }
      }`
    })

    // Imprimimos la respuesta completa para ver sus detalles más tarde.
    console.log(response)
    // Pero solo guardaremos las transacciones.
    setTransacciones(response.data.data.account_transactions)
  }
  
  return (
    // Vamos a empezar con el JSX de este ejercicio.
    // Lo primero que notarás es <>. Esto es llamado fragmento. Se usan para intentar no generar tantos <div> en un DOM.
    // El equivalente sería <div>, pero realmente no lo necesitamos, no estamos dandole formato ni nada, así que para resumir, usamos <>.
    <> 
    {/* Este <div> si es necesario. */}
      <div>
        {/* Vamos a ver la primer seccción donde usaremos la primer función definida arriba. */}
        <h2>Usando la API de Aptos.</h2>
        {/* La ejecución no cambia a lo que hemos hecho anteriormente, simplemente asignamos la función a un botón. */}
        <button onClick={queryApiModule}>Listar métodos del contrato</button>
        {/* En esta ocasión vamos a usar el componente <ul>, que es una lista desordenada, para listar los métodos. */}
        <ul>
          {/* Nota que estamos abriendo corchetes para generar código, vamos a generar una función que itere sobre todos los métodos y nos regrese un componente con su nombre. */}
          {metodos.map((func, index) => {
            // Usamos el método map que tienen los arreglos en JavaScript.
            // Y regresamos un elemento <li>, un componente de lista, conteniendo el nombre de la función.
            return <li key={`func${index}`}>{func.name}</li> // Nota, siempre que usemos map es necesario especificar el tag key en el elemento que estemos regresando.
            // Esto es para que React pueda seguir rastreando ese elemento y se pueda reaccionar a cambios que se lleguen a hacer en él.
            // El key tiene que ser único. Más info en: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map
          })}
        </ul>
      </div>
      <div>
        {/* Veamos la siguiente función, consultando al indexador. */}
        <h2>Consultando el indexador.</h2>
        {/* Esta vez, en vez de un botón, usaremos un <form>, dado a que necesitamos que el usuario ingrese información. */}
        {/* Nota que la ejecución de la función se la agregamos al <form> en vez de al <button> como lo hemos hecho antes. */}
        <form onSubmit={queryIndexer}>
          {/* Agregamos una caja de <input> para que el usuario agregue su cuenta. */}
          <input type='text' name='cuenta' placeholder='Ingresa cuenta a consultar'/>
          {/* Y, de nuevo, como estamos trabajando con un <form> esta vez el botón, en vez de tener la función directamente, va a ser quien emita el evento para enviar el formulario. */}
          {/* Lo cual, dado a que el <form> tiene el evento onSubmit, va a causar que se ejecute la función que le agregamos. */}
          <button type='submit'>Consultar transacciones</button>
        </form>
        <ul>
          {/* De nuevo, usamos map para generar varios componentes en base a todos los elementos de un arreglo. */}
          {transacciones.map((txn, index) => {
            // En este caso tambien agregamos un link al explorador para ver la información más detallada de cada una de las transacciones.
            return <li key={`txn${index}`}><a href={`https://explorer.aptoslabs.com/txn/${txn.transaction_version}?network=testnet`}>{txn.transaction_version}</a></li>
          })}
        </ul>
        {/* En realidad sólo mostramos 1 solo elemento con algun dato de cada uno de los elementos del arreglo, pero es posible hacer elementos más complejos */}
        {/* Y mostrar toda la información que tu creas necesaria. */}
      </div>
    </>
  );
}

export default App;
