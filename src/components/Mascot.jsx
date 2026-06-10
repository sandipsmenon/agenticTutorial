// Neuro — the cartoon robot guide. Pure SVG + CSS animations.
// moods: happy | excited | thinking | explaining | celebrating | proud | shocked | worried | wink
// accessory: 'goggles' (labs) | 'gradcap' (certificate)
export default function Mascot({ mood = 'happy', size = 180, accessory = null }) {
  const isThinking = mood === 'thinking'
  const isExcited = mood === 'excited' || mood === 'celebrating'
  const isCelebrating = mood === 'celebrating'
  const isShocked = mood === 'shocked'
  const isWorried = mood === 'worried'
  const isProud = mood === 'proud'
  const isWink = mood === 'wink'

  const bulbColor = isShocked ? '#ff5f57' : isThinking ? '#ffd166' : isWorried ? '#ffa94d' : '#ff7eb9'
  const heartColor = isExcited || isProud ? '#ff7eb9' : isShocked ? '#ffd166' : '#9be8a8'

  return (
    <div className={`mascot mascot-${mood}`} style={{ width: size, height: size * 1.15 }}>
      <svg viewBox="0 0 200 230" width="100%" height="100%" aria-label={`Neuro the robot, feeling ${mood}`}>
        {/* shadow */}
        <ellipse className="mascot-shadow" cx="100" cy="218" rx="52" ry="9" fill="rgba(30,20,70,0.18)" />

        <g className="mascot-body-group">
          {/* legs */}
          <rect x="74" y="178" width="16" height="26" rx="8" fill="#5b51d8" />
          <rect x="110" y="178" width="16" height="26" rx="8" fill="#5b51d8" />
          <ellipse cx="82" cy="206" rx="14" ry="8" fill="#3d35a3" />
          <ellipse cx="118" cy="206" rx="14" ry="8" fill="#3d35a3" />

          {/* left arm */}
          <g className={isCelebrating ? 'mascot-arm-wave' : ''} style={{ transformOrigin: '52px 130px' }}>
            <rect x="38" y="124" width="18" height="40" rx="9" fill="#5b51d8" transform="rotate(20 47 144)" />
            <circle cx="36" cy="162" r="10" fill="#7c6ff0" />
          </g>
          {/* right arm — waves when happy/excited, raised fist when proud */}
          {isProud ? (
            <g>
              <rect x="144" y="100" width="18" height="44" rx="9" fill="#5b51d8" transform="rotate(-200 153 134)" />
              <circle cx="168" cy="92" r="11" fill="#7c6ff0" />
              <text x="158" y="78" fontSize="16">✨</text>
            </g>
          ) : (
            <g className={isExcited || mood === 'happy' ? 'mascot-arm-wave' : ''} style={{ transformOrigin: '148px 130px' }}>
              <rect x="144" y="124" width="18" height="40" rx="9" fill="#5b51d8" transform="rotate(-160 153 144)" />
              <circle cx="164" cy="112" r="10" fill="#7c6ff0" />
            </g>
          )}

          {/* torso — puffed out when proud */}
          <rect x="58" y="118" width="84" height="68" rx="22" fill="#6c5ce7" transform={isProud ? 'scale(1.04) translate(-4 -3)' : undefined} />
          <rect x="70" y="132" width="60" height="38" rx="12" fill="#4a3fd1" />
          {/* chest screen: heart that beats */}
          <path
            className="mascot-heart"
            d="M100 158 q-12 -14 -2 -20 q8 -4 8 4 q0 -8 8 -4 q10 6 -2 20 q-6 6 -12 0z"
            transform="translate(-6 -6)"
            fill={heartColor}
          />

          {/* head */}
          <g className="mascot-head">
            {/* antenna */}
            <line x1="100" y1="44" x2="100" y2="26" stroke="#5b51d8" strokeWidth="5" strokeLinecap="round" />
            <circle className="mascot-antenna-bulb" cx="100" cy="20" r="8" fill={bulbColor} />

            <rect x="52" y="42" width="96" height="78" rx="30" fill="#8d7ff5" />
            <rect x="62" y="54" width="76" height="54" rx="20" fill="#2d2a5e" />

            {/* eyes */}
            {isThinking ? (
              <>
                <circle className="mascot-eye" cx="84" cy="74" r="8" fill="#9be8ff" />
                <circle className="mascot-eye" cx="116" cy="74" r="8" fill="#9be8ff" />
                <circle cx="86" cy="71" r="3" fill="#fff" />
                <circle cx="118" cy="71" r="3" fill="#fff" />
              </>
            ) : isCelebrating ? (
              <>
                <text x="74" y="86" fontSize="22" fill="#ffd166">★</text>
                <text x="106" y="86" fontSize="22" fill="#ffd166">★</text>
              </>
            ) : isShocked ? (
              <>
                <circle cx="84" cy="78" r="12" fill="#fff" />
                <circle cx="116" cy="78" r="12" fill="#fff" />
                <circle cx="84" cy="78" r="5" fill="#2d2a5e" />
                <circle cx="116" cy="78" r="5" fill="#2d2a5e" />
              </>
            ) : isWorried ? (
              <>
                <line x1="74" y1="66" x2="92" y2="72" stroke="#9be8ff" strokeWidth="3.5" strokeLinecap="round" />
                <line x1="126" y1="66" x2="108" y2="72" stroke="#9be8ff" strokeWidth="3.5" strokeLinecap="round" />
                <circle cx="84" cy="81" r="8" fill="#9be8ff" />
                <circle cx="116" cy="81" r="8" fill="#9be8ff" />
              </>
            ) : isWink ? (
              <>
                <circle cx="84" cy="78" r="9" fill="#9be8ff" />
                <circle cx="87" cy="74" r="3.5" fill="#fff" />
                <path d="M108 78 q8 6 16 0" stroke="#9be8ff" strokeWidth="4" fill="none" strokeLinecap="round" />
              </>
            ) : (
              <g className="mascot-eye-blink">
                <circle cx="84" cy="78" r={isExcited || isProud ? 10 : 9} fill="#9be8ff" />
                <circle cx="116" cy="78" r={isExcited || isProud ? 10 : 9} fill="#9be8ff" />
                <circle cx="87" cy="74" r="3.5" fill="#fff" />
                <circle cx="119" cy="74" r="3.5" fill="#fff" />
              </g>
            )}

            {/* mouth */}
            {isThinking ? (
              <ellipse cx="100" cy="98" rx="6" ry="4" fill="#9be8ff" />
            ) : isShocked ? (
              <ellipse cx="100" cy="99" rx="8" ry="9" fill="#1c1a40" stroke="#9be8ff" strokeWidth="2.5" />
            ) : isWorried ? (
              <path d="M88 100 q12 -8 24 0" stroke="#9be8ff" strokeWidth="4" fill="none" strokeLinecap="round" />
            ) : isExcited ? (
              <path d="M86 94 q14 14 28 0 q-14 22 -28 0z" fill="#ff9ff3" />
            ) : isProud ? (
              <path d="M86 95 q14 12 28 0" stroke="#9be8ff" strokeWidth="5" fill="none" strokeLinecap="round" />
            ) : (
              <path d="M88 96 q12 10 24 0" stroke="#9be8ff" strokeWidth="4" fill="none" strokeLinecap="round" />
            )}

            {/* cheeks */}
            <circle cx="68" cy="92" r="5" fill="rgba(255,126,185,0.6)" />
            <circle cx="132" cy="92" r="5" fill="rgba(255,126,185,0.6)" />

            {/* ear bolts */}
            <circle cx="52" cy="80" r="7" fill="#5b51d8" />
            <circle cx="148" cy="80" r="7" fill="#5b51d8" />

            {/* accessories */}
            {accessory === 'goggles' && (
              <g>
                <rect x="56" y="48" width="88" height="8" rx="4" fill="#ffd166" />
                <circle cx="78" cy="50" r="13" fill="rgba(155,232,255,0.45)" stroke="#ffd166" strokeWidth="4" />
                <circle cx="122" cy="50" r="13" fill="rgba(155,232,255,0.45)" stroke="#ffd166" strokeWidth="4" />
              </g>
            )}
            {accessory === 'gradcap' && (
              <g>
                <polygon points="100,18 152,38 100,58 48,38" fill="#2d2a5e" />
                <rect x="84" y="44" width="32" height="12" rx="3" fill="#2d2a5e" />
                <line x1="148" y1="40" x2="152" y2="64" stroke="#ffd166" strokeWidth="3" />
                <circle cx="152" cy="68" r="5" fill="#ffd166" />
              </g>
            )}
          </g>
        </g>

        {/* thinking bubbles */}
        {isThinking && (
          <g className="mascot-think-dots">
            <circle cx="152" cy="46" r="4" fill="#cdc6ff" />
            <circle cx="162" cy="34" r="6" fill="#cdc6ff" />
            <circle cx="175" cy="19" r="8" fill="#cdc6ff" />
          </g>
        )}
        {/* worry sweat-drop */}
        {isWorried && <text x="148" y="40" fontSize="18">💧</text>}
      </svg>
    </div>
  )
}
