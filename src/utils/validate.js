export const checkValidateData = (name, email, password) => {
  const isEmailValid = /^[\w\-\.]+@([\w-]+\.)+[\w-]{2,}$/gm.test(email);
  const isPasswordValid =
    /^((?=\S*?[A-Z])(?=\S*?[a-z])(?=\S*?[0-9]).{6,})\S$/.test(password);

  if (!name || name.length < 3) return "Name is not valid";
  if (!isEmailValid) return "Username is not valid";
  if (!isPasswordValid) return "Password is not valid";

  return null;
};
