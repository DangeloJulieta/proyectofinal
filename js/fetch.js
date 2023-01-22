//Llamar a la api con la info de los gatos
const api_key = "live_SP1SaeXK883LPlW34XeGUJ4ZbMCG2sHxrruCh79xaZ2sfNivDXL11OrYKQjAILN4";
const url = `https://api.thecatapi.com/v1/images/search?limit=10&has_breeds=1`;  //pedimos 10 gatos con la info completa

let gatosAPIlista = [];

const fetchGatosLista = async () => {
    try {
        const respuesta = await fetch(url, {
            headers: {
                "x-api-key": api_key,
            },
        });
        const gatosAPIlista = await respuesta.json();
        console.log(gatosAPIlista);
        listaGatosMostrados(gatosAPIlista);

    } catch (error) {
        console.log(error)
    }
}

fetchGatosLista();

function listaGatosMostrados (gatosAPIlista) {

    let gatos = [];

    gatosAPIlista.forEach(gato => {

    // Crear un nuevo objeto con la información necesitada de cada gato
    const gatosnuevos = {
        id: gato.id,
        nombre: gato.breeds[0].id,
        raza: gato.breeds[0].name,
        paisOrigen: gato.breeds[0].origin,
        wikiURL: gato.breeds[0].wikipedia_url,
        adaptabilidad: gato.breeds[0].adaptability,
        amistoso: gato.breeds[0].affection_level,
        imgURL: gato.url,
    };

    gatos.push(gatosnuevos);     // Agregar el nuevo objeto al array de gatos a mostrar

    });
    pintarGatos(gatos);
    console.log(gatos)

    Toastify({
        text: "10 Gatos en adopción encontrados",
        className: "info",
        style: {
            background: "#14213D",
        },
        offset: {
            x: 10,
            y: 50,
        },
    }).showToast();
}


