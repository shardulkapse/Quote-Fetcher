import React, { useState } from "react";
import QuoteItem from "./components/QuoteItem";

const LOADED_QUOTES = [];

function App() {
  const [fetchedQuote, setFetchedQuote] = useState();
  const [loadedQuotes, setLoadedQuotes] = useState([]);
  const [showPrevious, setShowPrevious] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isFetched, setIsFetched] = useState(false);

  const fetchQuoteHandler = async () => {
    setShowPrevious(false);
    setIsFetched(false);
    setIsLoading(true);
    const response = await fetch(
      "https://goquotes-api.herokuapp.com/api/v1/random?count=1"
    );
    const responseData = await response.json();
    const transformedData = {
      author: responseData.quotes[0].author,
      text: responseData.quotes[0].text,
    };
    LOADED_QUOTES.push(transformedData);
    setFetchedQuote(transformedData);
    setIsLoading(false);
    setIsFetched(true);
  };

  const showPreviousQuoteHandler = () => {
    const newArray = LOADED_QUOTES.slice(0, -1);
    setShowPrevious(true)
    setLoadedQuotes(newArray);
  };

  return (
    <div className="app-body">
      {!isLoading && !isFetched && (
        <h1>Click the button to fetch a random quote.</h1>
      )}
      {isLoading && !isFetched && <p>LOADING...</p>}
      {!isLoading && isFetched && <QuoteItem item={fetchedQuote} />}
      <button onClick={fetchQuoteHandler}>Fetch Quote</button>
      {LOADED_QUOTES.length > 1 && <button onClick={showPreviousQuoteHandler}>Show Previous Quotes</button>}
      {loadedQuotes && showPrevious &&
        loadedQuotes.map((quote) => (
          <div key={Math.random()} className="prev__quote">
            <h1>{quote.text}</h1>
            <h3>{quote.author}</h3>
          </div>
        ))}
    </div>
  );
}

export default App;
