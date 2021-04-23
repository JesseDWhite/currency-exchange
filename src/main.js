import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';
import CurrencyExchangeService from './js/currency-class.js';

function hideAllFields() {
    $("#all-conversions").hide();
    $("#show-error").show();
}

function showAllFields() {
    $("#all-conversions").show();
    $("#show-error").hide();
}

function currencyCompare(response) {
    const baseRate = response.base_code;
    const compareRate = response.target_code;
    const convertedCurrency = response.conversion_rate;

    if (response["error-type"] === "unsupported-code") {
        hideAllFields();
        return $("#show-error").text("It doesn't look like we have that currency code.");
    } else if (response["error-type"] === "malformed-request") {
        hideAllFields();
        return $("#show-error").text("Please enter a valid currency code.");
    } else if (baseRate === undefined || compareRate === undefined) {
        hideAllFields();
        return $("#show-error").text("Please input all fields before submitting.");
    } else if (response["error-type"] === "invalid-key") {
        hideAllFields();
        return $("#show-error").text("It looks like your API key is no longer valid. Please submit for another API key");
    } else if (response["error-type"] === "inactive-account") {
        hideAllFields();
        return $("#show-error").text("Your account is no longer active. Please either reactivate your account, or create a new one");
    } else if (response["error-type"] === "quota-reached") {
        hideAllFields();
        return $("#show-error").text("You have reached the maximum number of API requests for your account. Please see our documentation for API quotas.");
    }
    else {
        showAllFields();
        return convertedCurrency;
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
                $("#current-value").html(`The current exchange rate from ${baseRate.toUpperCase()} to ${compareRate.toUpperCase()} is: <span>${currencyCompare(response).toFixed(2)}</span>`);
                $("#conversion").html(`Your total converted exchange value from ${baseRate.toUpperCase()} to ${compareRate.toUpperCase()} is: <span>${(currencyCompare(response) * currencyAmmount).toFixed(2)}</span>`);
            });

        $('form').slideUp();
        $('#submit-info').fadeOut();
        $('#change-info').fadeIn();
        $('#show-error').fadeIn();
        $('#all-conversions').fadeIn();

        $('#change-info').click(function () {
            $('form').slideDown();
            $('#submit-info').fadeIn();
            $('#change-info').fadeOut();
            $('#show-error').fadeOut();
            $('#all-conversions').fadeOut();
        });
    });
});