import jwtDecode from 'jwt-decode';

export interface TokenType {
  nickname: string;
  sub: string; // email
  exp: number;
  // whatever else is in the JWT.
}

export const getToken = () => {
  const localToken = localStorage.getItem('accessToken');
  if (localToken) {
    return localToken;
  }
  return null;
};

export const isExist = () => {
  const accessToken = getToken();
  if (!accessToken) return false;
  // const decode = jwtDecode<TokenType>(token);
  // if(!decode) return false
  return true;
};

export const isExp = (token: string) => {
  if (!token) {
    return;
  }
  const decode = jwtDecode<TokenType>(token);
  if (decode.exp > new Date().getTime() / 1000) {
    return true;
  }
  return false;
};

export const getEmail = (token: string) => {
  const decode = jwtDecode<TokenType>(token);
  return decode.sub;
};
export const getNickname = (token: string) => {
  const decode = jwtDecode<TokenType>(token);
  return decode.nickname;
};
