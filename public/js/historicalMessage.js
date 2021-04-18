let headers = new Headers();

headers.append('Access-Control-Allow-Origin', 'http://127.0.0.1:8080');


    const url='http://127.0.0.1:8080/mensajes/chat/historial'
    
    async function getMensajes() {
    
      try {
          let res = await fetch(url,);
          return await res.json();
      } catch (error) {
          console.log(error);
      }
  }

 
