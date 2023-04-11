export class AuthEntity {
  /**
   * Id do usuário.
   */
  id: number;
  /**
   * Nome do usuário autenticado.
   */
  name: string;

  /**
   * Login do usuário.
   */
  login: string;

  /**
   * JWT válido com as especificações e acessos do usuário logado.
   */
  token: string;
}
