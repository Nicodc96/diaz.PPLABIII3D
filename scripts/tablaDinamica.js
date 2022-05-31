function crearTabla(lista){
    const table = document.createElement("table");
    table.setAttribute("id", "tabla-dinamica");
    if (lista.length > 0){
        table.appendChild(crearCabecera(lista[0]));
        table.appendChild(crearCuerpo(lista));
    }
    return table;
}

function crearCabecera(lista){
    const thead = document.createElement("thead"),
    tr = document.createElement("tr");
    tr.classList.add("cabecera");
    Object.keys(lista).forEach((item) => {
        if (item != "id"){
            const th = document.createElement("th");
            th.textContent = item;
            tr.appendChild(th);            
        }
    });
    thead.appendChild(tr);
    return thead;
}

function crearCuerpo(lista){
    const tbody = document.createElement("tbody");    
    lista.forEach((elemento, index) => {
        const tr = document.createElement("tr");
        tr.classList.add(index % 2 == 0 ? "colorPar" : "colorImpar");
        tr.classList.add("pointer");
        for (const key in elemento){
            if (key != "id"){
                const td = document.createElement("td");
                td.appendChild(document.createTextNode(elemento[key]));
                tr.appendChild(td);
            } else{
                tr.setAttribute("data-id", elemento[key]);
            }
        }
        tbody.appendChild(tr);
    });    
    return tbody;
}

export default crearTabla;

