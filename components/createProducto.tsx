import React, { useState } from 'react';
import {View, Text, TextInput, Button, StyleSheet, Alert} from 'react-native';
import {crearProducto} from '../constants/Servicio';

const createProducto: React.FC = () => {
    const [producto, setProducto] = useState({
        nombreJDMR: '',
        descripcionJDMR: '',
        precioJDMR: 0,
    });

    const [Loading, setLoading] = useState(false);
    const [Error, setError] = useState(false);

    const handleChange = async () => {
        setLoading(true);
        setError(false);
        
        //validar el precio
        if(producto.precioJDMR <= 0){
            Alert.alert('El precio debe ser mayor a 0');
            setLoading(false);
            return;
        }

        const productSave = {
            nombre: producto.nombreJDMR,
            descripcion: producto.descripcionJDMR,
            precio: producto.precioJDMR,
        }
        
        const response = await crearProducto(productSave);
        if(response){
            Alert.alert('Producto creado con éxito');
            setProducto({
                nombreJDMR: '',
                descripcionJDMR: '',
                precioJDMR: 0,
            });
        }else{
            Alert.alert('Error al crear el producto');
        }

        setLoading(false);
    }

    return (
        <View style={styles.container}>
            <Text>Nombre</Text>
            <TextInput
                style={styles.input}
                onChangeText={(text) => setProducto({...producto, nombreJDMR: text})}
                value={producto.nombreJDMR}
            />
            <Text>Descripción</Text>
            <TextInput
                style={styles.input}
                onChangeText={(text) => setProducto({...producto, descripcionJDMR: text})}
                value={producto.descripcionJDMR}
            />
            <Text>Precio</Text>
            <TextInput
                style={styles.input}
                onChangeText={(text) => setProducto({...producto, precioJDMR: Number(text)})}
                value={producto.precioJDMR.toString()}
                keyboardType='numeric'
            />
            <Button
                title='Crear producto'
                onPress={handleChange}
            />
        </View>
    );

}

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

export default createProducto;