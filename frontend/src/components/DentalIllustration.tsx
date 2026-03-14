// Dental clinic themed SVG illustrations

export const DentalChair = ({ className = "w-64 h-64" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Dental Chair Base */}
    <rect x="85" y="160" width="30" height="20" rx="2" fill="#6B7280" />
    <rect x="80" y="140" width="40" height="20" rx="4" fill="#9CA3AF" />

    {/* Chair Seat */}
    <path d="M60 110 Q65 95 90 95 L110 95 Q135 95 140 110 L140 140 L60 140 Z" fill="#0EA5E9" />
    <ellipse cx="100" cy="110" rx="42" ry="8" fill="#0284C7" opacity="0.5" />

    {/* Chair Back */}
    <path d="M70 95 Q68 75 75 60 L125 60 Q132 75 130 95" fill="#0EA5E9" />
    <rect x="75" y="55" width="50" height="10" rx="5" fill="#0284C7" />

    {/* Armrests */}
    <rect x="45" y="110" width="10" height="30" rx="3" fill="#0EA5E9" />
    <rect x="145" y="110" width="10" height="30" rx="3" fill="#0EA5E9" />

    {/* Dental Light */}
    <line x1="150" y1="40" x2="150" y2="10" stroke="#9CA3AF" strokeWidth="3" />
    <circle cx="150" cy="35" r="15" fill="#FCD34D" opacity="0.8" />
    <circle cx="150" cy="35" r="12" fill="#FDE68A" />

    {/* Light rays */}
    <line x1="150" y1="50" x2="150" y2="70" stroke="#FDE68A" strokeWidth="2" opacity="0.4" />
    <line x1="140" y1="45" x2="130" y2="65" stroke="#FDE68A" strokeWidth="2" opacity="0.4" />
    <line x1="160" y1="45" x2="170" y2="65" stroke="#FDE68A" strokeWidth="2" opacity="0.4" />
  </svg>
);

export const DentalTools = ({ className = "w-48 h-48" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Mirror */}
    <circle cx="60" cy="80" r="25" fill="#E0F2FE" stroke="#0EA5E9" strokeWidth="3" />
    <circle cx="60" cy="80" r="20" fill="#F0F9FF" />
    <line x1="60" y1="105" x2="60" y2="160" stroke="#6B7280" strokeWidth="4" />
    <rect x="55" y="155" width="10" height="8" rx="2" fill="#9CA3AF" />

    {/* Explorer */}
    <line x1="100" y1="160" x2="100" y2="60" stroke="#6B7280" strokeWidth="3" />
    <path d="M100 60 Q105 50 100 45 Q95 50 100 60" fill="#9CA3AF" />
    <rect x="95" y="155" width="10" height="8" rx="2" fill="#9CA3AF" />

    {/* Scaler */}
    <line x1="140" y1="160" x2="145" y2="55" stroke="#6B7280" strokeWidth="3" />
    <path d="M145 55 L150 50 L145 45 Z" fill="#9CA3AF" />
    <rect x="135" y="155" width="10" height="8" rx="2" fill="#9CA3AF" />

    {/* Tray */}
    <rect x="30" y="170" width="140" height="4" rx="2" fill="#D1D5DB" />
    <rect x="30" y="174" width="140" height="15" rx="3" fill="#E5E7EB" />
  </svg>
);

export const ToothHealthy = ({ className = "w-32 h-32" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Healthy Tooth */}
    <path
      d="M50 15C40 15 32 22 32 32C32 40 30 48 30 56C30 64 34 72 40 72C44 72 46 68 48 64C49 61 49.5 60 50 60C50.5 60 51 61 52 64C54 68 56 72 60 72C66 72 70 64 70 56C70 48 68 40 68 32C68 22 60 15 50 15Z"
      fill="white"
      stroke="#0EA5E9"
      strokeWidth="2"
    />
    {/* Sparkle */}
    <circle cx="42" cy="28" r="3" fill="#FCD34D" />
    <circle cx="50" cy="24" r="2" fill="#FDE68A" />
    <circle cx="58" cy="30" r="2.5" fill="#FCD34D" />

    {/* Shine lines */}
    <line x1="35" y1="25" x2="32" y2="22" stroke="#FCD34D" strokeWidth="2" strokeLinecap="round" />
    <line x1="35" y1="35" x2="30" y2="35" stroke="#FDE68A" strokeWidth="2" strokeLinecap="round" />

    {/* Happy face */}
    <circle cx="42" cy="40" r="2" fill="#0EA5E9" />
    <circle cx="58" cy="40" r="2" fill="#0EA5E9" />
    <path d="M40 50 Q50 55 60 50" stroke="#0EA5E9" strokeWidth="2" strokeLinecap="round" fill="none" />
  </svg>
);

