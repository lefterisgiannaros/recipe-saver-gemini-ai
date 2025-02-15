"use client";

import { useState } from "react";
import Image from "next/image";
import styles from "../../styles/Cinema.module.css";

const Cinema = () => {
  const [step, setStep] = useState(1);
  const [movie, setMovie] = useState("Lord of the Rings: The Two Towers (Extended Edition)");
  const [tickets, setTickets] = useState([{ name: "" }]);
  const [extraSnacks, setExtraSnacks] = useState([]);
  const [flashingWord, setFlashingWord] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [winningWord, setWinningWord] = useState(null);

  const words = ["Pizza", "Sushi", "Burger", "McDonald's"];

  const snacks = [
    { name: "Popcorn", img: "/cinema/popcorn.png" },
    { name: "Water", img: "/cinema/water.png" },
    { name: "Cheddar Sauce", img: "/cinema/cheddarsauce.png" },
    { name: "Nachos", img: "/cinema/nachos.png" },
    { name: "Coca Cola", img: "/cinema/cola.png" },
  ];

  const toggleSnack = (snackName) => {
    setExtraSnacks((prev) =>
      prev.includes(snackName) ? prev.filter((snack) => snack !== snackName) : [...prev, snackName]
    );
  };

  const playLuckyGame = () => {
    setIsPlaying(true);
    setWinningWord(null);
    let index = 0;
    let interval = 100;

    const flashing = setInterval(() => {
      setFlashingWord(words[index % words.length]);
      index++;

      // Extend the duration to last longer
      if (index > words.length * 8) {
        clearInterval(flashing);
        const winningIndex = Math.floor(Math.random() * words.length);
        setFlashingWord(words[winningIndex]);
        setWinningWord(words[winningIndex]);
        setIsPlaying(false);
      }
    }, interval);

    const slowDown = setInterval(() => {
      interval += 50;
      if (interval > 800) clearInterval(slowDown); // Gradually slow down to a longer interval
    }, 500);
  };

  const handleCheckout = () => {
    setStep(6); // Move to the printing screen
    setTimeout(() => setStep(7), 8000); // After 8 seconds, move to the instructions step
  };

  return (
    <div className={styles.container}>
      <div className={styles.logo}>
        <Image src="/cinema/logo.png" alt="The Prancing Pony Logo" width={200} height={200} />
      </div>
      {step === 1 && (
        <div className={styles.step}>
          <h2>Book Now!</h2>
          <button onClick={() => setStep(2)} className={styles.button}>Next</button>
        </div>
      )}
      {step === 2 && (
        <div className={styles.step}>
          <h2>Select Your Movie</h2>
          <label>
            Choose a movie:
            <select
              value={movie}
              onChange={(e) => setMovie(e.target.value)}
              className={styles.dropdown}
            >
              <option value="Lord of the Rings: The Two Towers (Extended Edition)">
                Lord of the Rings: The Two Towers (Extended Edition)
              </option>
            </select>
          </label>
          <button onClick={() => setStep(1)} className={styles.button}>Back</button>
          <button onClick={() => setStep(3)} className={styles.button}>Next</button>
        </div>
      )}
      {step === 3 && (
        <div className={styles.step}>
          <h2>Enter Ticket Details</h2>
          <label>
            Number of Tickets (up to 2):
            <input
              type="number"
              max="2"
              min="1"
              value={tickets.length}
              onChange={(e) =>
                setTickets(Array.from({ length: e.target.value }, () => ({ name: "" })))
              }
              className={styles.input}
            />
          </label>
          {tickets.map((_, index) => (
            <div key={index}>
              <label>
                Name for Ticket {index + 1}:
                <input
                  type="text"
                  value={tickets[index].name}
                  onChange={(e) => {
                    const newTickets = [...tickets];
                    newTickets[index].name = e.target.value;
                    setTickets(newTickets);
                  }}
                  className={styles.input}
                />
              </label>
            </div>
          ))}
          <button onClick={() => setStep(2)} className={styles.button}>Back</button>
          <button onClick={() => setStep(4)} className={styles.button}>Next</button>
        </div>
      )}
      {step === 4 && (
        <div className={styles.step}>
          <h2>Play the Lucky Game for Snacks!</h2>
          <div className={styles.luckyGame}>
            {flashingWord && (
              <div className={styles.flashingWord}>{flashingWord}</div>
            )}
            {!isPlaying && winningWord && (
              <div className={styles.popup}>
                <Image
                  src="/cinema/win.png"
                  alt="You Win"
                  width={200}
                  height={200}
                  className={styles.popupImage}
                />
                <p className={styles.popupText}>You won: {winningWord}!</p>
                <p className={styles.popupText}>
                  SUPER LUCKY! You have also won bonus items and snacks! Ask the reception!
                </p>
                <button onClick={playLuckyGame} className={styles.button}>
                  Try Again
                </button>
                <button onClick={() => setStep(5)} className={styles.button}>
                  Next
                </button>
              </div>
            )}
            {!isPlaying && !winningWord && (
              <button onClick={playLuckyGame} className={styles.button}>
                Play
              </button>
            )}
          </div>
        </div>
      )}
      {step === 5 && (
        <div className={styles.step}>
          <h2>Select Extra Snacks</h2>
          <div className={styles.snackOptions}>
            {snacks.map((snack) => (
              <div
                key={snack.name}
                className={`${styles.snackCard} ${
                  extraSnacks.includes(snack.name) ? styles.selectedSnack : ""
                }`}
                onClick={() => toggleSnack(snack.name)}
              >
                <Image src={snack.img} alt={snack.name} width={80} height={80} />
                <label>{snack.name}</label>
              </div>
            ))}
          </div>
          <button onClick={() => setStep(4)} className={styles.button}>Back</button>
          <button onClick={handleCheckout} className={styles.button}>
            Checkout
          </button>
        </div>
      )}
      {step === 6 && (
        <div className={styles.step}>
          <h2>Printing Tickets...</h2>
          <div className={styles.loading}>🖨️ Printing...</div>
        </div>
      )}
      {step === 7 && (
        <div className={styles.step}>
          <h2>Success!</h2>
          <p>Your tickets have been printed and are inside of the glovebox! Open it!</p>
          <Image
            src="/cinema/glovebox.png"
            alt="Glovebox"
            width={300}
            height={200}
            className={styles.dashboardImage}
          />
          <button onClick={() => setStep(8)} className={styles.button}>
            I Got the Tickets!
          </button>
        </div>
      )}
      {step === 8 && (
        <div className={styles.step}>
          <h2 className={styles.finalTitle}>Selected Snacks</h2>
          <div className={styles.finalSnacks}>
            {extraSnacks.length > 0 ? (
              extraSnacks.map((snackName) => {
                const snack = snacks.find((s) => s.name === snackName);
                return (
                  <div key={snackName} className={styles.finalSnackCard}>
                    <Image src={snack.img} alt={snack.name} width={100} height={100} />
                    <p>{snack.name}</p>
                  </div>
                );
              })
            ) : (
              <p>No extra snacks selected.</p>
            )}
          </div>
          <h3 className={styles.mapTitle}>How to get to the cinema</h3>
          <div className={styles.map}>
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3146.495214796196!2d23.72063007715466!3d37.942221502494924!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14a1bdb1a00e83cd%3A0xe4ab932dd5d9dd29!2sVasiliou%20Voulgaroktonou%2021%2C%20Nea%20Smirni%20171%2024!5e0!3m2!1sen!2sgr!4v1733568607283!5m2!1sen!2sgr"
              width="600"
              height="450"
              style={{ border: "0" }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Cinema;
