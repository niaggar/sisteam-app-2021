<script>
    import AcountAlert from "../components/AcountAlert.svelte"
    import TablaDatos from '../components/TablaDatos.svelte'
	import { stores } from '@sapper/app'
    import { onMount } from 'svelte'

    const { session } = stores()
    
    let unsuscribeHistory
    let ultimaMedicion = false
    let promedioMedicion = false


    // Al iniciar la aplicacion ecupera la ultima medicion almacenada
    // en firetore 
    const tomarUltimaMedicion = () => {
        db.collection('mediciones')
            .doc($session.userData.city)
            .collection($session.userData.uid)
            .orderBy('creacion', 'desc')
            .limit(1)
            .get()
            .then((snapshot) => {
                let data = snapshot.docs.map((docs) => docs.data())
                if (data[0])
                    ultimaMedicion = data[0]
            })
    }



    // Manejador que esta pendiente de los cambios en el historial
    // de mediciones del usuario
    const promediarDatos = (datos) => {
        let promedio = [
            { 
                nombre: 'Contamiacion auditiva',
                valor: 0,
                unidad: 'gr',
            },
            { 
                nombre: 'Contamiacion del aire',
                valor: 0,
                unidad: 'ctx',
            },
            { 
                nombre: 'Nivel de rayos UV',
                valor: 0,
                unidad: 'UV',
            },
            { 
                nombre: 'Contaminacion termica',
                valor: 0,
                unidad: '°C',
            },
        ]

        datos.forEach((d) => {
            promedio[0].valor += parseInt(d.datos[0].valor);
            promedio[1].valor += parseInt(d.datos[1].valor);
            promedio[2].valor += parseInt(d.datos[2].valor);
            promedio[3].valor += parseInt(d.datos[3].valor);
        })

        promedio[0].valor = (promedio[0].valor / datos.length).toFixed(3)
        promedio[1].valor = (promedio[1].valor / datos.length).toFixed(3)
        promedio[2].valor = (promedio[2].valor / datos.length).toFixed(3)
        promedio[3].valor = (promedio[3].valor / datos.length).toFixed(3)

        return { datos: promedio }
    }

    $: {
        if ($session.user){
            unsuscribeHistory = db.collection('mediciones')
                .doc($session.userData.city)
                .collection($session.userData.uid)
                .orderBy('creacion', 'desc')
                .limit(7)
                .onSnapshot((snapshot) => {
                    let datos = snapshot.docs.map((doc) => doc.data())
                    promedioMedicion = promediarDatos(datos)

                    console.log(datos)
                })
            
            tomarUltimaMedicion()
        } else {
            try { unsuscribeHistory() } catch (err) {}
        }
    }


    // funcion que recolecta los datos de los sensores y toma la medicio
    const tomarMedicion = async () => {
        // Colocar codigo de conexion bluetooth con microbit

        function generateRandom(max){
            return (Math.random() * max).toFixed(3);
        }

        // Codigo de prueba
        let mediciones = [
            { 
                nombre: 'Contamiacion auditiva',
                valor: generateRandom(5),
                unidad: 'gr',
                nivel: 'medio'
            },
            { 
                nombre: 'Contamiacion del aire',
                valor: generateRandom(20),
                unidad: 'ctx',
                nivel: 'alto'
            },
            { 
                nombre: 'Nivel de rayos UV',
                valor: generateRandom(30),
                unidad: 'UV',
                nivel: 'medio'
            },
            { 
                nombre: 'Contaminacion termica',
                valor: generateRandom(5),
                unidad: '°C',
                nivel: 'normal'
            },
        ]

        ultimaMedicion = {
            creacion: firebase.firestore.Timestamp.fromDate(new Date()),
            datos: [...mediciones],
        }
        
        if ($session.user)
            guardarDatos(ultimaMedicion)
    }

    // funcion que se encarga de guardar la medicion en firestore
    const guardarDatos = (datosParaAlmacenar) => {
        db.collection('mediciones')
            .doc($session.userData.city)
            .collection($session.userData.uid)
            .add(datosParaAlmacenar)
            .catch((err) => alert('Error almacenando datos. ', err))

        db.collection('mediciones')
            .doc($session.userData.city)
            .set({ ultimaMedicion: datosParaAlmacenar.creacion })
            .catch((err) => console.error(err))
    }   

    // db.collection('mediciones').doc($session.userData.uid)
    //     .onSnapshot(async (doc) => {
    //         if (doc.data().driver != 'undifined') { }
    //     })

    /*
    Estructura de los datos:

    MEDICIONES
        --- CIUDADES nombre
        CALI
            ultima medicion fecha
            
            -- USUARIOS uid
            asd121f1v8v12e
            
                --- MEDICION uid
                d31f113gafa
                    fecha de mediciones
                    datos
                
                --- MEDICION uid
                d31f113gafa
                    fecha de mediciones
                    datos
            
            -- USUARIOS uid
            a123y9721f1v8v12e

                --- MEDICION uid
                d317635113gafa
                    fecha de mediciones
                    datos

        --- CIUDADES nombre
        BOGOTA
            ultima medicion fecha
            
            -- USUARIOS uid
            asd121f1v8v12e
            
                --- MEDICION uid
                d31f113gafa
                    fecha de mediciones
                    datos
            
            -- USUARIOS uid
            a123y9721f1v8v12e

                --- MEDICION uid
                d317635113gafa
                    fecha de mediciones
                    datos


    
    */
    
    // Codigo para obtener las ciudades disponibles
    // db.collection('mediciones').get()
    //     .then(snapshot => {
    //         snapshot.forEach(doc => {
    //             console.log(doc.id)
    //         })
    //     })
    //     .catch(err => console.error(err))
