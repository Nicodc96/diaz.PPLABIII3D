class Anuncio{
    constructor(id, titulo, descripcion, precio){
        if (typeof(id) == "number"){
            this.id = id;
        }
        this.titulo = titulo;
        this.descripcion = descripcion;
        if (typeof(precio) == "number"){
            this.precio = precio;
        }
    }    
}

export default Anuncio;