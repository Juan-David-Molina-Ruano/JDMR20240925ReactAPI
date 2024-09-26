import React, { useState, useEffect } from "react";
import { View, Text, FlatList, StyleSheet } from 'react-native';
import servicio from '../constants/Servicio';

const ListProductos = () => {
    interface Producto {
        id: number;
        nombre: string;
        descripcion: string;
        precio: string;
    }
    
    const [productos, setProductos] = useState<Producto[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        obtenerProductos();
    }, []);

    const obtenerProductos = async () => {
        setLoading(true);
        setError(null);
        try {
            const respuesta = await servicio.get('/productos');
            if (respuesta.status === 200) {
                setProductos(respuesta.data);
            } else {
                setError('Error al obtener los productos');
            }
        } catch (error) {
            setError('Error en obtenerProductos: ' + (error as Error).message);
        } finally {
            setLoading(false);
        }
    };

    const renderHeader = () => {
        return (
            <View style={styles.tableRow}>
                <Text style={[styles.tableHeader, styles.tableCell]}>Nombre</Text>
                <Text style={[styles.tableHeader, styles.tableCell]}>Descripción</Text>
                <Text style={[styles.tableHeader, styles.tableCell]}>Precio</Text>
            </View>
        );
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Productos</Text>
            <FlatList
                data={productos}
                keyExtractor={(item) => item.id.toString()}
                ListHeaderComponent={renderHeader}
                renderItem={({ item }) => (
                    <View style={styles.tableRow}>
                        <Text style={styles.tableCell}>{item.nombre}</Text>
                        <Text style={styles.tableCell}>{item.descripcion}</Text>
                        <Text style={styles.tableCell}>{item.precio}</Text>
                    </View>
                )}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#fff',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 16,
    },
    tableRow: {
        flexDirection: 'row',
        borderBottomWidth: 1,
        borderColor: '#ccc',
        paddingVertical: 8,
    },
    tableHeader: {
        fontWeight: 'bold',
        backgroundColor: '#f0f0f0',
    },
    tableCell: {
        flex: 1,
        textAlign: 'center',
        padding: 4,
        borderRightWidth: 1,
        borderColor: '#ccc',
    },
});

export default ListProductos;
