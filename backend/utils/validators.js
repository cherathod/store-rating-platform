exports.validateEmail = (email) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

exports.validatePassword = (password) =>
    /^(?=.*[A-Z])(?=.*[\W_]).{8,16}$/.test(password);
