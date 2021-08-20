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
    export let noticia = 'Undifined'
</script>

<h1>{noticia}</h1>
