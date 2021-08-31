<script context="module">
	export async function preload(page, session) {
		let { user, BATTUTA_API_KEY } = session
		if (user)
		    return this.redirect(302, '/')
        else {
            return { token: BATTUTA_API_KEY };
        }
	}
</script>


<script>
    import { goto } from '@sapper/app'
    // export let token = ''

    let email, password, name, city = ''

    /*
    navigator.geolocation.getCurrentPosition(async (p) => {
        let latitude = p.coords.latitude
        let longitude = p.coords.longitude

        let geocoder = new google.maps.Geocoder
        let latlng = { lat: latitude, lng: longitude }

        geocoder.geocode({ 'location': latlng }, (results, status) => {
            if (status === google.maps.GeocoderStatus.OK) {
                if (results[1]) {
                    console.log(results[1].formatted_address)
                    console.log(results[1])
                    console.log(results)
                } else {
                    window.alert('No hay resultados')
                }
            } else {
                alert('Geocoder failed due to: ' + status)
            }
        })
    })
    */

    const handleSubmintSignin = (e) => {
        e.preventDefault()
        
        email = email.trim()
        password = password.trim()
        name = name.trim()
        city = city.trim().toLowerCase()

        firebase.auth().createUserWithEmailAndPassword(email, password)
            .then((res) => {
                db.collection('users').doc(res.user.uid)
                    .set({ name, city })
                    .then(() => console.log('User ' + res.user.uid + ''))
                    .catch((err) => console.error(err))
                
                res.user.updateProfile({ displayName: name })
            })
            .then(() => setTimeout(()=> goto('/')), 2000 )
            .catch((err) => console.error('AUTH ERR ' + err))
    }
</script>


<div class="container">
    <div>
        <form on:submit={handleSubmintSignin}>
            <input required bind:value={name} placeholder="Nombre de usuario" type="text">
            <input required bind:value={email} placeholder="Correo electronico" type="email">
            <input required bind:value={password} placeholder="Contraseña" type="password">
            <input required bind:value={city} placeholder="Nombre de la ciudad" type="text">
            <button type="submit">Crear cuenta</button>
        </form>
    </div>
    <a href="auth">Volver</a>
</div>


<style>
    :global(body) {
		background-color: var(--green-b) !important;
        padding: 0;
	}

    * {
        display: block;
        width: 100%;
    }

    .container {
        width: 100%;
        padding: 3.5em 1.5em;
        margin-top: 35%;
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
        margin-top: 2rem;
    }
</style>