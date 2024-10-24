import { Aptos, AptosConfig, Network } from "@aptos-labs/ts-sdk";
import { useWallet } from "@aptos-labs/wallet-adapter-react";
import { useState } from "react";

export const aptos = new Aptos(new AptosConfig({ network: Network.TESTNET }))
const DIRECCION = "0xcb8b57d6f98f4295fc261eddca12af69988e5a2a02e0359e5f2ab71e57277de4"

function App() {
  const { connect, account, connected, disconnect, signAndSubmitTransaction } = useWallet();

  const [listaCreada, setListaCreada] = useState(false)
  const [lastTodo, setLastTodo] = useState(["",""])

  const [cargando, setCargando] = useState(false)

  const conexionWallet = async () => {
    if(connected) {
      await disconnect()
    } else {
      await connect("Petra")
    }
  }

  const crearToDoList = async () => {
    try {
      setCargando(true)
      const response = await signAndSubmitTransaction({
        sender: account.address,
        data: {
          function: `${DIRECCION}::advanced_todo_list::create_todo_list`,
          typeArguments: [],
          functionArguments: [],
        }
      })
  
      let result = await aptos.waitForTransaction({ transactionHash: response.hash }) 
      console.log(result)

      setListaCreada(true)
    } catch (error) {
      alert("Hubo un error en la consulta.")
      console.log(error)
    } finally {
      setCargando(false)
    }
  }

  const tieneList = async () => {
    try {
      setCargando(true)
      
      const payload = {
        function: `${DIRECCION}::advanced_todo_list::has_todo_list`,
        functionArguments: [`${account.address}`, 0]
      }
  
      let response = await aptos.view({ payload })
      alert(response)
    } catch (error) {
      alert("Hubo un error en la consulta.")
      console.log(error)
    } finally {
      setCargando(false)
    }
  }

  const crearTodo = async (event) => {
    event.preventDefault()
    try {
      setCargando(true)

      if (event.target.elements.todo.value.trim() === "") {
        throw new Error("El campo 'to do' no puede estar vacío")
      }

      const response = await signAndSubmitTransaction({
        sender: account.address,
        data: {
          function: `${DIRECCION}::advanced_todo_list::create_todo`,
          typeArguments: [],
          functionArguments: [0, `${event.target.elements.todo.value}`],
        }
      })

      console.log(response)
    } catch (error) {
      alert("Hubo un error en la consulta.")
      console.log(error)
    } finally {
      setCargando(false)
    }
  }

  const getTodoList = async () => {
    try {
      setCargando(true)

      const payload = {
        function: `${DIRECCION}::advanced_todo_list::get_todo_list`,
        functionArguments: [`${account.address}`, 0]
      }
  
      let response = await aptos.view({ payload })

      console.log(response)
    } catch (error) {
      alert("Hubo un error en la consulta.")
      console.log(error)
    } finally {
      setCargando(false)
    }
  }

  const getTodo = async () => {
    try {
      setCargando(true)

      const payload = {
        function: `${DIRECCION}::advanced_todo_list::get_todo`,
        functionArguments: [`${account.address}`, 0, 0]
      }
  
      let response = await aptos.view({ payload })

      console.log(response)
      setLastTodo(response)

    } catch (error) {
      alert("Hubo un error en la consulta.")
      console.log(error)
    } finally {
      setCargando(false)
    }
  }

  const completarTodo = async () => {
    try {
      const response = await signAndSubmitTransaction({
        sender: account.address,
        data: {
          function: `${DIRECCION}::advanced_todo_list::complete_todo`,
          typeArguments: [],
          functionArguments: [0, 0],
        }
      })

      console.log(response)

    } catch (error) {
      alert("Hubo un error en la consulta.")
      console.log(error)
    } finally {
      setCargando(false)
    }
  }
  
  return (
    <div>
      <p>{connected ? `Cuenta conectada: ${account?.address}` : "No hay ninguna cuenta conectada"}</p>
      <button onClick={conexionWallet}>{connected ? "Desconectar" : "Conectar"}</button>
        <button hidden={!connected} onClick={crearToDoList}>Crear To Do List</button>
        <button hidden={!connected} onClick={tieneList}>Tiene To Do List?</button>
        <div>
          { listaCreada ? (
            <div>
              <form onSubmit={crearTodo}>
                <input type="text" name="todo" placeholder="Ingresa To Do"/>
                <button>Crear To Do</button>
              </form>
              <button onClick={getTodoList}>Obtener Lista To Do</button>
              <button onClick={getTodo}>Obtener To Do</button>
              <p>Tarea: {lastTodo[0]}</p>
              <p>Completado: {`${lastTodo[1]}`}</p>
              <button onClick={completarTodo}>Completar To Do</button>
            </div>
          ) : (<p>No se ha creado lista.</p>)
          }
        </div>
    </div>
  );
}

export default App;
