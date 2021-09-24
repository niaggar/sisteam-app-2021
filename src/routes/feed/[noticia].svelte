<script context="module">
	export async function preload({ params }) {
        const { noticia } = params

		if (noticia)
			return { noticia }
		else
			this.error(400, 'Es necesaro indicar que noticia se esta buscando')
	}
</script>

<script>
	import { onMount } from 'svelte'

	export let noticia = 'Undifined'
	let query = null

	const obtenerNoticia = async () => {
		query = await db.collection('news')
			.where('tituloCorto', '==', noticia)
			.get()
			.then((querySnapshot) => querySnapshot.docs[0].data())
			.catch((error) => console.log('ERROR buscando la noticia: ', error))
	}

	onMount(() => obtenerNoticia())
</script>


<main>
	{#if query != null}
		<article>
			<h1>{query.titulo}</h1>
			<small>{query.creacion.toDate().toLocaleString()}</small>
			{@html query.contenido}
		</article>
	{:else}
		<article>
			<h1>Loading...</h1>
		</article>
	{/if}
</main>


<style>
	main {
		padding: 1.5rem 0.5rem 5.5rem 0.5rem;
		min-height: 100vh;
		background-color: #ececec;
	}

	article {
		background-color: var(--white);
		padding: 3em 1em;
		margin-top: 0.5em;
		border-radius: 0.2em;
		box-shadow: 0 0 3px 0 #666666a8;
	}

	article small {
		color: #525252;
		display: block;
		margin-bottom: 2rem;
	}

	article h1 { 
		font-size: 2.1rem;
		line-height: 1.2em;
		margin-bottom: 0.5em;
	}

</style>