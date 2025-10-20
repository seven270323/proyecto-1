// Declaración del módulo con nombre tienda::tienda
// 'tienda' es el nombre del paquete y 'tienda' es el nombre del módulo
module tienda::tienda{

 // Importación de dependencias necesarias
 use std::string::{String, utf8};                 // Para manejar strings
    use sui::vec_map::{VecMap, Self};             // Para mapa de vectores
 use sui::tx_context::{TxContext};                // Contexto de transacción
    use sui::object;                              // Para crear objetos con UID
    use sui::transfer;                            // Para transferir ownership de objetos

    /// --- Estructura principal: Tienda ---
    /// Tiene una clave única (UID), un nombre y un conjunto de productos.
    public struct Tienda has key, store {
        id:UID, // Identificador único del objeto
        nombre:String,  // Nombre de la tienda
        productos: VecMap<u8, Producto>,  // Lista de productos, usando ID como clave
    }

     /// --- Estructura secundaria: Producto
    /// Representa un artículo dentro de la tienda.
    public struct Producto has store, drop {
        nombre:String
        ][*{9pik8,yu6jm7¿
        },  // Nombre del producto
        precio: u64,  // Precio del producto
        cantidad: u8,// Cantidad disponible
        id_producto:u8,     // ID del producto
    }
  // Constantes de error para manejo elegante de errores

    #[error]
    const PRODUCTO_EXISTENTE: vector<u8> = b"El ID del producto ya exist";// Error cuando se intenta agregar un producto con ID existente
    #[error]
    const PRODUCTO_NO_ENCONTRADO: vector<u8> = b"Producto no encontrado";// Error cuando no se encuentra un producto
    #[error]
   const SIN_STOCK: vector<u8> = b"No hay suficiente stock"; // Error cuando no hay suficiente stock para vender

// Función para crear una nueva tienda
  // Crea una nueva instancia de Tienda

    public fun crear_tienda(nombre: String, ctx: &mut TxContext) {

        let tienda = Tienda {  
            id: object::new(ctx),   // Genera un nuevo UID único usando el contexto  
            nombre, // Usa el nombre pasado como parámetro
            productos: vec_map::empty() // Inicializa el mapa de productos vacío
        };

        // Transfiere la propiedad de la tienda al sender de la transacción
      transfer::transfer(tienda, tx_context::sender(ctx));
    }

 // Función para agregar un nuevo producto a la tienda
    public fun agregar_producto(  tienda: &mut Tienda, nombre: String,  precio: u64, cantidad: u8, id_producto: u8) {
 // Verifica que el ID del producto no exista ya en la tienda
        // Si existe, revierte la transacción con error PRODUCTO_EXISTENTE
        assert!(!tienda.productos.contains(&id_producto), PRODUCTO_EXISTENTE);
          // Crea una nueva instancia de Producto
     let producto = Producto {
            nombre,// Nombre del producto
            precio,   // Precio del producto
            cantidad,    // Cantidad inicial en stock
            id_producto,       // ID único del producto
        };

        tienda.productos.insert(id_producto, producto); // Inserta el producto en el mapa usando el ID como clave

    }

  public fun vender_producto(tienda: &mut Tienda, id_producto: u8, cantidad: u8) {  // Función para vender una cantidad específica de un producto
          // Verifica que el producto exista en la tienda
      assert!(tienda.productos.contains(&id_producto), PRODUCTO_NO_ENCONTRADO);
  // Obtiene una referencia mutable al producto para modificarlo
         let producto = tienda.productos.get_mut(&id_producto);
// Verifica que haya suficiente stock para la venta
        assert!(producto.cantidad >= cantidad, SIN_STOCK);
 // Reduce la cantidad disponible (resta el stock vendido)
        producto.cantidad = producto.cantidad - cantidad;
    }
 // Función para reabastecer (aumentar stock) de un producto existente
    public fun reabastecer_producto(tienda: &mut Tienda, id_producto: u8, cantidad: u8) {
        // Verificamos que el producto exista
        assert!(tienda.productos.contains(&id_producto), PRODUCTO_NO_ENCONTRADO);

        // Obtenemos una referencia mutable al producto
        let producto = tienda.productos.get_mut(&id_producto);

        // Aumentamos el stock
        producto.cantidad = producto.cantidad + cantidad;
    }

   public fun eliminar_producto(tienda: &mut Tienda, id_producto: u8) {
        // Verificamos que el producto exista
        assert!(tienda.productos.contains(&id_producto), PRODUCTO_NO_ENCONTRADO);

        // Lo eliminamos del mapa
        tienda.productos.remove(&id_producto);
    }


}
