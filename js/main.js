/*window.onload = init;

function init(){
    //Authentication with google
    firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
            // User is signed in.
            firebase.firestore().collection("form").doc(firebase.auth().currentUser.uid).get().then(function(doc) {
                //Checking if the uid exist in the collection form of the db
                if (doc.exists) {
                    console.log("Estaj dentro, pinshi pendejo");
                } else {
                    // doc.data() will be undefined in this case
                    console.log("No such document!");
                }

                console.log(firebase.auth().currentUser.displayName);
                console.log(firebase.auth().currentUser.email);
            }).catch(function(error) {
                console.log("Error getting document:", error);
            });
        } else {
            // No user is signed in.
            console.log("Not logged in");
            var signButton = document.getElementById("btn_login");
            signButton.addEventListener('click', ()=>{
                auth();
            });
        }
      });
}


function auth() {
    var provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithRedirect(provider);
    console.log("You're in");
}*/