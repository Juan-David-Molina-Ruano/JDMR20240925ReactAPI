import ListProductos from '@/components/listProductos';

const ListaProductos = () => {  
    return (
        <div style={styles.container}>
            <ListProductos />
        </div>
    );
}

const styles = {
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
};

export default ListaProductos;