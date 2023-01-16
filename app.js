require('dotenv').config();
const { leerInput, inquirerMenu, pausa, ListarLugares } = require("./helpers/inquirer");
const Busquedas = require("./models/busquedas");




const main= async() => {
    let opt= '';
    const busquedas= new Busquedas;



    do{
        opt= await inquirerMenu();

        switch(opt){
            case 1:

            const lugar= await leerInput('Ingrese el lugar a buscar: ');
            const lugares= await busquedas.ciudad(lugar);
            const id= await ListarLugares(lugares);

            if( id==='0') continue;

            const lugaressel= lugares.find( l => l.id== id);    


            busquedas.agregarhistorial(lugaressel.nombre);

            const clima= await busquedas.climaL(lugaressel.lat, lugaressel.lng);

            console.clear();
            console.log('\nInformación de la ciudad: \n'.cyan);
            console.log('Ciudad: '.cyan, lugaressel.nombre);
            console.log('Latitud: '.cyan,  lugaressel.lat);
            console.log('Longitud: '.cyan, lugaressel.lng);
            console.log('Temperatura: '.cyan, clima.temp);
            console.log('Mínima: '.cyan, clima.min);
            console.log('Máxima: '.cyan, clima.max);
            console.log('Descripción del clima: '.cyan, clima.weather);
        


                break;
            case 2: 


            busquedas.historialcap.forEach( (lugar, i) => {
                const idx=  `${i+1}.`.cyan;
                console.log(`${idx} ${lugar}`);
                
            });

                break; 
            case 0:
                    console.log('\n Usted ha elegido salir.'.green);
                    break;
        }

        await pausa();
    } while(opt!=0);


}

main();