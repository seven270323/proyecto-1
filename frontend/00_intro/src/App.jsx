import { Aptos, AptosConfig, Network } from "@aptos-labs/ts-sdk";
import './App.css';

const config = new AptosConfig({ network: Network.TESTNET });
const aptos = new Aptos(config);
const contract = "0xb77c85141a538ca35c8d1bda03c7a3b34fa7102bc574b2642454d04124e9291d";

function App() {
  const helloWorld = async () => {
    const payload = {
      function: `${contract}::frontend::hello_aptos`
    }
    alert(await aptos.view({ payload }));
  }

  return (
    <div className="container">
      <button className="hello-button" onClick={helloWorld}>Obtener saludo desde Aptos</button>
    </div>
  )
}

export default App
