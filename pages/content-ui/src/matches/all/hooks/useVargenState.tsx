import { useEffect, useState } from 'react';

export default function useVargenState() {
  const [visible, setVisible] = useState(false);
  const [text, setText] = useState('');
  const [position, setPosition] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  useEffect(() => {
    window.addEventListener('vargen:show', (e: Event) => {
      const { text, position } = (e as CustomEvent).detail;
      setText(text);
      setPosition(position);
      setVisible(true);
    });
  }, []);

  return {
    visible,
    setVisible,
    text,
    position,
  };
}
