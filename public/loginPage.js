"use strict";
const userForm = new UserForm();

userForm.loginFormCallback = (data) => {
    ApiConnector.login(data, (response) => {
        if(response.success) {
            location.reload();
            console.log("Вход прошел успешно");
        } else {
            userForm.setLoginErrorMessage(`Произошла ошибка: ${response.error}`);
        } 
    });
};

userForm.registerFormCallback = (data) => {
    ApiConnector.register(data, (response) => {
        if(response.success) {
            location.reload();
            console.log("Вход прошел успешно");
        } else {
            userForm.setRegisterErrorMessage(`Произошла ошибка: ${response.error}`);
        }
    });
};

