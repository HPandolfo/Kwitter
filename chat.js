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


const nomeUsuario = localStorage.getItem("nomeUsuario")
const nomeSala = localStorage.getItem("nomeSala")


inicializar();

function inicializar() {
    document.getElementById("nomeSala").textContent = '#' + nomeSala
    getData();
}

function getData() {
   
    const output = document.getElementById("output");
 
 
    firebase.database().ref('/' + nomeSala).on("value", snapshot => {
       
        output.innerHTML = "";
    
        snapshot.forEach(childSnapshot => {
         
            const childKey = childSnapshot.key;
 
 
            if(childKey != "purpose") {
             
                const childMsg = childSnapshot.val();
              
                const nome = childMsg.nome;
              
                const msg = childMsg.mensagem;
             
                const likes = childMsg.likes;
 
 
                //Criação da Interface da Mensagem
 
 
                const chatCard = document.createElement("div");
           
                chatCard.className = "chatCard";
              
                const chatNome = document.createElement("h4");
             
                chatNome.className = "chatNome";
           
                chatNome.textContent = nome;
               
                chatCard.appendChild(chatNome);
               
                const row = document.createElement("div");
           
                row.className = "row";
              
                chatCard.appendChild(row);
               
                const col = document.createElement("div");
              
                col.className = "col";
             
                row.appendChild(col);
           
                const chatMsg = document.createElement("h5");
                
                chatMsg.className = "chatMsg";
               
                chatMsg.textContent = msg;
              
                col.appendChild(chatMsg);
         
                const colAuto = document.createElement("div");
          
                colAuto.className = "col-auto";
              
                row.appendChild(colAuto);
              
                const botaoLike = document.createElement("button");
           
                botaoLike.className = "btn btn-info";
           
                botaoLike.id = childKey;
               
                botaoLike.value = likes;
                
                botaoLike.setAttribute("onclick", "likeMsg(this.id)");
   
                botaoLike.innerHTML = '<i class="fa-regular fa-thumbs-up"></i> ' + likes;
             
                colAuto.appendChild(botaoLike);
               
                output.appendChild(chatCard);
            }
        });
    });
 }


 function send() {
 
    const txtMsg = document.getElementById("msg");
  
    const msg = txtMsg.value;
 
 
    if (msg.trim()) {
   
        firebase.database().ref('/' + nomeSala).push({
         
            nome: nomeUsuario,
          
            mensagem: msg,
            
            likes: 0
        });
        
        txtMsg.value = "";
    }
 }
 
 
 function likeMsg(btnId) {
  
    let likes = Number(document.getElementById(btnId).value);
    
    likes++;
    firebase.database().ref('/' + nomeSala).child(btnId).update({
        likes: likes
    })
 }
 