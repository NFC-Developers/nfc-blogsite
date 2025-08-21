import type { User } from "firebase/auth";

export type AuthMode = "login" | "register";

export type AuthFormProps = {
  mode: AuthMode;
};

export type AuthErrors = {
  email?: string;
  password?: string;
  username?: string;
};

export type UseAuthFormReturn = {
  email: string;
  setEmail: (v: string) => void;
  password: string;
  setPassword: (v: string) => void;
  username: string;
  setUsername: (v: string) => void;
  errors: AuthErrors;
  message: string;
  user: User | null;
  loading: boolean;

  handleSubmit: () => Promise<void>;
  handleGoogleLogin: () => Promise<void>;
  handleLogout: () => Promise<void>;
};
