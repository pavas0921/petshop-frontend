export const validatePassword = (password) => {
  // Utiliza expresiones regulares para buscar letras mayúsculas, números y caracteres especiales.
  const capsRegex = /[A-Z]/;
  const numbersRegex = /[0-9]/;
  const specialCharsRegex = /[^a-zA-Z0-9\s_@]/;

  // Verifica si cada requisito se cumple.
  const hasCaps = capsRegex.test(password);
  const hasNumbers = numbersRegex.test(password);
  const hasSpecialChars = specialCharsRegex.test(password);

  if (
    password &&
    password.length >= 8 &&
    hasCaps &&
    hasNumbers &&
    hasSpecialChars
  ) {
    return true;
  } else {
    return false;
  }
};
