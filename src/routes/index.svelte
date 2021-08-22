<script>
	import AcountAlert from "../components/AcountAlert.svelte";
	import { stores } from '@sapper/app';
	import { onMount } from 'svelte'

	const { session } = stores()


	let query = null

	onMount(async () => {
		await db.collection('news')
			.orderBy('creacion', 'desc')
			.limit(1)
			.get()
			.then((querySnapshot) => {
				querySnapshot.forEach((doc) => query = doc.data())
			})
			.catch((error) => {
				console.log("Error getting documents: ", error);
			});
	})
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
		{#if query != null}
			<div>
				<h1>{query.titulo}</h1>
				<small>{query.creacion.toDate().toLocaleString()}</small>
				<p>{query.resumen}</p>
				<a href="feed/{query.tituloCorto}">Leer mas</a>
			</div>
		{:else}
			<div><p>Cargando...</p></div>
		{/if}
	</article>
	
	<article>
		<h1>Estadisticas</h1>
		<div>
			<p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Distinctio voluptatibus vel delectus reiciendis asperiores earum quasi tempore obcaecati minus veritatis.</p>
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
	}

	article a:hover {
        filter: brightness(1.2);
    }

    article a:active,
    article a:focus {
        box-shadow: 0 0 0 1.5px var(--white);
    }
</style>