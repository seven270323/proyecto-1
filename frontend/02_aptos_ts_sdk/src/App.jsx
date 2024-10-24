// Lo primero que necesitamos es importar las cosas necesarias para que el programa funcione.
// Aquí estamos usando el aptos-labs/ts-sdk, es decir, el Software Development Kit para TypeScript.
// Fue desarrollado por Aptos Labs.
import { Aptos, AptosConfig, Network } from "@aptos-labs/ts-sdk";

// Una de las cosas que importamos es el tipo AptosConfig. Y le especificamos a que red nos vamos a conectar.
// Aptos tiene 3 redes principales: DEVNET, TESTNET y MAINNET.
const config = new AptosConfig({ network: Network.TESTNET });
// Y utilizando el objeto de configuración que creamos arriba, creamos una nueva instancia de la conexión a Aptos.
const aptos = new Aptos(config);
// Por último, tenemos una constante con un string que es el contrato al que nos vamos a conectar.
const contract = "0xb77c85141a538ca35c8d1bda03c7a3b34fa7102bc574b2642454d04124e9291d";
// Este es un contrato que previamente desplegamos para esta actividad. Puedes verlo acá:
// https://explorer.aptoslabs.com/account/0xb77c85141a538ca35c8d1bda03c7a3b34fa7102bc574b2642454d04124e9291d/modules/code/frontend?network=testnet

// Ahora, recuerda que para mostrar algo necesitamos crear un componente usando una función.
function App() {
  
  // Vamos a crear una función para agregarla a un botón más abajo. 
  // Dado a que esta función se conecta a una red, la red de Aptos, necesitamos esperar a que se complete la conexión y se reciba una respuesta para continuar con el código.
  // Así que usamos la palabra async, para definir una función asíncrona.
  const helloWorld = async () => {
    const payload = { // Vamos a crear un payload, que no es más que un objeto con ciertos atributos que necesitamos enviar.
      function: `${contract}::frontend::hello_aptos` // En este caso, necesitamos especificar la función a la que vamos a llamar en Aptos.
    }

    // Recuerda lo que vimos en los tutoriales de backend: Una función se compone de la siguiente manera:
    // dirección::módulo::función

    // Vamos a ejecutar la llamada a esta función y la almacenaremos en una variable llamada resultado.
    // De nuevo, dado a que necesitamos esperar a que se complete la conexión, usamos la palabra await para indicarselo a nuestro código.
    const result = await aptos.view({ payload });

    // Una vez que la conexión de arriba termine y nos de un resultado, podemos mostrarlo en pantalla con una simple alerta.
    alert(result);
  }

  return (
    // El JSX en esta ocasión es muy sencillo. Sólo un contenedor, con un botón al que le asignamos la función de arriba.
    <div>
      <button onClick={helloWorld}>Obtener saludo desde Aptos</button>
    </div>
  )
}

export default App

// Por el momento no te preocupes sobre cómo enviamos la transacción o a donde está yendo.
// Con que entiendas la configuración básica de la conexión a Aptos es suficiente.
// Recuerda que sólo le especificamos la red, y creamos el objeto de conexión con esa configuración.
