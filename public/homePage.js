"use strict";
const buttonLogout = new LogoutButton();
const moneyManager = new MoneyManager();
const ratesBoard = new RatesBoard();
const favoritesWidget = new FavoritesWidget();
//кнопка выхода
buttonLogout.action = (response => {
    ApiConnector.logout(response => {
       if(response.success) {
           location.reload();
       } else {
           alert(response.error);
       }
    });
});
//профиль
ApiConnector.current(response => {
    if(response.success) {
        ProfileWidget.showProfile(response.data);
    } else {
        alert(response.error);
    }
});
//получение курса валют
function getRate() {
    ApiConnector.getStocks(response => {
        if(response.success) {
            ratesBoard.clearTable();
            ratesBoard.fillTable(response.data);
        }
    });
}
getRate();
setInterval(getRate, 60000);

//Операции с валютой
moneyManager.addMoneyCallback = (data => {
    ApiConnector.addMoney(data, response => {
        if(response.success) {
            ProfileWidget.showProfile(response.data);
            moneyManager.setMessage(true,"Действие прошло успешно!");
        } else {
            moneyManager.setMessage(false, response.error);
        }
    });
});

moneyManager.conversionMoneyCallback = (data => {
    ApiConnector.convertMoney(data, response => {
        if(response.success) {
            ProfileWidget.showProfile(response.data);
            moneyManager.setMessage(true,"Действие прошло успешно!");
        } else {
            moneyManager.setMessage(false, response.error);
        }
    });
});

moneyManager.sendMoneyCallback = (data => {
    ApiConnector.transferMoney(data, response => {
        if(response.success) {
            ProfileWidget.showProfile(response.data);
            moneyManager.setMessage(true,"Действие прошло успешно!");
        } else {
            moneyManager.setMessage(false, response.error);
        }
    });
});

//Добавление контактов
ApiConnector.getFavorites( response => {
    if(response.success) {
        favoritesWidget.clearTable();
        favoritesWidget.fillTable(response.data);
        moneyManager.updateUsersList(response.data);
        favoritesWidget.setMessage(true,"Действие прошло успешно!");
    }
});

favoritesWidget.addUserCallback = (data => {
    ApiConnector.addUserToFavorites(data, response => {
        if(response.success) {
            favoritesWidget.clearTable();
            favoritesWidget.fillTable(response.data);
            moneyManager.updateUsersList(response.data);
            favoritesWidget.setMessage(true,"Действие прошло успешно!");
        } else {
            favoritesWidget.setMessage(false, response.error);
        }
    });
});

favoritesWidget.removeUserCallback = (data => {
    ApiConnector.removeUserFromFavorites(data, response => {
        if(response.success) {
            favoritesWidget.clearTable();
            favoritesWidget.fillTable(response.data);
            moneyManager.updateUsersList(response.data);
            favoritesWidget.setMessage(true,"Действие прошло успешно!");
        } else {
            favoritesWidget.setMessage(false, response.error);
        }
    });
});
