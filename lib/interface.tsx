interface AuthUser {
  id: string;
  username: string;
  token: string;
}

export interface UserProfile {
  id: string;
  first_name?: string;
  last_name: string;
  avatarUrl?: string;
  phone_number?: string;
  need?: string;
  createdAt: string;
  updatedAt: string;
}

export { AuthUser };
