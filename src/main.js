import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';
import CurrencyExchangeService from './js/currency-class.js';

function currencyCompare(response) {
    const baseRate = response.base_code;
    const compareRate = response.target_code;
    if (!response.result === "success") {
        console.log("that did not work for currency");
    } else if (response.result === "supported-code") {
        return console.log("It doesn't look like we have that currencie code")
    } else {
        console.log(baseRate);
        console.log(compareRate);
        console.log(response.conversion_rate);
        return response.conversion_rate;
    }
}

$(document).ready(function () {
    $('form').submit(function (event) {
        event.preventDefault();

        const baseRate = $("#base-rate").val();
        const compareRate = $("#rate-to-compare").val();
        const currencyAmmount = $("#ammount").val();

        CurrencyExchangeService.getCurrency(baseRate, compareRate)
            .then(function (response) {
                $("#current-value").html(`The current exchange rate from ${baseRate} to ${compareRate} is: ${currencyCompare(response)}`);
                $("#conversion").html(`Your total converted exchange value from ${baseRate} to ${compareRate} is: ${currencyCompare(response) * currencyAmmount}`);
            });

    });
});