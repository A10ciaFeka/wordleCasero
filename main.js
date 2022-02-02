var palabra = 'LIBRE';

const comprobarPalabra = (index)=>{
    let filas = document.querySelectorAll('tr');

    for(let columna = 0; columna<filas[index].children.length; columna++){
        if(filas[index].children[columna].textContent == palabra[columna]){
            filas[index].children[columna].style.backgroundColor = '#6AAA64';
        }else if(palabra.includes(filas[index].children[columna].textContent)){
            filas[index].children[columna].style.backgroundColor = '#C9B458';
        }else{
            filas[index].children[columna].style.backgroundColor = '#3A3A3C';
        }
    }

    for(let columna = 0; columna<filas[index].children.length; columna++){
        if(filas[index].children[columna].style.backgroundColor!='rgb(106, 170, 100)'){
            return false;
        }
    }
    return true;
}

const celdaLibre = (index)=>{
    let filas = document.querySelectorAll('tr');

    for(let j=0; j<filas[index].children.length; j++){
        if(filas[index].children[j].textContent==""){
            return new Array(index,j);
        }
    }
    return 0;
}


async function comprobarDiccionario(index){
    let palabraCan = palabraDeFila(index);

    palabraCan = palabraCan.toLowerCase();
    //Hacemos la busqueda
    const url = 'https://api.dictionaryapi.dev/api/v2/entries/es/'+palabraCan;

    let resultado = await fetch(url);
    resultado = await resultado.json();
    
    return resultado[0]!=undefined;
}

async function palabraAleatoria(){
    const url = "https://palabras-aleatorias-public-api.herokuapp.com/random";

    let resultado = await fetch(url);
    resultado = await resultado.json();

    if(resultado.body.Word.length==5){
        return resultado.body.Word;
    }else{
        return 0;
    }
}

const pillarPalabra = async()=>{
    let terminado = false;
    let palabraAle = '';

    while(palabraAle.length==0){
        console.log(palabraAle.length);
        let pal = await palabraAleatoria();
        if(pal != 0){
            palabraAle = pal;
        }
    }

    return palabraAle;
}



window.onload = async()=>{
    crearTablero();
    
    let arrayLS = [];

    let filas = document.querySelectorAll('tr');
    

    if(localStorage.getItem('filas')){
        arrayLS = JSON.parse(localStorage.getItem('filas'));
        console.log(arrayLS);

        for(let i=0; i<arrayLS.length; i++){
            //Tenemos la palabra
            let pal = arrayLS[i];
            

            for(let j=0; j<filas[0].children.length; j++){
                filas[i].children[j].textContent = pal[j];
                if(palabra[j]==pal[j]){
                    filas[i].children[j].style.backgroundColor = '#6AAA64';
                }else if(palabra.includes(pal[j])){
                    filas[i].children[j].style.backgroundColor = '#C9B458';
                    console.log('llego');

                }else{
                    filas[i].children[j].style.backgroundColor = '#3A3A3C';
                }
            }

        }
    }

    let index = arrayLS.length;

    let arrayLetras = crearArray();

    

    window.addEventListener('keydown', async (e)=>{
        if(e.keyCode==13 || arrayLetras.includes(e.keyCode) || e.keyCode==8){
            let coorLibres = celdaLibre(index);
        
            if(coorLibres!=0 && e.key!='Enter' && e.key!='Backspace'){
                filas[coorLibres[0]].children[coorLibres[1]].textContent = e.key.toUpperCase();
            }

            if(e.key=='Enter' && coorLibres==0){
                // if(await comprobarDiccionario(index)){

                    if(!comprobarPalabra(index)){
                        arrayLS.push(palabraDeFila(index));

                        index++;
                    }else{
                        arrayLS.push(palabraDeFila(index));
                        
                        mostrarMensaje('Has ganado','green');
                    }
                    localStorage.setItem('filas',JSON.stringify(arrayLS));
                // }else{
                //     mostrarMensaje('la palabra no esta en el diccionario','red');
                // }
            }

            if(e.key=='Backspace'){
                if(palabraDeFila(index)!=palabra){
                    borrarLetra(index);
                }
            }
        }

    });
    
}

const crearTablero = ()=>{
    let tabla = document.createElement('table');
    tabla.align = 'center';
    tabla.cellspacing = '10';

    for(let filas=0; filas<6; filas++){
        let fila = document.createElement('tr');
        for(let columnas=0; columnas<5; columnas++){
            fila.appendChild(document.createElement('td'));    
        }
        tabla.appendChild(fila);
    }

    document.querySelector('.tablero').appendChild(tabla);
}


const mostrarMensaje = (msg,color)=>{
    if(!document.querySelector('.mensaje').firstChild){
        let elemento = document.createElement('h2');
        elemento.appendChild(document.createTextNode(msg));
        elemento.style.color = color;

        document.querySelector('.mensaje').appendChild(elemento);

        window.setTimeout(()=>{
            document.querySelector('.mensaje').removeChild(elemento);
        },3500);
    }
    
    
}

const crearArray = ()=>{
    let arrayLetras = [];

    for(let i=65; i<=90; i++){
        arrayLetras.push(i);
    }
    return arrayLetras;
}


const borrarLetra = (index)=>{
    let filas = document.querySelectorAll('tr');
    let poslibre = celdaLibre(index);
    if(poslibre!=0){
        if(poslibre[1]-1>=0){
            filas[poslibre[0]].children[poslibre[1]-1].textContent = '';
        }
        
    }else{
        filas[index].children[filas[0].children.length-1].textContent = '';
    }
}

const palabraDeFila = (index)=>{
    let filas = document.querySelectorAll('tr');
    let palabraCan='';
    

    for(let columna = 0; columna<filas[index].children.length; columna++){
        palabraCan += filas[index].children[columna].textContent;
    }

    return palabraCan;
}