export default function validateLogin(values) {
  const errors = {};
  const emailRE = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;

  // Email errors
  if (!values.email) {
    errors.email = "Email required"
  } else if (!emailRE.test(values.email)) {
    errors.email = "Invalid email address"
  }

  // Password errors
  if (!values.password) {
    errors.password = "Password required"
  } else if (values.password.length < 6) {
    errors.password = "Password must be 6 characters minimum"
  }

  return errors;
}
