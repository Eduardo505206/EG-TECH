console.log("JavaScript funcionando!");
const botao = document.getElementById("btn-orcamento");

botao.addEventListener("click", function () {
    document.getElementById("orcamento").scrollIntoView({
        behavior: "smooth"
    });
});
const servicos = document.querySelectorAll(
    '.orcamento input[type="checkbox"]'
);

const total = document.getElementById("total");

servicos.forEach(function (servico) {

    servico.addEventListener("change", function () {

        let valorTotal = 0;

        servicos.forEach(function (item) {

            if (item.checked) {
                valorTotal += Number(item.value);
            }

        });

        total.textContent = valorTotal.toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL"
        });

    });

});
const enviarOrcamento = document.getElementById("enviar-orcamento");

enviarOrcamento.addEventListener("click", function () {

    let selecionados = [];

    servicos.forEach(function (item) {
        if (item.checked) {
            selecionados.push(item.parentElement.textContent.trim());
        }
    });

    if (selecionados.length === 0) {
        alert("Selecione pelo menos um serviço!");
        return;
    }

    let mensagem = "Olá! Gostaria de solicitar um orçamento.\n\n";

    mensagem += "Serviços selecionados:\n";
    mensagem += selecionados.join("\n");
    mensagem += "\n\nValor estimado: " + total.textContent;

    let telefone = "5541984123244";

    let link = "https://wa.me/" + telefone +
        "?text=" + encodeURIComponent(mensagem);

    window.open(link, "_blank");

});
const btnContato = document.getElementById("btn-contato");

btnContato.addEventListener("click", function () {

    let telefone = "5541984123244";

    let mensagem = "Olá! Gostaria de saber mais sobre seus serviços.";

    let link = "https://wa.me/" + telefone +
        "?text=" + encodeURIComponent(mensagem);

    window.open(link, "_blank");

});