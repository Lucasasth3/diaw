const formLogin = document.getElementById('login-form');
const inputUsuario = document.getElementById('usuario');
const inputSenha = document.getElementById('senha');
const msgErro = document.getElementById('erro-msg');

formLogin.addEventListener('submit', (e) => {
    e.preventDefault();

    const dados = {
        usuario: inputUsuario.value,
        senha: inputSenha.value
    };

    fetch('/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(dados)
    })
    .then(response => {
        if (response.ok) {
            alert('Login bem-sucedido!');
        } else {
            response.json().then(resultado => {
                msgErro.textContent = resultado.erro || 'Erro ao realizar login';
            });
        }
    })
    .catch(error => {
        console.log('Erro na requisição:', error);
    });
});