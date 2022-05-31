import crearTabla from "./tablaDinamica.js";
import Anuncio_Auto from "./anuncio_auto.js";

const entidades = JSON.parse(localStorage.getItem("autos")) || [];
const $container = document.querySelector("#lista-entidades");
const $frmEntidad = document.forms[0];
const $titulo = document.querySelector("#titulo-form");
const $btnSubmit = document.querySelector("#btnGuardar");
const $btnEliminar = document.querySelector("#btnEliminar");
const $spinner = document.createElement("img");
$spinner.setAttribute("src", "./images/loading.gif");
$spinner.setAttribute("height", "64px");
$spinner.setAttribute("width", "64px");


actualizarStorage(entidades);
actualizarTabla(entidades, $container);  
limpiarForm();

$frmEntidad.addEventListener("submit", (e) => {
    e.preventDefault();

    const { txtId, txtTitulo, txtDescripcion, txtPrecio, txtCantPuertas, txtCantKm, txtCantPotencia} = $frmEntidad;

    if (txtId.value == ""){

        if (verificarDatos(txtPrecio, txtCantPuertas, txtCantKm, txtCantPotencia)){

            const newAuto = new Anuncio_Auto(
                Anuncio_Auto.ultimoIdRegistrado(entidades) + 1,
                txtTitulo.value,
                txtDescripcion.value,
                parseFloat(txtPrecio.value),
                parseInt(txtCantPuertas.value),
                parseInt(txtCantKm.value),
                parseInt(txtCantPotencia.value)
            );
            if (Anuncio_Auto.verificarAnuncioRegistrado(entidades, newAuto) == -1){
                entidades.push(newAuto);
                actualizarStorage(anuncios);
                limpiarForm();
            }
        } else{
            alert("Error en los datos. Verifique que:\n- El precio sea mayor a $100\n- La cantidad de puertas sea mínimo 2\n- Potencia no negativa\n- Kilometraje no negativo");
        }
        
    } else{
        const autoModify = new Anuncio_Auto(
            parseInt(txtId.value),
            txtTitulo.value,
            txtDescripcion.value,
            parseFloat(txtPrecio.value),
            parseInt(txtCantPuertas.value),
            parseInt(txtCantKm.value),
            parseInt(txtCantPotencia.value)
        );
        Anuncio_Auto.modificarElemento(entidades, autoModify);
        actualizarStorage(anuncios);
    }
    actualizarTabla(entidades, $container);
});

window.addEventListener("click", (e) => {
    if(e.target.matches("tr td")){
        const id = e.target.parentElement.dataset.id;      
        cargarDatos(Anuncio_Auto.obtenerElemento(entidades, parseInt(id)));
        $titulo.textContent = "Modificación del anuncio";
        $btnEliminar.removeAttribute("disabled");
        $btnSubmit.setAttribute("value", "Modificar");
    } else if (e.target.matches("#btnCancelar")){
        limpiarForm();
    } else if (e.target.matches("#btnEliminar")){
        Anuncio_Auto.eliminarElemento(entidades, parseInt($frmEntidad.txtId.value));
        limpiarForm();
        actualizarStorage(entidades);
        actualizarTabla(entidades, $container);
    }
});

function actualizarTabla(lista, contenedor){
    let anuncioContainer = document.querySelector(".entidad-container");
    while(contenedor.hasChildNodes()){
        contenedor.removeChild(contenedor.firstElementChild);
    }
    anuncioContainer.appendChild($spinner);
    setTimeout(() => {
        anuncioContainer.removeChild($spinner);
        let data = document.querySelector("#lista-entidades");
        if (data){
            contenedor.appendChild(crearTabla(lista));
        }
    }, 3000);
}

function cargarDatos(elemento){
    if (elemento instanceof Object){
        const { txtId, txtTitulo, txtDescripcion, txtPrecio, txtCantPuertas, txtCantKm, txtCantPotencia} = $frmEntidad;
        txtId.value = elemento.id;
        txtTitulo.value = elemento.titulo;
        txtDescripcion.value = elemento.descripcion;
        txtPrecio.value = elemento.precio;
        txtCantPuertas.value = elemento.cantPuertas;
        txtCantKm.value = elemento.kilometraje;
        txtCantPotencia.value = elemento.potencia;
    } else{
        alert("El elemento seleccionado no es un anuncio!");
    }
}

function actualizarStorage(lista){
    localStorage.setItem("autos", JSON.stringify(lista));
}

function limpiarForm(){
    $titulo.textContent = "Complete el formulario de alta";
    $btnSubmit.setAttribute("value", "Registrar");
    $btnEliminar.setAttribute("disabled", "");
    $frmEntidad.reset();
    $frmEntidad.txtId.value = "";
}

function verificarDatos(precio, cantPuertas, kilometraje, potencia){
    if (parseInt(precio.value) > 100 
    && parseInt(kilometraje.value) > 0
    && parseInt(potencia.value) >= 0
    && parseInt(cantPuertas.value) >= 2){
        return true;
    } else return false;
}