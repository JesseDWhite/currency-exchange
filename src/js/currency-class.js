export default class CurrencyExchangeService {
    static getCurrency() {
        return fetch(`https://v6.exchangerate-api.com/${process.env.API_KEY}/latest/USD`)
            .then(function (response) {
                if (!response.ok) {
                    throw Error(response.statusText);
                }
                return response.json();
            })
            .catch(function (error) {
                return error;
            })
    }
}