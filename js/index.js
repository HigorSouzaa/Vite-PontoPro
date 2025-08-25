const URL = import.meta.env.VITE_API_URL;

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

async function login() {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const rememberMe = document.getElementById("remember");

  if (!email || email.trim() === "") {
    return alert("O email é obrigatório");
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return alert("O email precisa estar em um formato válido seu@email.com");
  }

  if (!password || password.trim() === "") {
    return alert("A senha é obrigatória");
  }

  if (password.length < 6) {
    return alert("A senha precisa ter no mínimo 6 caracteres");
  }

  setButtonLoading(true);

  try {
    const response = await fetch(`${URL}/users/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();

    if (response.status === 401 || !data.token) {
      alert("E-mail ou senha incorretos.");
      return;
    }
    
    if (!data.user?.isManager) {
      alert("Somente para usuários com permissão");
      return;
    }

    if (rememberMe.checked) {
      localStorage.setItem("token_pontopro_users", data.token);
    } else {
      sessionStorage.setItem("token_pontopro_users", data.token);
    }

    alert("Login feito com sucesso!");
    window.location = "dashboard.html";
  } catch (error) {
    console.error("Erro na requisição:", error);
    alert("Erro ao tentar logar. Verifique sua conexão ou tente mais tarde.");
  } finally {
    setButtonLoading(false);
  }
}

document.addEventListener("DOMContentLoaded", () => {
  acordarBackend();
  const token =
    localStorage.getItem("token_pontopro_users") ||
    sessionStorage.getItem("token_pontopro_users");

  if (token) {
    return (window.location = "app/dashboard.html");
  }

  console.log("DOM carregado. Já posso manipular os elementos.");

  const form = document.getElementById("loginForm");

  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    await login();
  });
});
