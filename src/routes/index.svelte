<script>
	import AcountAlert from "../components/AcountAlert.svelte";
	import { stores } from '@sapper/app';

	const { session } = stores()
</script>


<svelte:head>
	<title>Korapp: Home</title>
</svelte:head>

{#if !$session.user}
	<AcountAlert></AcountAlert>
{/if}

<article>
	<h1>Bienvenida</h1>
	<div>
		<p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Distinctio voluptatibus vel delectus reiciendis asperiores earum quasi tempore obcaecati minus veritatis.</p>

		<a href="statistics">
			Tomar primera medicion!
		</a>
	</div>
</article>

<article>
	<h1>Noticia destacada</h1>
	<div>
		<p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Distinctio voluptatibus vel delectus reiciendis asperiores earum quasi tempore obcaecati minus veritatis.</p>
		<a href="feed">
			Leer mas...
		</a>
	</div>
</article>

<article>
	<h1>Estadisticas</h1>
	<div>
		<p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Distinctio voluptatibus vel delectus reiciendis asperiores earum quasi tempore obcaecati minus veritatis.</p>
	</div>
</article>


<style>
	:global(body) {
		background-color: #F3F3F3;
	}
	
	article {
		width: 100%;
		margin-bottom: 2.5em;
	}

	article h1 {
		font-weight: 200;
	}

	article div {
		background-color: var(--white);
		padding: 1em;
		margin-top: 0.5em;
		border-radius: 0.2em;
		box-shadow: 0 0 3px 0 #666666a8;
	}

	article a {
		display: block;
		padding: 1em;
		background-color: var(--green-w);
		color: #ffffff;
		text-decoration: none;
		border-radius: 0.2em;
		margin-top: 0.5em;
	}
</style>