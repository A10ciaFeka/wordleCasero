var palabra = 'ARBOL';

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
        console.log(filas[index].children[columna].style.backgroundColor);
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

window.onload = ()=>{
    let filas = document.querySelectorAll('tr');
    let index = 0;

    let arrayLetras = crearArray();

    window.addEventListener('keydown', (e)=>{
        if(e.keyCode==13 || arrayLetras.includes(e.keyCode) || e.keyCode==8){
            let coorLibres = celdaLibre(index);
        
            if(coorLibres!=0 && e.key!='Enter' && e.key!='Backspace'){
                filas[coorLibres[0]].children[coorLibres[1]].textContent = e.key.toUpperCase();
            }

            if(e.key=='Enter' && coorLibres==0){
                if(!comprobarPalabra(index)){
                    index++;
                }else{
                    alert('has ganado');
                }
            }

            if(e.key=='Backspace'){
                borrarLetra(index);
            }
        }
        console.log(e);

    });
    
}