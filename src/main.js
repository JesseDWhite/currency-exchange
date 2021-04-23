import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';
import CurrencyExchangeService from './js/currency-class.js';

function currencyCompare(response) {
    const userInput = $('#base-rate').text();
    if (userInput === response.base_code) {
        console.log(response.base_code);
        console.log(response.converstion_rates);
    } else {
        console.log("that didn't work");
    }
}

$(document).ready(function () {
    $('form').submit(function (event) {
        event.preventDefault();

        CurrencyExchangeService.getCurrency()
            .then(function (response) {
                currencyCompare(response);
            });

    });
});