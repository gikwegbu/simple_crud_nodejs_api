
// Regex
const emailRegexPattern =  /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const passwordRegex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})");

// Function Checkers
export const checkEmail =(email: string) => emailRegexPattern.test(email);
export const checkPassword =(password: string) => passwordRegex.test(password);