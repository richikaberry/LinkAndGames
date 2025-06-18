import React, { useState, useEffect, useCallback } from 'react';
import GameCanvas from '../components/game-canvas';
import '../css/game.css';

type Element = {
  x: number;
  y: number;
  value: number;
  isNegative?: boolean;
};

const Game: React.FC = () => {
  const [elements, setElements] = useState<Element[]>([]);
  const [score, setScore] = useState(100);
  const [gameOver, setGameOver] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);
  const [difficulty, setDifficulty] = useState('Easy');
  const [negativeScoreEnabled, setNegativeScoreEnabled] = useState(false);

  const generateRandomElement = useCallback(() => {
    const isNegative = negativeScoreEnabled && Math.random() < 0.2; // 20%の確率で逆転得点
    return {
      x: Math.random() * 800,
      y: 0,
      value: Math.floor(Math.random() * 10),
      isNegative,
    };
  }, [negativeScoreEnabled]);

  const handleKeyPress = useCallback(
    (e: KeyboardEvent) => {
      if (!gameStarted || gameOver) return;

      const pressedNumber = parseInt(e.key, 10);
      if (isNaN(pressedNumber)) return;

      setElements((prev) =>
        prev.filter((el) => {
          if (el.value === pressedNumber) {
            setScore((prevScore) =>
              el.isNegative ? prevScore - 20 : prevScore + 10
            );
            return false;
          }
          return true;
        })
      );
    },
    [gameOver, gameStarted]
  );

  useEffect(() => {
    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [handleKeyPress]);

  useEffect(() => {
    if (!gameStarted || gameOver) return;

    const interval = setInterval(() => {
      setElements((prev) => {
        const newElements = prev.map((el) => ({
          ...el,
          y: el.y + (difficulty === 'Easy' ? 3 : difficulty === 'Medium' ? 5 : 7),
        }));

        const droppedElements = newElements.filter((el) => el.y > 600);
        if (droppedElements.length > 0) {
          setScore((prevScore) =>
            prevScore - droppedElements.length * 10
          );
        }

        return newElements.filter((el) => el.y <= 600);
      });

      // ランダムに新しい数字を追加
      if (Math.random() > (difficulty === 'Easy' ? 0.8 : difficulty === 'Medium' ? 0.6 : 0.4)) {
        setElements((prev) => [...prev, generateRandomElement()]);
      }
    }, 100);

    return () => clearInterval(interval);
  }, [generateRandomElement, gameOver, gameStarted, difficulty]);

  useEffect(() => {
    if (score <= 0) {
      setGameOver(true);
    }
  }, [score]);

  const startGame = () => {
    setScore(100);
    setElements([]);
    setGameOver(false);
    setGameStarted(true);
  };

  const retryGame = () => {
    setScore(100);
    setElements([]);
    setGameOver(false);
  };

  return (
    <div className='game__container'>
      <GameCanvas elements={elements} gameOver={gameOver} gameStarted={gameStarted} />
      {!gameStarted && (
        <button className='game__start-button' onClick={startGame}>Game Start</button>
      )}
      {gameOver && (
        <button className='game__reTry-button' onClick={retryGame}>Retry</button>
      )}
      <div className='game__content'>
        <div>
          <p>Score: {score}</p>
          <p>難易度: {difficulty}</p>
          <p>
            得点反転:{" "}
            <button onClick={() => setNegativeScoreEnabled((prev) => !prev)}>
              {negativeScoreEnabled ? "Disable" : "Enable"}
            </button>
          </p>
        </div>
        <div className='game__parameters'>
          <p>難易度を選択</p>
          <button onClick={() => setDifficulty('Easy')} >Easy</button><br />
          <button onClick={() => setDifficulty('Medium')} >Medium</button><br />
          <button onClick={() => setDifficulty('Hard')} >Hard</button>
        </div>
      </div>
    </div>
  );
};

export default Game;
