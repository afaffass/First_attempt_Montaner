// ============================================
// Dashboard Screen
// ============================================
import { For } from 'solid-js';
import { Icon } from '../ui/Icons.jsx';
import { currentUser, quickActions, upcomingEvents } from '../../data/mockData.js';

/**
 * Main dashboard / home screen.
 */
export function DashboardScreen({ onNavigate }) {
  return (
    <div style="padding:24px 20px;max-width:720px;margin:0 auto;animation:fadeIn 0.4s var(--ease-out);">
      {/* Greeting */}
      <div style="margin-bottom:24px;">
        <h1 style="font-family:var(--font-display);font-size:var(--text-2xl);font-weight:800;color:#fff;margin-bottom:4px;">
          Welcome back, {currentUser.shortName}! 👋
        </h1>
        <p style="font-size:var(--text-sm);color:var(--navy-200);">Here's what's happening with your alumni account</p>
      </div>

      {/* Profile Completion Banner */}
      <div style={`
        background:linear-gradient(135deg,#b8860b,#d4a017,#e0b820);
        border-radius:var(--radius-xl); padding:20px 22px; margin-bottom:24px;
        position:relative; overflow:hidden;
        box-shadow:0 4px 20px rgba(212,160,23,0.3);
      `}>
        <div style="position:absolute;right:-10px;top:-10px;opacity:0.15;">
          <Icon name="award" size={100} color="#fff" />
        </div>
        <div style="display:flex;align-items:flex-start;justify-content:space-between;gap:16px;position:relative;">
          <div style="flex:1;">
            <div style="font-family:var(--font-display);font-weight:700;font-size:var(--text-md);color:var(--navy-900);margin-bottom:4px;">Complete Your Profile</div>
            <p style="font-size:var(--text-xs);color:var(--navy-800);margin-bottom:14px;opacity:0.85;">Add your career milestones and connect with alumni</p>
            <div style="display:flex;align-items:center;gap:8px;margin-bottom:14px;">
              <span style="font-size:var(--text-xs);font-weight:600;color:var(--navy-900);">Profile Strength</span>
              <span style="font-size:var(--text-xs);font-weight:700;color:var(--navy-900);margin-left:auto;">{currentUser.profileStrength}%</span>
            </div>
            <div style="background:rgba(0,0,0,0.15);border-radius:var(--radius-full);height:7px;margin-bottom:16px;">
              <div style={`width:${currentUser.profileStrength}%;height:100%;background:var(--navy-900);border-radius:var(--radius-full);transition:width 1s var(--ease-out);`} />
            </div>
            <button
              onClick={() => onNavigate('profile')}
              style="background:var(--navy-900);color:#fff;border:none;border-radius:var(--radius-md);padding:10px 22px;font-family:var(--font-display);font-weight:600;font-size:var(--text-sm);cursor:pointer;"
            >
              Complete Profile
            </button>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div style="margin-bottom:28px;">
        <h2 style="font-family:var(--font-display);font-weight:700;font-size:var(--text-md);color:#fff;margin-bottom:14px;">Quick Actions</h2>
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px;">
          <For each={quickActions}>
            {(action) => (
              <button
                onClick={() => onNavigate(action.screen)}
                style={`
                  background:rgba(255,255,255,0.06);border:1px solid rgba(255,255,255,0.08);
                  border-radius:var(--radius-lg);padding:18px 16px;
                  display:flex;flex-direction:column;align-items:flex-start;
                  gap:8px;cursor:pointer;transition:all 200ms;position:relative;text-align:left;
                `}
                onMouseEnter={e => { e.currentTarget.style.background='rgba(255,255,255,0.10)'; e.currentTarget.style.transform='translateY(-2px)'; }}
                onMouseLeave={e => { e.currentTarget.style.background='rgba(255,255,255,0.06)'; e.currentTarget.style.transform='translateY(0)'; }}
              >
                {action.badge && (
                  <span style={`
                    position:absolute;top:10px;right:10px;
                    background:var(--gold-400);color:var(--navy-900);
                    width:20px;height:20px;border-radius:50%;
                    font-size:11px;font-weight:700;font-family:var(--font-display);
                    display:flex;align-items:center;justify-content:center;
                  `}>{action.badge}</span>
                )}
                <div style={`width:42px;height:42px;border-radius:var(--radius-md);background:${action.color};display:flex;align-items:center;justify-content:center;`}>
                  <Icon name={action.icon} size={20} color="#fff" />
                </div>
                <span style="font-family:var(--font-display);font-weight:600;font-size:var(--text-sm);color:#fff;">{action.label}</span>
              </button>
            )}
          </For>
        </div>
      </div>

      {/* Upcoming Events */}
      <div>
        <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:14px;">
          <h2 style="font-family:var(--font-display);font-weight:700;font-size:var(--text-md);color:#fff;">Upcoming Events</h2>
          <button onClick={() => onNavigate('events')} style="background:none;border:none;color:var(--gold-400);font-size:var(--text-xs);font-weight:600;cursor:pointer;font-family:var(--font-body);">View All</button>
        </div>
        <div style="display:flex;flex-direction:column;gap:10px;">
          <For each={upcomingEvents.slice(0, 2)}>
            {(ev) => (
              <button
                onClick={() => onNavigate('events')}
                style="display:flex;align-items:center;gap:14px;background:rgba(255,255,255,0.05);border:1px solid rgba(255,255,255,0.07);border-radius:var(--radius-lg);padding:14px 16px;cursor:pointer;text-align:left;transition:all 150ms;"
                onMouseEnter={e => e.currentTarget.style.background='rgba(255,255,255,0.09)'}
                onMouseLeave={e => e.currentTarget.style.background='rgba(255,255,255,0.05)'}
              >
                <div style="background:var(--navy-700);border-radius:var(--radius-md);padding:8px 10px;text-align:center;min-width:48px;flex-shrink:0;">
                  <div style="font-size:var(--text-xs);color:var(--navy-200);text-transform:uppercase;letter-spacing:0.05em;">{ev.dateShort.split(' ')[0]}</div>
                  <div style="font-family:var(--font-display);font-weight:700;font-size:var(--text-lg);color:#fff;line-height:1;">{ev.dateShort.split(' ')[1]}</div>
                </div>
                <div style="flex:1;min-width:0;">
                  <div style="font-weight:600;font-size:var(--text-sm);color:#fff;margin-bottom:3px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">{ev.title}</div>
                  <div style="font-size:var(--text-xs);color:var(--navy-200);">{ev.date} · {ev.time}</div>
                  <div style="font-size:var(--text-xs);color:var(--text-muted);margin-top:2px;">{ev.location}</div>
                </div>
                <Icon name="chevron-right" size={16} color="var(--navy-300)" />
              </button>
            )}
          </For>
        </div>
      </div>
    </div>
  );
}

export default DashboardScreen;
