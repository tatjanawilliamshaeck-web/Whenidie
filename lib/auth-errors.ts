export function friendlySignupError(message: string): string {
  if (message.includes("already registered") || message.includes("already exists")) {
    return "That email is already signed up. Try logging in, or use a different email.";
  }
  if (message.includes("Invalid login") || (message.includes("invalid") && message.includes("email"))) {
    return "That email doesn’t look right. Check it and try again.";
  }
  if (message.includes("Password") || message.includes("password")) {
    return "Password needs at least 6 characters. Pick something you’ll remember.";
  }
  return message || "Something went wrong.";
}

export function friendlyLoginError(message: string): string {
  if (message.includes("Email not confirmed")) {
    return "Please confirm your email first — check your inbox for the link.";
  }
  if (message.includes("Invalid login") || message.includes("invalid")) {
    return "Email or password didn’t match. Try again or use “Forgot password?”";
  }
  return message || "Invalid email or password.";
}

export function isUnconfirmedEmailError(message: string): boolean {
  return message.includes("Email not confirmed");
}
