interface UserProps {
  email: string;
  password: string;
}

class User {
  email: string;
  password: string;

  constructor({ email, password }: UserProps) {
    if (!email || !email.includes('@')) {
      throw new Error('Email inválido');
    }
    if (!password || password.length < 6) {
      throw new Error('La contraseña debe tener al menos 6 caracteres');
    }

    this.email    = email.toLowerCase().trim();
    this.password = password;
  }
}

export default User;