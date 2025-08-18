const URL = import.meta.env.VITE_API_URL;

document.addEventListener("DOMContentLoaded", () => {
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
