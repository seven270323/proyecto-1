// Comenzamos como siempre con los imports necesarios para que la app funcione.
import { Aptos, AptosConfig, Network, Account } from "@aptos-labs/ts-sdk";
import { useEffect, useState } from "react";

// Y creamos los objetos de configuración para nuestra conexión a Aptos. En este momento no estamos conectándonos aún, sólo estamos creando la configuración.
const config = new AptosConfig({ network: Network.TESTNET });
const aptos = new Aptos(config);

// Esto es diferente a lo que vimos en el tutorial pasado. Básicamente, los tokens de Aptos (APT) también viven en un contrato, una dirección.
// Esta es la configuración para utilizar el token APT en tus contratos. No te preocupes tanto por ella, en el futuro puedes copiar y pegarla cuando se requiera.
const APTOS_COIN = "0x1::aptos_coin::AptosCoin";
const COIN_STORE = `0x1::coin::CoinStore<${APTOS_COIN}>`;

// Creamos nuestro componente funcional
function App() {
  // Y vamos a usar 3 estados diferentes: Para guardar la cuenta, para guardar si la cuenta fue creada, y para guardar si la cuenta fue fondeada.
  const [alicia, setAlicia] = useState();
  const [cuentaCreada, setCuentaCreada] = useState(false); // Inicializado como falso porque aún no hemos creado la cuenta.
  const [fondeada, setFondeada] = useState(false); // Ni la hemos fondeado.

  // De nuevo, usamos un useEffect que reaccione cuando se modifique la cuenta de Alicia.
  useEffect(() => {
    console.log(alicia) // Simplemente mostraremos en consola la cuenta.
  }, [alicia])

  // Crearemos funciones para conectarlas a botones más adelante.
  // La primera es para crear la cuenta.
  const crearCuenta = async () => {
    const a = Account.generate(); // Para esto usamos el objeto Account y el método generate. Esto viene directo del Aptos TS SDK.
    setAlicia(`${a.accountAddress}`); // Guardamos la cuenta generada en el estado que definimos arriba.
    setCuentaCreada(true) // Y le decimos que ya creamos la cuenta.
  }

  // La siguiente función es para fondear una cuenta.
  const fondearCuenta = async () => {
    // Aquí ya nos conectaremos a la red de Aptos.
    await aptos.fundAccount({ // Usamos el objeto de configuración que creamos arriba, y el método fundAccount para fondear una cuenta.
      accountAddress: alicia, // Este método requiere que le enviemos la dirección de la cuenta a fondear.
      amount: 100, // Y la cantidad de tokens APT que le vamos a mandar. En realidad no estamos mandando 100 APT, sino que estamos mandando una fracción de tokens APT.
      // Esta fracción se llama Octa.
    });
    setFondeada(true); // Por último le decimos a la app que ya fondeamos la cuenta.
  }

  // La última función es para consultar el saldo de la cuenta que acabamos de crear.
  const consultarSaldo = async () => {
    // De nuevo, nos estaremos conectando a la red de Aptos.
    const saldoAlicia = await aptos.getAccountResource({ // Ahora usaremos el método getAccountResource. El saldo de tokens APT es un recurso dentro de la cuenta.
      accountAddress: alicia, // Enviamos la cuenta a consultar, en este caso nuestra Alicia.
      resourceType: COIN_STORE, // Y enviamos el recurso que queremos consultar. En este caso el token APT. Para esto sirvió la configuración de más arriba.
    });
    
    console.log(`El saldo de Alicia es: ${saldoAlicia.coin.value}`); // Y mostramos en consola el saldo de la cuenta.
  }

  return (
    <div>
      {/* Tenemos 3 botones. Uno para cada una de las funciones de arriba. */}
      <button onClick={crearCuenta}>Crear cuenta</button>
      {/* Pero como queremos que este botón se habilite sólo cuando esté creada una cuenta, usamos la propiedad disabled junto con el flag que creamos arriba. */}
      <button disabled={!cuentaCreada} onClick={fondearCuenta}>Fondear cuenta</button>
      {/* Podemos lograr un comportamiento similar con la propiedad hidden. Pero esta vez, nosotros lo conectamos al flag fondeada. */}
      <button hidden={!fondeada} onClick={consultarSaldo}>Consultar saldo</button>
      {/* Por último, una url que dirige al Aptos Explorer para consultar la cuenta creada. Nota que podemos modificar con código parte de la URL. */}
      <a hidden={!fondeada} href={`https://explorer.aptoslabs.com/account/${alicia}?network=testnet`}>Información de la cuenta en el Aptos Explorer</a>
    </div>
  );
}

export default App;
