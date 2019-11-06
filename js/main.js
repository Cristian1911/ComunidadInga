var arrayDias;
var departamento,Cdepartamento;
window.onload = init;
var RegistroUser;
var arrayMeses;
var Nombreuser;
var Nombre,Apellido;
var Idevento,cuposDis,listaParticipantes,listaEventosuser=["0"];
var founuser;


function init(){
    emailjs.init('user_IeS54vH1HD8MKpUuHk5rH');
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
      Cdepartamento =  document.getElementById("CrearDepartamentos");
      arrayMeses = ['Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre'];
    
    }



function Registro(){
    var username = document.getElementById("username").value.toLowerCase();
    var password = document.getElementById("password").value.toLowerCase();
    var correo = document.getElementById("correo").value.toLowerCase();
    
    var ref = firebase.database().ref("Usuarios");
        ref.once("value")
        .then(function(snapshot) {
            var hasname = snapshot.child(username).exists();
            if(hasname == true){
                alert('nombre de usuario en uso');
            }
            else{
               
                ref.child(username).set({
                username : username,
                password : password,
                correo : correo,
                lista : listaEventosuser
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
                    
                    cambiodepantalla('Login','SolicitudesChaman');
                    printsolicitudChaman();
                    Nombreuser = username;
                    var ref = firebase.database().ref('Chaman/'+Nombreuser);
                    ref.once('value').then(function(snapshot) {
                        Nombre = snapshot.child("name").val();
                        Apellido = snapshot.child("lastname").val();
                    });
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
                                cambiodepantalla('Login','PantInicioUsuario');
                                toggle('navBar');
                                toggle('burgerMenu');
                                Nombreuser = username;
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

/*function toggle(id1, id2){
    document.getElementById(id1).classList.toggle("none");
    document.getElementById(id2).classList.toggle("none");
}*/
function toggle(id1){
        document.getElementById(id1).classList.toggle("none");
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
    toggle('restricciones');
    cambiodepantalla('PantallaAgendar','PantallaListarEventos');
    document.getElementById("listareventos").innerHTML ="";
    var query = firebase.database().ref("Eventos/"+departamento.value).orderByKey();
    query.once("value")
    .then(function(snapshot) {
        snapshot.forEach(function(childSnapshot) {
        // key will be "ada" the first time and "alan" the second time
        var key = childSnapshot.key;
        var childData = childSnapshot.val();
        
        if(item.innerHTML.length == 1){
            if(childData.dia === "0"+item.innerHTML && mesactual+1 === parseInt(childData.mes) ){
                document.getElementById("listareventos").innerHTML += "<div onclick='showdetalleEvento(this)' id='evento."+key+"' > <b>Chaman: </b>"+childData.Nombre+" <br> <b>Lugar: </b>"+childData.lugar+"<br> <b>Grupo: </b>"+childData.cupos+" personas <br> <b>Hora: </b>"+childData.hora+"</div>";
            }
        }else{
            if(childData.dia === item.innerHTML && mesactual+1 === parseInt(childData.mes) ){
                document.getElementById("listareventos").innerHTML += "<div onclick='showdetalleEvento(this)' id='evento."+key+"' > <b>"+childData.Nombre+"</b> <br> <b>Lugar: </b>"+childData.lugar+"<br> <b>Grupo: </b>"+childData.cupos+" personas <br> <b>Hora: </b>"+childData.hora+"</div>";
            }
        }
        
        });
    });
    /*alert("buscar departamento:"+departamento.value+" dia:"+item.innerHTML+" mes:"+arrayMeses[mesactual]);*/
}

function showdetalleEvento(item){
    cambiodepantalla('PantallaListarEventos','DetalleEvento');

    var ref = firebase.database().ref('Eventos/'+departamento.value+"/"+item.id.split(".")[1]);
    ref.once('value')
       .then(function(snapshot) {
        document.getElementById("DetalleENombre").innerHTML = snapshot.child("Nombre").val();
        document.getElementById("DetalleEHora").innerHTML = snapshot.child("hora").val();
        document.getElementById("DetalleELugar").innerHTML = snapshot.child("lugar").val();
        document.getElementById("DetalleEGrupo").innerHTML = snapshot.child("cupos").val()+" personas";
        document.getElementById("DetalleECupos").innerHTML = snapshot.child("cuposD").val();
        document.getElementById("DetalleEValor").innerHTML = snapshot.child("valor").val();
        document.getElementById("valorApagar").innerHTML = parseInt(snapshot.child("valor").val()) * 0.2 ;
        cuposDis = parseInt(snapshot.child("cuposD").val());
        listaParticipantes = snapshot.child("lista").val();
        });
        Idevento = item.id.split(".")[1];
    /*alert(item.id.split(".")[1]+" "+departamento.value);*/
}

function revisarcupos(){
    if(cuposDis == 0 ){
        
        alert("no hay mas cupos");
        cambiodepantalla('DetalleEvento','PantallaAgendar');
        
    }
    else{
        founduser = false;
        for(var i = 0 ; i < listaParticipantes.length; i++){
            if(listaParticipantes[i] === Nombreuser){
                founduser = true;
            }
        }
        console.log(founduser);
        if(founduser == true){
            alert("ya estas inscrito");
        cambiodepantalla('DetalleEvento','PantallaAgendar');
        }
        else{
        cambiodepantalla('DetalleEvento','pantallaAbonar');
        }
    }
}


function abonar(){
    cambiodepantalla('enviarCorreo','VolverAlInicio');
    var emailsend = document.getElementById("EnviarCorreo").value;
    
    var ref = firebase.database().ref('Usuarios/'+Nombreuser);
   
    ref.once('value')
       .then(function(snapshot) {
        listaEventosuser = snapshot.child("lista").val();
        });
    var ref1 = firebase.database().ref('Eventos/'+departamento.value+"/"+Idevento);
   
    ref1.once('value')
       .then(function(snapshot) {
        var datosmensaje = [];
        datosmensaje[0] = snapshot.child("año").val();
        datosmensaje[1] = snapshot.child("mes").val();
        datosmensaje[2] = snapshot.child("dia").val();
        datosmensaje[3] = snapshot.child("Nombre").val();
        datosmensaje[4] = snapshot.child("lugar").val();
        
        var mensagge = "Recuarda que la fecha del evento es "+datosmensaje[0]+"/"+datosmensaje[1]+"/"+datosmensaje[2]+". El nombre del chaman es: "+datosmensaje[3]+" y el lugar es: "+datosmensaje[4];
        var template_params = {
            "user_email": emailsend,
            "mensagge": mensagge
         }
         
        var service_id = "default_service";
        var template_id = "formulario_de_pago";
        emailjs.send(service_id, template_id, template_params);
    });
    
    cuposDis--;
    console.log(listaParticipantes);
    listaParticipantes[cuposDis] = Nombreuser;  
    var ref = firebase.database().ref('Eventos/'+departamento.value+"/"+Idevento);
    ref.update({
        lista : listaParticipantes,
        cuposD : ""+cuposDis
    });
    
    listaEventosuser.push(departamento.value);
    listaEventosuser.push(Idevento);
    console.log(listaEventosuser);
    var ref = firebase.database().ref('Usuarios/'+Nombreuser);
    ref.update({
       lista : listaEventosuser
    });

}
function findeagendar(){
    cambiodepantalla('pantallaAbonar','PantInicioUsuario');
    document.getElementById('VolverAlInicio').classList.add('none');
}

function crearEvento(){
    var Cfecha = document.getElementById("Crearfecha").value;
    var Clugar = document.getElementById("Crearlugar").value;
    var Chora = document.getElementById("Crearhora").value;
    var Ccupos = document.getElementById("CrearCupos").value;
    var Cvalor = document.getElementById("Crearvalor").value;
    var rfecha = Cfecha.split("-");
    var participantes=[];
    for(var i = 0 ; i < Ccupos ; i++){
        participantes[i]="";

    } 

    var ref = firebase.database().ref('Eventos/'+Cdepartamento.value);
    var newPostRef = ref.push();
    newPostRef.set({
        Chaman : Nombreuser,
        Nombre : Nombre+" "+Apellido,
        año : rfecha[0], 
        mes : rfecha[1],
        dia : rfecha[2],
        lugar : Clugar,
        hora : Chora,
        cupos : Ccupos,
        cuposD : Ccupos,
        valor : Cvalor,
        lista : participantes    
    });
    
}

function noSection(id){
    document.getElementsByTagName('section')[0].setAttribute("class", "none");
    document.getElementById(id).classList.remove("none");
}


