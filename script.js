
// Função para calcular a idade com base na data de nascimento
function calcularIdade(dataNascimento) {
        const hoje = new Date();
        const nascimento = new Date(dataNascimento);
        let idade = hoje.getFullYear() - nascimento.getFullYear();
        const mes = hoje.getMonth() - nascimento.getMonth();
    
        if (mes < 0 || (mes === 0 && hoje.getDate() < nascimento.getDate())) {
            idade--;
        }
    
        return idade;
    }
    
    // Função para verificar se o usuário é menor de idade e mostrar/ocultar campos
    function verificarMenorIdade() {
        const dataNascimento = document.getElementById('dataNascimento').value;
        if (!dataNascimento) return; // Se a data de nascimento não estiver preenchida, não faz nada
    
        const idade = calcularIdade(dataNascimento);
        const informacoesComplementares = document.getElementById('informacoesComplementares');
    
        if (idade < 18) {
            informacoesComplementares.style.display = 'block'; // Mostra os campos
            document.getElementById('nomePai').setAttribute('required', true); // Torna obrigatório
            document.getElementById('nomeMae').setAttribute('required', true); // Torna obrigatório
        } else {
            informacoesComplementares.style.display = 'none'; // Oculta os campos
            document.getElementById('nomePai').removeAttribute('required'); // Remove obrigatoriedade
            document.getElementById('nomeMae').removeAttribute('required'); // Remove obrigatoriedade
        }
    }
    
    // Evento para verificar a idade ao alterar a data de nascimento
    document.getElementById('dataNascimento').addEventListener('change', verificarMenorIdade);



// Função para exibir mensagem de erro
function exibirErro(campo, mensagem) {
        const erro = document.getElementById(`erro${campo}`);
        erro.textContent = mensagem;
        erro.style.display = 'block';
        document.getElementById(campo).classList.add('invalido');
    }
    
    // Função para remover mensagem de erro
    function removerErro(campo) {
        const erro = document.getElementById(`erro${campo}`);
        erro.textContent = '';
        erro.style.display = 'none';
        document.getElementById(campo).classList.remove('invalido');
    }
    
    // Validação do Nome Completo
    document.getElementById('nomeCompleto').addEventListener('input', function () {
        const nome = this.value.trim();
        if (nome === '' || nome.split(' ').length < 2) {
            exibirErro('Nome', 'Digite nome e sobrenome.');
        } else {
            removerErro('Nome');
        }
    });
    
    // Validação da Data de Nascimento
    document.getElementById('dataNascimento').addEventListener('change', function () {
        const data = this.value;
        const hoje = new Date();
        const nascimento = new Date(data);
        if (data === '' || nascimento > hoje) {
            exibirErro('DataNascimento', 'Data inválida.');
        } else {
            removerErro('DataNascimento');
        }
    });
    
    // Validação do CPF
    document.getElementById('cpf').addEventListener('input', function () {
        const cpf = this.value.replace(/\D/g, '');
        if (cpf.length !== 11 || !validarCPF(cpf)) {
            exibirErro('CPF', 'CPF inválido.');
        } else {
            removerErro('CPF');
        }
    });
    
    // Validação do Telefone Fixo
    document.getElementById('telefoneFixo').addEventListener('input', function () {
        const telefone = this.value.replace(/\D/g, '');
        if (telefone.length !== 10) {
            exibirErro('TelefoneFixo', 'Telefone inválido.');
        } else {
            removerErro('TelefoneFixo');
        }
    });
    
    // Validação do Celular
    document.getElementById('celular').addEventListener('input', function () {
        const celular = this.value.replace(/\D/g, '');
        if (celular.length !== 11) {
            exibirErro('Celular', 'Celular inválido.');
        } else {
            removerErro('Celular');
        }
    });
    
    // Validação do CEP
    document.getElementById('cep').addEventListener('input', function () {
        const cep = this.value.replace(/\D/g, '');
        if (cep.length !== 8) {
            exibirErro('CEP', 'CEP inválido.');
        } else {
            removerErro('CEP');
        }
    });
    
    // Validação do Email
    document.getElementById('email').addEventListener('input', function () {
        const email = this.value;
        if (!validarEmail(email)) {
            exibirErro('Email', 'Email inválido.');
        } else {
            removerErro('Email');
        }
    });
    
    // Validação da Senha
    document.getElementById('senha').addEventListener('input', function () {
        const senha = this.value;
        if (senha.length < 8) {
            exibirErro('Senha', 'A senha deve ter no mínimo 8 caracteres.');
        } else {
            removerErro('Senha');
        }
    });
    
    // Validação da Confirmação de Senha
    document.getElementById('confirmarSenha').addEventListener('input', function () {
        const senha = document.getElementById('senha').value;
        const confirmarSenha = this.value;
        if (senha !== confirmarSenha) {
            exibirErro('ConfirmarSenha', 'As senhas não coincidem.');
        } else {
            removerErro('ConfirmarSenha');
        }
    });
    
    // Função para validar CPF
    function validarCPF(cpf) {
        cpf = cpf.replace(/[^\d]+/g, '');
        if (cpf.length !== 11 || /^(\d)\1{10}$/.test(cpf)) return false;
    
        let soma = 0;
        for (let i = 0; i < 9; i++) {
            soma += parseInt(cpf.charAt(i)) * (10 - i);
        }
        let resto = (soma * 10) % 11;
        if (resto === 10 || resto === 11) resto = 0;
        if (resto !== parseInt(cpf.charAt(9))) return false;
    
        soma = 0;
        for (let i = 0; i < 10; i++) {
            soma += parseInt(cpf.charAt(i)) * (11 - i);
        }
        resto = (soma * 10) % 11;
        if (resto === 10 || resto === 11) resto = 0;
        if (resto !== parseInt(cpf.charAt(10))) return false;
    
        return true;
    }
    
    // Função para validar Email
    function validarEmail(email) {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    }