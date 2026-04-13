// ============================================
// Avatar Component
// ============================================

/**
 * Displays a user avatar with initials fallback.
 */
export function Avatar({ initials, src, size = 40, color = 'var(--navy-600)' }) {
  const style = `
    width:${size}px; height:${size}px; border-radius:50%;
    background:${color}; display:flex; align-items:center; justify-content:center;
    font-family:var(--font-display); font-weight:700;
    font-size:${Math.round(size * 0.36)}px; color:#fff; flex-shrink:0;
    overflow:hidden; border:2px solid rgba(255,255,255,0.15);
  `;
  if (src) {
    return (
      <div style={style}>
        <img src={src} alt={initials} style="width:100%;height:100%;object-fit:cover;" />
      </div>
    );
  }
  return <div style={style}>{initials}</div>;
}

export default Avatar;
