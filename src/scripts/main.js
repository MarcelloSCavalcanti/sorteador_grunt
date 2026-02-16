console.log('Hello')
document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('form-sorteador').addEventListener('submit', function(evento){
        evento.preventDefault();
        let numeroMaximo = document.getElementById('numero-maximo').value;
        numeroMaximo = parseInt(numeroMaximo);

        let numeroAleatorio = Math.ceil(Math.random() * numeroMaximo) //numero aleatório vez o numero escrito pelo usuário e assim amplicicando a aleatoriedade até o máximo do valor inserido pelo usuário
        //Math.ceil arredonda para cima enquanto Math.floor arredonda para baixo Math.round() vai arredondar após 0.5
        //nesse caso o round pode vir a dar número sorteado 0 se o resultado for menor que 0.49
        document.getElementById('resultado-valor').innerText = numeroAleatorio;
        document.querySelector('.resultado').style.display = 'block';
    })
})