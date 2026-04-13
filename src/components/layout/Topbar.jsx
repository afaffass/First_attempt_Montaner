// ============================================
// Topbar Component — App Header
// ============================================
import { Show } from 'solid-js';
import { Icon } from '../ui/Icons.jsx';

/**
 * Top navigation bar with menu toggle, logo, and notifications bell.
 */
export function Topbar({ onMenuClick, onNotificationsClick, unreadCount, title }) {
  return (
    <header style={`
      position: sticky; top: 0; z-index: 50;
      height: var(--topbar-height);
      background: var(--navy-900);
      border-bottom: 1px solid rgba(255,255,255,0.07);
      display: flex; align-items: center;
      padding: 0 20px; gap: 16px;
      backdrop-filter: blur(12px);
    `}>
      {/* Menu Button */}
      <button
        onClick={onMenuClick}
        style="background:rgba(255,255,255,0.08);border:none;border-radius:var(--radius-md);width:38px;height:38px;display:flex;align-items:center;justify-content:center;cursor:pointer;color:rgba(255,255,255,0.8);transition:all 150ms;flex-shrink:0;"
        onMouseEnter={e => e.currentTarget.style.background='rgba(255,255,255,0.14)'}
        onMouseLeave={e => e.currentTarget.style.background='rgba(255,255,255,0.08)'}
      >
        <Icon name="menu" size={18} />
      </button>

      {/* Logo / Title */}
      <div style="display:flex;align-items:center;gap:10px;flex:1;">
        <div style="width:32px;height:32px;background:rgba(255,255,255,0.1);border-radius:50%;display:flex;align-items:center;justify-content:center;">
          <svg viewBox="0 0 32 32" width="32" height="32">
            <text x="16" y="22" text-anchor="middle" font-size="16" fill="#d4a017" font-family="serif" font-weight="bold">A</text>
          </svg>
        </div>
        <Show when={title}>
          <span style="font-family:var(--font-display);font-weight:600;font-size:var(--text-base);color:#fff;">{title}</span>
        </Show>
      </div>

      {/* Notifications */}
      <button
        onClick={onNotificationsClick}
        style="position:relative;background:rgba(255,255,255,0.08);border:none;border-radius:var(--radius-md);width:38px;height:38px;display:flex;align-items:center;justify-content:center;cursor:pointer;color:rgba(255,255,255,0.8);transition:all 150ms;flex-shrink:0;"
        onMouseEnter={e => e.currentTarget.style.background='rgba(255,255,255,0.14)'}
        onMouseLeave={e => e.currentTarget.style.background='rgba(255,255,255,0.08)'}
      >
        <Icon name="bell" size={18} />
        <Show when={unreadCount > 0}>
          <span style={`
            position:absolute;top:6px;right:6px;
            width:8px;height:8px;border-radius:50%;
            background:var(--gold-400);
            border:2px solid var(--navy-900);
          `} />
        </Show>
      </button>
    </header>
  );
}

export default Topbar;
