<script>
    import AcountAlert from "../components/AcountAlert.svelte"
    import TablaDatos from '../components/TablaDatos.svelte'
	import { stores } from '@sapper/app'

    const { session } = stores()

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

    let datosHistoricos = {
        caption: "Promedios desde:</br>Sabado 3 de julio - Miercoles 6 de Julio",
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
            <button>Tomar nueva medicion</button>
        </div>
    </article>
    
    <article>
        <h1>Historico</h1>
        <div>
            <TablaDatos datosMostrar={datosHistoricos}></TablaDatos>
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
