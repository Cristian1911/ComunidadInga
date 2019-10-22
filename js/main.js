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


