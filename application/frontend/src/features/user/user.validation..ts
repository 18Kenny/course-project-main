export const isNameValid = (name: string): { isOk: boolean, message: string } => {
  if (name.trim() === '') {
    return {isOk: false, message: 'Name cannot be empty'};
  }

  if (name.length > 32) {
    return {isOk: false, message: 'Name must not exceed 32 characters'};
  }

  const alphanumericRegex = /^[a-zA-Z0-9]+$/;
  if (!alphanumericRegex.test(name)) {
    return {isOk: false, message: 'Name must contain only latin letters and digits'};
  }

  return {isOk: true, message: 'Valid name'};
};
