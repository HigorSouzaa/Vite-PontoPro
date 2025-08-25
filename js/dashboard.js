const URL = import.meta.env.VITE_API_URL;

document.addEventListener("DOMContentLoaded", () => {
  carregarUsuarios();
  verificarToken();
  // Ativa o botão de logout
  const logoutBtn = document.getElementById("logoutBtn");
  if (logoutBtn) {
    logoutBtn.addEventListener("click", () => {
      // Remove o token dos dois storages
      localStorage.removeItem("token_pontopro_users");
      sessionStorage.removeItem("token_pontopro_users");

      // Redireciona para a tela de login
      window.location.href = "index.html";
    });
  }

  const users = JSON.parse(localStorage.getItem("users"));
  const activeEmployees = users.filter((user) => user.status === "Ativo");
  const vacationEmployees = users.filter((user) => user.status === "Ferias");
  const tiEmployees = users.filter((user) => user.department === "TI");
  const rhEmployees = users.filter((user) => user.department === "RH");
  const fiEmployees = users.filter((user) => user.department === "Financeiro");
  const marEmployees = users.filter((user) => user.department === "Marketing");

  if (users) {
    const userLength = users.length;
    const activeEmployeesLength = activeEmployees.length;
    const vacationEmployeesLength = vacationEmployees.length;

    const totalEmployees = document.getElementById("totalEmployees");
    const totalEmployeesActive = document.getElementById("activeEmployees");
    const totalEmployeesVacation = document.getElementById("vacation");

    const totalTiEmployees = document.getElementById("techCount");
    const totalRhEmployees = document.getElementById("rhCount");
    const totalFiEmployees = document.getElementById("financeCount");
    const totalMarEmployees = document.getElementById("marketingCount");

    totalEmployeesActive.innerHTML = `${activeEmployeesLength}`;
    totalEmployeesVacation.innerHTML = `${vacationEmployeesLength}`;
    totalEmployees.innerHTML = `${userLength}`;

    totalTiEmployees.innerHTML = `${tiEmployees.length} funcionários`;
    totalRhEmployees.innerHTML = `${rhEmployees.length} funcionários`;
    totalFiEmployees.innerHTML = `${fiEmployees.length} funcionários`;
    totalMarEmployees.innerHTML = `${marEmployees.length} funcionários`;
  } else {
    console.log("Nenhum usuário encontrado no localStorage");
  }
});

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

    // Envia uma requisição para o backend para verificar se o token ainda é válido
    const response = await fetch(`${URL}/users/dashboard`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      // Token inválido ou expirado
      localStorage.removeItem("token_pontopro_users");
      window.location.href = "index.html";
    }

    // Aqui o token é válido e pode continuar usando a página
  } catch (error) {
    console.error(error);
  } finally {
    document.querySelector(".loading").style.display = "none";
  }
}

// Na página onde você carrega os usuários
async function carregarUsuarios() {
  try {
    const response = await fetch(`${URL}/users/getAll`);
    const users = await response.json();

    // Armazenar os dados no localStorage
    localStorage.setItem("users", JSON.stringify(users));

    // Continuar com o restante do código para preencher a tabela ou algo mais
  } catch (error) {
    console.error("Erro ao carregar os usuários", error);
  }
}
