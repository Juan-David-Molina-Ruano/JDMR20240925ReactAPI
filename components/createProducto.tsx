import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { crearProducto } from '../constants/Servicio';

const CreateProducto: React.FC = () => {
    const [producto, setProducto] = useState({
        nombre: '',
        descripcion: '',
        precio: 0,
    });

    const [loading, setLoading] = useState(false);
    const [productoCreado, setProductoCreado] = useState(false);
    const [error, setError] = useState(''); // Nuevo estado para el mensaje de error

    const handleChange = async () => {
        setLoading(true);
        setError(''); // Reiniciar mensaje de error

        // Validar campos obligatorios
        if (!producto.nombre.trim() || !producto.descripcion.trim()) {
            setError('Todos los campos son obligatorios');
            setLoading(false);
            return;
        }

        // Validar el precio
        if (producto.precio <= 0) {
            setError('El precio debe ser mayor a 0');
            setLoading(false);
            return;
        }

        try {
            const response = await crearProducto(producto);

            // Si la creación fue exitosa, mostrar alerta de éxito
            if (response) {
                setProductoCreado(true); // Cambiar el estado para indicar que el producto fue creado
                setProducto({
                    nombre: '',
                    descripcion: '',
                    precio: 0,
                });
                setError(''); // Reiniciar cualquier mensaje de error
            }
        } catch (error) {
            setError('Error al crear el producto');
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

            {/* Mostrar el mensaje de éxito */}
            {productoCreado && (
                <View style={styles.successMessage}>
                    <Text style={styles.successText}>Producto creado con éxito</Text>
                </View>
            )}

            {/* Mostrar el mensaje de error */}
            {error && (
                <View style={styles.errorMessage}>
                    <Text style={styles.errorText}>{error}</Text>
                </View>
            )}
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
    successMessage: {
        marginTop: 20,
        padding: 10,
        backgroundColor: '#d4edda',
        borderColor: '#c3e6cb',
        borderWidth: 1,
        borderRadius: 5,
    },
    successText: {
        color: '#155724',
        textAlign: 'center',
    },
    errorMessage: {
        marginTop: 20,
        padding: 10,
        backgroundColor: '#f8d7da',
        borderColor: '#f5c6cb',
        borderWidth: 1,
        borderRadius: 5,
    },
    errorText: {
        color: '#721c24',
        textAlign: 'center',
    },
});

export default CreateProducto;
