<script>
    import { goto } from '@sapper/app'
    import { stores } from '@sapper/app';

	const { session } = stores()

    const handleClick = () => {
        firebase.auth().signOut()
            .then(() => {
                goto('/')
            })
            .catch(err => console.error(err))
    }

    const handleName = () => {
        console.log($session.userData.name)
        console.log($session.userData)
    }
</script>

<svelte:head>
	<title>Korapp: Configuraciones</title>
</svelte:head>

<button on:click={handleClick}>Cerrar sesion</button>
<button on:click={handleName}>Mostra nombre</button>