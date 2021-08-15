<script>
    let noEsVisible = false
</script>


<div class:no-visible={noEsVisible}>
    <aside>
        <p>Parece que no tienes conectada una cuenta. Te invitamos a que lo hagas para que puedas disfrutar de todas las funcionalidades!</p>
        <a href="auth">Conectarse</a>
        <span on:click={() => noEsVisible = !noEsVisible}>Continuar sin cuenta</span>
    </aside>
</div>


<style>
    div.no-visible {
        display: none;
    }

    div {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-color: #000000a2;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 0 1em;
    }

    aside {
        width: 100%;
        background-color: #ffffff;
        border-radius: 0.3rem;
        padding: 1em;
        text-align: center;
    }

    aside a {
        display: block;
        padding: 1em;
        border-radius: 0.3rem;
        background-color: var(--green-w);
        text-align: center;
        margin: 1em 0 0.5em 0;
        color: #ffffff;
        text-decoration: none;
    }

    span {
        cursor: pointer;
    }
</style>
