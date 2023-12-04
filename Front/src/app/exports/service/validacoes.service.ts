import { Injectable } from '@angular/core';
import { createNumberMask } from 'text-mask-addons';

@Injectable({
  providedIn: 'root',
})

  
  export class ValidacoesService {

    validarCPF(cpf: string): boolean {
      cpf = cpf.replace(/[^\d]/g, '');
  
      // Verifica se todos os dígitos do CPF são iguais
      if (/^(\d)\1+$/.test(cpf)) {
          return false;
      }
  
      if (cpf.length !== 11) {
          return false;
      }
  
      let soma = 0;
      let resto;
  
      for (let i = 1; i <= 9; i++) {
          soma = soma + parseInt(cpf.substring(i - 1, i)) * (11 - i);
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
          soma = soma + parseInt(cpf.substring(i - 1, i)) * (12 - i);
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
      cpf: string = '';
      cpfInvalido: boolean = false;
      
      validarECorrigirCPF(cpf : string) {
        if (this.validarCPF(cpf)) {
          this.cpfInvalido = false;
        } else {
          this.cpfInvalido = true;
        }
      }
      cpfMask = createNumberMask({
        prefix: '',
        includeThousandsSeparator: false,
        allowDecimal: false,
        requireDecimal: false,
      });
}
  