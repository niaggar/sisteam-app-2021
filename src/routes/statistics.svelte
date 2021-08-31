<script>
    import AcountAlert from "../components/AcountAlert.svelte"
    import TablaDatos from '../components/TablaDatos.svelte'
	import { stores } from '@sapper/app'
    import { onMount } from 'svelte'

    const { session } = stores()
    
    let datosHistoricos, unsuscribeHistory

    onMount(async () => {
        
    })
    
    // Manejador que esta pendiente de los cambios en el historial
    // de mediciones del usuario
    const promediarDatos = (documentos) => {
        doc.datos.forEach((d, i) => {
            doc.datos.reduce((acumulador, siguiente) => {

            })
        })
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
                    console.log('---'.repeat(10))
                    datos.forEach((doc, index) => {
                        let fecha = doc.creacion.toDate().toLocaleString()
                        console.log(doc)
                        console.log(`medicion ${index + 1} de: ${fecha}`)
                    })
                    console.log('---'.repeat(10))
                })
        } else {
            try { unsuscribeHistory() } catch (err) {}
        }
    }
    

    

    let datos = {
        caption: "",
        datos: [
            {
                nombre: 'Contamiacion auditiva',
                unidad: 'nan',
                valor: 100,
                nivel: 'normal'
            },
            {
                nombre: 'Contamiacion del aire',
                unidad: 'ded',
                valor: 50,
                nivel: 'alto'
            },
            {
                nombre: 'Nivel de rayos UV',
                unidad: 'met',
                valor: 200,
                nivel: 'alto'
            },
            {
                nombre: 'Contaminacion termica',
                unidad: 'C°',
                valor: 55,
                nivel: 'medio'
            },
        ]
    }


    // funcion que recolecta los datos de los sensores y toma la medicio
    const tomarMedicion = () => {
        // Colocar codigo de conexion bluetooth con microbit

        function generateRandom(max){
            return (Math.random() * max).toFixed(3);
        }

        // Codigo de prueba
        let ultimaMedicion = [
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

        let medicionParaAlmacenar = {
            creacion: firebase.firestore.Timestamp.fromDate(new Date()),
            datos: [...ultimaMedicion],
        }
        
        if ($session.user)
            guardarDatos(medicionParaAlmacenar)
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

    const testear = () => {
        console.log('Iniciando testeo')
        console.log('---'.repeat(10))

        db.collection('mediciones')
            .doc($session.userData.city)
            .collection($session.userData.uid)
            .orderBy('creacion', 'desc')
            .limit(7)
            .onSnapshot((snapshot) => {
                let datos = snapshot.docs.map((doc) => doc.data())
                console.log('---'.repeat(10))
                datos.forEach((doc, index) => {
                    let fecha = doc.creacion.toDate().toLocaleString()
                    console.log(`medicion ${index + 1} de: ${fecha}`)
                })
                console.log('---'.repeat(10))
            })
        
        console.log('---'.repeat(10))
        console.log('Finalizando testeo')
    }
    
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
            <TablaDatos datosMostrar={datos}></TablaDatos>
        </div>
        
        <div class="nueva-medicion-seccion">
            <div>
                <h2>Ultima medicion</h2>
                <p>Lunes 3 de julio, 12:30pm</p>
            </div>
            <button on:click={tomarMedicion}>Tomar nueva medicion</button>
            <button on:click={testear}>Testear</button>
        </div>
    </article>
    
    <article>
        <h1>Historico</h1>
        <div>
            <!-- <TablaDatos datosMostrar={datosHistoricos}></TablaDatos> -->
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