</script>


<svelte:head>
	<title>Korapp: Statistics</title>
</svelte:head>

{#if !$session.user}
	<AcountAlert></AcountAlert>
{/if}

<main>
    <article>
        <h1>Mediciones</h1>
        <div>
            {#if ultimaMedicion}
                <TablaDatos datosMostrar={ultimaMedicion}></TablaDatos>
            {:else}
                <p>Parece que no hay mediciones almacenadas...</p>
            {/if}
        </div>
        
        <div class="nueva-medicion-seccion">
            <div>
                {#if ultimaMedicion}
                    <h2>Ultima medicion</h2>
                    <p>{ultimaMedicion.creacion.toDate().toLocaleString()}</p>
                {:else}
                    <p>Parece que no hay mediciones almacenadas...</p>
                {/if}
            </div>
            <button on:click={tomarMedicion}>Tomar nueva medicion</button>
        </div>
    </article>
    
    <article>
        <h1>Historico</h1>
        <div>
            {#if promedioMedicion}
                <TablaDatos datosMostrar={promedioMedicion}></TablaDatos>
            {:else}
                <p>Parece que no hay mediciones almacenadas...</p>
            {/if}
        </div>
    </article>

    <article>
        <h1>Globales</h1>
        <div>
            <p>Loading...</p>
        </div>
    </article>
</main>


<style>
    main {
		padding: 1.5rem 0.5rem 5.5rem 0.5rem;
		min-height: 100vh;
		background-color: #ececec;
	}

    article {
		width: 100%;
		margin-bottom: 2.5em;
	}

    article h1 {
		font-weight: 200;
		letter-spacing: 0.06em;
        text-transform: uppercase;
	}

	article > div {
		background-color: var(--white);
		padding: 1em;
		margin-top: 0.5em;
		border-radius: 0.2em;
		box-shadow: 0 0 3px 0 #666666a8;
	}

    .nueva-medicion-seccion {
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    .nueva-medicion-seccion * {
        line-height: 1;
        font-size: 1rem;
    }

    .nueva-medicion-seccion h2 {
        font-weight: 800;
    }

    .nueva-medicion-seccion button {
        width: 8rem;
        padding: 0.6em;
        border: none;
        outline: none;
        background-color: var(--green-w);
        color: #ffffff;
        border-radius: 0.2em;
        transition: all 0.3s;
        box-shadow: 0 0 3px 0 #666666a8;
    }

    .nueva-medicion-seccion button:hover,
    .nueva-medicion-seccion button:active {
        filter: brightness(1.2);
    }

</style>
