let arrayNumsAleatorios = [];
let quantNums = 3;
let numSecreto = gerarNumAleatorio();
let tentativas = 1;
let chute;

function gerarNumAleatorio(){
    let numEscolhido = parseInt(Math.random() * quantNums + 1);
    let quantNumsArray = arrayNumsAleatorios.length;

    if(quantNumsArray == quantNums){
        arrayNumsAleatorios = [];
    }

    if(arrayNumsAleatorios.includes(numEscolhido)){
        return gerarNumAleatorio();
    }else{
        arrayNumsAleatorios.push(numEscolhido);
        return numEscolhido;
    }
}

function exibirTextoNaTela(tag, texto){
    let campo = document.querySelector(tag);
    campo.innerHTML = texto;
    responsiveVoice.speak(texto, 'Brazilian Portuguese Female', {rate:1.2});
}

function exibirMensagemInicial(){
    exibirTextoNaTela('h1', 'Jogo do número secreto');
    exibirTextoNaTela('p', 'Escolha um número entre 1 e 10');
}

exibirMensagemInicial();

function limparCampo(){
    chute = document.querySelector('input');
    chute.value = '';
}

function verificarChute(){
    chute = document.querySelector('input').value;
    
    if(chute == numSecreto){
        let palavraTentativa = tentativas > 1 ? 'tentativas' : 'tentativa';
        let mensagemTentativas = `Parabens! Você decobriu o número secreto em ${tentativas} ${palavraTentativa}`;

        exibirTextoNaTela('h1', 'Acertou!');
        exibirTextoNaTela('p', mensagemTentativas);

        document.getElementById('reiniciar').removeAttribute('disabled');
    }else{
        if(chute > numSecreto){
            exibirTextoNaTela('p', 'O número secreto é menor');
        }else{
            exibirTextoNaTela('p', 'O número secreto é maior');
        }
        tentativas++;
        limparCampo();
    }
}

function reiniciarJogo(){
    numSecreto = gerarNumAleatorio();
    limparCampo();
    tentativas = 1;
    exibirMensagemInicial();
    document.getElementById('reiniciar').setAttribute('disabled', true);
}