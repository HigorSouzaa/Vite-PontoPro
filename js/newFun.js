const URL = import.meta.env.VITE_API_URL;

// Função para verificar se o usuário já existe
async function checkUserExists(email) {
  try {
    const response = await fetch(`${URL}/users/findUser`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });

    const data = await response.json();

    // Tratar 200 e 404 como respostas válidas
    if (response.status === 200) {
      return true;
    }
    if (response.status === 404) {
      return false;
    }

    throw new Error(data.error || "Erro inesperado ao verificar usuário");
  } catch (error) {
    console.error(error);
    alert("Erro ao verificar usuário");
    return false;
  }
}

function acordarBackend() {
  const loading = document.querySelector(".loading");
  loading.style.display = "flex";

  fetch(`${URL}/wakeup`)
    .catch((err) => {
      console.error("Erro ao acordar backend:", err);
    })
    .finally(() => {
      loading.style.display = "none";
    });
}

async function verificarToken() {
  const token =
    localStorage.getItem("token_pontopro_users") ||
    sessionStorage.getItem("token_pontopro_users");

  try {
    document.querySelector(".loading").style.display = "flex";
    if (!token) {
      window.location.href = "index.html";
      return;
    }

    const response = await fetch(`${URL}/users/dashboard`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      localStorage.removeItem("token_pontopro_users");
      sessionStorage.removeItem("token_pontopro_users");
      window.location.href = "index.html";
    }
  } catch (error) {
    console.error(error);
  } finally {
    document.querySelector(".loading").style.display = "none";
  }
}

function setButtonLoading(isLoading) {
  const text = document.querySelector(".form-btn span");
  const spinner = document.querySelector(".loading-btn");

  if (isLoading) {
    text.style.display = "none";
    spinner.style.display = "flex";
  } else {
    text.style.display = "flex";
    spinner.style.display = "none";
  }
}

document.addEventListener("DOMContentLoaded", () => {
  acordarBackend();
  verificarToken();

  document.getElementById("bttSaveUser").addEventListener("click", saveUser);
});

async function saveUser() {
  // Informações pessoais
  const nameValue = document.getElementById("name").value.trim();
  const emailValue = document.getElementById("email").value.trim();
  const phoneValue = document.getElementById("phone").value.trim();
  const cpfValue = document.getElementById("cpf").value.trim();
  const dateOfBirthValue = document.getElementById("date").value;
  const addressValue = document.getElementById("address").value.trim();

  // Verificando se o usuário já existe
  const userExists = await checkUserExists(emailValue);
  if (userExists) {
    alert("Este email já está cadastrado. Tente outro.");
    return;
  }

  // Informações profissionais
  const positionValue = document.getElementById("position").value.trim();
  const departmentValue = document.getElementById("departament").value;
  const admissionDateValue = document.getElementById("dataAdmission").value;
  const salaryValue = parseFloat(document.getElementById("salary").value) || 0;
  const workTimeValue = document.getElementById("workTime").value;
  const statusValue =
    document.querySelector("select[name='status']")?.value || "";

  // Observações
  const observationValue = document.getElementById("observations").value.trim();

  // Função para aplicar ou remover a classe de erro
  function toggleErrorClass(inputElement, condition) {
    if (condition) {
      inputElement.classList.add("input-error");
    } else {
      inputElement.classList.remove("input-error");
    }
  }

  // Validação dos campos
  toggleErrorClass(document.getElementById("name"), !nameValue);
  toggleErrorClass(document.getElementById("email"), !emailValue);
  toggleErrorClass(document.getElementById("phone"), !phoneValue);
  toggleErrorClass(document.getElementById("cpf"), !cpfValue);
  toggleErrorClass(document.getElementById("date"), !dateOfBirthValue);
  toggleErrorClass(document.getElementById("address"), !addressValue);
  toggleErrorClass(document.getElementById("position"), !positionValue);
  toggleErrorClass(document.getElementById("departament"), !departmentValue);
  toggleErrorClass(
    document.getElementById("dataAdmission"),
    !admissionDateValue
  );
  toggleErrorClass(
    document.getElementById("salary"),
    isNaN(salaryValue) || salaryValue <= 0
  );
  toggleErrorClass(document.getElementById("workTime"), !workTimeValue);
  toggleErrorClass(
    document.querySelector("select[name='status']"),
    !statusValue
  );

  // Se algum campo estiver inválido, retorne
  if (
    !nameValue ||
    !emailValue ||
    !phoneValue ||
    !cpfValue ||
    !dateOfBirthValue ||
    !addressValue ||
    !positionValue ||
    !departmentValue ||
    !admissionDateValue ||
    isNaN(salaryValue) ||
    salaryValue <= 0 ||
    !workTimeValue ||
    !statusValue
  ) {
    alert("Por favor, preencha todos os campos obrigatórios corretamente.");
    return;
  }

  // Definindo se o usuário é gerente baseado no departamento
  const isManagerUpdate = departmentValue === "RH";

  // Criação dos dados do usuário
  const userData = {
    // Informações pessoais
    name: nameValue,
    email: emailValue,
    phone: phoneValue,
    cpf: cpfValue,
    dateOfBirth: dateOfBirthValue,
    address: addressValue,

    // Informações profissionais
    position: positionValue,
    department: departmentValue,
    admissionDate: admissionDateValue,
    salary: salaryValue || 0,
    workTime: workTimeValue,
    status: statusValue || "",

    // Observações
    observation: observationValue,

    // Credenciais
    password: cpfValue,
    isManager: isManagerUpdate,
  };

  try {
    const response = await fetch(`${URL}/users/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userData),
    });

    const data = await response.json();

    if (!response.ok) {
      alert(`Erro: ${data.error || "Não foi possível cadastrar"}`);
      return;
    }

    alert("Usuário cadastrado com sucesso!");

    // Limpar todos os campos do formulário
    document.querySelectorAll("input, textarea, select").forEach((field) => {
      if (field.tagName.toLowerCase() === "select") {
        field.selectedIndex = 0;
      } else {
        field.value = "";
      }
    });

    // Remover marcação de erro, se houver
    document.querySelectorAll(".input-error").forEach((el) => {
      el.classList.remove("input-error");
    });

    window.location.href = "fun.html";
  } catch (error) {
    console.error(error);
    alert("Erro ao conectar ao servidor");
  }
}

