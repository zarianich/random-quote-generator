let quotes = [];

const getQuotes = () => {
  return $.ajax({
    url: 'https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json',
    success: (data) => {
      if (typeof data === 'string') {
        quotes = JSON.parse(data);
      }
    },
    error: (xhr, status, error) => {
      console.log(error);
       $('#text').text("Couldn't load quotes. Try reloading the page or check console for errors.");
    }
  });
}

const loadQuote = () => {
  const randomQuote = quotes.quotes[
    Math.floor(Math.random() * quotes.quotes.length)
  ];
  
  const currQuote = randomQuote.quote;
  const currAuthor = randomQuote.author;
  
  $('.text-container').animate({ opacity: 0 }, 500, () => {
    $('.text-container').animate({ opacity: 1 }, 500);
    $('#text').html('<i class="fa fa-quote-left fa-pull-left"></i><br><br>' + currQuote + '<br><br><i class="fa fa-quote-right fa-pull-right"></i>');
    $('#author').text('- ' + currAuthor);
  });
  
  $('#tweet-quote').attr(
    'href',
    'https://twitter.com/intent/tweet?hashtags=quotes&text=' +
      encodeURIComponent('"' + currQuote + '"' + currAuthor)
  );
}

$(document).ready(() => {
  getQuotes().then(() => {
    loadQuote();
  });
  
  $('#new-quote').on('click', loadQuote);
});