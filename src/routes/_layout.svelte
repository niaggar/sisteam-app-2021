<script>
	import Nav from '../components/Nav.svelte'
	import { onMount } from 'svelte'
    import { stores } from '@sapper/app'

	export let segment

    const { session } = stores()

    onMount(async () => {
        firebase.auth().onIdTokenChanged(async (user) => {
            try {
                if (!user) {
                    console.log(`User does not exist`)
                    $session.user = false
                    return
                }
                
                console.log(user)
                const token = await user.getIdToken()
                $session.user = token
                console.log(`User found and session set! ${user.displayName}`)

            } catch (e) {
                console.log(`Something went wrong`)
                $session.user = false
                return
            }
        })
    })
</script>


<slot></slot>
<Nav {segment}/>


<style>
    :global(body) {
        box-sizing: border-box;
        min-height: 100vh;
    }
</style>
