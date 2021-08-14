<script>
    const handleSubmintLogin = () => {}
</script>


<div class="container">
    <div>
        <form on:submit={handleSubmintLogin}>
            <input placeholder="Correo electronico" type="email">
            <input placeholder="Contraseña" type="password">
            <button type="submit">Iniciar sesion</button>
        </form>
    </div>
    <a href="auth">Volver</a>
</div>


<style>
    :global(body) {
		background-color: var(--green-b);
	}

    * {
        display: block;
        width: 100%;
    }
    
    .container {
        width: 100%;
        padding: 3.5em 1.5em;
    }

    form * {
        padding: 0.8em;
        margin: 0.5em 0;
        outline: none;
        border: none;
        font-size: 1rem;
        transition: all 0.3s;
    }

    form input {
        background: none;
        border-bottom: 4px solid var(--green-w);
        color: var(--green-w);
        margin: 1em 0;
    }

    form input::placeholder {
        color: var(--green-w);
        opacity: 0.7;
    }

    form input:active,
    form input:focus {
        box-shadow: 0 0 0 2.5px var(--green-w);
    }

    form button {
        text-align: center;
        cursor: pointer;
        font-weight: 700;
        border-radius: 0.3em;
        background-color: var(--yellow);
        color: var(--green-b);
        margin-top: 1em;
    }

    form button:hover {
        filter: brightness(1.2);
    }

    form button:active,
    form button:focus {
        box-shadow: 0 0 0 1.5px var(--white);
    }

    a {
        width: 100%;
        text-align: center;
        color: var(--green-w);
        opacity: 0.7;
        font-weight: 700;
    }
</style>