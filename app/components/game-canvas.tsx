import React, { useEffect, useRef } from 'react';

type GameCanvasProps = {
  elements: { x: number; y: number; value: number; isNegative?: boolean }[];
  gameOver: boolean;
  gameStarted: boolean;
};

const GameCanvas: React.FC<GameCanvasProps> = ({ elements, gameOver, gameStarted }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // 背景
      ctx.fillStyle = '#f5f5f5';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // ゲームスタート前の画面
      if (!gameStarted) {
        ctx.fillStyle = 'black';
        ctx.font = '36px Arial';
        ctx.textAlign = 'center';
        ctx.fillText('Game Start ボタンを押して下さい!', canvas.width / 2, canvas.height / 2);
        return;
      }

      // 数字を描画
      elements.forEach((element) => {
        ctx.font = '24px Arial';
        ctx.textAlign = 'center';
        ctx.fillStyle = element.isNegative ? 'red' : 'blue';
        ctx.fillText(element.value.toString(), element.x, element.y);
      });

      // ゲームオーバー表示
      if (gameOver) {
        ctx.fillStyle = 'red';
        ctx.font = '36px Arial';
        ctx.fillText('Game Over', canvas.width / 2, canvas.height / 2);
      }
    };

    draw();
  }, [elements, gameOver, gameStarted]);

  return <canvas ref={canvasRef} width={800} height={600} />;
};

export default GameCanvas;
