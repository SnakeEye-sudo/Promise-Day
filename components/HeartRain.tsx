
import React, { useEffect, useState } from 'react';

const HeartRain: React.FC = () => {
  const [hearts, setHearts] = useState<{ id: number; left: string; duration: string; size: string }[]>([]);

  useEffect(() => {
    const interval = setInterval(() => {
      const newHeart = {
        id: Date.now(),
        left: `${Math.random() * 100}%`,
        duration: `${Math.random() * 3 + 2}s`,
        size: `${Math.random() * 20 + 10}px`
      };
      setHearts(prev => [...prev.slice(-20), newHeart]);
    }, 500);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {hearts.map(heart => (
        <div
          key={heart.id}
          className="heart-fall"
          style={{
            left: heart.left,
            animationDuration: heart.duration,
            fontSize: heart.size
          }}
        >
          ❤️
        </div>
      ))}
    </div>
  );
};

export default HeartRain;
