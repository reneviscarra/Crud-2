let usuarios =  JSON.parse(localStorage.getItem("usuarios")) || [];
let editandoId= null;

function mostrar() {
    const tbody= document.getElementById("tablaUsuarios");
    tbody.innerHTML = "";
usuarios.forEach(u => {
    tbody.innerHTML += `
    <tr>
        <td>${u.id}</td>
        <td>${u.nombre}</td>
        <td>${u.email}</td>
        <td>
            <button class="btn btn-edit" onclick="editar (${u.id})">Editar</button>
            <button class="btn-delete" onclick="eliminar(${u.id})">Eliminar</button>
        </td>
    </tr>
   `;
});
}

function guardar(){
    const nombre= document.getElementById("nombre").value.trim();
    const email=document.getElementById("email").value.trim();

    if (!nombre || !email) {
        alert("Completa todos los campos");
        return;
    }

    if (editandoId === null) {

        const nuevo= {
            id:Date.now(),
            nombre: nombre,
            email: email,
        };
        usuarios.push(nuevo);
      }else{

        usuarios = usuarios.map(u => 
            u.id === editandoId ? {...u, nombre, email} : u
        );
        editandoId = null;
        document.getElementById("formTitle").innerText = "Agregar Usuario";       
}

localStorage.setItem("usuarios", JSON.stringify(usuarios));
limpiar();
mostrar(); 
}

function editar(id){
    const user = usuarios.find(u => u.id === id);
    document.getElementById("nombre").value = user.nombre;
    document.getElementById("email").value = user.email;
    editandoId = id;
    document.getElementById("formTitle").innerText = "Editar Usuario";
}
 function eliminar(id) {
    if (confirm("¿Eliminar este usuario?")) {

        usuarios = usuarios.filter( u => u.id !==id);
        localStorage.setItem("usuarios", JSON.stringify(usuarios));
        mostrar();
    }
}

function limpiar() {
    document.getElementById("nombre").value = "" ;
    document.getElementById("email").value = "" ;
}

mostrar();
