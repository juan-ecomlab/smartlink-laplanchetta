const $ = id => document.getElementById(id);
const emailRegex = /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i;

const agregarEmail = async (email, client) => {
    const item = {
        email,
        client
    }

    const urlLambda = "https://u57njg43jj.execute-api.sa-east-1.amazonaws.com/"

    const options = {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json',
        },
        body: JSON.stringify(item),
        };
        fetch(urlLambda, options)
        .then(data => {
            if(!data.ok) {
                throw Error(data.status)
            }
            return data.json()
        }).then(email => {
            console.log(email)
        }).catch(e => {
            console.log(e);
            });
}

window.addEventListener('load', () => {
    $('email').addEventListener('focus', () => {
        $('error').innerText = ""
    })

    $('email').addEventListener('blur', () => {
        $("email").classList.remove("borde")
    })

    $('email').addEventListener('keydown', () => {
        $('error').innerText = ""
    })

    $("form").addEventListener("submit", event => {
        event.preventDefault()
        let error = false
        let form = $('form');

        if(!emailRegex.test($('email').value)){
            error = true
            $('error').innerText = "*Debes ingresar un email válido"
            $("form").elements[0].value = ""
        }

        if(!error) {
            agregarEmail(form.elements[0].value, "planchetta")
            Swal.fire({
                title: "Correo enviado con éxito a <b>" + form.elements[0].value + "</b><br> Por favor, revisá tu casilla",
                imageUrl: "img/logo-alerta.svg",
                background: "#fff url(img/bg-alert.jpg)",
                imageAlt: "Logo",
                showConfirmButton: false,
                showCloseButton: true,
                timer: 2500,
                timerProgressBar: true,
                customClass: {
                    title: "title",
                    popup: "alerta",
                    image: "imgAlerta"
                  }
              });
            $("form").elements[0].value = ""
        }
    })

    $('niniasButton').addEventListener('click', () => {
        $("ninias1").classList.toggle("oculto")
        $("ninias2").classList.toggle("oculto")
    })

    $('niniosButton').addEventListener('click', () => {
        $("ninios1").classList.toggle("oculto")
        $("ninios2").classList.toggle("oculto")
    })

    $('bebesButton').addEventListener('click', () => {
        $("bebesNinias").classList.toggle("oculto")
        $("bebesNinios").classList.toggle("oculto")
    })
})