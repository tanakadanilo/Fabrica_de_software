import { Injectable } from '@angular/core';
import { Usuario } from '../interface/usuario';
import { Prestador } from '../interface/prestador';
import { Contratante } from '../interface/contratante';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationServiceService {
  private token?: string;
  private usuario?: Usuario;
  private pessoa?: Prestador | Contratante;

  loggar(
    token: string,
    username: string,
    password: string,
    pessoa: Prestador | Contratante,
    isPrestador: boolean
  ): void {
    this.token = token;
    this.pessoa = pessoa;
    this.usuario = {
      username: username,
      password: password,
      login: username,
      prestador: isPrestador,
    };
  }

  getToken(): string | null {
    return this.token ? this.token : localStorage.getItem('token');
  }

  getUsuario(): Usuario | undefined {
    return this.usuario;
  }

  getPessoa(): Prestador | Contratante | undefined {
    return this.pessoa;
  }
}
