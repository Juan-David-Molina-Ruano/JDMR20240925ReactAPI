import axios from 'axios';

const API_URL = 'http://localhost:7174/api';

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
        nombreJDMR: "",
        descripcionJDMR: "",
        precioJDMR: 0,
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


export const crearProducto = async (producto) => {
    const respuesta = await servicio.post('/productos',{
        nombreJDMR: producto.nombre,
        descripcionJDMR: producto.descripcion,
        precioJDMR: producto.precio,
    });

    if (respuesta.status === 200) {
        return respuesta.data;
    }else{
        return console.log('Error al crear el producto');
    }

}

export default servicio;