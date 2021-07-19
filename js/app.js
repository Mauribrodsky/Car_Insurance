
//Constructors
function Seguro(marca, year, tipo){
    this.marca = marca;
    this.year = year;
    this.tipo = tipo;
}
//Make a quote with the car insurance data
Seguro.prototype.cotizarSeguro = function(){
    /*
    Americano = 1.15
    Asiatico = 1.05
    Europeo = 1.35
    */
    let cantidad;
    const base = 2000;

    switch(this.marca){
        case '1':
            cantidad = base * 1.15;
            break;
        case '2':
            cantidad = base * 1.05;
            break;
        case '3':
            cantidad = base * 1.35;
            break;
        default:
            break;    
    }
    //Read the year
    const diferencia = new Date().getFullYear() - this.year;

    //Each year that the diference is bigger the cost is reduced by 3%
    cantidad -= ((diferencia * 3) * cantidad) / 100;

    /*
    If car insurance is "básico" = * 30% +
    If car insurance is "completo" = * 50% +
    */
   if(this.tipo === 'básico'){
       cantidad *= 1.30;
   }else{
       cantidad *= 1.50;
   }

    return cantidad;
}

function UI(){}

//Add years options
UI.prototype.llenarOpciones = () => {
    const max = new Date().getFullYear(),
          min = max - 21;

    const selectYear = document.querySelector('#year');
    
    for(let i = max; i > min; i--){
        let option = document.createElement('option')
        option.value = i;
        option.textContent = i;
        selectYear.appendChild(option);
    }
}

//Displays alerts on screen
UI.prototype.mostrarMensaje = (mensaje, tipo) => {
    const div = document.createElement('div');
    if(tipo === 'error'){
        div.classList.add('error');
    }else{
        div.classList.add('correcto');
    }
    div.classList.add('mensaje', 'mt-10');
    div.textContent = mensaje;

    //Insert in HTML
    const formulario = document.querySelector('#cotizar-seguro');
    formulario.insertBefore(div, document.querySelector('#resultado'));

    setTimeout(() =>{
        div.remove();
    }, 3000);
}

UI.prototype.mostrarResultado = (total, seguro) => {

    const{ marca, year, tipo } = seguro;

    let textoMarca;

    switch(marca){
        case '1':
            textoMarca = "Americano";
            break;
        case '2':
            textoMarca = "Asiatico";
            break;
        case '3':
            textoMarca = "Europeo";
            break;
        default:
            break;            
    }



      //Create result
      const div = document.createElement('div');
      div.classList.add('mt-10');

      div.innerHTML = `
          <p class="header">Tu Resumen</p>
          <p class="font-bold">Marca: <span class="font-normal"> ${textoMarca} </span></p>
          <p class="font-bold">Año: <span class="font-normal"> ${year} </span></p>
          <p class="font-bold">Tipo: <span class="font-normal capitalize"> ${tipo} </span></p>
          <p class="font-bold">Total: <span class="font-normal"> $${total} </span></p>
      `;
      const resultadoDiv = document.querySelector('#resultado');

      //Show spinner
      const spinner = document.querySelector('#cargando');
      spinner.style.display = 'block';
      setTimeout(() => {
          spinner.style.display = 'none'; //Remove spinner
          resultadoDiv.appendChild(div); //Show result
      },3000);
}

//Instantiating UI
    const ui = new UI();

document.addEventListener('DOMContentLoaded', () => {
    ui.llenarOpciones();//Add select with the years
})

eventListeners();
function eventListeners(){
    const formulario = document.querySelector('#cotizar-seguro');
    formulario.addEventListener('submit', cotizarSeguro);
}

function cotizarSeguro(e){
    e.preventDefault();

    //Read the selected brand
    const marca = document.querySelector('#marca').value;
    //Read the selected year
    const year = document.querySelector('#year').value;
    //Read the selected type
    const tipo = document.querySelector('input[name="tipo"]:checked').value;

    if(marca === "" || year === "" || tipo === ""){
        ui.mostrarMensaje("Todos los campos son obligatorios", "error");
        return;
    }
    ui.mostrarMensaje("Cotizando...", "exito");

    //Hide previous quotes
    const resultados = document.querySelector('#resultado div');
    if(resultados != null){
        resultados.remove();
    }

    //Instantiating car insurance
    const seguro = new Seguro(marca, year, tipo);
    const total = seguro.cotizarSeguro();

    //Using prototype
    ui.mostrarResultado(total, seguro);
}

