    const button = document.querySelector("#js-new-quote");
    const endpoint = "https://trivia.cyberwisp.com/getrandomchristmasquestion";

    button.addEventListener("click", getQuote);

    function getQuote() {
        console.log('Button clicked');

        fetch(endpoint)
            .then(function(response) {
                return response.json();
            })
            .then(function(data) {
                console.log(data.question);
                displayQuote(data.question);
            })
            .catch(function(error) {
                console.error(error);
                alert("Could not load trivia");
            })
        }

    function displayQuote(quote) {
        const quoteBox = document.querySelector("#js-quote-text");
        quoteBox.textContent = quote;
            }
    getQuote();
