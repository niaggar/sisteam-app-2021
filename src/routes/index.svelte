<script>
	import AcountAlert from "../components/AcountAlert.svelte"
	import TablaDatos from '../components/TablaDatos.svelte'
	import { stores } from '@sapper/app';
	import { onMount } from 'svelte'

	const { session } = stores()


	let noticiaDestacada = null
	let ultimaMedicion = null

	const obtenerUltimaMedicion = () => {
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

	const obtenerNoticiaDestacada = () => {
		db.collection('news')
			.orderBy('creacion', 'desc')
			.limit(1)
			.get()
			.then((querySnapshot) => {
				querySnapshot.forEach((doc) => noticiaDestacada = doc.data())
			})
			.catch((error) => {
				console.log("Error getting documents: ", error)
			})
	}

	$: if ($session.user) obtenerUltimaMedicion()

	onMount(() => obtenerNoticiaDestacada())
</script>


<svelte:head>
	<title>Korapp: Home</title>
</svelte:head>

{#if !$session.user}
	<AcountAlert></AcountAlert>
{/if}

<main>
	<article>
		<h1>Bienvenida</h1>
		<div>
			<h2>Hola  {$session.userData ? $session.userData.name : 'Usuario'}</h2>
			<p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Distinctio voluptatibus vel delectus reiciendis asperiores earum quasi tempore obcaecati minus veritatis.</p>
	
			<a href="statistics">
				Tomar primera medicion!
			</a>
		</div>
	</article>
	
	<article>
		<h1>Noticia destacada</h1>
		{#if noticiaDestacada != null}
			<div>
				<h2>{noticiaDestacada.titulo}</h2>
				<small>{noticiaDestacada.creacion.toDate().toLocaleString()}</small>
				<p>{noticiaDestacada.resumen}</p>
				<a href="feed/{noticiaDestacada.tituloCorto}">Leer mas</a>
			</div>
		{:else}
			<div><p>Cargando...</p></div>
		{/if}
	</article>
	
	<article>
		<h1>Estadisticas</h1>
		{#if $session.user && ultimaMedicion}
			<div class="ultima-medicion">
				<h2>Ultima Medicion</h2>
				<TablaDatos datosMostrar={ultimaMedicion}></TablaDatos>
				<small>{ultimaMedicion.creacion.toDate().toLocaleString()}</small>
			</div>
		{:else if $session.user && !ultimaMedicion}
			<div>
				<p>El usuario {$session.userData.name} no tiene ninguna medicion almacenada</p>
			</div>
		{:else if !$session.user}
			<div>
				<p>Para poder almacenar las mediciones es necesario estar conectado</p>
				<a href="auth">Conectate!</a>
			</div>
		{/if}
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

	article > h1 {
		font-weight: 200;
		letter-spacing: 0.06em;
		text-transform: uppercase;
	}

	article div {
		background-color: var(--white);
		padding: 1em;
		margin-top: 0.5em;
		border-radius: 0.2em;
		box-shadow: 0 0 3px 0 #666666a8;
	}

	article div small {
		color: #525252;
		display: block;
		margin-bottom: 1rem;
	}

	article a {
		display: block;
		padding: 1em;
		background-color: var(--green-w);
		color: #ffffff;
		text-decoration: none;
		border-radius: 0.2em;
		margin-top: 0.5em;
		transition: all 0.3s;
		box-shadow: 0 0 3px 0 #666666a8;
	}

	article a:hover {
        filter: brightness(1.2);
    }

    article a:active,
    article a:focus {
        box-shadow: 0 0 0 1.5px var(--white);
    }

	.ultima-medicion small {
		text-align: center;
		margin-top: 1em;
	}
</style>