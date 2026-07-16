export interface NavLink {
  label: string;
  href: string;
}

export interface FooterSection {
  title: string;
  links: NavLink[];
}

export interface ProcessStep {
  number: string;
  title: string;
  description: string;
}

export interface Capability {
  title: string;
  description: string;
  icon: string;
}

export interface UseCase {
  industry: string;
  description: string;
  icon: string;
}

export interface TrustItem {
  title: string;
  description: string;
  icon: string;
}

/* ============================================================
   AUTH TYPES — mirrors backend response contracts
   ============================================================ */

export interface AuthUser {
  id: string;
  email: string;
  name?: string;
  role: "user" | "admin";
  isEmailVerified: boolean;
  twoFactorEnabled?: boolean;
}

export interface LoginResponse {
  message: string;
  accessToken: string;
  user: AuthUser;
}

export interface RegisterResponse {
  message: string;
  user: {
    id: string;
    email: string;
    role: string;
    isEmailVerified: boolean;
  };
}

export interface RefreshResponse {
  message: string;
  accessToken: string;
  user: AuthUser;
}

export interface TwoFASetupResponse {
  message: string;
  otpAuthUrl: string;
  secret: string;
}

export interface TwoFAVerifyResponse {
  message: string;
  twoFactorEnabled: boolean;
}

export interface ApiErrorResponse {
  message: string;
  errors?: {
    fieldErrors?: Record<string, string[]>;
    formErrors?: string[];
  };
}

export interface MessageResponse {
  message: string;
}

export interface MeResponse {
  user: AuthUser;
}
