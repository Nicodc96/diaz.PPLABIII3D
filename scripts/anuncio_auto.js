import Anuncio from "./anuncio.js";

class Anuncio_Auto extends Anuncio{
    constructor(id, titulo, descripcion, precio, cantPuertas, kilometraje, potencia){
        super(id, titulo, descripcion, precio);
        if(typeof(cantPuertas) == "number"){
            this.cantPuertas = cantPuertas;
        }
        if(typeof(kilometraje) == "number"){
            this.kilometraje = kilometraje;
        }
        if(typeof(potencia) == "number"){
            this.potencia = potencia
        }
    }

    static esIgual(anuncio1, anuncio2){
        return anuncio2 instanceof Anuncio ? anuncio1.id == anuncio2.id : false;
    }

    static ultimoIdRegistrado(lista){
        let ultimoId = 0;
        if (Array.isArray(lista) && lista.length > 0){
            for (let i = 0; i < lista.length; i++){
                if (lista[i].id > ultimoId){
                    ultimoId = lista[i].id;
                }
            }
        }
        return ultimoId;
    }

    static verificarAnuncioRegistrado(lista, anuncio){
        let indice = -1;
        if (Array.isArray(lista) && lista.length > 0){
            for (let i = 0; i < lista.length; i++){
                if (this.esIgual(lista[i], anuncio)){
                    indice = i;
                    break;
                }
            }
        }
        return indice;
    }

    static obtenerElemento(lista, id){
        let elemento = null;
        if (Array.isArray(lista) && lista.length > 0){
            for (let i = 0; i < lista.length; i++){
                if (lista[i].id == id){
                    elemento = lista[i];
                    break;
                }
            }
        }
        return elemento;
    }

    static eliminarElemento(lista, id){
        let elemento = this.obtenerElemento(lista, id);
        let eliminacion = false;
        if (elemento != null){
            let indice = lista.findIndex( (element) => {
                return element.id == id;
            });
            lista.splice(indice, 1);
            eliminacion = true;
        }
        return eliminacion;
    }

    static modificarElemento(lista, elementoNuevo){
        let modificacion = false;
        if (elementoNuevo instanceof Anuncio_Auto){
            let indice = lista.findIndex( (element) => {
                return element.id == elementoNuevo.id;
            });
            if (indice != -1){
                lista[indice].titulo = elementoNuevo.titulo;
                lista[indice].descripcion = elementoNuevo.descripcion;
                lista[indice].precio = elementoNuevo.precio;
                lista[indice].cantPuertas = elementoNuevo.cantPuertas;
                lista[indice].kilometraje = elementoNuevo.kilometraje;
                lista[indice].potencia = elementoNuevo.potencias;
                modificacion = true;
            }
        }
        return modificacion;
    }
}

export default Anuncio_Auto;