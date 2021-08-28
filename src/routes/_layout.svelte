<script>
	import Nav from '../components/Nav.svelte'
	import { onMount } from 'svelte'
    import { stores } from '@sapper/app'

	export let segment

    const { session } = stores()


    const guardarCredenciales = () => {
        return new Promise((resolve, reject) => {
            const user = firebase.auth().currentUser
            
            $session.userData = { 
                uid: user.uid,
                name: user.displayName,
                email: user.email,
            }

            if ($session.userData.uid)
                return resolve()
            else
                return reject("Error getting the user data")
        }) 
    }

    const majadorDeUsuario = async (user) => {
        if (!user) {
            $session.user = false
            $session.userData = false
            return
        }
        
        guardarCredenciales()
            .then(async () => {
                $session.user = await user.getIdToken()
                console.log($session.userData)
            })
            .catch((err) => {
                $session.user = false
                $session.userData = false
                console.error(err)
            })
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
