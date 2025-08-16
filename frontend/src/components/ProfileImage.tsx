'use client';

interface ProfileImageProps {
  src: string | null;
  alt: string;
  className?: string;
  effect?: 'fade' | 'scale' | 'rotate' | 'bounce' | 'flip' | 'none';
  gradientBlur?: boolean;
}

export default function ProfileImage({ src, alt, className, effect = 'fade', gradientBlur = false }: ProfileImageProps) {
  // Efek animasi berdasarkan prop effect
  const getEffectClass = () => {
    switch(effect) {
      case 'fade':
        return 'animate-smooth-fade-in';
      case 'scale':
        return 'animate-smooth-fade-in scroll-scale scroll-animate';
      case 'rotate':
        return 'animate-smooth-fade-in scroll-rotate scroll-animate';
      case 'bounce':
        return 'animate-smooth-fade-in scroll-bounce scroll-animate';
      case 'flip':
        return 'animate-smooth-fade-in scroll-flip-y scroll-animate';
      case 'none':
      default:
        return '';
    }
  };

  if (!src) {
    return (
      <div className={`bg-gray-100 rounded-2xl shadow-2xl flex items-center justify-center ${className}`}>
        <div className="text-center text-gray-500">
          <div className="text-8xl mb-4">👤</div>
          <p className="text-lg font-medium">Photo tidak tersedia</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`relative overflow-hidden rounded-2xl transition-all duration-500 hover:shadow-xl ${getEffectClass()}`}>
      <img 
        src={src} 
        alt={alt} 
        className={`${className} transition-transform duration-500 hover:scale-105 relative z-10`}
      />
      {gradientBlur && (
        <>
          <div className="absolute -bottom-6 left-0 right-0 h-20 bg-gradient-to-t from-purple-500/20 to-transparent blur-2xl z-0 transform translate-y-2 blur-pulse"></div>
          <div className="absolute -bottom-4 left-0 right-0 h-16 bg-gradient-to-t from-blue-500/10 to-transparent blur-xl z-0 transform translate-y-1"></div>
          <div className="absolute -bottom-5 left-0 right-0 h-16 bg-gradient-to-t from-pink-500/15 to-transparent blur-xl z-0 transform translate-y-1 blur-pulse"></div>
        </>
      )}
    </div>
  );
}
