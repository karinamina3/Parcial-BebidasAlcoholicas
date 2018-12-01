window.onload = () => {
    app.init();
}

let app = {
    init: function(){
        this.addEvents();
        this.loadContent();
    },

    loadContent: function(){
        fetch('api/BebidasAlcoholicas', {
            method: 'GET'
        }).then(res => {return res.json()})
        .then(data => {
            if(data.ok){
                data.bebidas.forEach(element => {
                    this.addRow(element);  
                });
            }
        })
    },

    addEvents: function(){
        document.BebidasForm.addEventListener("submit", (event) => {
            this.submit(event, this.addRow);
        });
    },

    submit: (event, addRow) => {
        event.preventDefault();
        let data = {
            marca: document.BebidasForm.marca.value,
            tipo: document.BebidasForm.tipo.value,
            annios: document.BebidasForm.annios.value
        };
        fetch('api/BebidasAlcoholicas', {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {'content-Type':'application/json'}
        }).then(res => res.json)
        .then(_data => {
            if(_data.ok){
                addRow(_data.guardado);
            } 
        });
    },

    addRow: function(data){
        let tbody = document.getElementsByClassName("bebidas")[0];
        let tr = document.createElement("tr");
        tr.innerHTML = `<td> ${data._id} </td>
                        <td> ${data.marca} </td>
                        <td> ${data.tipo} </td>
                        <td> ${data.annios} </td>
                        <td>
                            <a href="#" class="delete"> <i class="far fa-trash-alt"></i> </a>
                            <a href="#" class="update"> <i class="far fa-edit"></i> </a>` 
        tbody.appendChild(tr);
    }
}