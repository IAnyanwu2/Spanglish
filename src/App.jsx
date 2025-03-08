import { useState, useEffect } from 'react'
import './App.css'

// list of flashards
const flashcards = [
  {spanish:'Hola', english:'Hello' },
  {spanish:'Como estas', english:'How are you' },
  {spanish:'Perro', english:'Dog' },
  {spanish:'Buenas tardes', english:'Good morining' },
  {spanish:'Hasta luego', english:'See you later' },
  {spanish:'Gracias', english:'Thanks/Thank you' },
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

  // Shuffle cards initially
  const [shuffledFlashcards, setShuffledFlashcards] = useState([])
  const [currentIndex, setCurrentIndex] = useState(0) // track card index
  const [showAnswer, setShowAnswer] = useState(false) // Toggle question and answer

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
    setShowAnswer(false) //Spanish by default
  }

  // Move to previous
  const prevCard = () => {
    const prevIndex = (currentIndex - 1 + shuffledFlashcards.length) % shuffledFlashcards.length //Loop through cards
    setCurrentIndex(prevIndex)
    setShowAnswer(false) //Spanish by default
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
     
      {/* Button for next card */}
      <div className='button-container'>

        {/* Button for next card */}
        <button onClick={nextCard}>Previous</button>

         {/* Button for previous card */}
         <button onClick={prevCard}>Next</button>

      </div>
    </div>

  )
}

export default App
