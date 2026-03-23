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

        // CHECKBOX
        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.checked = tarefas[i].concluida;

        // TEXTO
        const span = document.createElement("span");
        span.textContent = tarefas[i].texto + " ";

        // SE ESTIVER CONCLUÍDA
        if (tarefas[i].concluida) {
            span.style.textDecoration = "line-through";
            span.style.color = "gray";
        }

        // QUANDO MARCAR CHECKBOX
        checkbox.addEventListener("change", function () {
            tarefas[i].concluida = checkbox.checked;
            renderTarefas();
        });

        // BOTÃO EDITAR
        const botaoEditar = document.createElement("button");
        botaoEditar.textContent = "Editar";

        botaoEditar.addEventListener("click", function () {
            input.value = tarefas[i].texto;
            indiceEditando = i;
            input.focus();
        });

        // BOTÃO EXCLUIR
        const botaoExcluir = document.createElement("button");
        botaoExcluir.textContent = "Excluir";

        botaoExcluir.addEventListener("click", function () {
            tarefas.splice(i, 1);
            renderTarefas();
        });

        li.appendChild(checkbox);
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

        tarefas[indiceEditando].texto = textoDigitado;
        indiceEditando = null;

    } else {

        tarefas.push({
            texto: textoDigitado,
            concluida: false
        });

    }

    renderTarefas();

    input.value = "";
});

btnMostrar.addEventListener("click", function () {
    alert("Você clicou no botão! 🎉");
});