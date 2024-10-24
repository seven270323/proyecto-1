// Importamos nuestra hoja de estilos.
// El resto de los cambios con respecto a la App anterior están en el JSX.
import './App.css';
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
    // Notarás que el JSX es muy diferente, y está mucho mejor ordenado.
    // Además, cada uno de los elementos contiene un className. Estos classNames se utilizan para ser referidos en la hoja de estilos.
    <div className="app-container">
      <p className="status-text">{connected ? `Cuenta conectada: ${account?.address}` : "No hay ninguna cuenta conectada"}</p>
      
      <button 
        className={`wallet-button ${connected ? 'disconnect-button' : 'connect-button'}`} 
        onClick={conexionWallet}>
        {connected ? "Desconectar" : "Conectar"}
      </button>

      <div className="actions-container">
        <button className="action-button" hidden={!connected} onClick={crearToDoList}>Crear To Do List</button>
        <button className="action-button" hidden={!connected} onClick={tieneList}>Tiene To Do List?</button>

        <div className="todo-section">
          {listaCreada ? (
            <div className="todo-form-container">
              <form onSubmit={crearTodo} className="todo-form">
                <input 
                  type="text" 
                  name="todo" 
                  className="todo-input" 
                  placeholder="Ingresa To Do" 
                />
                <button className="submit-button">Crear To Do</button>
              </form>
              
              <button className="action-button" onClick={getTodoList}>Obtener Lista To Do</button>
              <button className="action-button" onClick={getTodo}>Obtener To Do</button>

              <p className="todo-text">Tarea: {lastTodo[0]}</p>
              <p className="todo-text">Completado: {`${lastTodo[1]}`}</p>

              <button className="action-button" onClick={completarTodo}>Completar To Do</button>
            </div>
          ) : (
            <p className="no-list-text">No se ha creado lista.</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
