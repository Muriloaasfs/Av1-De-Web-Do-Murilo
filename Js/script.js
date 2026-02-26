const tarefas = [];

const form = document.querySelector("#formTarefa");
const input = document.querySelector("#inputTarefa");
const lista = document.querySelector("#listaTarefas");
const mensagemErro = document.querySelector("#mensagemErro");

const btnMostrar = document.querySelector("#btnMostrar");

function validarTarefa(texto) {
    if (texto.trim() === "") {
        mensagemErro.textContent = "A tarefa não pode estar vazia!";
        return false;
    }

    mensagemErro.textContent = "";
    return true;
}

function renderTarefas() {
    lista.innerHTML = "";

    for (let i = 0; i < tarefas.length; i++) {

        const li = document.createElement("li");
        li.textContent = tarefas[i] + " ";

        const botaoExcluir = document.createElement("button");
        botaoExcluir.textContent = "Excluir";

        botaoExcluir.addEventListener("click", function () {
            tarefas.splice(i, 1);
            renderTarefas();
        });

        li.appendChild(botaoExcluir);
        lista.appendChild(li);
    }
}

form.addEventListener("submit", function (event) {
    event.preventDefault();

    const textoDigitado = input.value;

    if (!validarTarefa(textoDigitado)) {
        return;
    }

    tarefas.push(textoDigitado);
    renderTarefas();

    input.value = "";
});

btnMostrar.addEventListener("click", function () {
    alert("Você clicou no botão! 🎉");
});