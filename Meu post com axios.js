/* 

	instalar duas dependencias: json-server e axios:
	
	npm install --save json-server axios
	
*/

// Arquivo usePost.js: src/hooks/usePost.js
import { useState } from 'react';
import axios from 'axios';

function usePost(){

    const[postData, setPostData] = useState({
        load:false,
        dados:'',
        erro:''
    });

    function execute({ dataBase }){
        setPostData({
            load:true,
            dados:'',
            erro:''

        });

        axios
            .post('http://localhost:3006/posts', dataBase)
            .then(response =>{
                setPostData({
                    load:false,
                    dados:response.dataBase,
                    erro:''
                });
            })
            .catch(error =>{
                setPostData({
                    load:false,
                    dados:'',
                    erro: error.message
                });
            })
    }

    return{...postData, execute}
}

export default usePost;


// Arquivo App.js---------------------------------------------------------------------------
import React, { useEffect, useState } from 'react';
import './App.css';
import usePost from './hooks/usePost';



function App(){


  const [titulo, setTitulo] = useState('');
  const [autor, setAutor] = useState('');
  const { load, dados, erro, execute } = usePost(); // info de src/hooks/usePost

  

  function salvarDados(e){
    e.preventDefault();
    //console.log({titulo, autor});
    execute({ dataBase: { titulo, autor } }); //dataBase foi criado em src/hooks/usePost
  }

  

  return(
    <div className="App">
      <header className="App-header">
        <form onSubmit={salvarDados}>
          <label>
            Título:
            <input type="text" onChange={(e) => setTitulo(e.target.value)} />
          </label>
          <label>
            Autor:
            <input type="text" onChange={(e) => setAutor(e.target.value)} />
          </label>
          <input type="submit" value={ load ? 'Carregando...' : 'Enviar Dados'} disabled={load} />
        </form>

        
        
      </header>
    </div>
  );
}

export default App;

//------------------------------------------------------------------------------------------------------

//Arquivo *fora de src, pasta server/db.json:

{
  "posts": [ ]
}

//--------------------------------------------------------------------------------------------------------

/*
	- no arquivo package.json inserir o seguinte codigo em "scritps":
	
		"mock": "json-server --watch server/db.json --port 3006 --delay 2000" 

		como no exemplo abaixo:
*/

// Arquivo package.json :-------------------------------------------------------------------------------------------------------------------

"scripts": {
    "start": "react-scripts start",
    "build": "react-scripts build",
    "test": "react-scripts test",
    "eject": "react-scripts eject",
    "mock": "json-server --watch server/db.json --port 3006 -- delay 2000" 
  },
  
 //-------------------------------------------------------------------------------------------------------------------------------------------

/* Para startar o servidor, com o botão direito da pasta que contem o projeto abra-o no CMD e digitar o seguinte comando:

	npm run mock
	
	logo após o servidor ficará rodando no CMD a parte

*/


