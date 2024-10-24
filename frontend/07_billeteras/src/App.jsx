// Imports y configuraciones iniciales.
import { Aptos, AptosConfig, Network } from "@aptos-labs/ts-sdk";
import { useWallet } from "@aptos-labs/wallet-adapter-react"; // Esta vez importaremos este hook desde una nueva librería que acabamos de instalar.

// La configuración luce diferente. Realmente sólo la estamos resumiendo a una línea, es exactamente lo mismo.
export const aptos = new Aptos(new AptosConfig({ network: Network.TESTNET }))
// Y la dirección al contrato Advanced Todo List
const DIRECCION = "0xcb8b57d6f98f4295fc261eddca12af69988e5a2a02e0359e5f2ab71e57277de4"

// Componente funcional
function App() {
  // Y esta vez, en vez de generar una cuenta y fondearla, vamos a utilizar una billetera.
  const { connect, account, connected, disconnect, signAndSubmitTransaction } = useWallet();
  // Esta librería va a manejar las conexiones a Aptos, en vez de usar el objeto de conexión Aptos manualmente.

  // Función para conectar una wallet.
  const conexionWallet = async () => {
    if(connected) {
      await disconnect() // Fácil, si estás conectado, te desconecta, es decir, cierra tu sesión.
    } else {
      await connect("Petra") // Si no, te conecta. Por ahora estamos usando la wallet Petra pero tu puedes implementar las wallets que gustes.
    }
  }

  // Vamos a crear nuestra función como en la lección anterior.
  const crearToDoList = async () => {
    // Realmente los únicos cambios son que usamos nuestro objeto para firmar la conexión y construirla en la misma línea.
    // Y la conexión, en vez de hacerla con Aptos, la hacemos con esta función que importamos del adaptador de billeteras.
    const response = await signAndSubmitTransaction({ // Usamos esta función que importamos desde el hook.
      sender: account.address,
      data: {
        function: `${DIRECCION}::advanced_todo_list::create_todo_list`,
        typeArguments: [], // Y de nuevo, aunque no necesitemos este argumento, enviamos un arreglo vacío porque la libería así lo requiere.
        functionArguments: [], // Lo mismo acá.
      }
    })

    // Y acá esperamos a que se ejecute la transacción y mostramos el resultado. Igual que con la librería anterior.
    let result = await aptos.waitForTransaction({ transactionHash: response.hash }) 
    console.log(result)
  }

  // Y recuerda, las funciones de vista no generan una transacción, por lo que no hay que firmarlas.
  // Así que cuando generemos
  const tieneList = async () => {
    const payload = {
      function: `${DIRECCION}::advanced_todo_list::has_todo_list`,
      functionArguments: [`${account.address}`, 0]
    }

    let result = await aptos.view({ payload })
    alert(result)
  }
  
  return (
    <div>
      {/* En el JSX podemos ver algo de rendereado condicional. Si tenemos una cuenta conectada, la mostramos. */}
      <p>{connected ? `Cuenta conectada: ${account?.address}` : "No hay ninguna cuenta conectada"}</p>
      {/* El contenido del botón para la conexión funciona de manera similar. */}
      <button onClick={conexionWallet}>{connected ? "Desconectar" : "Conectar"}</button>
      {/* Y sólo mostramos los métodos si está una wallet conectada. */}
      <button hidden={!connected} onClick={crearToDoList}>Crear To Do List</button>
      {/* Aunque, como vimos arriba, en realidad una función de vista no requiere una wallet. */}
      <button hidden={!connected} onClick={tieneList}>Tiene To Do List?</button>
    </div>
  );
}

export default App;
