import axios from 'axios';

const API_URL = 'https://davidruano.bsite.net/api';

const servicio = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Removed duplicate declaration of obtenerProductosId

export const obtenerProductos = async (query) => {
    const respuesta = await servicio.post('/productos/buscar', {
        nombre: "",
        descripcion: "",
        precio: 0,
        skip: query.skip || 0,
        take: query.take || 10,
        SendRowCount: query.SendRowCount || 2
    });

    if (respuesta.status === 200) {
        return respuesta.data;
    } else {
        console.log('Error al obtener los productos');
        throw new Error('Error al obtener los productos');
    }
}

export const obtenerTodosProductos = async (query) => {
    const params = new URLSearchParams();
    if (query.nombre) params.append('nombre', query.nombre);
    if (query.descripcion) params.append('descripcion', query.descripcion);
    if (query.precio) params.append('precio', query.precio.toString());

    const respuesta = await servicio.get(`/productos?${params.toString()}`);

    if (respuesta.status === 200) {
        return respuesta.data;
    } else {
        throw new Error('Error al obtener los productos');
    }
}

export const crearProducto = async (producto) => {
    try {
        const respuesta = await servicio.post('/productos', {
            nombre: producto.nombre,
            descripcion: producto.descripcion,
            precio: producto.precio,
        });

        // Verificar el estado de la respuesta
        if (respuesta.status === 200 || respuesta.status === 201) {
            return respuesta.data;  // Devuelve el resultado si fue exitoso
        } else {
            console.log('Error al crear el producto');
            throw new Error('Error al crear el producto');
        }
    } catch (error) {
        console.error('Error en la solicitud:', error);
        throw error;
    }
}


export const obtenerProductosId = async (id) => {
    const respuesta = await servicio.get(`/productos/${id}`);

    if (respuesta.status === 200) {
        return respuesta.data;
    } else {
        console.log('Error al obtener los productos');
        throw new Error('Error al obtener los productos');
    }
}

export default servicio;