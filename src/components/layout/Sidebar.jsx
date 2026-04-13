// ============================================
// Sidebar Component — Main Navigation
// ============================================
import { For, Show } from 'solid-js';
import { Icon } from '../ui/Icons.jsx';
import { Avatar } from '../ui/Avatar.jsx';
import { navItems, currentUser } from '../../data/mockData.js';

/**
 * Left sidebar navigation with nav items, user info, settings/signout.
 */
export function Sidebar({ activeScreen, onNavigate, isOpen, onClose }) {
  return (
    <>
      {/* Overlay for mobile */}
      <Show when={isOpen}>
        <div
          style="position:fixed;inset:0;background:rgba(0,0,0,0.6);z-index:99;backdrop-filter:blur(2px);"
          onClick={onClose}
        />
      </Show>

      <aside style={`
        position: fixed; top: 0; left: 0; height: 100vh;
        width: var(--sidebar-width);
        background: linear-gradient(180deg, #0d1240 0%, #111a5c 100%);
        border-right: 1px solid rgba(255,255,255,0.06);
        display: flex; flex-direction: column;
        z-index: 100;
        transition: transform var(--duration-base) var(--ease-out);
        transform: ${isOpen ? 'translateX(0)' : 'translateX(-100%)'};
      `}>
        {/* Header */}
        <div style="padding: 24px 20px 20px; display:flex; align-items:center; gap:14px; border-bottom:1px solid rgba(255,255,255,0.07);">
          <div style="width:44px;height:44px;border-radius:50%;background:rgba(255,255,255,0.12);display:flex;align-items:center;justify-content:center;flex-shrink:0;overflow:hidden;">
            <svg viewBox="0 0 44 44" width="44" height="44">
              <circle cx="22" cy="22" r="22" fill="rgba(255,255,255,0.05)"/>
              <text x="22" y="27" text-anchor="middle" font-size="18" fill="#d4a017" font-family="serif" font-weight="bold">A</text>
            </svg>
          </div>
          <div style="min-width:0;">
            <div style="font-family:var(--font-display);font-weight:700;font-size:var(--text-md);color:#fff;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">Alumni Portal</div>
            <div style="font-size:var(--text-xs);color:var(--navy-200);margin-top:1px;">Ateneo de Davao</div>
          </div>
          <button
            onClick={onClose}
            style="margin-left:auto;background:rgba(255,255,255,0.08);border:none;border-radius:50%;width:28px;height:28px;display:flex;align-items:center;justify-content:center;cursor:pointer;color:rgba(255,255,255,0.6);flex-shrink:0;"
          >
            <Icon name="x" size={14} />
          </button>
        </div>

        {/* Nav Items */}
        <nav style="flex:1;overflow-y:auto;padding:12px 12px;">
          <For each={navItems}>
            {(item) => {
              const isActive = () => activeScreen() === item.id;
              return (
                <button
                  onClick={() => { onNavigate(item.id); onClose(); }}
                  style={`
                    width:100%; display:flex; align-items:center; gap:12px;
                    padding: 11px 14px; border-radius: var(--radius-md);
                    background: ${isActive() ? 'rgba(255,255,255,0.12)' : 'transparent'};
                    color: ${isActive() ? '#fff' : 'rgba(255,255,255,0.65)'};
                    border: none; cursor:pointer; text-align:left;
                    font-family:var(--font-body); font-size:var(--text-sm); font-weight:${isActive() ? '600' : '400'};
                    transition: all 150ms ease;
                    margin-bottom: 2px;
                    position:relative;
                  `}
                  onMouseEnter={e => { if (!isActive()) e.currentTarget.style.background = 'rgba(255,255,255,0.07)'; e.currentTarget.style.color = '#fff'; }}
                  onMouseLeave={e => { if (!isActive()) { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = 'rgba(255,255,255,0.65)'; } }}
                >
                  <Icon name={item.icon} size={18} color="currentColor" />
                  <span style="flex:1;">{item.label}</span>
                  <Show when={item.badge}>
                    <span style="width:8px;height:8px;background:var(--gold-400);border-radius:50%;flex-shrink:0;" />
                  </Show>
                </button>
              );
            }}
          </For>
        </nav>

        {/* User Footer */}
        <div style="border-top:1px solid rgba(255,255,255,0.07);padding:16px 12px;">
          <div style="display:flex;align-items:center;gap:10px;padding:8px 8px 12px;margin-bottom:8px;">
            <Avatar initials={currentUser.initials} size={36} />
            <div style="min-width:0;flex:1;">
              <div style="font-size:var(--text-sm);font-weight:600;color:#fff;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">{currentUser.name}</div>
              <div style="font-size:var(--text-xs);color:var(--navy-200);">{currentUser.role}</div>
            </div>
          </div>
          <div style="display:flex;gap:8px;">
            <button
              style="flex:1;display:flex;align-items:center;justify-content:center;gap:6px;padding:8px 12px;background:rgba(255,255,255,0.07);border:none;border-radius:var(--radius-md);color:rgba(255,255,255,0.7);font-family:var(--font-body);font-size:var(--text-xs);cursor:pointer;transition:all 150ms;"
              onMouseEnter={e => e.currentTarget.style.background='rgba(255,255,255,0.13)'}
              onMouseLeave={e => e.currentTarget.style.background='rgba(255,255,255,0.07)'}
              onClick={() => { onNavigate('settings'); onClose(); }}
            >
              <Icon name="settings" size={14} /> Settings
            </button>
            <button
              style="flex:1;display:flex;align-items:center;justify-content:center;gap:6px;padding:8px 12px;background:rgba(255,255,255,0.07);border:none;border-radius:var(--radius-md);color:rgba(255,255,255,0.7);font-family:var(--font-body);font-size:var(--text-xs);cursor:pointer;transition:all 150ms;"
              onMouseEnter={e => e.currentTarget.style.background='rgba(239,68,68,0.15)'}
              onMouseLeave={e => e.currentTarget.style.background='rgba(255,255,255,0.07)'}
              onClick={() => onNavigate('login')}
            >
              <Icon name="log-out" size={14} /> Sign Out
            </button>
          </div>
        </div>
      </aside>
    </>
  );
}

export default Sidebar;
