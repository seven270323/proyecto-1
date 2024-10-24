// De nuevo, solo trabajamos con la librería de axios y react de momento.
import axios from 'axios'
import { useState } from 'react'

// Seguimos trabajando con el contrato de advanced_todo_list. También definimos la URL de la API como constante.
const CONTRATO = "0xcb8b57d6f98f4295fc261eddca12af69988e5a2a02e0359e5f2ab71e57277de4"
const URL = "https://api.testnet.aptoslabs.com/v1"

function App() {
  const [cargando, setCargando] = useState(false) // Vamos a usar este flag para controlar el comportamiento del formulario abajo.

  // En esta ocasión, sólo tenemos una función. Realmente solo para demostrar el funcionamiento.
  const handleSubmit = async (event) => {
    event.preventDefault() // Para evitar que la página se actualice sola al enviar el formulario.
  
    // Anteriormente estabamos mandando las solicitudes a la red de Aptos y esperabamos que siempre salieran bien.
    // Pero en realidad eso no siempre va a pasar. Las conexiones a cualquier servidor pueden fallar por muchas razones.
    // Por esto, en este flujo agregaremos un bloque try. Este flujo intentará hacer la conexión a la red.
    // Si falla por alguna razón, tenemos un bloque catch, que básicamente atrapa el error. De esta forma podemos procesar el error y mostrarlo.
    // Y evitamos que la app completa falle. Puedes ver más información acá: https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Statements/try...catch
    try {
      setCargando(true) // Vamos a usar este flag para personalizar el botón de abajo. Le decimos a React que esta consulta se está cargando.

      // Aprovechando que tenemos este bloque de try, evaluaremos el formulario. Si el usuario no escribe nada en el espacio de cuenta, lanzaremos un error.
      // Este error también será atrapado en el bloque catch de abajo.
      if (event.target.elements.cuenta.value.trim() === "") { // Si la cuenta está vacía...
        throw new Error("El campo 'cuenta' no puede estar vacío") // ... lanzamos un error
      }
      
      const cuenta = event.target.elements.cuenta.value.trim() // Sabemos que en este punto la cuenta no está vacía, si no el código hubiera parado.

      // Vamos a hacer la conexión a la API de Aptos con axios.
      // Para hacerlo diferente a lo que hicimos la lección pasada, vamos a ejecutar un método de vista usando la API.
      const response = await axios.post(`${URL}/view`, { // Es necesario enviarlo con POST.
        function: `${CONTRATO}::advanced_todo_list::has_todo_list`, // Enviamos la función.
        type_arguments: [], // Arreglo vacío
        arguments: [`${cuenta}`, `0`] // Y los argumentos que requiere la función. La cuenta del usuario y la lista.
      }, {
        headers: {
          'Content-Type': 'application/json'
        }
      })
      
      // Por lo pronto, sólo mostraremos en una alerta la respuesta.
      alert(response.data)
      console.log(response) // Pero la imprimiremos en consola en caso de que queramos consultarla.
    } catch (error) {
      // Ahora, si el código de arriba falla por cualquier cosa, la ejecución de arriba se abortará y automáticamente se ejecutará este bloque de código.
      alert("Hubo un error en la consulta.") // Por lo pronto sólo estamos mandando una alerta mencionando que hubo un error.
      console.error(error) // Pero igual lo pasamos a la consola para validarlo en detalle.
    } finally {
      // El bloque finally se ejecutará pase lo que pase. Ya sea si la ejecución de try es exitosa o si terminamos en el bloque catch.
      setCargando(false) // Usualmente usamos esto para limpiar los estados que cambiaron al intentar hacer la consulta. Como el flag de cargando.
    }
  }
  
  return (
    <>
      {/* Vamos a analizar el JSX. */}
      <h2>Consultar si cuenta tiene TODO list</h2>
      <form onSubmit={handleSubmit}>
        <label>Cuenta</label>
        <br/>
        {/* Lo único diferente es que usamos el flag cargando para deshabilitar el formulario. */}
        <input disabled={cargando} type='text' name='cuenta' placeholder='Ingresa la cuenta a consultar'/>
        {/* Y también para hacer un render condicional. Si está cargando, cambiamos el texto del botón. */}
        <button disabled={cargando} type='submit'>{cargando ? "Cargando..." : "Consultar"}</button>
        {/* Todo esto seguirá deshabilitado hasta que el código de arriba llegue al bloque finally y lo habilite de nuevo. */}
      </form>
    </>
  );
}

export default App;
