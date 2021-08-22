<script>
	import { onMount } from 'svelte'

	let noticias = false

	onMount(async () => {
		
		noticias = await db.collection('news')
			.orderBy('creacion', 'desc')
			.get()
			.then((querySnapshot) => {
				return querySnapshot.docs.map((doc) => {
					return {
						id: doc.id,
						content: doc.data()
					}	
				})
			})
			.catch((err) => console.error('GET NEWS ERROR:', err))
	})
</script>


<svelte:head>
	<title>Korapp: Feed de noticias</title>
</svelte:head>

<main>
	<h1>Feed</h1>
	{#if !noticias}
		<article class="card">
			<p>Cargando informacion...</p>
		</article>
	{:else}
		{#each noticias as { content }}
			<article class="card noticias">
				<h1>{content.titulo}</h1>
				<small>{content.creacion.toDate().toLocaleString()}</small>
				<p>{content.resumen}</p>
				<a href="feed/{content.tituloCorto}">Leer mas</a>
			</article>
		{/each}
	{/if}
</main>


<style>
	main {
		padding: 1.5rem 0.5rem 5.5rem 0.5rem;
		min-height: 100vh;
		background-color: #ececec;
	}

	main > h1 {
		font-weight: 200;
		letter-spacing: 0.06em;
	}

	.card {
		background-color: var(--white);
		padding: 1em;
		margin-top: 0.5em;
		border-radius: 0.2em;
		box-shadow: 0 0 3px 0 #666666a8;
	}

	.noticias h1 {
		font-size: 1.2rem;
		font-weight: 500;
	}

	.noticias a {
		display: block;
		width: 100%;
	}

	.noticias small {
		color: #525252;
		display: block;
		margin-bottom: 1rem;
	}
</style>
