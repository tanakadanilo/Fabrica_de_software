import { Injectable } from '@angular/core';
import { createNumberMask } from 'text-mask-addons';
import {AbstractControl, ValidationErrors, ValidatorFn, Validators} from '@angular/forms';

function validate(errors: ValidationErrors | null, message: string) {
    if (!errors) {
        return null;
    }

    const initialErrors: ValidationErrors = {};
    return Object.keys(errors).reduce((prev, curr) => {
        if (errors[curr]) {
            prev[curr] = message;
        }
        return prev;
    }, initialErrors);
}

@Injectable({
  providedIn: 'root',
})

  
  export class FormValidators {
      static required = (message: string = 'Campo obrigatório'): ValidatorFn => (
          (control: AbstractControl) => validate(Validators.required(control), message)
      );
  
      static minLength = (minLength: number, message?: string) => (
          (control: AbstractControl) => validate(Validators.minLength(minLength)(control), message ?? `O campo deve conter no mínimo ${minLength} caracteres`)
      );
  
      static maxLength = (maxLength: number, message?: string) => (
          (control: AbstractControl) => validate(Validators.maxLength(maxLength)(control), message ?? `O campo deve conter no máximo ${maxLength} caracteres`)
      );
  
      static pattern = (pattern: string | RegExp, message?: string) => (
          (control: AbstractControl) => validate(Validators.pattern(pattern)(control), message ?? 'Campo inválido')
      );
  
      static cpf = (message?: string) => (
          (control: AbstractControl) => {
              if (!control?.value) {
                  return null;
              }
  
              const cpfApenasNumeros: string = control.value.replace(/\D/g, '');
  
              if (!/[0-9]{11}/.test(cpfApenasNumeros)) {
                  return validate({cpf: true}, message ?? 'CPF inválido');
              }
  
              if (/^(\d)\1+$/.test(cpfApenasNumeros)) {
                  return validate({cpf: true}, message ?? 'CPF inválido');
              }
  
              let soma = 0;
              for (let i = 0; i < 9; i++) {
                  soma += parseInt(cpfApenasNumeros.charAt(i)) * (10 - i);
              }
              let resto = (soma * 10) % 11;
              if (resto === 10 || resto === 11) {
                  resto = 0;
              }
              if (resto !== parseInt(cpfApenasNumeros.charAt(9))) {
                  return validate({cpf: true}, message ?? 'CPF inválido');
              }
  
              soma = 0;
              for (let i = 0; i < 10; i++) {
                  soma += parseInt(cpfApenasNumeros.charAt(i)) * (11 - i);
              }
              resto = (soma * 10) % 11;
              if (resto === 10 || resto === 11) {
                  resto = 0;
              }
              if (resto !== parseInt(cpfApenasNumeros.charAt(10))) {
                  return validate({cpf: true}, message ?? 'CPF inválido');
              }
  
              return null;
          }
      );

    validarCPF(cpf : string) {
        cpf = cpf.replace(/[^\d]/g, '');
        if (cpf.length !== 11) return false;
      
        let soma = 0;
        let resto;
      
        for (let i = 1; i <= 9; i++) {
            soma = soma + parseInt(cpf.substring(i - 1, i)) * (11 - i);
        }
      
        resto = (soma * 10) % 11;
      
        if ((resto === 10) || (resto === 11)) {
            resto = 0;
        }
      
        if (resto !== parseInt(cpf.substring(9, 10))) return false;
      
        soma = 0;
      
        for (let i = 1; i <= 10; i++) {
            soma = soma + parseInt(cpf.substring(i - 1, i)) * (12 - i);
        }
      
        resto = (soma * 10) % 11;
      
        if ((resto === 10) || (resto === 11)) {
            resto = 0;
        }
      
        if (resto !== parseInt(cpf.substring(10, 11))) return false;
      
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
  