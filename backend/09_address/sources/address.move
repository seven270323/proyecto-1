// Esta vez usaremos la direccion explicita en vez de la nombrada.
module 0x5A6F6E612054726573::address {

    use std::debug::print; // Cuando importamos usando use en realidad std es una direccion nombrada, en este caso la de la libreria estandar de Move
    use sui::tx_context::{TxContext, sender}; // Y sui es la direccion nombrada correspondiente a la libreria de Sui
    use sui::address::{to_string, from_ascii_bytes};

    // Nota: estas funciones estan dentro de la libreria estandar de Move
    fun practica_address() {
        let a1: address = @0x1; // version corta de 0x00000000000000000000000000000001
        print(&a1); // Resultado: [debug] @0x1
        let a2: address = @0xBEBE; // version corta de 0x0000000000000000000000000000BEBE
        print(&a2); // Resultado: [debug] @0xbebe
        let a3: address = @66;
        print(&a3); // Resultado: [debug] @0x42
    }

    // Nota: estas funciones estan dentro de la libreria de Sui
    // Al llamar a alguna funcion de nuestro contrato inteligente, estamos ejecutando una transaccion
    // Esta transaccion se escribe en la blockchain, y contiene informacion como la cuenta de quien la ejecuto
    fun practica_sender(ctx: &TxContext) { // Podemos acceder a esta informacion usando el TxContext o contexto de transaccion
        // Y podemos acceder a quien esta llamando esa transaccion usando la funcion sender.
        print(&sender(ctx)); // Esto imprimira una address. Resultado: [debug] @0x0

        // Dentro de la libreria de Sui tenemos otras opciones para manipular el tipo address
        // Podemos convertir direcciones a cadenas
        print(&to_string(sender(ctx))); // Resultado: [debug] "0000000000000000000000000000000000000000000000000000000000000000"

        // Podemos leer una direccion desde texto y convertirla en address (Debe tener exactamente 64 caracteres)
        print(&from_ascii_bytes(&b"000000000000000000000000000000000000000000000000000000000000BEBE")); // Resultado: [debug] @0xbebe
        
        // Puedes validar otras operaciones en la documentacion del framework de Sui
        // https://docs.sui.io/references/framework/sui/address
    }

    #[test_only]
    use sui::tx_context; // Vamos a usar esta libreria solo durante el contexto de pruebas

    #[test]
    fun prueba() {
        // Dado a que estamos programando localmente, no existe una transaccion, es decir, no estamos escribiendo a la blockchain
        let ctx = &tx_context::dummy(); // Por lo que usamos una funcion que simule una transaccion en las pruebas

        practica_address();
        practica_sender(ctx); // Y enviamos este contexto a la funcion que lo requiera.
    }
}
