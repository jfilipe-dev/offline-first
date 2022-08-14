import { useEffect, useState } from 'react';
import { Keyboard, LayoutAnimation } from 'react-native';

interface LayoutAnimationProps {
  duration: number;
  update: {
    duration: number;
    type: string;
  };
}

interface UseKeyboard {
  height: number;
  layoutAnimation: LayoutAnimationProps | null;
}

export default function useKeyboard(): UseKeyboard {
  const [height, setHeight] = useState<number>(0);
  const [
    layoutAnimation,
    setLayoutAnimation,
  ] = useState<LayoutAnimationProps | null>(null);

  useEffect(() => {
    const keyboardShow = Keyboard.addListener('keyboardWillShow', (e) => {
      const { duration, easing, endCoordinates } = e;

      setHeight(endCoordinates.height);

      if (easing && duration) {
        setLayoutAnimation({
          duration,
          update: {
            duration,
            type: LayoutAnimation.Types[easing],
          },
        });
      }
    });

    const keyboardHide = Keyboard.addListener('keyboardWillHide', (e) => {
      const { duration, easing } = e;

      setHeight(0);

      if (easing && duration) {
        setLayoutAnimation({
          duration,
          update: {
            duration,
            type: LayoutAnimation.Types[easing],
          },
        });
      }
    });

    return () => {
      keyboardShow.remove();
      keyboardHide.remove();
    };
  }, []);

  return {
    height,
    layoutAnimation,
  };
}
