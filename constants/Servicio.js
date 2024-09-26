import axios from 'axios';

const API_URL = 'https://localhost:7132';

const servicio = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

export const obtenerProductosId = async (id) => {
    const respuesta = await servicio.get(`/productos/${id}`);

    if (respuesta.status === 200) {
        return respuesta.data;
    }else{
        return console.log('Error al obtener los productos');
    }
}

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
    }else{
        return console.log('Error al obtener los productos');
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
    const respuesta = await servicio.post('/productos',{
        nombre: producto.nombre,
        descripcion: producto.descripcion,
        precio: producto.precio,
    });

    if (respuesta.status === 200) {
        return respuesta.data;
    }else{
        return console.log('Error al crear el producto');
    }

}

export default servicio;