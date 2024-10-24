// Imports y configuraciones iniciales de la conexión a Aptos.
import { Aptos, AptosConfig, Network, Account } from "@aptos-labs/ts-sdk";
import { useEffect, useState } from "react";

const config = new AptosConfig({ network: Network.TESTNET });
const aptos = new Aptos(config);

const APTOS_COIN = "0x1::aptos_coin::AptosCoin";
const COIN_STORE = `0x1::coin::CoinStore<${APTOS_COIN}>`;

// Componente funcional
function App() {
  // Este ejercicio es similar al anterior, pero esta vez crearemos y fondearemos 2 cuentas.
  const [alicia, setAlicia] = useState();
  const [bob, setBob] = useState(); // Hola Bob!
  const [cuentasCreadas, setCuentasCreadas] = useState(false);
  const [fondeadas, setFondeadas] = useState(false);

  useEffect(() => {
    console.log(`${alicia?.accountAddress}`)
    console.log(`${bob?.accountAddress}`)
  }, [alicia, bob]) // Como puedes ver, useEffect puede reaccionar a distintas cosas.

  // Creamos las 2 cuentas.
  const crearCuentas = async () => {
    setAlicia(Account.generate());
    setBob(Account.generate())
    setCuentasCreadas(true) // Y notificamos a la app cuando las hayamos creado para habilitar los botones necesarios.
  }

  // Fondeamos ambas cuentas.
  const fondearCuentas = async () => {
    await aptos.fundAccount({
      accountAddress: alicia.accountAddress,
      amount: 100_000_000, // Vamos a darle un poco más de saldo a Alicia esta vez. 
      // Nota la separación con _. Esto no es necesario pero es bueno para hacer tu códgio más legible.
    });

    await aptos.fundAccount({
      accountAddress: bob.accountAddress,
      amount: 100, // Pobre Bob.
    });

    console.log("El saldo inicial de Alicia es: 100000000")
    console.log("El saldo inicial de Bob es: 100")

    setFondeadas(true); // Notificamos a la app que ya fondeamos las cuentas.
  }

  // Y ahora haremos una transferencia. Esto es una transacción.
  const transferir = async () => {
    // Consiste de 3 pasos:
    const transaccion = await aptos.transaction.build.simple({ // En el primero construyes la transaccción. Es muy similar a lo que hacemos arriba con las configuraciones.
      sender: alicia.accountAddress, // Creamos un objeto de transacción, le decimos quien la está enviando, en este caso Alicia
      data: {
        function: "0x1::aptos_account::transfer", // Y le enviamos la función a la que vamos a llamar. Las funciones de transferencia de tokens de Aptos también viven en un smart contract.
        functionArguments: [bob.accountAddress, 100], // Y esta función tiene argumentos: a quién le vamos a transferir y cuánto le vamos a transferir.
      },
    })

    // Paso 2: Enviar la transacción.
    const enviarTransaccion = await aptos.signAndSubmitTransaction({ // Usamos de nuevo el objeto de conexión de Aptos.
      signer: alicia, // Esta vez vamos a decir quien va a firmar la transacción, es decir, quien va a pagar el gas de esta transacción.
      transaction: transaccion, // Y enviamos el objeto que creamos arriba.
    });

    // Paso 3: Esperar a que se ejecute la transacción
    const transaccionEjecutada = await aptos.waitForTransaction({ // Aquí estamos esperando a que se termine de ejecutar la transacción antes de avanzar.
      transactionHash: enviarTransaccion.hash, // Enviamos el identificador de la transacción que estamos esperando. Este se obtiene del objeto que creamos arriba.

      // Esta es la razón por la cuál ves errores cuando fondeamos las cuentas. En la función de fondear no estamos esperando a que se termine de ejecutar la transacción.
    });

    console.log("Hash de la transacción: ", transaccionEjecutada.hash); // Imprimimos el identificador o hash de la transacción que acabamos de ejecutar.
  }

  // Por último podemos consultar los saldos de las cuentas para validar si se hizo la transferencia de manera correcta.
  const consultarSaldos = async () => {
    const saldoAlicia = await aptos.getAccountResource({
      accountAddress: alicia.accountAddress,
      resourceType: COIN_STORE,
    });

    const saldoBob = await aptos.getAccountResource({
      accountAddress: bob.accountAddress,
      resourceType: COIN_STORE,
    });
    
    console.log(`El saldo de Alicia es: ${saldoAlicia.coin.value}`);
    console.log(`El saldo de Bob es: ${saldoBob.coin.value}`);
  }

  return (
    <div>
      {/* La app es muy similar a la anterior. */}
      <button onClick={crearCuentas}>Crear cuentas</button>
      <button disabled={!cuentasCreadas} onClick={fondearCuentas}>Fondear cuentas</button>
      <button hidden={!fondeadas} onClick={transferir}>Transferir de Alicia a Bob</button>
      <button hidden={!fondeadas} onClick={consultarSaldos}>Consultar saldos</button>
      <div hidden={!fondeadas}>
        {/* Aquí solo agregamos otro contenedor para almacenar los links al Aptos Explorer. */}
        <p>Información de las cuentas en el Aptos Explorer:</p>
        <a href={`https://explorer.aptoslabs.com/account/${alicia?.accountAddress}?network=testnet`}>Alicia</a>
        <br />
        <a href={`https://explorer.aptoslabs.com/account/${bob?.accountAddress}?network=testnet`}>Bob</a>
      </div>
    </div>
  );
}

export default App;
