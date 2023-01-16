const inquirer= require('inquirer');
const { default: ListPrompt } = require('inquirer/lib/prompts/list');
require('colors');

/*1. Se instalan los paquetes necesarios(inquirer y colors)
2. Se crea el objeto 'preguntas' con las propiedades de seleccion de inquirer (tipo lista, elecciones y sus propiedades...)
3. Se crea la funcion inquirerMenu que será asíncrona
4. Dentro de ella se va a desestructurar como objeto la variable 'opcion' y se usara el await para que ejecute el comando inquirer.prompt, con los argumentos de preguntas.
5. Retornará de valor la opcion seleccionada.
6. Se creará la función pausa, que será asíncrona y que tendrá de argumento la variable 'opcion'.
7. Se crea el objeto question de tipo input y se ingresa el nombre y mensaje, luego se ejecuta el await  con el inquirer.prompt y con la question de argumento.
8. Se crea la funcion que pedirá datos y que el mensaje variará segun la opción que seleccione el usuario.
9. Será asíncrona y el argumento que recibirá será 'message' que lo retornará la función de inquirerMenu.
10. Se crea el objeto 'question' que será el que reciba los datos, con las propiedades de tipo(input), nombre, mensaje(message) y una validación del 'value.lenght', si el valor no es igual a 0, pasará la validación, de otro modo retornará un error.
11. Se crea el objeto a destructurar(desc) y se ejecuta el inquirer.prompt con el await y con el 'question' de argumento.
12. La función retornará la descripción.
13. Se exportan todas las funciones a app.js
*/


const preguntas = [
    {
        type: 'list',
        name: 'opcion',
        message: '¿Qué desea hacer? ',
        choices: [
            {
                value: 1,
                name: `${'1.'.green} Buscar un lugar`
            },
            {
                value: 2,
                name: `${'2.'.green} Ver Historial.`
            },
            {
                value: 0,
                name: `${'0.'.green} Salir.`
            }

        ]
    }
];


const inquirerMenu= async() => {


    console.clear();
    console.log('==============================================================='.cyan);
    console.log('Bienvenido al geolocalizador. Seleccione una opción      '.white);
    console.log('===============================================================\n'.cyan);

   const {opcion}= await inquirer.prompt(preguntas);

   return opcion;


}

const pausa = async(opcion) => {
    const question= [
        {
            type: 'input',
            name: 'question',
            message: `Presione ${'ENTER'.green} para continuar`
        }
    ]
    console.log('\n');
    await inquirer.prompt(question);
    console.clear();

    
}

const leerInput= async(message) => {
    const question= [{
        type: 'input',
        name: 'desc', 
        message,
        validate(value) {
            if(value.length===0){
                return 'Por favor, ingrese un valor.';
            }
            return true;
        }

    }];

    const {desc}= await inquirer.prompt(question);
    return desc;
    }

    const ListarLugares = async( lugares=[]) => {

        const choices= lugares.map( (lugar, i) => {

            const idx= `${i+1}.`.green;

            return {
                value: lugar.id,
                name: `${idx} ${lugar.nombre}`
            }

        });

        choices.unshift({
            value: '0',
            name: '0.'.green + ' Volver'
        });

        const preguntas= [
           { 
            type: 'list',
            name: 'id',
            message: 'Resultados de búsqueda:',
            choices
            }
        ]


   const {id}= await inquirer.prompt(preguntas);
   return id;
    }

    const confirmar= async(message) => {


        const question= [{
            type: 'confirm',
            name: 'ok',
            message
        }]
        const {ok}= await inquirer.prompt(question);
        return ok;

    }


    const checklistmostrar = async( tareas=[]) => {

        const choices= tareas.map( (tarea, i) => {

            const idx= `${i+1}.`.green;

            return {
                value: tarea.id,
                name: `${idx} ${tarea.desc}`,
                checked: (tarea.completadoEn) ? true : false
            }

        });
        const pregunta= [
           { 
            type: 'checkbox',
            name: 'ids',
            message: 'Seleccione',
            choices
            }
        ]


   const {ids}= await inquirer.prompt(pregunta);
   return ids;
    }




module.exports= {
    inquirerMenu,
    pausa, 
    leerInput,
    ListarLugares,
    confirmar,
    checklistmostrar
}