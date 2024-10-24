// Imports y configuraciones iniciales.
import { Aptos, AptosConfig, Network } from "@aptos-labs/ts-sdk";

const config = new AptosConfig({ network: Network.TESTNET });
const aptos = new Aptos(config);

// Esta vez no interactuaremos con el token APT, pero si vamos a interactuar con un contrato inteligente desplegado en la red de Aptos.
const CONTRACT = "0xb686acdc6c166f92aa2090f005acc275b258c5d91653df9b3b8af21e7c104773"

// Componente funcional
function App() {
  // Vamos a crear una función que valide si una cuenta ya interactuó con la app del Aptogotchi.
  const hasAptogotchi = async () => {
    // En realidad ya haz hecho consultas de lectura en este curso. El primer ejercicio del Hello World era una consulta de lectura.
    // Pero esa función no requería argumentos, así que aprovecharemos para entender cómo enviar argumentos a una función que los pida.
    const payload = { // Vamos a construir la transacción.
      function: `${CONTRACT}::main::has_aptogotchi`, // Primero, definimos la función a la que vamos a llamar.
      functionArguments: ["0x42dc3d650c02ecae3a9ce7e8d4e73d85ebe08730cb3e7fb1ee1f7beea2244f5b"] // Y esta función requiere 1 argumento: la cuenta a consultar.
      // Por lo pronto usaremos esta cuenta hardcodeada, es una wallet que alguna vez creamos en alguno de los bootcamps de certificación.
      // Puedes modificar este argumento con tu propia cuenta.
    }

    let result = await aptos.view({ payload }) // Almacenamos el resultado en una variable, usamos await para esperar que la consulta termine de ejecutarse.
    alert(result) // Y lo mostramos en una alerta.
  }

  return (
    <div>
      {/* Un JSX muy sencillo esta vez, sólo un botón conectado a la función de arriba. */}
      <button onClick={hasAptogotchi}>¿Tiene Aptogotchi?</button>
    </div>
  );
}

export default App;
