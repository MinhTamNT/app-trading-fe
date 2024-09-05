interface AuthUser {
  id: string; // or other user ID field
  username: string;
  token: string; // Add token field
}

export { AuthUser };