export const DentalClinic = ({ className = "w-full h-64" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 400 200" fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Background */}
    <rect width="400" height="200" fill="#F0F9FF" />

    {/* Building */}
    <rect x="50" y="80" width="300" height="120" fill="#E0F2FE" />
    <rect x="50" y="80" width="300" height="10" fill="#0EA5E9" />

    {/* Windows */}
    {[0, 1, 2, 3, 4].map((i) => (
      <g key={i}>
        <rect x={80 + i * 60} y="110" width="40" height="40" rx="2" fill="#BAE6FD" stroke="#0EA5E9" strokeWidth="2" />
        <line x1={100 + i * 60} y1="110" x2={100 + i * 60} y2="150" stroke="#0EA5E9" strokeWidth="2" />
        <line x1={80 + i * 60} y1="130" x2={120 + i * 60} y2="130" stroke="#0EA5E9" strokeWidth="2" />
      </g>
    ))}

    {/* Door */}
    <rect x="180" y="150" width="40" height="50" rx="3" fill="#0284C7" />
    <circle cx="210" cy="175" r="3" fill="#FCD34D" />

    {/* Sign */}
    <rect x="140" y="50" width="120" height="25" rx="3" fill="#0EA5E9" />
    <text x="200" y="67" fill="white" fontSize="14" fontWeight="bold" textAnchor="middle">DentBridge</text>

    {/* Tooth Logo on building */}
    <circle cx="200" cy="105" r="12" fill="white" />
    <path d="M200 98 Q197 98 197 100 Q197 102 197 104 Q197 108 200 108 Q203 108 203 104 Q203 102 203 100 Q203 98 200 98Z" fill="#0EA5E9" />

    {/* Ground */}
    <rect x="0" y="190" width="400" height="10" fill="#93C5FD" />

    {/* Trees */}
    <circle cx="25" cy="160" r="20" fill="#86EFAC" />
    <rect x="20" y="160" width="10" height="30" fill="#65A30D" />
    <circle cx="375" cy="160" r="20" fill="#86EFAC" />
    <rect x="370" y="160" width="10" height="30" fill="#65A30D" />
  </svg>
);

export const AppointmentCalendar = ({ className = "w-48 h-48" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Calendar */}
    <rect x="40" y="40" width="120" height="140" rx="8" fill="white" stroke="#0EA5E9" strokeWidth="3" />

    {/* Header */}
    <rect x="40" y="40" width="120" height="30" rx="8" fill="#0EA5E9" />
    <rect x="40" y="55" width="120" height="30" fill="#0EA5E9" />

    {/* Rings */}
    <circle cx="70" cy="45" r="5" fill="#0284C7" stroke="#E0F2FE" strokeWidth="2" />
    <circle cx="100" cy="45" r="5" fill="#0284C7" stroke="#E0F2FE" strokeWidth="2" />
    <circle cx="130" cy="45" r="5" fill="#0284C7" stroke="#E0F2FE" strokeWidth="2" />

    {/* Days */}
    <line x1="40" y1="95" x2="160" y2="95" stroke="#BAE6FD" strokeWidth="2" />

    {/* Date numbers */}
    {[1, 2, 3, 4, 5].map((row) =>
      [1, 2, 3, 4, 5].map((col) => (
        <rect
          key={`${row}-${col}`}
          x={45 + col * 22}
          y={85 + row * 22}
          width="18"
          height="18"
          rx="2"
          fill={row === 2 && col === 3 ? "#0EA5E9" : "#F0F9FF"}
        />
      ))
    )}

    {/* Checkmark on selected date */}
    <path d="M 110 118 L 113 121 L 118 113" stroke="white" strokeWidth="2" strokeLinecap="round" fill="none" />
  </svg>
);

export const PatientRecord = ({ className = "w-48 h-48" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Clipboard */}
    <rect x="50" y="30" width="100" height="150" rx="5" fill="white" stroke="#0EA5E9" strokeWidth="3" />

    {/* Clip */}
    <rect x="85" y="20" width="30" height="15" rx="3" fill="#0EA5E9" />
    <rect x="90" y="25" width="20" height="8" rx="2" fill="#E0F2FE" />

    {/* Patient icon */}
    <circle cx="100" cy="70" r="15" fill="#BAE6FD" />
    <path d="M 75 110 Q 75 90 100 90 Q 125 90 125 110 Z" fill="#BAE6FD" />

    {/* Lines for text */}
    <line x1="70" y1="125" x2="130" y2="125" stroke="#0EA5E9" strokeWidth="2" />
    <line x1="70" y1="135" x2="130" y2="135" stroke="#BAE6FD" strokeWidth="2" />
    <line x1="70" y1="145" x2="110" y2="145" stroke="#BAE6FD" strokeWidth="2" />
    <line x1="70" y1="155" x2="130" y2="155" stroke="#BAE6FD" strokeWidth="2" />
    <line x1="70" y1="165" x2="120" y2="165" stroke="#BAE6FD" strokeWidth="2" />
  </svg>
);
