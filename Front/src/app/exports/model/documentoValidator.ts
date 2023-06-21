class DocumentoValidator {
  static validarDocumento(documento: string): boolean {
    const numeroDocumento = documento.replace(/\D/g, '');

    if (numeroDocumento.length === 11) {
      return DocumentoValidator.validarCPF(numeroDocumento);
    }

    if (numeroDocumento.length === 14) {
      return DocumentoValidator.validarCNPJ(numeroDocumento);
    }

    return false;
  }

  static validarCPF(cpf: string): boolean {
    if (/^(\d)\1*$/.test(cpf)) {
      return false;
    }

    let soma = 0;
    let resto;
    for (let i = 1; i <= 9; i++) {
      soma += parseInt(cpf.substring(i - 1, i)) * (11 - i);
    }
    resto = (soma * 10) % 11;
    if (resto === 10 || resto === 11) {
      resto = 0;
    }
    if (resto !== parseInt(cpf.substring(9, 10))) {
      return false;
    }

    soma = 0;
    for (let i = 1; i <= 10; i++) {
      soma += parseInt(cpf.substring(i - 1, i)) * (12 - i);
    }
    resto = (soma * 10) % 11;
    if (resto === 10 || resto === 11) {
      resto = 0;
    }
    if (resto !== parseInt(cpf.substring(10, 11))) {
      return false;
    }

    return true;
  }

  static validarCNPJ(cnpj: string): boolean {
    if (/^(\d)\1*$/.test(cnpj)) {
      return false;
    }

    let soma = 0;
    let peso = 2;
    for (let i = 11; i >= 0; i--) {
      const digito = parseInt(cnpj.charAt(i));
      soma += digito * peso;
      peso = peso === 9 ? 2 : peso + 1;
    }
    const resto = soma % 11;
    const digito1 = resto < 2 ? 0 : 11 - resto;
    if (digito1 !== parseInt(cnpj.charAt(12))) {
      return false;
    }

    soma = 0;
    peso = 2;
    for (let i = 12; i >= 0; i--) {
      const digito = parseInt(cnpj.charAt(i));
      soma += digito * peso;
      peso = peso === 9 ? 2 : peso + 1;
    }
    const resto2 = soma % 11;
    const digito2 = resto2 < 2 ? 0 : 11 - resto2;
    if (digito2 !== parseInt(cnpj.charAt(13))) {
      return false;
    }

    return true;
  }
}
