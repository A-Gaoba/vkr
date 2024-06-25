// MobileWarning.tsx
import React, { useEffect, useState } from 'react';

const MobileWarning: React.FC = () => {
  const [isMobile, setIsMobile] = useState<boolean>(window.innerWidth <= 768);

  const handleResize = () => {
    setIsMobile(window.innerWidth <= 768);
  };

  useEffect(() => {
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  if (!isMobile) {
    return null;
  }

  return (
    <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-80 text-red-500 z-50">
      <div className="text-center">
        <h1 className="text-2xl font-bold mb-4">Внимание!</h1>
        <p className="mb-2">Этот сайт лучше всего просматривать на экране ноутбука или настольного компьютера.</p>
        <p>Пожалуйста, переключитесь на больший экран для лучшего опыта.</p>
      </div>
    </div>
  );
};

export default MobileWarning;
