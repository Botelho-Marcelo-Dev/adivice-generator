const botaoDado = document.getElementById('botaoDado')
const pConselhos = document.getElementById('pConselhos')
const idConselhos = document.getElementById('adviceId')
const pEsperar = document.getElementById('pEspere')
let coolDown = 3


botaoDado.addEventListener('click', () => {
    pegarConselhos()

    let intervaloDeEspera = setInterval(() => {
        coolDown--
        if (coolDown === 0) {
            pEspere.innerText = "Click Again!"
            coolDown = 3
            clearInterval(intervaloDeEspera)
        } else {
            pEsperar.innerText = `Wait ${coolDown} seconds!`
        }
    }, 1000);
})

async function pegarConselhos() {
    try {
        const urlAPI = "https://api.adviceslip.com/advice"
        const resultadoConselhos = await fetch(urlAPI)
        const dados = await resultadoConselhos.json()

        const conselhoPronto = dados.slip.advice
        const idConselhoSelecionado = dados.slip.id

        idConselhos.innerText = `Advice #${idConselhoSelecionado}`
        pConselhos.innerText = `"${conselhoPronto}"`
    } catch (err) {
        console.log(err)
        pConselhos.innerText = "We have found an error! Try again later."
    }
}
