/** Classic white smiley — black line art matching the attached reference. */
export function SmileyFace({ className = "" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 200 200"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <circle cx="100" cy="100" r="88" fill="#ffffff" stroke="#000000" strokeWidth="7" />
      {/* vertical oval eyes */}
      <ellipse cx="70" cy="82" rx="11" ry="16" fill="#000000" />
      <ellipse cx="130" cy="82" rx="11" ry="16" fill="#000000" />
      {/* smile with cheek ticks */}
      <path
        d="M58 118 Q100 158 142 118"
        stroke="#000000"
        strokeWidth="7"
        strokeLinecap="round"
        fill="none"
      />
      <path d="M58 118 L50 108" stroke="#000000" strokeWidth="7" strokeLinecap="round" />
      <path d="M142 118 L150 108" stroke="#000000" strokeWidth="7" strokeLinecap="round" />
    </svg>
  );
}

type DemonFaceProps = {
  className?: string;
  /** Face/skin fill — animates white → red */
  fill?: string;
  laughing?: boolean;
};

/** Hannya-style demon line art matching the attached reference. */
export function DemonFace({
  className = "",
  fill = "#ffffff",
  laughing = false,
}: DemonFaceProps) {
  return (
    <svg
      className={className}
      viewBox="0 0 240 260"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      {/* horns */}
      <path
        d="M68 78 C48 18 78 8 92 62"
        stroke="#000"
        strokeWidth="6"
        strokeLinecap="round"
        fill={fill}
      />
      <path
        d="M172 78 C192 18 162 8 148 62"
        stroke="#000"
        strokeWidth="6"
        strokeLinecap="round"
        fill={fill}
      />
      <path d="M68 78 C58 40 72 28 82 58" fill="#000" opacity="0.15" />
      <path d="M172 78 C182 40 168 28 158 58" fill="#000" opacity="0.15" />

      {/* ears */}
      <path
        d="M52 110 L28 100 L42 138 Z"
        fill={fill}
        stroke="#000"
        strokeWidth="5"
        strokeLinejoin="round"
      />
      <path
        d="M188 110 L212 100 L198 138 Z"
        fill={fill}
        stroke="#000"
        strokeWidth="5"
        strokeLinejoin="round"
      />

      {/* face */}
      <path
        d="M70 72
           C55 95 48 125 55 155
           C62 185 85 215 120 228
           C155 215 178 185 185 155
           C192 125 185 95 170 72
           C155 55 135 48 120 48
           C105 48 85 55 70 72 Z"
        fill={fill}
        stroke="#000"
        strokeWidth="5.5"
        strokeLinejoin="round"
      />

      {/* furrowed brow ridges */}
      <path
        d="M62 95 C85 78 105 82 112 98"
        stroke="#000"
        strokeWidth="5"
        strokeLinecap="round"
        fill="none"
      />
      <path
        d="M178 95 C155 78 135 82 128 98"
        stroke="#000"
        strokeWidth="5"
        strokeLinecap="round"
        fill="none"
      />
      <path d="M95 88 L112 98" stroke="#000" strokeWidth="4" strokeLinecap="round" />
      <path d="M145 88 L128 98" stroke="#000" strokeWidth="4" strokeLinecap="round" />
      {/* anger lines */}
      <path d="M78 78 L88 88" stroke="#000" strokeWidth="3.5" strokeLinecap="round" />
      <path d="M162 78 L152 88" stroke="#000" strokeWidth="3.5" strokeLinecap="round" />

      {/* almond eyes — hollow white stare */}
      <path
        d="M68 112 C78 102 98 102 108 114 C98 120 78 120 68 112 Z"
        fill="#fff"
        stroke="#000"
        strokeWidth="4.5"
        strokeLinejoin="round"
      />
      <path
        d="M172 112 C162 102 142 102 132 114 C142 120 162 120 172 112 Z"
        fill="#fff"
        stroke="#000"
        strokeWidth="4.5"
        strokeLinejoin="round"
      />
      {/* under-eye shadow wedges */}
      <path d="M70 116 L105 122 L72 124 Z" fill="#000" />
      <path d="M170 116 L135 122 L168 124 Z" fill="#000" />

      {/* sharp nose */}
      <path
        d="M120 118 L108 148 L120 145 L132 148 Z"
        fill={fill}
        stroke="#000"
        strokeWidth="4"
        strokeLinejoin="round"
      />
      <path d="M112 148 Q120 154 128 148" stroke="#000" strokeWidth="3" fill="none" />

      {/* cheekbones */}
      <path d="M58 140 C72 150 78 158 74 168" stroke="#000" strokeWidth="3.5" fill="none" />
      <path d="M182 140 C168 150 162 158 166 168" stroke="#000" strokeWidth="3.5" fill="none" />

      {/* mouth — wide sinister grin */}
      <g className={laughing ? "demon-jaw" : undefined}>
        <path
          d={
            laughing
              ? "M70 168 C90 158 150 158 170 168 C165 205 140 218 120 220 C100 218 75 205 70 168 Z"
              : "M74 170 C92 160 148 160 166 170 C160 198 140 208 120 210 C100 208 80 198 74 170 Z"
          }
          fill="#000"
          stroke="#000"
          strokeWidth="4"
          strokeLinejoin="round"
        >
          {laughing && (
            <animate
              attributeName="d"
              dur="0.32s"
              repeatCount="indefinite"
              values="
                M74 170 C92 160 148 160 166 170 C160 198 140 208 120 210 C100 208 80 198 74 170 Z;
                M68 166 C90 154 150 154 172 166 C168 214 142 228 120 232 C98 228 72 214 68 166 Z;
                M74 170 C92 160 148 160 166 170 C160 198 140 208 120 210 C100 208 80 198 74 170 Z
              "
            />
          )}
        </path>

        {/* upper fangs */}
        <path d="M92 172 L98 196 L104 172" fill={fill} stroke="#000" strokeWidth="2.5" />
        <path d="M136 172 L142 196 L148 172" fill={fill} stroke="#000" strokeWidth="2.5" />
        {/* lower fangs */}
        <path d="M108 206 L114 188 L120 206" fill={fill} stroke="#000" strokeWidth="2.5" />
        <path
          d="M120 206 L126 188 L132 206"
          fill={fill}
          stroke="#000"
          strokeWidth="2.5"
        />
      </g>

      {/* chin point */}
      <path d="M108 220 L120 232 L132 220" stroke="#000" strokeWidth="4" fill="none" strokeLinejoin="round" />
    </svg>
  );
}
