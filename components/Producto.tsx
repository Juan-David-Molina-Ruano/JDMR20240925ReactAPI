import React,{useState, useEffect} from "react";
import { View, Text, Button, ActivityIndicator, FlatList, StyleSheet, TextInput } from 'react-native';
import {obtenerProductos} from '../constants/Servicio';

const Producto = () => {
    interface Producto {
        id: number;
        nombreJDMR: string;
        descripcionJDMR: string;
        precioJDMR: string;
    }
    
    const [productos, setProductos] = useState<Producto[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [nombreJDMR, setNombreJDMR] = useState('');
    const [descripcionJDMR, setDescripcionJDMR] = useState('');
    const [precioJDMR, setPrecioJDMR] = useState('');
    const [take, setTake] = useState(10);
    const [skip, setSkip] = useState(0);


    useEffect(() => {
        cargarProductos();
    }   , []);


    const cargarProductos = async () => {
        setLoading(true);
        setError(null);

        try{
            const productos = await obtenerProductos({
                nombreJDMR : nombreJDMR,
                descripcionJDMR : descripcionJDMR,
                precioJDMR : precioJDMR,
                take : take,
                skip : skip,
                SendRowCount: 0
            });
        }catch(error){
            console.log(error);
            setError("No se pudo cargar los productos");
        }finally{
            setLoading(false);
        }
    };

    return (
        <View>
            <Text>Productos</Text>
            <TextInput
                style={styles.input}
                placeholder="Nombre"
                value={nombreJDMR}
                onChangeText={setNombreJDMR}
            />
            <TextInput
                style={styles.input}
                placeholder="Descripcion"
                value={descripcionJDMR}
                onChangeText={setDescripcionJDMR}
            />
            <TextInput
                style={styles.input}
                placeholder="Precio"
                value={precioJDMR}
                onChangeText={setPrecioJDMR}
            />
            <Button title="Buscar" onPress={cargarProductos} />
            {loading && <ActivityIndicator size="large" color="#0000ff" />}
            {error && <Text>{error}</Text>}
            <FlatList
                data={productos}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <View>
                        <Text>{item.nombreJDMR}</Text>
                        <Text>{item.descripcionJDMR}</Text>
                        <Text>{item.precioJDMR}</Text>
                    </View>
                )}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 10,
        paddingLeft: 8,
    },
});