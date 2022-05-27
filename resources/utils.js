const forbidden = [
    "parseInt", "document.write", "eval", "isNaN", "unescape", "escape",
    "parseFloat", "parseInt", "eval", "isNaN", "onload", "alert", "script",
    "<",  ">", "onload", "=", "(", ")", '"' ,"'" ,"/"]
// const forbidden = []   

const getForbidden = () =>{
    return forbidden
}
const btoa = (text) => {
    return Buffer.from(text, 'binary').toString('base64');
};

const atob = (base64) => {
    return Buffer.from(base64, 'base64').toString('binary');
};
const reemplazarTodos = (palabra,reemplazar) =>{

    while(palabra.includes(reemplazar)){
        //console.log(`Se ha reemplazado ${reemplazar} en ${palabra}`)
        palabra = palabra.replace(reemplazar,'')
    }
    return palabra
}

 const limpiarRequest = (data) =>{
    
    forbidden.forEach(word => {
        let valores = Object.values(data); ;
        for(let i=0; i< valores.length; i++){
        valores[i] = reemplazarTodos(valores[i],word)
        }
    })
    return data
    
}

//mi aporte
const limpiador = (obj) => {
    let keys = Object.keys(obj);
    let values = Object.values(obj);
    let arr2 = [];
    values.forEach((el) => {
      let arr1 = [el];
      forbidden.forEach((malo) => {
        while (arr1[0].toString().includes(malo)) {
          arr1[0] = arr1[0].replace(malo, "");
        }
      });
      arr2.push(...arr1);
    });
    let preObj = keys.map((el, index) => {
      return [el, arr2[index]];
    });
    let resultado = Object.fromEntries(preObj);
    // console.log(resultado);
    return resultado;
  };

  const compararObjetos=(obj1, obj2)=>{
    //comparar si 2 objetos son iguales. Para evaluar si request.body es distinto a req (req es entregado por limpiadro(obj))
    //Compara primero los keys para ver si tienen la misma estructura, luego compara los valores para ver si son iguales
    //finalmente devuelve un booleano true en caso de ser iguales los objetos, o false enc asod e ser distintos los objetos
    let estructura=Object.keys(obj1).toString()==Object.keys(obj2).toString()
    let valores=Object.values(obj1).length==Object.values(obj2).length && Object.values(obj1).every(function(v,i) { return v === Object.values(obj2)[i] } )
    console.log('estructura:',estructura?'ok':' no es igual')
    console.log('valores:',valores?'ok':' no son iguales. Se presume un intento de injeccion de código')
    return estructura && valores
}
module.exports = {
    getForbidden,
    reemplazarTodos,
    limpiarRequest,
    btoa,
    atob,
    limpiador,
    compararObjetos
}



