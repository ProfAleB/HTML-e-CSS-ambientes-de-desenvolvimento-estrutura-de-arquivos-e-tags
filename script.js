// Função para navegar entre as "páginas"
function mudarPagina(idPagina) {
    // Esconde todas as páginas
    const paginas = document.querySelectorAll('.pagina');
    paginas.forEach(pagina => {
        pagina.classList.remove('ativa');
    });

    // Mostra a página escolhida
    const paginaAlvo = document.getElementById(idPagina);
    paginaAlvo.classList.add('ativa');
}

// Lógica do Simulador
const inputTemp = document.getElementById('temp');
const inputUmidadeAr = document.getElementById('umidade-ar');
const inputUmidadeSolo = document.getElementById('umidade-solo');

const valorTemp = document.getElementById('temp-valor');
const valorUmidadeAr = document.getElementById('umidade-ar-valor');
const valorUmidadeSolo = document.getElementById('umidade-solo-valor');

const resultadoTexto = document.getElementById('resultado-texto');
const emojiStatus = document.getElementById('emoji-status');

// Função que analisa os dados e dá o veredito
function atualizarSimulador() {
    const temp = parseInt(inputTemp.value);
    const uAr = parseInt(inputUmidadeAr.value);
    const uSolo = parseInt(inputUmidadeSolo.value);

    // Atualiza os números na tela
    valorTemp.innerText = temp;
    valorUmidadeAr.innerText = uAr;
    valorUmidadeSolo.innerText = uSolo;

    // Regras básicas para o cultivo do morango
    let problemas = [];

    // Checa Temperatura (Ideal: 15 a 25)
    if (temp < 15) problemas.push("Muito frio! Os morangos não vão se desenvolver.");
    if (temp > 25) problemas.push("Muito calor! As plantas podem murchar.");

    // Checa Umidade do Ar (Ideal: 60 a 80)
    if (uAr < 60) problemas.push("Ar muito seco. Cuidado com pragas (ácaros).");
    if (uAr > 80) problemas.push("Ar muito úmido. Alto risco de fungos nas folhas.");

    // Checa Umidade do Solo (Ideal: 60 a 80)
    if (uSolo < 60) problemas.push("Solo seco. As plantas precisam de mais irrigação.");
    if (uSolo > 80) problemas.push("Solo encharcado. As raízes podem apodrecer.");

    // Gera o resultado
    if (problemas.length === 0) {
        resultadoTexto.innerText = "Excelente! A estufa está perfeitamente equilibrada. Produção alta e sustentável!";
        resultadoTexto.style.color = "#2e7d32";
        emojiStatus.innerText = "🍓🌿✨"; // Morango feliz e saudável
    } else {
        // Junta os problemas e exibe na tela
        resultadoTexto.innerText = "Atenção: " + problemas.join(" ");
        resultadoTexto.style.color = "#c62828";
        
        // Se a planta estiver morrendo por extremos
        if (temp > 35 || temp < 5 || uSolo < 30) {
            emojiStatus.innerText = "🥀🏜️"; // Planta morrendo
        } else {
            emojiStatus.innerText = "🍓💧 (Precisa de ajuste)"; // Morango pedindo ajuda
        }
    }
}

// Adiciona eventos para que a função rode sempre que você mexer nos controles
inputTemp.addEventListener('input', atualizarSimulador);
inputUmidadeAr.addEventListener('input', atualizarSimulador);
inputUmidadeSolo.addEventListener('input', atualizarSimulador);

// Chama a função uma vez no início para não ficar com o texto vazio
atualizarSimulador();