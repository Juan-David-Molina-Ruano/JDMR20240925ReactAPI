import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { crearProducto } from '../constants/Servicio';

const CreateProducto: React.FC = () => {
    const [producto, setProducto] = useState({
        nombre: '',
        descripcion: '',
        precio: 0,
    });

    const [loading, setLoading] = useState(false);

    const handleChange = async () => {
        setLoading(true);

        // Validar campos obligatorios
        if (!producto.nombre.trim() || !producto.descripcion.trim()) {
            Alert.alert('Todos los campos son obligatorios');
            setLoading(false);
            return;
        }

        // Validar el precio
        if (producto.precio <= 0) {
            Alert.alert('El precio debe ser mayor a 0');
            setLoading(false);
            return;
        }

        try {
            const response = await crearProducto(producto);
            if (response && response.status === 201) { // Asegúrate de que el servidor devuelva un status 201 para creación exitosa
                Alert.alert('Producto creado con éxito');
                setProducto({
                    nombre: '',
                    descripcion: '',
                    precio: 0,
                });
            } else {
                Alert.alert('Error al crear el producto');
            }
        } catch (error) {
            Alert.alert('Hubo un error en la creación del producto');
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <View style={styles.container}>
            <Text>Nombre</Text>
            <TextInput
                style={styles.input}
                onChangeText={(text) => setProducto({ ...producto, nombre: text })}
                value={producto.nombre}
            />
            <Text>Descripción</Text>
            <TextInput
                style={styles.input}
                onChangeText={(text) => setProducto({ ...producto, descripcion: text })}
                value={producto.descripcion}
            />
            <Text>Precio</Text>
            <TextInput
                style={styles.input}
                onChangeText={(text) => {
                    const numericValue = text.replace(/[^0-9]/g, '');
                    setProducto({ ...producto, precio: Number(numericValue) });
                }}
                value={producto.precio.toString()}
                keyboardType='numeric'
            />
            <Button
                title={loading ? 'Creando...' : 'Crear producto'}
                onPress={handleChange}
                disabled={loading}
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
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 12,
        paddingLeft: 8,
    },
});

export default CreateProducto;
