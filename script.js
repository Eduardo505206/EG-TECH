
console.log("JavaScript funcionando!");

// Botão para ir até o orçamento

const botao = document.getElementById("btn-orcamento");

botao.addEventListener("click", function () {
    document.getElementById("orcamento").scrollIntoView({
        behavior: "smooth"
    });
});

// Sistema de orçamento

const servicos = document.querySelectorAll(
    '.orcamento input[type="checkbox"]'
);

const total = document.getElementById("total");
const descricao = document.getElementById("descricao");
const outrosServicos = document.getElementById("outros-servicos");

const telefone = "5541984123244";

// Calcular valor dos serviços

function atualizarTotal() {

    let valorTotal = 0;

    servicos.forEach(function (item) {
        if (item.checked) {
            valorTotal += Number(item.value);
        }
    });

    let valorFormatado = valorTotal.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL"
    });

    if (outrosServicos.checked) {
        if (valorTotal === 0) {
            total.textContent = "Sob consulta";
        } else {
            total.textContent = valorFormatado + " + serviços sob consulta";
        }
    } else if (valorTotal === 0 && descricao.value.trim() !== "") {
        total.textContent = "Sob consulta";
    } else {
        total.textContent = valorFormatado;
    }
}

servicos.forEach(function (servico) {
    servico.addEventListener("change", atualizarTotal);
});

descricao.addEventListener("input", atualizarTotal);

atualizarTotal();

// Enviar orçamento pelo WhatsApp

const enviarOrcamento = document.getElementById("enviar-orcamento");

enviarOrcamento.addEventListener("click", function () {

    let selecionados = [];
    let descricaoCliente = descricao.value.trim();

    servicos.forEach(function (item) {
        if (item.checked) {
            selecionados.push(item.parentElement.textContent.trim());
        }
    });

    // Verificar se o cliente informou algum serviço

    if (selecionados.length === 0 && descricaoCliente === "") {
        alert("Selecione um serviço ou descreva o problema!");
        return;
    }

    // Solicitar descrição para outros serviços

    if (outrosServicos.checked && descricaoCliente === "") {
        alert("Por favor, descreva o serviço que você precisa.");
        descricao.focus();
        return;
    }

    let mensagem = "Olá! Gostaria de solicitar um orçamento na EG Tech.\n\n";

    if (selecionados.length > 0) {
        mensagem += "*Serviços selecionados:*\n";
        mensagem += selecionados.join("\n");
        mensagem += "\n\n";
    }

    if (descricaoCliente !== "") {
        mensagem += "*Descrição do problema ou serviço:*\n";
        mensagem += descricaoCliente + "\n\n";
    }

    mensagem += "*Valor estimado:* " + total.textContent;
    mensagem += "\n\nAguardo uma avaliação. Obrigado!";

    let link = "https://wa.me/" + telefone +
        "?text=" + encodeURIComponent(mensagem);

    window.open(link, "_blank");

});

// Botão de contato

const btnContato = document.getElementById("btn-contato");

btnContato.addEventListener("click", function () {

    let mensagem = "Olá! Gostaria de saber mais sobre os serviços da EG Tech.";

    let link = "https://wa.me/" + telefone +
        "?text=" + encodeURIComponent(mensagem);

    window.open(link, "_blank");

});
