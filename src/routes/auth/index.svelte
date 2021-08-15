<script context="module">
	export async function preload(page, session) {
		let { user } = session
		if (user)
		    return this.redirect(302, '/')
	}
</script>


<svelte:head>
	<title>Korapp: Conectate</title>
</svelte:head>

<div>
    <a class="i" href="auth/login">
        Iniciar sesion con una cuenta existente
    </a>
    <a class="s" href="auth/signin">
        Crear nueva cuenta
    </a>
</div>


<style>
    :global(body) {
		background-color: var(--green-b) !important;
        padding: 0;
	}

    div {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        width: 100%;
        min-height: 100vh;
        padding: 5em 1.5em;
    }

    a  {
        display: block;
        width: 100%;
        padding: 0.8em;
        margin: 0.5em 0;
        border-radius: 0.3em;
        text-align: center;
        text-decoration: none;
        cursor: pointer;
        font-weight: 700;
        transition: all 0.3s;
    }

    a:hover {
        filter: brightness(1.2);
    }
    
    a:active,
    a:focus {
        box-shadow: 0 0 0 1.5px var(--white);
    }

    .i { 
        background-color: var(--yellow);
        color: var(--green-b);
    }
    
    .s { 
        background-color: var(--green-w);
        color: var(--green-b);
    }
</style>
