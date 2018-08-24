export function validateRegister(username, password, confirmPassword, firstName, lastName, email, phone) {
  let usernameRegex = new RegExp('^[a-zA-z0-9]+$');
  let usernameCheck = usernameRegex.exec(username);
  if(!usernameCheck){
    return 'Username must contain only letters and digits !'
  }

  let passwordRegex = new RegExp('^[a-zA-z0-9]+$');
  let passwordCheck = passwordRegex.exec(password);
  if(!passwordCheck || password.length < 4 || password.length > 16){
    return 'Password should be between 4 and 16 symbols and should contain only letters and digits !'
  }

  if(password !== confirmPassword) {
    return 'Passwords do not match';
  }

  let namesRegex = new RegExp('^[A-Z][a-zA-z]+$');
  let firstNameCheck = namesRegex.exec(firstName);
  let lastNameCheck = namesRegex.exec(lastName);
  if(!firstNameCheck || !lastNameCheck){
    return 'Names should contain only letters nad starts with Capital !';
  }

  let emailRegex = new RegExp('[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\\.[A-Za-z]{2,4}');
  let emailCheck = emailRegex.exec(email);
  if(!emailCheck) {
    return 'Email is invalid !';
  }

  let phoneRegex = new RegExp('^\\+359\\d{9,9}$');
  let phoneCheck = phoneRegex.exec(phone);
  if(!phoneCheck) {
    return 'Phone is invalid ! No spaces between numbers.'
  }

  return '';
}

export function validateLogin(username, password) {
  let usernameRegex = new RegExp('^[a-zA-z0-9]+$');
  let usernameCheck = usernameRegex.exec(username);
  if(!usernameCheck){
    return 'Username must contain only letters and digits !'
  }

  let passwordRegex = new RegExp('^[a-zA-z0-9]+$');
  let passwordCheck = passwordRegex.exec(password);
  if(!passwordCheck || password.length < 4 || password.length > 16){
    return 'Password should be between 4 and 16 symbols and should contain only letters and digits !'
  }

  return '';
}

export function validateProduct(category, name, description, details, price, quantity, discount?) {
  if(category === '' || category === undefined) {
    return 'Category is required !'
  }

  let nameRegex = new RegExp('^[a-zA-z0-9 ]+$');
  let nameCheck = nameRegex.exec(name);
  if(!nameCheck){
    return 'Product name must contain only letters and digits !'
  }

  if(description.length < 20 || description.length > 5000) {
    return 'Description should be between 20 and 5000 symbols !'
  }

  if(details.length < 10 || details.length > 5000) {
    return 'Details should be between 10 and 5000 symbols !'
  }

  let priceRegex = new RegExp('^[0-9.]+$');
  let priceCheck = priceRegex.exec(price);
  let discountCheck = priceRegex.exec(discount);
  if(!priceCheck){
    return 'Price should contain only digits and should be grater than 0. Separator: . !'
  }

  if(discount !== undefined && !discountCheck) {
    return 'Discount should contain only digits and should be grater than 0. Separator: . !'
  }

  let quantityRegex = new RegExp('^[0-9]+$');
  let quantityCheck = quantityRegex.exec(quantity);
  if(!quantityCheck){
    return 'Quantity should contain only digits and should be grater than 0!'
  }

  return '';
}

export function validateCategory(name) {
  let nameRegex = new RegExp('^[a-zA-z0-9 ]+$');
  let nameCheck = nameRegex.exec(name);
  if(!nameCheck){
    return 'Category name must contain only letters and digits !'
  }

  return '';
}

export function validateReview(review) {
  if(review === '' || review === undefined) {
    return 'Review cannot be empty'
  }

  return '';
}
