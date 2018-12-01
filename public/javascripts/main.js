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
            headers: {'Content-Type':'application/json'}
        }).then(res => res.json())
        .then(_data => {            
            if(_data.ok){                
                console.log(_data.guardado);
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
                            <a href="#" class="update"> <i class="far fa-edit"></i> </a>
                        </td>` 
        //tr.getElementsByClassName("delete")[0].addEventListener("click", (event) => {
        //    this.delete(event, data, tr, tbody);
        //});
        tbody.appendChild(tr);
    },

    /*delete: function(event, data, tr, tbody){
        event.preventDefault();
        fetch('/api/BebidasAlcoholicas/' + data._id, {
            method: 'DELETE'
        }).then(res => res.json())
        .then(res => {
            if (res.ok){
                tbody.removeChild(tr);
            }
        });
    }*/
}