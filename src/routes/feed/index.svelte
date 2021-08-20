<script>
	import { onMount } from 'svelte'
import { each } from 'svelte/internal'

	let noticias = false

	onMount(async () => {
		
		noticias = await db.collection('news')
			.get()
			.then((querySnapshot) => {
				return querySnapshot.docs.map((doc) => {
					return {
						id: doc.id,
						content: doc.data()
					}	
				})
			})
		
		console.log(noticias)
	})
</script>


<svelte:head>
	<title>Korapp: Feed de noticias</title>
</svelte:head>

<h1>Feed</h1>

{#if !noticias}
	<div>
		<p>Cargando informacion...</p>
	</div>
{:else}
	{#each noticias as { content }}
		<div>
			<h1>{content.titulo}</h1>
			<p>{content.resumen}</p>
			<a href="feed/{content.tituloCorto}">Leer mas</a>
		</div>
	{/each}
{/if}
