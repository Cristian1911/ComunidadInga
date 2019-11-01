var arrayDias;
var departamento;
window.onload = init;
var RegistroUser;


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
      arrayDias = Array.from(document.querySelectorAll(".day"));
      departamento = document.getElementById("Departamentos");
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

function RegistroChaman(){
    var username = document.getElementById("Cusername").value.toLowerCase();
    var password = document.getElementById("Cpassword").value.toLowerCase();
    var name = document.getElementById("Cname").value.toLowerCase();
    var lastname = document.getElementById("Clastname").value.toLowerCase();
    var cedula = document.getElementById("Ccedula").value.toLowerCase();
    var edad = document.getElementById("Cedad").value.toLowerCase();
    var correo = document.getElementById("Ccorreo").value.toLowerCase();
    
    var ref = firebase.database().ref("Chaman");
        ref.once("value")
        .then(function(snapshot) {
            var hasname = snapshot.child(username).exists();
            if(hasname == true){
                alert('nombre de chaman en uso');
            }
            else{
                var ref1 = firebase.database().ref("RegistroChaman");
                ref1.once("value")
                .then(function(snapshot) {
                    var hasname1 = snapshot.child(username).exists();
                    if(hasname1 == true){
                        alert('nombre de chaman en uso(por aprobar)');
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
                    cambiodepantalla('Login','SolicitudesChaman');
                    printsolicitudChaman();
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
                                cambiodepantalla('Login','PantInicioUsuario');
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
        document.getElementById("hola").innerHTML += "<div class='formRegistro'>"+key+"<button onclick='showdetails(this)' id='detall."+key+"'>Detalle</button>";
        });
});

}
function printsolicitudChaman(){
    document.getElementById("ListarSolicitudesC").innerHTML ="";
    var query = firebase.database().ref("RegistroChaman").orderByKey();
    query.once("value")
    .then(function(snapshot) {
        snapshot.forEach(function(childSnapshot) {
        // key will be "ada" the first time and "alan" the second time
        var key = childSnapshot.key;
        document.getElementById("ListarSolicitudesC").innerHTML += "<div class='formRegistro'>"+key+"<button onclick='showdetailsChaman(this)' id='detallC."+key+"'>Detalle</button>";
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

function showdetailsChaman(item){
    cambiodepantalla('SolicitudesChaman','DetalleChaman');
    var campo = document.getElementById("listarDetalleChaman");
    var key = item.id.split(".");
    var ref = firebase.database().ref("RegistroChaman/"+key[1]);
    ref.once("value")
    .then(function(snapshot) {
        campo.innerHTML = "cedula:"+snapshot.child("cedula").val()+"<br>";
        campo.innerHTML += "correo:"+snapshot.child("correo").val()+"<br>";
        campo.innerHTML += "edad:"+snapshot.child("edad").val()+"<br>";
        campo.innerHTML += "name:"+snapshot.child("name").val()+"<br>";
        campo.innerHTML += "lastname:"+snapshot.child("lastname").val()+"<br>";
        campo.innerHTML += "password:"+snapshot.child("password").val()+"<br>";
        campo.innerHTML += "username:"+snapshot.child("username").val()+"<br>";
        campo.innerHTML += "<button id='aceptC."+key[1]+"' onclick='aceptarChaman(this)'> Acpetar </button>";
        campo.innerHTML += "<button id='rechaC."+key[1]+"' onclick='rechazarChaman(this)'> Rechazar </button>";

    });
}


function aceptar(item){
    var RegistroUser;      

        var ref = firebase.database().ref('RegistroUser/'+item.id.split(".")[1]);
        ref.once('value')
           .then(function(snapshot) {
            RegistroUser = snapshot.val();
            
        
            var ref1 = firebase.database().ref('Usuarios/'+item.id.split(".")[1]);
            ref1.set({
            username : RegistroUser.username,
            password : RegistroUser.password,
            name : RegistroUser.name,
            lastname : RegistroUser.lastname,
            cedula : RegistroUser.cedula,
            edad : RegistroUser.edad,
            correo : RegistroUser.correo 
            })
            .then(function() {
                var ref2 = firebase.database().ref('RegistroUser/'+item.id.split(".")[1]);
                ref2.remove();
                cambiodepantalla('DetalleUsuario','ScreenChaman');
                printsolicitud();
            })
              .catch(function(error) {
                console.log('Synchronization failed');
                cambiodepantalla('DetalleUsuario','ScreenChaman');
                printsolicitud();
            });    
        
        });
}
function aceptarChaman(item){
    var RegistroUser;      

        var ref = firebase.database().ref('RegistroChaman/'+item.id.split(".")[1]);
        ref.once('value')
           .then(function(snapshot) {
            RegistroUser = snapshot.val();
            
        
            var ref1 = firebase.database().ref('Chaman/'+item.id.split(".")[1]);
            ref1.set({
            username : RegistroUser.username,
            password : RegistroUser.password,
            name : RegistroUser.name,
            lastname : RegistroUser.lastname,
            cedula : RegistroUser.cedula,
            edad : RegistroUser.edad,
            correo : RegistroUser.correo 
            })
            .then(function() {
                var ref2 = firebase.database().ref('RegistroChaman/'+item.id.split(".")[1]);
                ref2.remove();
                cambiodepantalla('DetalleChaman','SolicitudesChaman');
                printsolicitudChaman();
            })
              .catch(function(error) {
                console.log('Synchronization failed');
                cambiodepantalla('DetalleChaman','SolicitudesChaman');
                printsolicitudChaman();
            });    
        
        });
}
function rechazar(item){
    var ref = firebase.database().ref('RegistroUser/'+item.id.split(".")[1]);
    ref.remove();
    cambiodepantalla('DetalleUsuario','ScreenChaman');
    printsolicitud();

}

function rechazarChaman(item){
    var ref = firebase.database().ref('RegistroChaman/'+item.id.split(".")[1]);
    ref.remove();
    cambiodepantalla('DetalleChaman','SolicitudesChaman');
    printsolicitud();

}

function showMonth(){
    cambiodepantalla('PantInicioUsuario','PantallaAgendar');
    var fechaactual = new Date();
    var diaActual = fechaactual.getDate();
    var año = fechaactual.getFullYear();
    var mesactual = fechaactual.getMonth();
    var fechaEmpiezames = new Date(año,mesactual,1);
    var diaEmpiezames = fechaEmpiezames.getDay();
    arrayDias[diaEmpiezames].innerHTML = "1";

    var fechaMesSgiuiente = new Date(año,mesactual+1,0);
    var ultimoDiaMesAcutual = fechaMesSgiuiente.getDate();
    arrayDias[diaEmpiezames+ultimoDiaMesAcutual-1].innerHTML = ultimoDiaMesAcutual;
    var cont = 1;
    var fechamesanterior = new Date(año,mesactual,0);
        var ultimoDiaMesAnterior = fechamesanterior.getDate();
    for (var i = diaEmpiezames-1; i >= 0; i--){
        
        arrayDias[i].innerHTML = ultimoDiaMesAnterior--;
    }
    var pasoAotroMes = false;
    for(var i = diaEmpiezames ; i <42 ; i++){
        arrayDias[i].innerHTML = cont++;
        if(cont > diaActual || pasoAotroMes == true){ 
            arrayDias[i].setAttribute("onclick","buscar(this,"+mesactual+");");
        }
        
        if(cont == ultimoDiaMesAcutual+1){
            cont = 1;
            pasoAotroMes = true;
            mesactual += 1;
        }
    }
}

function buscar(item,mesactual){
    alert("buscar departamento:"+departamento.value+" dia:"+item.innerHTML+" mes:"+mesactual);
}

