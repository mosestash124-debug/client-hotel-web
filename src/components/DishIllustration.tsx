import { useState } from 'react';

interface DishIllustrationProps {
  category: 'signatures' | 'bites' | 'pork' | 'staples' | 'drinks';
  id?: string;
  name: string;
  imageSrc?: string;
}

export function DishIllustration({ category, id, name, imageSrc }: DishIllustrationProps) {
  const [imageError, setImageError] = useState(false);

  // If a real photorealistic image is provided and hasn't errored, render it
  if (imageSrc && !imageError) {
    return (
      <div className="w-full h-48 sm:h-52 bg-stone-100 relative overflow-hidden group">
        <img
          src={imageSrc}
          alt={name}
          referrerPolicy="no-referrer"
          onError={() => setImageError(true)}
          className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-60" />
      </div>
    );
  }

  // Fallback to stylized SVG
  if (id === 'chapati-beef' || category === 'signatures') {
    return (
      <div className="w-full h-48 sm:h-52 bg-gradient-to-br from-amber-50 via-orange-50/60 to-stone-100 flex items-center justify-center relative overflow-hidden group">
        <svg viewBox="0 0 200 150" className="w-40 h-32 transition-transform duration-300 group-hover:scale-105" fill="none">
          <ellipse cx="100" cy="110" rx="80" ry="26" fill="#D4A373" opacity="0.35" />
          <ellipse cx="100" cy="106" rx="74" ry="22" fill="#E8D5B5" />
          <ellipse cx="120" cy="88" rx="42" ry="24" fill="#3D2619" />
          <ellipse cx="120" cy="85" rx="38" ry="20" fill="#8B3A14" />
          <ellipse cx="120" cy="83" rx="34" ry="17" fill="#A84318" />
          <circle cx="112" cy="82" r="7" fill="#582410" />
          <circle cx="128" cy="80" r="8" fill="#4A1E0C" />
          <circle cx="120" cy="87" r="6" fill="#692A13" />
          <circle cx="108" cy="86" r="4" fill="#E28743" />
          <circle cx="132" cy="84" r="3.5" fill="#E07A5F" />
          <path d="M116 78 C118 75 122 75 124 78 C122 80 118 80 116 78 Z" fill="#386641" />
          <path d="M124 81 C126 79 129 80 128 83 C126 84 123 83 124 81 Z" fill="#4B7F52" />
          <path d="M114 68 Q118 60 114 52" stroke="#FAF8F5" strokeWidth="2" strokeLinecap="round" opacity="0.75" />
          <path d="M125 66 Q129 58 126 48" stroke="#FAF8F5" strokeWidth="2" strokeLinecap="round" opacity="0.75" />
          <g transform="translate(42, 60)">
            <ellipse cx="28" cy="30" rx="30" ry="16" fill="#D99B4B" />
            <ellipse cx="28" cy="28" rx="28" ry="14" fill="#F4C57B" />
            <circle cx="20" cy="27" r="2.5" fill="#A46820" />
            <circle cx="34" cy="25" r="3" fill="#8F5617" />
            <circle cx="26" cy="32" r="2" fill="#B37527" />
            <circle cx="38" cy="30" r="1.8" fill="#995D1A" />
            <path d="M6 30 Q28 16 50 30 Q28 22 6 30" fill="#E5B262" stroke="#C48632" strokeWidth="0.8" />
            <path d="M10 24 Q30 12 48 24" stroke="#A96F25" strokeWidth="1" strokeLinecap="round" fill="none" opacity="0.6" />
          </g>
          <circle cx="58" cy="108" r="12" fill="#FAF8F5" stroke="#E2D9D2" strokeWidth="1.5" />
          <circle cx="55" cy="107" r="2.5" fill="#C93B2B" />
          <circle cx="61" cy="106" r="2" fill="#C93B2B" />
          <circle cx="58" cy="110" r="2.2" fill="#C93B2B" />
          <circle cx="56" cy="109" r="1.5" fill="#4B7F52" />
          <circle cx="60" cy="109" r="1.5" fill="#FAF8F5" />
        </svg>
      </div>
    );
  }

  if (category === 'bites' || id?.includes('samosa')) {
    return (
      <div className="w-full h-48 sm:h-52 bg-gradient-to-br from-amber-50 via-yellow-50/50 to-stone-100 flex items-center justify-center relative overflow-hidden group">
        <svg viewBox="0 0 200 150" className="w-40 h-32 transition-transform duration-300 group-hover:scale-105" fill="none">
          <ellipse cx="100" cy="115" rx="70" ry="20" fill="#C7B299" opacity="0.4" />
          <ellipse cx="100" cy="112" rx="66" ry="17" fill="#F4EAE1" stroke="#D3C5B4" strokeWidth="1.5" />
          <g transform="translate(60, 48)">
            <polygon points="35,12 8,62 62,62" fill="#D9822B" stroke="#B25900" strokeWidth="1.2" strokeLinejoin="round" />
            <polygon points="35,16 13,59 57,59" fill="#EFA94A" />
            <path d="M35 16 L35 59" stroke="#CF7C18" strokeWidth="1" opacity="0.5" />
            <circle cx="32" cy="40" r="2" fill="#994D00" />
            <circle cx="26" cy="50" r="2.5" fill="#994D00" />
            <circle cx="44" cy="45" r="2" fill="#803D00" />
          </g>
          <g transform="translate(95, 54)">
            <polygon points="30,10 6,55 54,55" fill="#C7711E" stroke="#9E4D00" strokeWidth="1.2" strokeLinejoin="round" />
            <polygon points="30,14 11,52 49,52" fill="#E59938" />
            <circle cx="28" cy="38" r="2" fill="#803D00" />
            <circle cx="22" cy="46" r="2" fill="#803D00" />
          </g>
          <path d="M68 116 Q78 106 86 116 Q76 122 68 116" fill="#8CB33E" stroke="#688F20" strokeWidth="1" />
        </svg>
      </div>
    );
  }

  if (category === 'pork') {
    return (
      <div className="w-full h-48 sm:h-52 bg-gradient-to-br from-orange-50 via-amber-50 to-stone-100 flex items-center justify-center relative overflow-hidden group">
        <svg viewBox="0 0 200 150" className="w-40 h-32 transition-transform duration-300 group-hover:scale-105" fill="none">
          <ellipse cx="100" cy="112" rx="76" ry="24" fill="#3A3835" />
          <ellipse cx="100" cy="108" rx="72" ry="20" fill="#4A4744" />
          <rect x="55" y="75" width="22" height="18" rx="4" fill="#8C3A27" />
          <rect x="74" y="70" width="24" height="20" rx="4" fill="#A8432A" />
          <rect x="68" y="86" width="22" height="16" rx="4" fill="#782E1E" />
          <rect x="88" y="78" width="24" height="20" rx="4" fill="#933722" />
          <path d="M115 76 Q128 72 138 80 Q126 84 115 76" fill="#E5A93C" stroke="#B87B14" strokeWidth="1" />
          <path d="M120 84 Q132 80 142 88 Q130 92 120 84" fill="#F4BC53" stroke="#B87B14" strokeWidth="1" />
          <path d="M112 90 Q124 88 135 96 Q123 100 112 90" fill="#E5A93C" stroke="#B87B14" strokeWidth="1" />
          <ellipse cx="102" cy="104" rx="20" ry="7" fill="#2D5A27" />
          <circle cx="98" cy="103" r="2" fill="#4B8243" />
          <circle cx="108" cy="105" r="2.5" fill="#4B8243" />
        </svg>
      </div>
    );
  }

  if (category === 'drinks') {
    return (
      <div className="w-full h-48 sm:h-52 bg-gradient-to-br from-amber-50 via-stone-50 to-orange-50 flex items-center justify-center relative overflow-hidden group">
        <svg viewBox="0 0 200 150" className="w-36 h-32 transition-transform duration-300 group-hover:scale-105" fill="none">
          <ellipse cx="100" cy="120" rx="36" ry="12" fill="#D3C3B1" opacity="0.6" />
          <ellipse cx="100" cy="116" rx="32" ry="9" fill="#EFE8DE" stroke="#CBB9A5" strokeWidth="1" />
          <path d="M82 66 L86 112 Q100 116 114 112 L118 66 Z" fill="#D98A52" />
          <ellipse cx="100" cy="66" rx="18" ry="6" fill="#A85724" />
          <ellipse cx="100" cy="66" rx="16" ry="4.5" fill="#C96B32" />
          <path d="M118 78 C128 78 128 98 116 100" stroke="#D98A52" strokeWidth="3" fill="none" strokeLinecap="round" />
          <path d="M96 52 Q92 42 98 34" stroke="#D3C3B1" strokeWidth="1.8" strokeLinecap="round" fill="none" opacity="0.8" />
          <path d="M104 50 Q108 40 102 32" stroke="#D3C3B1" strokeWidth="1.8" strokeLinecap="round" fill="none" opacity="0.8" />
        </svg>
      </div>
    );
  }

  // Staples fallback (Ugali)
  return (
    <div className="w-full h-48 sm:h-52 bg-gradient-to-br from-stone-50 via-amber-50/40 to-stone-100 flex items-center justify-center relative overflow-hidden group">
      <svg viewBox="0 0 200 150" className="w-40 h-32 transition-transform duration-300 group-hover:scale-105" fill="none">
        <ellipse cx="100" cy="114" rx="74" ry="22" fill="#D0C5B8" opacity="0.4" />
        <ellipse cx="100" cy="110" rx="70" ry="18" fill="#FBF8F3" stroke="#D9CEC1" strokeWidth="1.5" />
        <path d="M65 106 C62 82 82 65 100 65 C118 65 138 82 135 106 Z" fill="#F4EFE6" stroke="#DFD5C6" strokeWidth="1.2" />
        <ellipse cx="100" cy="74" rx="22" ry="7" fill="#FCFAF6" />
        <ellipse cx="68" cy="108" rx="16" ry="7" fill="#2E5A27" />
        <circle cx="65" cy="107" r="2" fill="#4B8243" />
        <circle cx="72" cy="109" r="2.5" fill="#4B8243" />
        <ellipse cx="132" cy="108" rx="18" ry="7" fill="#883515" />
        <circle cx="128" cy="107" r="3" fill="#582410" />
      </svg>
    </div>
  );
}
