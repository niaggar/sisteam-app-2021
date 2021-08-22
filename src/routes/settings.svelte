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

    const handleData = () => {
        // let now = new Date()
        // db.collection('news')
        //     .add({ 
        //         titulo: 'Noticia con imagen',
        //         tituloCorto: 'noticia-con-imagen',
        //         resumen: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quos temporibus quae similique modi tenetur adipisci.',
        //         contenido: '<p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatibus officia voluptate vero quis consectetur ab architecto provident assumenda, ullam ex sequi modi quibusdam, nemo totam. Pariatur doloremque quam eaque eum!</p><p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Culpa omnis esse magni distinctio, qui porro quas quisquam dolorum possimus. Eligendi fugit quas nam consectetur aliquid eaque quidem aperiam autem incidunt.</p><h2>Lorem ipsum dolor sit amet.</h2><p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Sit laudantium quisquam officiis, vel sequi repellendus perspiciatis nulla molestiae quidem corrupti illo quo delectus illum consequuntur, temporibus perferendis? Aut illum cumque assumenda eius itaque aliquam, fugiat dolorum amet a accusantium in!</p><img src="https://watchandlearn.scholastic.com/content/dam/classroom-magazines/watchandlearn/videos/animals-and-plants/plants/what-are-plants-/What-Are-Plants.jpg" alt="Imagen de una planta"><p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Sit laudantium quisquam officiis, vel sequi repellendus perspiciatis nulla molestiae quidem corrupti illo quo delectus illum consequuntur, temporibus perferendis? Aut illum cumque assumenda eius itaque aliquam, fugiat dolorum amet a accusantium in!</p<p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Sit laudantium quisquam officiis, vel sequi repellendus perspiciatis nulla molestiae quidem corrupti illo quo delectus illum consequuntur, temporibus perferendis? Aut illum cumque assumenda eius itaque aliquam, fugiat dolorum amet a accusantium in!</p',
        //         creacion: firebase.firestore.Timestamp.fromDate(now)
        //     })
        //     .catch((err) => console.error(err))

        // db.collection('news')
        //     .add({ 
        //         titulo: 'Segunda noticia',
        //         tituloCorto: 'segunda-noticia',
        //         resumen: 'Este es el contenido de la noticia',
        //         contenido: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Enim ipsam quas consequuntur nobis repellendus culpa nihil illo id quos distinctio!. Lorem ipsum dolor sit amet consectetur adipisicing elit. Enim ipsam quas consequuntur nobis repellendus culpa nihil illo id quos distinctio!',
        //         creacion: firebase.firestore.Timestamp.fromDate(now)
        //     })
        //     .catch((err) => console.error(err))

        // db.collection('news')
        //     .add({ 
        //         titulo: 'Tercera noticia',
        //         tituloCorto: 'tercera-noticia',
        //         resumen: 'Este es el contenido de la noticia',
        //         contenido: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Enim ipsam quas consequuntur nobis repellendus culpa nihil illo id quos distinctio!. Lorem ipsum dolor sit amet consectetur adipisicing elit. Enim ipsam quas consequuntur nobis repellendus culpa nihil illo id quos distinctio!',
        //         creacion: firebase.firestore.Timestamp.fromDate(now)
        //     })
        //     .catch((err) => console.error(err))

        // db.collection('news')
        //     .add({ 
        //         titulo: 'Cuarta noticia',
        //         tituloCorto: 'cuarta-noticia',
        //         resumen: 'Este es el contenido de la noticia',
        //         contenido: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Enim ipsam quas consequuntur nobis repellendus culpa nihil illo id quos distinctio!. Lorem ipsum dolor sit amet consectetur adipisicing elit. Enim ipsam quas consequuntur nobis repellendus culpa nihil illo id quos distinctio!',
        //         creacion: firebase.firestore.Timestamp.fromDate(now)
        //     })
        //     .catch((err) => console.error(err))
    }
</script>

<svelte:head>
	<title>Korapp: Configuraciones</title>
</svelte:head>

<button on:click={handleClick}>Cerrar sesion</button>
<button on:click={handleName}>Mostra nombre</button>
<button on:click={handleData}>Add data to firestore</button>