import { useState, useEffect } from 'react'
import './App.css'

// list of flashards
const flashcards = [
  {spanish:'Hola', english:'Hello' },
  {spanish:'Como estas', english:'How are you' },
  {spanish:'Perro', english:'Dog' },
  {spanish:'Buenas tardes', english:'Good afternoon' },
  {spanish:'Hasta luego', english:'See you later' },
  {spanish:'Gracias', english:'Thank you' },
  {spanish:'Mucho gusto', english:'Pleasure to meet you'},
  {spanish:'Buenos Dias', english:'Good morning' },
  {spanish:'Bievenido', english:'Welcome' },
  {spanish:'Padre', english:'Father' },
  {spanish:'Madre', english:'Mother' },
  {spanish:'Casa',  english:'House' },
  {spanish:'Familia',  english:'Family' },
  {spanish:'La puerta',  english:'The door' },
  {spanish:'El cielo',  english:'The sky' },
  {spanish:'Los gentes',  english:'The people' },
]

// Shuffle cards; random order
const shuffleCards = (card) => {
  return card.sort( () => Math.random() - 0.5)
}

// Toggle cards one at a time
const Flashcard = ({ card, showAnswer, toggleCard }) => {
  return (
    <div className='flashcard' onClick={toggleCard}>
      <h2>{showAnswer ? card.english : card.spanish}</h2>
    </div>
  )
}

const App = () => {

  // State Hooks 
  const [shuffledFlashcards, setShuffledFlashcards] = useState([])
  const [currentIndex, setCurrentIndex] = useState(0) // track card index
  const [showAnswer, setShowAnswer] = useState(false) // Toggle question and answer
  const [userGuess, setUserGuess] = useState('') // User Input
  const [isCorrect, setIsCorrect] = useState(null) // Feedback for user answer
  const [currentStreak, setCurrentStreak] = useState(0) // Streak tracking 
  const [longestStreak, setLongestStreak] = useState(0) // Longest streak  
  const [masteredCards, setMasteredCards] = useState([]) // List mastered cards

  //Shuffle cards Initially
  useEffect( () => {
    const shuffled = shuffleCards(flashcards)
    setShuffledFlashcards(shuffled)
  }, [])

  // English or Spanish
  const toggleCard = () => {
    setShowAnswer(!showAnswer)
  }

  // Move to next card
  const nextCard = () => {
    const nextIndex = (currentIndex + 1) % shuffledFlashcards.length // Loop to first card
    setCurrentIndex(nextIndex)
    setShowAnswer(false) // Spanish by default
    setUserGuess('') // User input 
    setIsCorrect(null) // Reset feedback
  }

  // Move to previous
  const prevCard = () => {
    const prevIndex = (currentIndex - 1 + shuffledFlashcards.length) % shuffledFlashcards.length //Loop through cards
    setCurrentIndex(prevIndex)
    setShowAnswer(false) // Spanish by default
    setUserGuess('')  // User Input
    setIsCorrect(null) //Reset feedback
  }

  // Handle guess submission
  const GuessSubmit = () => {
    const correctAnswer = shuffledFlashcards[currentIndex].english.toLowerCase()
    const guess = userGuess.toLowerCase()

    if (guess === correctAnswer) {
      setIsCorrect(true)
      setCurrentStreak(currentStreak + 1)
      if (currentStreak + 1 > longestStreak) {
        setLongestStreak(currentStreak + 1)
      }
    } else {
      setIsCorrect(false)
      setCurrentStreak(0)
    }
  }

  // Mark current card as mastered
  const Mastered = () => {
    setMasteredCards([...masteredCards, shuffledFlashcards[currentIndex]])
    setShuffledFlashcards(shuffledFlashcards.filter((_, idx) => idx !== currentIndex))
    nextCard()
  }

  // Shuffle cards 
  const handleShuffle = () => {
    const shuffled = shuffleCards(flashcards)
    setShuffledFlashcards(shuffled)
  }


  return (
    <div className='App'>
      <h1>English or Spanish!</h1>
      <h3>Learn Spanish with these flashcards.</h3>
      <h4>Total Cards: {shuffledFlashcards.length}</h4>
      
      {/* Display current flashcard */}
      {shuffledFlashcards.length > 0 && (
        <Flashcard
        card={shuffledFlashcards[currentIndex]}
        showAnswer={showAnswer}
        toggleCard={toggleCard}
        />
      )}
     
      <div className='button-container'>

        {/* Button for next card */}
        <button onClick={nextCard}>Previous</button>

        {/* Button for previous card */}
        <button onClick={prevCard}>Next</button>
         
        {/* Button for shuffle */}

        <button onClick={handleShuffle}>Shuffle</button>

      </div>

      <div>
        <input
          type='text'
          value={userGuess}
          onChange={(e) => setUserGuess(e.target.value)}
          placeholder='Enter your answer'
        />
        <button onClick={GuessSubmit}>Submit</button>
      </div>

      {isCorrect !== null && (
        <div>
          {isCorrect ? (
            <p style={{ color: 'green'}}>Correct!</p>
          ) : (
            <p style={{ color: 'red'}}>Incorrect. Try again!</p>
          )}
        </div>  
      )}

      {/*Streaks*/}
      <div>
        <p>Current Streak: {currentStreak}</p>
        <p>Longest Streak: {longestStreak}</p>
      </div>

      <button onClick={Mastered}>Mark as Mastered</button>
    </div>

  )
}

export default App
