// ============================================
// Icons Component — SVG icon library
// ============================================

/**
 * Unified SVG icon component.
 * @param {string} name - icon identifier
 * @param {number} size - pixel size (default 20)
 * @param {string} color - CSS color (default 'currentColor')
 */
export function Icon({ name, size = 20, color = 'currentColor', style = '' }) {
  const s = `width:${size}px;height:${size}px;flex-shrink:0;${style}`;

  const icons = {
    home: () => (
      <svg viewBox="0 0 24 24" fill="none" stroke={color} stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" style={s}>
        <path d="M3 9.5L12 3l9 6.5V20a1 1 0 01-1 1H4a1 1 0 01-1-1V9.5z"/>
        <path d="M9 21V12h6v9"/>
      </svg>
    ),
    newspaper: () => (
      <svg viewBox="0 0 24 24" fill="none" stroke={color} stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" style={s}>
        <path d="M4 22h16a2 2 0 002-2V4a2 2 0 00-2-2H8a2 2 0 00-2 2v16a2 2 0 01-2 2zm0 0a2 2 0 01-2-2v-9c0-1.1.9-2 2-2h2"/>
        <path d="M18 14h-8M15 18h-5M10 6h8v4h-8z"/>
      </svg>
    ),
    user: () => (
      <svg viewBox="0 0 24 24" fill="none" stroke={color} stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" style={s}>
        <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/>
        <circle cx="12" cy="7" r="4"/>
      </svg>
    ),
    calendar: () => (
      <svg viewBox="0 0 24 24" fill="none" stroke={color} stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" style={s}>
        <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
        <line x1="16" y1="2" x2="16" y2="6"/>
        <line x1="8" y1="2" x2="8" y2="6"/>
        <line x1="3" y1="10" x2="21" y2="10"/>
      </svg>
    ),
    network: () => (
      <svg viewBox="0 0 24 24" fill="none" stroke={color} stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" style={s}>
        <rect x="2" y="7" width="6" height="6" rx="1"/>
        <rect x="16" y="3" width="6" height="6" rx="1"/>
        <rect x="16" y="15" width="6" height="6" rx="1"/>
        <path d="M8 10h4M12 6v12M12 18h4M12 6h4"/>
      </svg>
    ),
    'file-text': () => (
      <svg viewBox="0 0 24 24" fill="none" stroke={color} stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" style={s}>
        <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/>
        <polyline points="14,2 14,8 20,8"/>
        <line x1="16" y1="13" x2="8" y2="13"/>
        <line x1="16" y1="17" x2="8" y2="17"/>
        <polyline points="10,9 9,9 8,9"/>
      </svg>
    ),
    briefcase: () => (
      <svg viewBox="0 0 24 24" fill="none" stroke={color} stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" style={s}>
        <rect x="2" y="7" width="20" height="14" rx="2" ry="2"/>
        <path d="M16 21V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v16"/>
      </svg>
    ),
    'trending-up': () => (
      <svg viewBox="0 0 24 24" fill="none" stroke={color} stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" style={s}>
        <polyline points="23,6 13.5,15.5 8.5,10.5 1,18"/>
        <polyline points="17,6 23,6 23,12"/>
      </svg>
    ),
    heart: () => (
      <svg viewBox="0 0 24 24" fill="none" stroke={color} stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" style={s}>
        <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"/>
      </svg>
    ),
    bell: () => (
      <svg viewBox="0 0 24 24" fill="none" stroke={color} stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" style={s}>
        <path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9"/>
        <path d="M13.73 21a2 2 0 01-3.46 0"/>
      </svg>
    ),
    'chevron-left': () => (
      <svg viewBox="0 0 24 24" fill="none" stroke={color} stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style={s}>
        <polyline points="15,18 9,12 15,6"/>
      </svg>
    ),
    'chevron-right': () => (
      <svg viewBox="0 0 24 24" fill="none" stroke={color} stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style={s}>
        <polyline points="9,18 15,12 9,6"/>
      </svg>
    ),
    'chevron-down': () => (
      <svg viewBox="0 0 24 24" fill="none" stroke={color} stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style={s}>
        <polyline points="6,9 12,15 18,9"/>
      </svg>
    ),
    x: () => (
      <svg viewBox="0 0 24 24" fill="none" stroke={color} stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style={s}>
        <line x1="18" y1="6" x2="6" y2="18"/>
        <line x1="6" y1="6" x2="18" y2="18"/>
      </svg>
    ),
    menu: () => (
      <svg viewBox="0 0 24 24" fill="none" stroke={color} stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style={s}>
        <line x1="3" y1="6" x2="21" y2="6"/>
        <line x1="3" y1="12" x2="21" y2="12"/>
        <line x1="3" y1="18" x2="21" y2="18"/>
      </svg>
    ),
    search: () => (
      <svg viewBox="0 0 24 24" fill="none" stroke={color} stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" style={s}>
        <circle cx="11" cy="11" r="8"/>
        <line x1="21" y1="21" x2="16.65" y2="16.65"/>
      </svg>
    ),
    edit: () => (
      <svg viewBox="0 0 24 24" fill="none" stroke={color} stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" style={s}>
        <path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7"/>
        <path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z"/>
      </svg>
    ),
    trash: () => (
      <svg viewBox="0 0 24 24" fill="none" stroke={color} stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" style={s}>
        <polyline points="3,6 5,6 21,6"/>
        <path d="M19 6l-1 14a2 2 0 01-2 2H8a2 2 0 01-2-2L5 6"/>
        <path d="M10 11v6M14 11v6"/>
        <path d="M9 6V4a1 1 0 011-1h4a1 1 0 011 1v2"/>
      </svg>
    ),
    plus: () => (
      <svg viewBox="0 0 24 24" fill="none" stroke={color} stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style={s}>
        <line x1="12" y1="5" x2="12" y2="19"/>
        <line x1="5" y1="12" x2="19" y2="12"/>
      </svg>
    ),
    mail: () => (
      <svg viewBox="0 0 24 24" fill="none" stroke={color} stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" style={s}>
        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
        <polyline points="22,6 12,13 2,6"/>
      </svg>
    ),
    phone: () => (
      <svg viewBox="0 0 24 24" fill="none" stroke={color} stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" style={s}>
        <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81 19.79 19.79 0 01.07 1.21 2 2 0 012.06 0h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z"/>
      </svg>
    ),
    'map-pin': () => (
      <svg viewBox="0 0 24 24" fill="none" stroke={color} stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" style={s}>
        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/>
        <circle cx="12" cy="10" r="3"/>
      </svg>
    ),
    clock: () => (
      <svg viewBox="0 0 24 24" fill="none" stroke={color} stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" style={s}>
        <circle cx="12" cy="12" r="10"/>
        <polyline points="12,6 12,12 16,14"/>
      </svg>
    ),
    star: () => (
      <svg viewBox="0 0 24 24" fill={color} stroke={color} stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" style={s}>
        <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26"/>
      </svg>
    ),
    award: () => (
      <svg viewBox="0 0 24 24" fill="none" stroke={color} stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" style={s}>
        <circle cx="12" cy="8" r="7"/>
        <polyline points="8.21,13.89 7,23 12,20 17,23 15.79,13.88"/>
      </svg>
    ),
    'graduation-cap': () => (
      <svg viewBox="0 0 24 24" fill="none" stroke={color} stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" style={s}>
        <path d="M22 10v6M2 10l10-5 10 5-10 5z"/>
        <path d="M6 12v5c3 3 9 3 12 0v-5"/>
      </svg>
    ),
    settings: () => (
      <svg viewBox="0 0 24 24" fill="none" stroke={color} stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" style={s}>
        <circle cx="12" cy="12" r="3"/>
        <path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-2 2 2 2 0 01-2-2v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 01-2-2 2 2 0 012-2h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 012.83-2.83l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 012-2 2 2 0 012 2v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 012 2 2 2 0 01-2 2h-.09a1.65 1.65 0 00-1.51 1z"/>
      </svg>
    ),
    'log-out': () => (
      <svg viewBox="0 0 24 24" fill="none" stroke={color} stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" style={s}>
        <path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4"/>
        <polyline points="16,17 21,12 16,7"/>
        <line x1="21" y1="12" x2="9" y2="12"/>
      </svg>
    ),
    send: () => (
      <svg viewBox="0 0 24 24" fill="none" stroke={color} stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" style={s}>
        <line x1="22" y1="2" x2="11" y2="13"/>
        <polygon points="22,2 15,22 11,13 2,9"/>
      </svg>
    ),
    paperclip: () => (
      <svg viewBox="0 0 24 24" fill="none" stroke={color} stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" style={s}>
        <path d="M21.44 11.05l-9.19 9.19a6 6 0 01-8.49-8.49l9.19-9.19a4 4 0 015.66 5.66l-9.2 9.19a2 2 0 01-2.83-2.83l8.49-8.48"/>
      </svg>
    ),
    'check-circle': () => (
      <svg viewBox="0 0 24 24" fill="none" stroke={color} stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" style={s}>
        <path d="M22 11.08V12a10 10 0 11-5.93-9.14"/>
        <polyline points="22,4 12,14.01 9,11.01"/>
      </svg>
    ),
    info: () => (
      <svg viewBox="0 0 24 24" fill="none" stroke={color} stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" style={s}>
        <circle cx="12" cy="12" r="10"/>
        <line x1="12" y1="16" x2="12" y2="12"/>
        <line x1="12" y1="8" x2="12.01" y2="8"/>
      </svg>
    ),
    share: () => (
      <svg viewBox="0 0 24 24" fill="none" stroke={color} stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" style={s}>
        <circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/>
        <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/>
        <line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/>
      </svg>
    ),
    bookmark: () => (
      <svg viewBox="0 0 24 24" fill="none" stroke={color} stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" style={s}>
        <path d="M19 21l-7-5-7 5V5a2 2 0 012-2h10a2 2 0 012 2z"/>
      </svg>
    ),
    eye: () => (
      <svg viewBox="0 0 24 24" fill="none" stroke={color} stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" style={s}>
        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
        <circle cx="12" cy="12" r="3"/>
      </svg>
    ),
    'eye-off': () => (
      <svg viewBox="0 0 24 24" fill="none" stroke={color} stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" style={s}>
        <path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19m-6.72-1.07a3 3 0 11-4.24-4.24"/>
        <line x1="1" y1="1" x2="23" y2="23"/>
      </svg>
    ),
    'users': () => (
      <svg viewBox="0 0 24 24" fill="none" stroke={color} stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" style={s}>
        <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/>
        <circle cx="9" cy="7" r="4"/>
        <path d="M23 21v-2a4 4 0 00-3-3.87"/>
        <path d="M16 3.13a4 4 0 010 7.75"/>
      </svg>
    ),
    file: () => (
      <svg viewBox="0 0 24 24" fill="none" stroke={color} stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" style={s}>
        <path d="M13 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V9z"/>
        <polyline points="13,2 13,9 20,9"/>
      </svg>
    ),
    'message-circle': () => (
      <svg viewBox="0 0 24 24" fill="none" stroke={color} stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" style={s}>
        <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/>
      </svg>
    ),
    'more-vertical': () => (
      <svg viewBox="0 0 24 24" fill="none" stroke={color} stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style={s}>
        <circle cx="12" cy="5" r="1" fill={color}/><circle cx="12" cy="12" r="1" fill={color}/><circle cx="12" cy="19" r="1" fill={color}/>
      </svg>
    ),
    'check': () => (
      <svg viewBox="0 0 24 24" fill="none" stroke={color} stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" style={s}>
        <polyline points="20,6 9,17 4,12"/>
      </svg>
    ),
  };

  const renderFn = icons[name];
  if (!renderFn) {
    return <span style={`display:inline-block;${s}background:#8893b8;border-radius:3px;`}/>;
  }
  return renderFn();
}

export default Icon;
