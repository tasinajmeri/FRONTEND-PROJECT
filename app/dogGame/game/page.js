// app/dogGame/game/page.js
"use client"
import { useState, useEffect } from 'react';
import axios from 'axios';

export default function DogGuessingGame() {
  const [dogImage, setDogImage] = useState('');
  const [options, setOptions] = useState([]);
  const [correctOption, setCorrectOption] = useState('');
  const [score, setScore] = useState(0);
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    fetchDog();
  }, []);

  const fetchDog = async () => {
    try {
      const breedsResponse = await axios.get('https://dog.ceo/api/breeds/list/all');
      const breeds = Object.keys(breedsResponse.data.message);
      const randomBreeds = getRandomBreeds(breeds, 4);
      const correctBreed = randomBreeds[Math.floor(Math.random() * randomBreeds.length)];
      const imageResponse = await axios.get(`https://dog.ceo/api/breed/${correctBreed}/images/random`);
      setDogImage(imageResponse.data.message);
      setOptions(randomBreeds);
      setCorrectOption(correctBreed);
    } catch (error) {
      console.error('Error fetching the dog data:', error);
    }
  };

  const getRandomBreeds = (breeds, count) => {
    const shuffledBreeds = breeds.sort(() => 0.5 - Math.random());
    return shuffledBreeds.slice(0, count);
  };

  const handleOptionClick = (breed) => {
    if (breed === correctOption) {
      setScore(score + 1);
      fetchDog();
    } else {
      setShowPopup(true);
    }
  };

  const restartGame = () => {
    setScore(0);
    setShowPopup(false);
    fetchDog();
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100 p-4">
      <h1 className="text-4xl font-bold mb-8">Dog Breed Guessing Game</h1>
      {dogImage && <img src={dogImage} alt="Dog" className="w-64 h-64 object-cover mb-8 rounded-md shadow-md" />}
      <div className="grid grid-cols-2 gap-4 mb-8">
        {options.map((breed) => (
          <button
            key={breed}
            onClick={() => handleOptionClick(breed)}
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-700"
          >
            {breed}
          </button>
        ))}
      </div>
      <div className="text-xl font-bold">Score: {score}</div>

      {showPopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-8 rounded-md shadow-md text-center">
            <h2 className="text-2xl font-bold mb-4">Your score is {score}</h2>
            <button
              onClick={restartGame}
              className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-700"
            >
              Try Again
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
