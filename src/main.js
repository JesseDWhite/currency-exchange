import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';
import CurrencyExchangeService from './js/currency-class.js';

function currencyCompare(response) {
    const baseRate2 = response.base_code;
    const compareRate2 = response.target_code;
    if (!response.result === "success") {
        console.log("that did not work for currency");
    } else {
        console.log(baseRate2);
        console.log(compareRate2);
        console.log(response.conversion_rate);
    }
}

$(document).ready(function () {
    $('form').submit(function (event) {
        event.preventDefault();

        const baseRate = $("#base-rate").val();
        const compareRate = $("#rate-to-compare").val();

        CurrencyExchangeService.getCurrency(baseRate, compareRate)
            .then(function (response) {
                currencyCompare(response);
            });

    });
});