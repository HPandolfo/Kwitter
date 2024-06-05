
//ADICIONE SEUS LINKS DO FIREBASE
const firebaseConfig = {
    apiKey: "AIzaSyD8K9_mz9bk3iSefw6JPLWKQqSXjtgrFx8",
    authDomain: "kwitter-60052.firebaseapp.com",
    databaseURL: "https://kwitter-60052-default-rtdb.firebaseio.com",
    projectId: "kwitter-60052",
    storageBucket: "kwitter-60052.appspot.com",
    messagingSenderId: "1025171956672",
    appId: "1:1025171956672:web:632950f5dee5abaebcde25",
    measurementId: "G-0RF60GKFQ8"
  };

firebase.initializeApp(firebaseConfig);


inicializar();


function inicializar() {
   const nomeUsuario = localStorage.getItem("nomeUsuario");
   // console.log(nomeUsuario);
   document.getElementById("nomeUsuario").textContent = "Olá, " + nomeUsuario + "!";


   getData();
}


function addSala() {
   const nomeSala = document.getElementById("nomeSala").value;
   console.log(nomeSala);
   if (nomeSala) {
       firebase.database().ref('/').child(nomeSala).set({
            // '/'--> significa acessar a raiz do meu firebase, que é uma barra,é topo da estrutura de dados do meu Firebase, usamos para add o nome de usuario do BD ;
           purpose: "sala criada"
       });


       carregaSala(nomeSala);
   }
}


function getData() {
   firebase.database().ref('/').on("value", snapshot => {
       let salas = [];
       snapshot.forEach(childSnapshot => {
           const childKey = childSnapshot.key;
           const html = '<div class="nomeSala" id="'
               + childKey
               + '" onclick="carregaSala(this.id)">#'
               + childKey
               + '</div>'
           salas.push(html);
       });
       document.getElementById("output").innerHTML = salas.join("");
       // const output = document.getElementById("output");
       // output.innerHTML = salas.join("");
   });
}


function carregaSala(sala) {
   localStorage.setItem("nomeSala", sala);
   location = "chat.html";
}
