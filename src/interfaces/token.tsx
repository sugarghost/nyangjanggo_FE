export interface TokenType {
    nickname: string;
    sub: string;// email
    exp: number;
    // whatever else is in the JWT.
  }