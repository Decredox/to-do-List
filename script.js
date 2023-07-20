//Variaveis Importantes
let tarefas = document.getElementById("tarefas");
let inputTarefa = document.getElementById("inputTarefa");
let tarefasObj = {};
let count = 0;

// Class que cria as tarefas
class addItem {
  constructor(tarefa) {
    this.tarefa = tarefa.trim();
    if (!(this.tarefa == "")) {
      if (!Object.values(tarefasObj).includes(this.tarefa)) {
        this.tarefasObj = tarefasObj[count++] = this.tarefa;
        this.htmlDiv(this.tarefa);
      } else {
        return alert("Nao pode repetir as tarefas.");
      }
    } else {
      return alert("Digite algo primeiro para salvar.");
    }
  }

  htmlDiv(tarefa) {
    this.HTML = `
      <div class="tarefaDiv">
      <div onclick="OnOff('${this.tarefa}')"class="checkBox">
   <img src="https://cdn.glitch.global/c85a166b-2c01-4491-b7ce-24a1c3c2b1db/off.svg?v=1689558176341" alt="off">
</div>
        <span class="tarefaName">${this.tarefa}</span>
        <button onclick="Apagar('${this.tarefa}')">Apagar</button>
      </div>
    `;
    tarefas.innerHTML += this.HTML;
  }
}

//Funçao do botao que adiciona as tarefas
function CriarTarefa() {
  inputTarefa.value.trim();
  new addItem(inputTarefa.value);
  inputTarefa.value = "";
}



function OnOff(x) {
//Funçao para mudar a imagem e deixar a tarefa temrinada
let mural = document.querySelectorAll(".tarefaDiv");
  let cond;
  mural.forEach((i, index) => {
    if (
      mural[index].childNodes[1].childNodes[1].src ==
      "https://cdn.glitch.global/c85a166b-2c01-4491-b7ce-24a1c3c2b1db/off.svg?v=1689558176341"
    ) {
      cond = true;
    } else {
      cond = false;
    }

    if (mural[index].childNodes[3].innerHTML == x) {
      if (cond) {
        mural[index].childNodes[3].style.textDecoration = "line-through";
        mural[index].childNodes[1].childNodes[1].src =
          "https://cdn.glitch.global/c85a166b-2c01-4491-b7ce-24a1c3c2b1db/on.svg?v=1689557761413";
        cond = false;
      } else {
        mural[index].childNodes[3].style.textDecoration = "";
        mural[index].childNodes[1].childNodes[1].src =
          "https://cdn.glitch.global/c85a166b-2c01-4491-b7ce-24a1c3c2b1db/off.svg?v=1689558176341";
        cond = true;
      }
    }
  });
}

//Funçao para a apagar a tarefa
function Apagar(x) {
  for (let prop in tarefasObj) {
    if (tarefasObj[prop] == x) {
      for (let index of document.querySelectorAll(".tarefaDiv>span")) {
        if (index.innerText == x) {
          index.parentNode.remove();
        }
      }
      delete tarefasObj[prop];
    }
  }
  return !tarefasObj[0] ? (count = 0) : null;
}

//Eventos adicionais para a aplicaçao
window.addEventListener("keydown", function (e) {
  if (e.keyCode == 13) {
    return document.getElementsByTagName("button")[0].click();
  }
});

inputTarefa.addEventListener("focus", function (x) {
  return (x.target.placeholder = "");
});

inputTarefa.addEventListener("blur", function (x) {
  return (x.target.placeholder = "Nome da tarefa");
});

inputTarefa.onkeypress = function (e) {
  var chr = String.fromCharCode(e.which);
  if (
    "1234567890qwertyuioplkjhgfdsazxcvbnmQWERTYUIOPLKJHGFDSAZXCVBNM".indexOf(
      chr
    ) < 0
  )
    return false;
};
