window.onload = init;

function init(){
    var firebaseConfig = {
        apiKey: "AIzaSyAeZlUvp031fr3LC2bL9jjdl-0JMWqjNX4",
        authDomain: "waska-256002.firebaseapp.com",
        databaseURL: "https://waska-256002.firebaseio.com",
        projectId: "waska-256002",
        storageBucket: "waska-256002.appspot.com",
        messagingSenderId: "83219536059",
        appId: "1:83219536059:web:715b3444d02e298909b19e"
      };
      // Initialize Firebase
      firebase.initializeApp(firebaseConfig);

}


function Registro(){
    var username = document.getElementById("username").value.toLowerCase();
    var password = document.getElementById("password").value.toLowerCase();
    var name = document.getElementById("name").value.toLowerCase();
    var lastname = document.getElementById("lastname").value.toLowerCase();
    var cedula = document.getElementById("cedula").value.toLowerCase();
    var edad = document.getElementById("edad").value.toLowerCase();
    var correo = document.getElementById("correo").value.toLowerCase();
    
    var ref = firebase.database().ref("Usuarios");
        ref.once("value")
        .then(function(snapshot) {
            var hasname = snapshot.child(username).exists();
            if(hasname == true){
                alert('nombre de usuario en uso');
            }
            else{
                var ref1 = firebase.database().ref("RegistroUser");
                ref1.once("value")
                .then(function(snapshot) {
                    var hasname1 = snapshot.child(username).exists();
                    if(hasname1 == true){
                        alert('nombre de usuario en uso(por aprobar)');
                    }
                    else{
                        ref1.child(username).set({
                           username : username,
                           password : password,
                           name : name,
                           lastname : lastname,
                           cedula : cedula,
                           edad : edad,
                           correo : correo 
                        });
                    }
                });
            }
        });
}

function cambiodepantalla(screen1, screen2){
    document.getElementById(screen1).classList.add("none");
    document.getElementById(screen2).classList.remove("none");
}

function desplegarLogin(){
    document.getElementById('btnLRegistro').classList.toggle("none");
    document.getElementById('Lusername').classList.toggle("none");
    document.getElementById('Lpassword').classList.toggle("none");
    document.getElementById('btnLogin').classList.toggle("none");
    document.getElementById('btnIniciar').classList.toggle("none");
    document.getElementById('backLogin').classList.toggle("none");
}

function login(){
    var hasname;
    var username = document.getElementById("Lusername").value.toLowerCase();
    var password = document.getElementById("Lpassword").value.toLowerCase();
    var ref = firebase.database().ref("Chaman"); 
    ref.once("value")
        .then(function(snapshot) {
            hasname = snapshot.child(username).exists();
            if(hasname == true){
                var pass = snapshot.child(username+"/password").val();
                if(pass === password){
                    alert('eres chaman');
                    cambiodepantalla('Login','ScreenChaman');
                    printsolicitud();
                }
                else{
                    alert('contra chaman incorrecta');
                }
            }
            else{
                var ref1 = firebase.database().ref("Usuarios"); 
                ref1.once("value")
                    .then(function(snapshot) {   
                        hasname = snapshot.child(username).exists();
                        if(hasname == true){
                            var pass = snapshot.child(username+"/password").val();
                            if(pass === password){
                                alert('eres usuario');
                            }else{
                                alert('contra mala de usuario');
                            }
                        } 
                        else{
                            alert('usuario y contraseña incorrecta');
                        }
                    });
            }
        });

}

function printsolicitud(){
    document.getElementById("hola").innerHTML ="";
    var query = firebase.database().ref("RegistroUser").orderByKey();
    query.once("value")
    .then(function(snapshot) {
        snapshot.forEach(function(childSnapshot) {
        // key will be "ada" the first time and "alan" the second time
        var key = childSnapshot.key;
        // childData will be the actual contents of the child
        var childData = childSnapshot.val();
        document.getElementById("hola").innerHTML += "<div class='formRegistro'>"+key+"<button onclick='showdetails(this)' id='detall."+key+"'>Detalle</button>";
        });
});

}

function toggle(id1, id2){
    document.getElementById(id1).classList.toggle("none");
    document.getElementById(id2).classList.toggle("none");
}

function showdetails(item){
    cambiodepantalla('ScreenChaman','DetalleUsuario');
    var campo = document.getElementById("campo");
    var key = item.id.split(".");
    var ref = firebase.database().ref("RegistroUser/"+key[1]);
    ref.once("value")
    .then(function(snapshot) {
        campo.innerHTML = "cedula:"+snapshot.child("cedula").val()+"<br>";
        campo.innerHTML += "correo:"+snapshot.child("correo").val()+"<br>";
        campo.innerHTML += "edad:"+snapshot.child("edad").val()+"<br>";
        campo.innerHTML += "name:"+snapshot.child("name").val()+"<br>";
        campo.innerHTML += "lastname:"+snapshot.child("lastname").val()+"<br>";
        campo.innerHTML += "password:"+snapshot.child("password").val()+"<br>";
        campo.innerHTML += "username:"+snapshot.child("username").val()+"<br>";
        campo.innerHTML += "<button id='acept."+key[1]+"' onclick='aceptar(this)'> Acpetar </button>";
        campo.innerHTML += "<button id='recha."+key[1]+"' onclick='rechazar(this)'> Rechazar </button>";

    });

    
}

function aceptar(item){
    var datos;
    var ref = firebase.database().ref('RegistroUser/'+item.id.split(".")[1]);
    ref.once('value')
       .then(function(snapshot) {
        datos = snapshot.val();
       
    var ref1 = firebase.database().ref('Usuarios/');
    ref1.child(item.id.split(".")[1]).set({
        username : datos.username,
        password : datos.password,
        name : datos.name,
        lastname : datos.lastname,
        cedula : datos.cedula,
        edad : datos.edad,
        correo : datos.correo 
      });      
    });

    cambiodepantalla('DetalleUsuario','ScreenChaman');
    printsolicitud();
}

function rechazar(item){
    var ref = firebase.database().ref('RegistroUser/'+item.id.split(".")[1]);
    ref.remove();
    cambiodepantalla('DetalleUsuario','ScreenChaman');
    printsolicitud();

}

