
export const validateUsername = (username:string) => {

    const patternUsername = /^[a-zA-Z]{2}[-._a-zA-Z0-9]{2,38}$/;

    return patternUsername.test(username);

}

export const validateEmail = (email:string) => {

    const patternEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    return patternEmail.test(email);

}

export const validatePassword = (password:string) =>  {

    const patternPassword = /^(?=.{8,})(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=]).*$/;

    return patternPassword.test(password)
}

