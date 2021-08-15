<script>
    import { goto } from '@sapper/app'

    const handleClick = () => {
        firebase.auth().signOut()
            .then(() => {
                goto('/')
            })
            .catch(err => console.error(err))
    }

    const handleName = () => {
        const user = firebase.auth().currentUser;
        console.log(user.displayName)
        console.log(user.email)
    }
</script>

<svelte:head>
	<title>Korapp: Configuraciones</title>
</svelte:head>

<button on:click={handleClick}>Cerrar sesion</button>
<button on:click={handleName}>Mostra nombre</button>