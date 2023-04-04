alert('Bienvenido a CompuPlaneta, donde los precios son de otro mundo!')

const carrito = []


const mostrarLista = () => {
    const lista = productos.map(producto => {
        return '- '+producto.nombre+' $'+producto.precio
    })
    alert('Lista de precios:'+'\n\n'+lista.join('\n'))
    comprarProductos(lista)
}

const comprarProductos = (listaDeProductos) => {
    let otroProducto;
    let productoNombre = '';
    let productoCantidad = 0;
    
    do {
        productoNombre = prompt ('¿Que producto desea comprar?'+'\n\n'+listaDeProductos.join('\n'));
        productoCantidad = parseInt(prompt('¿Cuántos querés comprar?'));
        
        const producto = productos.find(producto => producto.nombre.toLowerCase() === productoNombre.toLowerCase());
        
        if (producto) {
            agregarAlCarrito(producto, producto.id, productoCantidad)
        } else {
            alert('El producto no se encuentra en el catálogo.')
        }
        
        otroProducto = confirm('Desea agregar otro producto?');
    } while (otroProducto)
    
    confirmarCompra()
};

const agregarAlCarrito = (producto, productoId, productoCantidad) => {
    const productoRepetido = carrito.find(producto => producto.id === productoId)
    if (!productoRepetido) {
        producto.cantidad += productoCantidad
        carrito.push(producto)
    } else {
        productoRepetido.cantidad += productoCantidad;
    }
}

const eliminarProductoCarrito = (productoNombre) => {
    carrito.forEach((producto, index) => {
        if (producto.nombre.toLowerCase() === productoNombre.toLowerCase()) {
            if (producto.cantidad > 1) {
                producto.cantidad--
            } else {
                carrito.splice(index, 1)
            }
        }
    })
    confirmarCompra()
};

const confirmarCompra = () => {
    const listaCarrito = carrito.map(producto => {
        return '- '+producto.nombre+': '+producto.cantidad
    });
    
    const confirmar = confirm('Checkout: '
    +'\n\n'+listaCarrito.join('\n')
    +'\n\nPara continuar presione "Aceptar" sino "Cancelar" para eliminar un producto.'
    )
    
    if (confirmar) {
        finalizarCompra(listaCarrito)
    } else {
        const productoAEliminar = prompt('Ingrese el nombre del producto a eliminar:'
        +'\n\n'+listaCarrito.join('\n'))
        eliminarProductoCarrito(productoAEliminar)
    }
};

const finalizarCompra = (listaCarrito) => {
    const cantidadTotal = carrito.reduce((acc, item) => acc + item.cantidad, 0)
    const precioTotal = carrito.reduce((acc, item) => acc + (item.precio * item.cantidad), 0)
    
    alert('Detalle de su compra:'
    +'\n\n'+listaCarrito.join('\n')
    +'\n\nTotal de productos: '+cantidadTotal
    +'\n\nEl total de su compra es: '+precioTotal
    +'\n\nGracias por su compra!!!'
    )
};


mostrarLista()
