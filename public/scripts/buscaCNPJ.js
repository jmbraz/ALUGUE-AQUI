var enderecoForm = document.querySelector(".box");
var cnpjInput = document.querySelector("#cnpj");
var telefoneInput = document.querySelector("#telefone");
var emailInput = document.querySelector("#email");
var razaoSocialInput = document.querySelector("#razaoSocial");
var formInput = document.querySelector("[data-input]");

cnpjInput.addEventListener("keyup", (e) => {
    const inputValue = e.target.value;
    if (inputValue.length === 14) {
        getAddress(inputValue);
    }
});

var getAddress = async (cnpj) => {
    const apiURL = `https://api-publica.speedio.com.br/buscarcnpj?cnpj=${cnpj}&formato=json`;
    const response = await fetch(apiURL);
    const data = await response.json();
    console.log(data);

    if (!data.erro) {
        cnpjInput.value = data.CNPJ || '';
        telefoneInput.value = data.DDD && data.TELEFONE ? `(${data.DDD}) ${data.TELEFONE}` : '';
        emailInput.value = data.EMAIL || '';
        razaoSocialInput.value = data['RAZAO SOCIAL'] || '';

        // Preencher outros campos, se necessário
        // Exemplo:
        // enderecoInput.value = `${data.TIPO LOGRADOURO} ${data.LOGRADOURO}, ${data.NUMERO} - ${data.BAIRRO}, ${data.MUNICIPIO} - ${data.UF}`;
    } else {
        console.error('Erro ao buscar CNPJ');
    }
}
