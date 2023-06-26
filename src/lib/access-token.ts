let accessToken: string | null = null;

export function setToken(token: string): void {
  accessToken = token;
}

export function getToken(): string {
  if (!accessToken) {
    throw new Error('sdk is not initialized');
  }
  return accessToken;
}
