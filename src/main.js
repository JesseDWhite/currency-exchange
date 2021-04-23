import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';
import CurrencyExchangeService from './js/currency-class.js'

function currencyCompare(response) {
    const baseExchange = response.base_code;
    let compareExchange = respsonse.conversion_rates;
    if (baseExchange === "USD") {
        console.log(compareExchange);
    } else {
        console.log(response);
    }
}

$(document).ready(function () {
    $('form').submit(function (event) {
        event.preventDefault();
    });
});