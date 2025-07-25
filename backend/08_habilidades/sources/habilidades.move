module suiz3::habilidades {
    use sui::object::{UID, new, delete};
    use sui::tx_context::TxContext;

    // drop
    struct Ignorame has drop { a: u8 }
    struct SinDrop { a: u8}

    fun practica_drop() {
        let sin_drop = SinDrop { a: 1 };
        let _ = Ignorame { a: 1 }; // Podemos descartar este valor directamente. Aqui lo estamos ignorando en la declaracion.

        let _valor_sin_usar = Ignorame { a: 1 }; // O podemos declararlo y simplemente no usarlo. Dejamos el _ solo para evitar que el compilador envie warnings.
    
        let SinDrop { a: _ } = sin_drop; // Este valor necesitamos al menos desestructurarlo para que el compilador lo considere como usado.
    }

    // copy
    struct Copiable has copy {}

    fun practica_copy() {
        let a = Copiable {}; // Instanciamos la estructura copiable
        let b = a; // `a` es copiado a `b`
        let c = *&b; // copia explicita usando dereferenciacion

        // Si pararamos aqui, daria error, ya que las variables de arriba no tienen `drop`
        // Por lo que necesitamos usarlas, en este caso con desestructuracion:
        let Copiable {} = a;
        let Copiable {} = b;
        let Copiable {} = c;
    }

    // copy & drop
    struct Valor has copy, drop {}

    fun practica_copy_drop() {
        let _a = Valor {}; // Podemos parar aqui sin hacer uso de esta variable, ya que si tiene la habilidad `drop`.
        let b = 1; // Recuerda que algunos tipos primitivos tambien tienen estas habilidades.
        let _c = &b; // Y tambien las referencias mientras su valor referenciado tambien las tenga.
    }

    // key
    struct Objeto has key { id: UID } // Objetos con la habilidad key requieren que su primer campo sea un id

    fun practica_key(ctx: &mut TxContext) { // Para inicializar un UID (unique ID) necesitamos el contexto de la transaccion, este concepto lo veremos a fondo mas adelante
        let objeto = Objeto { id: new(ctx) }; // Los UID siempre se inicializan con esta expresion, usando el contexto de la transaccion que pasamos a la funcion
        let Objeto { id } = objeto; // Dado a que UID NO tiene drop, necesitamos consumirlo, pero solo lo podemos consumir si se desenpaqueto desde un objeto, como aqui
        delete(id); // Una vez desempaquetado, lo podemos borrar usando delete, una funcion que importamos desde la libreria sui::object
    }

    // key & store
    struct Almacenable has store {}
    struct Contenedor has key, store {
        id: UID, // Recuerda que cualquier struct con la habilidad key necesita su UID
        almacena: Almacenable,
    }

    fun practica_key_store(ctx: &mut TxContext) {
        let almacenable = Almacenable {}; // Estructura con la habilidad `store`
        let contenedor = Contenedor { // Y la guardamos.
            id: new(ctx),
            almacena: almacenable, // Para poderla guardar aqui, necesitamos que la variable de arriba tenga `store`.
        }; // Esta estructura la podemos almacenar y usar de clave al mismo tiempo. Pero como?? Donde??

        let Contenedor { almacena, id } = contenedor;
        let Almacenable {} = almacena; // No tienen `drop`, asi que hay que consumirlas.
        delete(id); // Recuerda que los UID se consumen usando object::delete.
        // Por supuesto que esto se solucionaria agregando `drop`, pero es util saber la sintaxis de desestructuracion.
        
        // key y store haran mas sentido en las siguientes lecciones. Por ahora, analiza las sintaxis y entiende cuales son las habilidades que existen en Move.
    }

    #[test_only]
    use sui::tx_context; // Por lo pronto, dado a que no estamos trabajando con la blockchain y solo estamos compilando de manera local, vamos a simular una transaccion para las pruebas

    #[test]
    fun prueba() {
        let ctx = &mut tx_context::dummy();

        practica_drop();
        practica_copy();
        practica_copy_drop();
        practica_key(ctx); // Aca pasamos la simulacion de la transaccion que creamos hace rato
        practica_key_store(ctx);
    }
}
