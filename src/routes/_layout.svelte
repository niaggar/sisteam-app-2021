<script>
	import Nav from '../components/Nav.svelte'
	import { onMount } from 'svelte'
    import { stores } from '@sapper/app'

	export let segment

    const { session } = stores()


    const guardarCredenciales = async () => {
        const user = await firebase.auth().currentUser

        $session.userData = { 
            uid: user.uid,
            name: user.displayName,
            email: user.email,
        }
    }

    const majadorDeUsuario = async (user) => {
        if (!user) {
            $session.user = false
            $session.userData = false
            return
        }
        
        setTimeout(async () => await guardarCredenciales(), 1000)
        const token = await user.getIdToken()
        $session.user = token
    }


    onMount(async () => firebase.auth().onIdTokenChanged(majadorDeUsuario))
</script>


<slot></slot>
<Nav {segment}/>


<style>
    :global(body) {
        box-sizing: border-box;
        min-height: 100vh;
    }
</style>
