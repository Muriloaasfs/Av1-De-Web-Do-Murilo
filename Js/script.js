const tarefas = [];
let indiceEditando = null;

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

        const span = document.createElement("span");
        span.textContent = tarefas[i] + " ";

        const botaoEditar = document.createElement("button");
        botaoEditar.textContent = "Editar";

        const botaoExcluir = document.createElement("button");
        botaoExcluir.textContent = "Excluir";

        // BOTÃO EDITAR
        botaoEditar.addEventListener("click", function () {

            input.value = tarefas[i];
            indiceEditando = i;
            input.focus();

        });

        // BOTÃO EXCLUIR
        botaoExcluir.addEventListener("click", function () {

            tarefas.splice(i, 1);
            renderTarefas();

        });

        li.appendChild(span);
        li.appendChild(botaoEditar);
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

    if (indiceEditando !== null) {

        tarefas[indiceEditando] = textoDigitado;
        indiceEditando = null;

    } else {

        tarefas.push(textoDigitado);

    }

    renderTarefas();

    input.value = "";
});

btnMostrar.addEventListener("click", function () {
    alert("Você clicou no botão! 🎉");
});