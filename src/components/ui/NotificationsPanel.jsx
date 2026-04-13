// ============================================
// NotificationsPanel Component
// ============================================
import { createSignal, For, Show } from 'solid-js';
import { Icon } from '../ui/Icons.jsx';
import { notifications } from '../../data/mockData.js';

const typeIcon = {
  event:        { icon: 'calendar',  bg: 'rgba(59,82,212,0.2)',  color: '#93c5fd' },
  document:     { icon: 'file',      bg: 'rgba(34,197,94,0.2)',  color: '#86efac' },
  job:          { icon: 'briefcase', bg: 'rgba(245,158,11,0.2)', color: '#fcd34d' },
  announcement: { icon: 'bell',      bg: 'rgba(168,85,247,0.2)', color: '#d8b4fe' },
  achievement:  { icon: 'award',     bg: 'rgba(212,160,23,0.2)', color: '#fde68a' },
};

/**
 * Slide-over notifications panel overlay.
 */
export function NotificationsPanel({ onClose }) {
  const [items, setItems] = createSignal(notifications);

  const markAllRead = () => setItems(prev => prev.map(n => ({ ...n, unread: false })));
  const unreadCount = () => items().filter(n => n.unread).length;

  return (
    <>
      <div
        style="position:fixed;inset:0;background:rgba(0,0,0,0.5);z-index:200;backdrop-filter:blur(4px);"
        onClick={onClose}
      />
      <div style={`
        position:fixed; top:0; right:0; bottom:0;
        width: min(400px, 100vw);
        background: var(--navy-900);
        border-left: 1px solid rgba(255,255,255,0.08);
        z-index:201; display:flex; flex-direction:column;
        animation: slideInRight var(--duration-base) var(--ease-out);
      `}>
        {/* Header */}
        <div style="padding:20px 20px 16px;border-bottom:1px solid rgba(255,255,255,0.07);display:flex;align-items:center;gap:12px;">
          <div style="flex:1;">
            <div style="font-family:var(--font-display);font-weight:700;font-size:var(--text-lg);color:#fff;">Notifications</div>
            <div style="font-size:var(--text-xs);color:var(--navy-200);margin-top:2px;">{unreadCount()} unread</div>
          </div>
          <button
            onClick={markAllRead}
            style="display:flex;align-items:center;gap:5px;background:transparent;border:none;color:var(--gold-400);font-size:var(--text-xs);font-family:var(--font-body);cursor:pointer;padding:4px 8px;border-radius:var(--radius-sm);"
          >
            <Icon name="check" size={12} color="var(--gold-400)" />
            Mark all read
          </button>
          <button
            onClick={onClose}
            style="background:rgba(255,255,255,0.08);border:none;border-radius:50%;width:30px;height:30px;display:flex;align-items:center;justify-content:center;cursor:pointer;color:rgba(255,255,255,0.7);"
          >
            <Icon name="x" size={15} />
          </button>
        </div>

        {/* Items */}
        <div style="flex:1;overflow-y:auto;padding:8px 12px;">
          <For each={items()}>
            {(notif) => {
              const t = typeIcon[notif.type] || typeIcon.announcement;
              return (
                <div style={`
                  display:flex;gap:12px;padding:14px 10px;border-radius:var(--radius-md);
                  background:${notif.unread ? 'rgba(255,255,255,0.05)' : 'transparent'};
                  margin-bottom:4px;cursor:pointer;transition:background 150ms;
                `}
                  onMouseEnter={e => e.currentTarget.style.background='rgba(255,255,255,0.07)'}
                  onMouseLeave={e => e.currentTarget.style.background=notif.unread?'rgba(255,255,255,0.05)':'transparent'}
                >
                  <div style={`width:38px;height:38px;border-radius:var(--radius-md);background:${t.bg};display:flex;align-items:center;justify-content:center;flex-shrink:0;`}>
                    <Icon name={t.icon} size={17} color={t.color} />
                  </div>
                  <div style="flex:1;min-width:0;">
                    <div style="display:flex;align-items:flex-start;gap:6px;">
                      <span style="font-size:var(--text-sm);font-weight:600;color:#fff;flex:1;">{notif.title}</span>
                      <Show when={notif.unread}>
                        <span style="width:7px;height:7px;background:var(--gold-400);border-radius:50%;flex-shrink:0;margin-top:5px;" />
                      </Show>
                    </div>
                    <p style="font-size:var(--text-xs);color:var(--navy-200);margin-top:3px;line-height:1.5;overflow:hidden;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;">{notif.message}</p>
                    <span style="font-size:var(--text-xs);color:var(--text-muted);margin-top:4px;display:block;">{notif.time}</span>
                  </div>
                </div>
              );
            }}
          </For>
        </div>
      </div>
    </>
  );
}

export default NotificationsPanel;
