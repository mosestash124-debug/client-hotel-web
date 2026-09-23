import { useState } from 'react';
import { RESTAURANT_MEDIA } from '../data/restaurantData';

interface DishIllustrationProps {
  category: 'signatures' | 'bites' | 'pork' | 'staples' | 'drinks';
  id?: string;
  name: string;
  imageSrc?: string;
}

// Fallback real photography mapping by category or dish ID
function getRealPhotoFallback(category: string, id?: string, name?: string): string {
  const lowerName = (name || '').toLowerCase();
  const lowerId = (id || '').toLowerCase();

  if (lowerName.includes('samosa') || lowerId.includes('samosa') || category === 'bites') {
    return RESTAURANT_MEDIA.crispySamosas;
  }
  if (lowerName.includes('pork') || lowerId.includes('pork') || category === 'pork') {
    return RESTAURANT_MEDIA.porkPlantains;
  }
  if (lowerName.includes('pilau') || lowerId.includes('pilau')) {
    return RESTAURANT_MEDIA.chickenPilau;
  }
  if (lowerName.includes('ugali') || lowerId.includes('ugali')) {
    return RESTAURANT_MEDIA.ugaliSukuma;
  }
  if (lowerName.includes('passion') || lowerName.includes('juice')) {
    return RESTAURANT_MEDIA.passionJuice;
  }
  if (lowerName.includes('chai') || lowerName.includes('tea') || lowerName.includes('coffee') || lowerName.includes('kahawa') || category === 'drinks') {
    return RESTAURANT_MEDIA.masalaChai;
  }
  if (lowerName.includes('chapati') || lowerName.includes('chapo') || lowerName.includes('beef') || lowerName.includes('stew') || lowerName.includes('matoke') || category === 'signatures' || category === 'staples') {
    return RESTAURANT_MEDIA.chapatiBeef;
  }

  return RESTAURANT_MEDIA.heroSpread;
}

export function DishIllustration({ category, id, name, imageSrc }: DishIllustrationProps) {
  const [currentSrc, setCurrentSrc] = useState<string>(imageSrc || getRealPhotoFallback(category, id, name));
  const [hasErroredOnce, setHasErroredOnce] = useState(false);

  const handleError = () => {
    if (!hasErroredOnce) {
      setHasErroredOnce(true);
      // Fallback to verified local imported asset
      setCurrentSrc(getRealPhotoFallback(category, id, name));
    }
  };

  return (
    <div className="w-full h-52 sm:h-56 bg-stone-900 relative overflow-hidden group">
      <img
        src={currentSrc}
        alt={name}
        referrerPolicy="no-referrer"
        onError={handleError}
        className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-108 filter brightness-[0.98] contrast-[1.02]"
        loading="lazy"
      />
      {/* Subtle photorealistic gradient scrim for depth and readability */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent pointer-events-none" />
      
      {/* Real photo quality indicator badge */}
      <div className="absolute bottom-2.5 right-2.5 px-2 py-0.5 rounded-md bg-black/60 backdrop-blur-xs text-[10px] font-mono font-medium text-stone-200 border border-white/10 pointer-events-none">
        Deekei Kitchen
      </div>
    </div>
  );
}
