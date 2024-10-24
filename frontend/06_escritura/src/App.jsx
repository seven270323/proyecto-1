// Imports y configuraciones iniciales.
import { Aptos, AptosConfig, Network, Account } from "@aptos-labs/ts-sdk";
import { useEffect, useState } from "react";

const config = new AptosConfig({ network: Network.TESTNET });
const aptos = new Aptos(config);

// Vamos a interactuar con un contrato. Está en esta dirección:
const DIRECCION = "0xcb8b57d6f98f4295fc261eddca12af69988e5a2a02e0359e5f2ab71e57277de4"
// Puedes ver el contrato usando el Aptos Explorer: https://explorer.aptoslabs.com/object/0xcb8b57d6f98f4295fc261eddca12af69988e5a2a02e0359e5f2ab71e57277de4/modules/code/advanced_todo_list?network=testnet

// Componente funcional
function App() {
  // Estado para almacenar la cuenta.
  const [cuenta, setCuenta] = useState()
  const [fondeada, setFondeada] = useState()

  useEffect(() => { // useEffect no solo se usa para reaccionar a algo.
    setCuenta(Account.generate()) // Por ejemplo aquí lo vamos a usar para generar una cuenta.
  }, []) // Al estar vacío este arreglo (llamado arreglo de dependencias) el código dentro del useEffect se va a ejecutar cuando se cargue la app.
  // Es decir, nos podemos ahorrar un botón, generando la cuenta desde que se carga nuestra app.

  useEffect(() => {
    console.log(`${cuenta?.accountAddress}`)
  }, [cuenta]) // Por supuesto, igual queremos ver la cuenta que se generó, así que tenemos otro useEffect para que este reaccione a la cuenta siendo modificada.

  // Es posible tambien automatizar la parte del fondeo de cuenta, pero por ahora dejémoslo en un botón.
  const fondearCuenta = async () => {
    await aptos.fundAccount({
      accountAddress: cuenta.accountAddress,
      amount: 100_000_000
    });
    setFondeada(true);
  }

  // Esta es la función en la que interactuaremos con el contrato.
  const crearListaTodo = async () => {
    // En realidad la sintaxis es la misma que lo que hicimos en la lección de transacciones.
    // Las transferencias como tal están dentro de un contrato inteligente. Aquí, aunque estamos interactuando con un contrato diferente, la sintaxis es muy similar.
    const transaction = await aptos.transaction.build.simple({
      sender: cuenta.accountAddress, // El remitente de la transacción
      data: {
        function: `${DIRECCION}::advanced_todo_list::create_todo_list`, // Y la función a la que estamos llamando.
        functionArguments: [] // Nota acá que este arreglo está vacío. Aunque no tengamos argumentos, las funciones de escritura requieren que se les envíe este parámetro.
        // Así que por lo pronto le enviamos un arreglo vacío, dandole a entender que no tenemos argumentos para esta función.
      }
    })

    // Y los pasos que ya conoces para una transacción. Firmar y enviar.
    const enviar = await aptos.signAndSubmitTransaction({
      signer: cuenta,
      transaction
    })

    // Y esperamos a que se ejecute la transacción y se actualice la blockchain.
    const esperar = await aptos.waitForTransaction({
      transactionHash: enviar.hash
    })

    console.log(esperar)
  }

  return (
    <div>
      {/* De nuevo un JSX muy sencillo, donde sólo tenemos un par de botones. */}

      {/* La parte nueva es esta. Estamos haciendo un render condicional. Si hay una cuenta definida, mostramos su dirección, si no, mostramos un mensaje. */}
      <p>Cuenta: {cuenta ? `${cuenta.accountAddress}` : "No se ha generado una cuenta."}</p>
      <button onClick={fondearCuenta}>Fondear cuenta</button>
      <button hidden={!fondeada} onClick={crearListaTodo}>Crear Lista TODO</button>
    </div>
  );
}

export default App;
