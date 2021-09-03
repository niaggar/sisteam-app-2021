<script>
    export let datosMostrar = {}
</script>

<table>
    {#if datosMostrar.caption != '' && datosMostrar.caption != undefined}
        <caption>{@html datosMostrar.caption}</caption>
    {/if}
    <thead>
        <tr>
          <th class="first-column"></th>
          <th>N</th>
          <th>M</th>
          <th>A</th>
          <th>Valor</th>
        </tr>
    </thead>

    <tbody>
        {#each datosMostrar.datos as { nombre, unidad, valor, nivel }}
            <tr>
                <td class="first-column">{nombre}:</td>

                <td class="nivel-column">
                    <div class="nivel-circulo" class:activo={nivel === 'normal'} style="color: #28706C;">
                    </div>              
                </td>

                <td class="nivel-column">
                    <div class="nivel-circulo" class:activo={nivel === 'medio'} style="color: #F1C24A;">
                    </div>
                </td>

                <td class="nivel-column">
                    <div class="nivel-circulo" class:activo={nivel === 'alto'} style="color: #F3643F;">
                    </div>
                </td>
                
                <td class="valor-column">{valor} {unidad}</td>
            </tr>    
        {/each}
    </tbody>
</table>


<style>
    table { 
        font-size: 1rem;
        width: 100%;
        border-spacing: 5px;
    }

    table thead {
        font-size: 1.2rem;
        text-align: center;
    }

    table caption {
        margin: 0.5rem 0;
        color: gray;
    }

    table .first-column {
        padding-right: 5px;
        width: 7rem;
    }

    table .nivel-column {
        align-items: center;
    }

    table .nivel-column .nivel-circulo {
        width: 1.5rem;
        height: 1.5rem;
        border-radius: 100%;
        border: 2px solid currentColor;
        margin: 0 auto;
        box-sizing: border-box;
    }

    table .nivel-column .nivel-circulo.activo {
        background-color: currentColor;
    }

    table .valor-column {
        width: 5rem;
        text-align: center;
    }
</style>
