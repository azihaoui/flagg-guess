import { useEffect, useState } from "react";
import type { Country } from "./types/Country";

function App() {
  const [countries, setCountires] = useState<Country[]>([]);
  const [country, setCountry] = useState<Country | null>(null);
  const [input, setInput] = useState("");
  const [isWinner, setIsWinner] = useState(false);

  useEffect(() => {
    async function getCountires() {
      const res = await fetch("https://restcountries.com/v3.1/all");
      const data = await res.json();
      console.log(data);

      setCountires(data);
    }
    getCountires();
  }, []);

  function getRandomCountry() {
    const maxLength = countries.length;
    const randomIndex = Math.floor(Math.random() * maxLength);
    setCountry(countries[randomIndex]);
  }

  function guessCountry() {
    if (input.toLowerCase() === country?.name.common.toLowerCase()) {
      getRandomCountry();
      setInput("");
      setIsWinner(true);
    } else {
      setIsWinner(false);
    }
  }

  return (
    <div className="App">
      {country && <img src={country.flags.png} />}
      <div>
        <input
          type="text"
          placeholder="Guess country..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />

        <button onClick={() => guessCountry()}>Guess country</button>
        <p>{isWinner ? "wow du är smart" : "oj, du är dum"}</p>
      </div>
      <button onClick={() => getRandomCountry()}>New country</button>
    </div>
  );
}

export default App;
