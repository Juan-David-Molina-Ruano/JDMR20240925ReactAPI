import CreateProducto from '@/components/createProducto';

const CrearProducto = () => {
    return (
        <div style={styles.container}>
            <CreateProducto />
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

export default CrearProducto;