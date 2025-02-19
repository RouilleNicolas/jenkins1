export interface UserProfile {
  info: {
    realm_roles: string[];
    email_verified: boolean;
    preferred_username: string;
  };
}
