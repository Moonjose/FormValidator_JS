class FormValidate { // Classe construtora do formulario
  constructor() {
    this.form = document.querySelector('.form');
    this.events();
  }

  events() {
    this.form.addEventListener('submit', e => { // Obtém o submit do form
      this.handleSubmit(e);
    });
  }

  handleSubmit(e) {
    e.preventDefault(); // Não envia o formulario ao clicar em enviar
    const validFields = this.validFields(); // Retorna true/false a depender da checagem
    const validPass = this.validPass(); // Retorna true/false a depender da checagem

    if (validFields && validPass) { // Verifica se todos os campos estão validos para enviar o formulario
      alert('Formulário enviado.');
      console.log('Enviado');
      this.form.submit(); // Envia o formulario
    }
  }

  validPass() { // Método que verifica a senha
    let valid = true; // Flag inicial

    const pass = this.form.querySelector('.password'); // Obtém os campos
    const repass = this.form.querySelector('.repassword');

    if (pass.value !== repass.value) { // Verifica se senha e repetir senha são iguais
      valid = false;
      this.throwError(pass, 'Senhas não correspondem.');
      this.throwError(repass, 'Senhas não correspondem.');
    }

    if (pass.value.length < 6 || pass.value.length > 12) { // Verifica o tamanho da senha
      valid = false;
      this.throwError(pass, 'Senha precisa conter entre 6 e 12 caracteres.');
    }

    return valid; // Retorna flag
  }

  validFields() { // Verifica outros campos
    let valid = true; // Flag inicial

    for (let errorText of this.form.querySelectorAll('.error-text')) { // Remove as mensagens de erro para não duplicarem
      errorText.remove();
    }
    for (let field of this.form.querySelectorAll('.validate')) { // Obtém campos
      const label = field.previousElementSibling.innerText; // Obtém o innerText do label de cada campo

      if (!field.value) { // Se for vazio (falso)
        this.throwError(field, `Campo "${label}" não pode estar em branco`); // Lança erro no campo
        valid = false;
      }

      if (field.classList.contains('cpf')) { //Campo CPF
        if (!this.validateCPF(field)) valid = false; // Se for falso, flag falso
      }

      if (field.classList.contains('user')) {
        if (!this.validateUser(field)) valid = false;
      }
    }
    return valid; // Retorna flag
  }

  validateCPF(field) {
    const cpf = new ValidaCPF(field.value); // Instância de uma classe criada para validar cpf, criado em validate.js

    if (!cpf.valida()) { // Método que valida cpf, criado em outro validate.js
      this.throwError(field, 'CPF Inválido');
      return false;
    }

    return true;
  }

  validateUser(field) { // Valida o usuario
    const user = field.value;
    let valid = true; // Flag inicial

    if (user.length < 3 || user.length > 12) {
      this.throwError(field, 'Usuário precisa ter entre 3 e 12 caracteres.');
      valid = false;
    }

    if (!user.match(/^[a-zA-Z0-9]+$/g)) { // Expressão regex
      this.throwError(field, 'Nome de usuário precisa conter apenas letras e/ou números.');
      valid = false;
    }

    return valid; // Retorna flag
  }
  throwError(field, msg) { // Método para lançar erro nos campos correspondentes
    const div = document.createElement('div');
    div.innerHTML = msg;
    div.classList.add('error-text'); // Elemento manipulado no css
    field.insertAdjacentElement('afterend', div); // Insere a div depois do campo
  }
}

const validate = new FormValidate();