// ============================================
// Networking & Events Screen
// ============================================
import { createSignal, For, Show, createMemo } from 'solid-js';
import { Icon } from '../ui/Icons.jsx';
import { Avatar } from '../ui/Avatar.jsx';
import { Button } from '../ui/Button.jsx';
import { upcomingEvents, pastEvents, alumniDirectory, mentors } from '../../data/mockData.js';

const TABS = ['Upcoming', 'Past', 'Teaching', 'Seminars', 'Directory'];

// ─── Event Detail Modal ───────────────────────────────────────────────────────
function EventDetailModal({ event, onClose, onRegister }) {
  const isTeaching = event.category === 'teaching';
  return (
    <div style="position:fixed;inset:0;z-index:300;display:flex;flex-direction:column;" onClick={onClose}>
      <div style="flex:1;background:rgba(0,0,0,0.5);" />
      <div style="background:#fff;border-radius:var(--radius-2xl) var(--radius-2xl) 0 0;overflow:hidden;animation:fadeIn 0.25s var(--ease-out);max-height:90vh;overflow-y:auto;" onClick={e => e.stopPropagation()}>
        {/* Hero Image */}
        <div style="position:relative;height:220px;overflow:hidden;">
          <img src={event.image} alt={event.title} style="width:100%;height:100%;object-fit:cover;" />
          <div style="position:absolute;inset:0;background:linear-gradient(to bottom,transparent 30%,rgba(0,0,0,0.6));" />
          <button onClick={onClose} style="position:absolute;top:14px;right:14px;background:rgba(0,0,0,0.4);border:none;border-radius:50%;width:32px;height:32px;display:flex;align-items:center;justify-content:center;cursor:pointer;color:#fff;"><Icon name="x" size={15} /></button>
          <div style="position:absolute;top:14px;left:14px;display:flex;gap:6px;">
            <span class="badge badge-onsite" style={`background:rgba(0,0,0,0.5);color:#fff;`}>{event.type === 'online' ? '🌐 ONLINE' : '📍 ONSITE'}</span>
            <Show when={event.attending > 0}>
              <span style="background:rgba(0,0,0,0.5);color:#fff;font-size:var(--text-xs);padding:3px 8px;border-radius:var(--radius-full);">👥 {event.attending} going</span>
            </Show>
          </div>
          <div style="position:absolute;bottom:14px;left:16px;right:16px;">
            <h2 style="font-family:var(--font-display);font-weight:800;font-size:var(--text-lg);color:#fff;line-height:1.2;">{event.title}</h2>
            <div style="display:flex;gap:10px;margin-top:5px;">
              <span style="font-size:var(--text-xs);color:rgba(255,255,255,0.8);">📅 {event.date}</span>
              <span style="font-size:var(--text-xs);color:rgba(255,255,255,0.8);">🕐 {event.time}</span>
            </div>
          </div>
        </div>

        <div style="padding:20px 20px 0;">
          {/* Action Buttons */}
          <div style="display:flex;gap:8px;margin-bottom:18px;">
            <button style="display:flex;align-items:center;gap:5px;background:var(--surface-1);border:none;border-radius:var(--radius-md);padding:8px 14px;font-size:var(--text-xs);font-weight:500;cursor:pointer;font-family:var(--font-body);color:var(--navy-700);"><Icon name="bookmark" size={13} /> Save</button>
            <button style="display:flex;align-items:center;gap:5px;background:var(--surface-1);border:none;border-radius:var(--radius-md);padding:8px 14px;font-size:var(--text-xs);font-weight:500;cursor:pointer;font-family:var(--font-body);color:var(--navy-700);"><Icon name="share" size={13} /> Share</button>
            <span style="margin-left:auto;display:flex;align-items:center;gap:4px;font-size:var(--text-xs);font-weight:600;color:var(--color-success);">● Spots Available</span>
          </div>

          {/* Description */}
          <div style="margin-bottom:16px;">
            <div style="display:flex;align-items:center;gap:6px;margin-bottom:6px;"><Icon name="info" size={15} color="var(--navy-500)" /><span style="font-weight:700;font-size:var(--text-sm);color:var(--navy-900);">Event Description</span></div>
            <p style="font-size:var(--text-sm);color:var(--text-secondary);line-height:1.6;">{event.description}</p>
          </div>

          {/* Venue */}
          <Show when={event.fullAddress}>
            <div style="margin-bottom:16px;">
              <div style="display:flex;align-items:center;gap:6px;margin-bottom:8px;"><Icon name="send" size={15} color="var(--navy-500)" /><span style="font-weight:700;font-size:var(--text-sm);color:var(--navy-900);">Venue Details</span></div>
              <div style="background:var(--surface-1);border-radius:var(--radius-md);padding:12px;display:flex;gap:8px;align-items:flex-start;">
                <Icon name="map-pin" size={14} color="var(--navy-600)" style="flex-shrink:0;margin-top:2px;" />
                <div>
                  <div style="font-weight:600;font-size:var(--text-sm);color:var(--navy-900);">{event.location}</div>
                  <div style="font-size:var(--text-xs);color:var(--text-muted);margin-top:2px;">{event.fullAddress}</div>
                </div>
              </div>
            </div>
          </Show>

          {/* Map placeholder */}
          <div style="margin-bottom:20px;">
            <div style="display:flex;align-items:center;gap:6px;margin-bottom:8px;"><Icon name="map-pin" size={15} color="var(--navy-500)" /><span style="font-weight:700;font-size:var(--text-sm);color:var(--navy-900);">Map Preview</span></div>
            <div style="height:140px;background:linear-gradient(135deg,#1e3a5f,#2d6a4f);border-radius:var(--radius-lg);display:flex;align-items:center;justify-content:center;overflow:hidden;position:relative;">
              <div style="position:absolute;inset:0;opacity:0.3;background:repeating-linear-gradient(0deg,transparent,transparent 20px,rgba(255,255,255,0.05) 20px,rgba(255,255,255,0.05) 21px),repeating-linear-gradient(90deg,transparent,transparent 20px,rgba(255,255,255,0.05) 20px,rgba(255,255,255,0.05) 21px);" />
              <div style="background:rgba(239,68,68,0.9);border-radius:50%;width:28px;height:28px;display:flex;align-items:center;justify-content:center;box-shadow:0 0 0 8px rgba(239,68,68,0.2);z-index:1;"><Icon name="map-pin" size={14} color="#fff" /></div>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div style="padding:0 20px 24px;">
          <button
            onClick={() => onRegister(event)}
            style={`width:100%;padding:14px;border:none;border-radius:var(--radius-lg);font-family:var(--font-display);font-weight:700;font-size:var(--text-base);cursor:pointer;display:flex;align-items:center;justify-content:center;gap:8px;background:${isTeaching ? '#d97706' : 'var(--navy-700)'};color:#fff;`}
          >
            {isTeaching ? 'Apply Now →' : 'Register Now →'}
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Event Registration Modal ─────────────────────────────────────────────────
function RegistrationModal({ event, onClose }) {
  const [submitted, setSubmitted] = createSignal(false);
  return (
    <div style="position:fixed;inset:0;z-index:400;display:flex;flex-direction:column;" onClick={onClose}>
      <div style="flex:1;background:rgba(0,0,0,0.5);" />
      <div style="background:var(--surface-1);border-radius:var(--radius-2xl) var(--radius-2xl) 0 0;overflow-y:auto;max-height:90vh;animation:fadeIn 0.25s var(--ease-out);" onClick={e => e.stopPropagation()}>
        <Show when={submitted()}>
          <div style="padding:40px 24px;text-align:center;">
            <div style="width:64px;height:64px;background:rgba(34,197,94,0.15);border-radius:50%;display:flex;align-items:center;justify-content:center;margin:0 auto 16px;"><Icon name="check-circle" size={32} color="var(--color-success)" /></div>
            <h3 style="font-family:var(--font-display);font-weight:700;font-size:var(--text-xl);color:var(--navy-900);margin-bottom:6px;">Registration Successful!</h3>
            <p style="font-size:var(--text-sm);color:var(--text-secondary);margin-bottom:24px;">You're registered for {event?.title}. A confirmation has been sent to your email.</p>
            <button onClick={onClose} style="background:var(--navy-700);color:#fff;border:none;border-radius:var(--radius-md);padding:12px 32px;font-family:var(--font-display);font-weight:600;cursor:pointer;">Done</button>
          </div>
        </Show>
        <Show when={!submitted()}>
          {/* Event Image */}
          <div style="height:160px;overflow:hidden;position:relative;">
            <img src={event?.image} alt="" style="width:100%;height:100%;object-fit:cover;" />
            <div style="position:absolute;inset:0;background:linear-gradient(to bottom,transparent 30%,rgba(0,0,0,0.7));" />
            <div style="position:absolute;top:14px;right:14px;"><span style="background:rgba(16,185,129,0.8);color:#fff;font-size:var(--text-xs);padding:3px 10px;border-radius:var(--radius-full);">Onsite</span></div>
            <div style="position:absolute;bottom:14px;left:16px;right:60px;">
              <h3 style="font-family:var(--font-display);font-weight:700;font-size:var(--text-base);color:#fff;">{event?.title}</h3>
            </div>
            <button onClick={onClose} style="position:absolute;top:14px;left:14px;background:rgba(0,0,0,0.4);border:none;border-radius:var(--radius-md);padding:4px;cursor:pointer;color:#fff;display:flex;"><Icon name="chevron-left" size={18} /></button>
          </div>
          <div style="padding:16px;">
            <div style="display:flex;gap:16px;background:var(--surface-2);border-radius:var(--radius-md);padding:10px 12px;margin-bottom:16px;font-size:var(--text-xs);">
              <span style="color:var(--text-secondary);">📅 {event?.date}</span>
              <span style="color:var(--text-secondary);">📍 {event?.location}</span>
            </div>

            <div style="background:#fff;border-radius:var(--radius-xl);padding:16px;margin-bottom:14px;box-shadow:var(--shadow-xs);">
              <div style="display:flex;align-items:center;gap:8px;margin-bottom:12px;">
                <Icon name="user" size={16} color="var(--navy-500)" />
                <span style="font-weight:600;font-size:var(--text-sm);color:var(--navy-900);">Your Details</span>
              </div>
              <div style="background:rgba(59,130,246,0.08);border-radius:var(--radius-md);padding:8px 12px;margin-bottom:12px;font-size:var(--text-xs);color:var(--navy-600);">
                🔒 Some fields are auto-filled from your profile
              </div>
              {[
                { label:'Full Name', value:'Juan C. Dela Cruz', synced:true },
                { label:'Course & Batch Year', value:'BS Computer Science · Batch 2015', synced:true },
                { label:'Email Address', value:'juan.delacruz@email.com', synced:false },
                { label:'Contact Number', value:'+63 912 345 6789', synced:false },
              ].map(f => (
                <div style="margin-bottom:10px;">
                  <label style="display:block;font-size:var(--text-xs);font-weight:600;color:var(--navy-700);margin-bottom:4px;">{f.label}</label>
                  <div style="position:relative;">
                    <input value={f.value} style="width:100%;padding:9px 12px;border:1.5px solid #e2e8f0;border-radius:var(--radius-md);font-size:var(--text-sm);font-family:var(--font-body);color:var(--navy-900);background:var(--surface-1);outline:none;" onFocus={e=>e.target.style.borderColor='var(--navy-400)'} onBlur={e=>e.target.style.borderColor='#e2e8f0'} />
                    <Show when={f.synced}>
                      <span style="position:absolute;right:10px;top:50%;transform:translateY(-50%);font-size:10px;font-weight:700;background:rgba(34,197,94,0.12);color:var(--color-success);padding:2px 6px;border-radius:4px;">SYNCED</span>
                    </Show>
                  </div>
                </div>
              ))}
            </div>

            <button onClick={() => setSubmitted(true)} style="width:100%;background:var(--navy-700);color:#fff;border:none;border-radius:var(--radius-lg);padding:14px;font-family:var(--font-display);font-weight:700;font-size:var(--text-base);cursor:pointer;">
              Submit Registration →
            </button>
          </div>
        </Show>
      </div>
    </div>
  );
}

// ─── Chat Modal ───────────────────────────────────────────────────────────────
function ChatModal({ alumni, onClose }) {
  const [msg, setMsg] = createSignal('');
  const [messages, setMessages] = createSignal([
    { id: 1, sender: 'system', text: `You are now connected with ${alumni.name}.` },
    { id: 2, sender: 'self', text: `Hi ${alumni.name.split(' ')[0]}! I'm Juan from BS Computer Science, Batch 2015. Great to connect with a fellow Atenean!`, time: '10:28 AM' },
    { id: 3, sender: 'other', text: `Hey Juan! Nice to meet you. I'm from ${alumni.degree}, ${alumni.batch}. How's everything going?`, time: '10:29 AM' },
  ]);

  const send = () => {
    if (!msg().trim()) return;
    setMessages(prev => [...prev, { id: Date.now(), sender: 'self', text: msg(), time: new Date().toLocaleTimeString('en-US', { hour:'2-digit', minute:'2-digit' }) }]);
    setMsg('');
  };

  return (
    <div style="position:fixed;inset:0;z-index:400;background:#f4f6fb;display:flex;flex-direction:column;" onClick={e => e.stopPropagation()}>
      {/* Header */}
      <div style="background:linear-gradient(135deg,var(--navy-800),var(--navy-700));padding:14px 16px;display:flex;align-items:center;gap:12px;">
        <button onClick={onClose} style="background:rgba(255,255,255,0.1);border:none;border-radius:var(--radius-md);width:32px;height:32px;display:flex;align-items:center;justify-content:center;cursor:pointer;color:#fff;flex-shrink:0;"><Icon name="chevron-left" size={18} /></button>
        <Avatar initials={alumni.initials} size={38} />
        <div style="flex:1;min-width:0;">
          <div style="font-family:var(--font-display);font-weight:700;font-size:var(--text-sm);color:#fff;">{alumni.name}</div>
          <div style="font-size:var(--text-xs);color:rgba(255,255,255,0.7);">{alumni.degree}, {alumni.batch}</div>
        </div>
        <div style="display:flex;gap:8px;">
          <button style="background:rgba(255,255,255,0.1);border:none;border-radius:50%;width:32px;height:32px;display:flex;align-items:center;justify-content:center;cursor:pointer;color:#fff;"><Icon name="phone" size={15} /></button>
          <button style="background:rgba(255,255,255,0.1);border:none;border-radius:50%;width:32px;height:32px;display:flex;align-items:center;justify-content:center;cursor:pointer;color:#fff;"><Icon name="more-vertical" size={15} /></button>
        </div>
      </div>

      {/* Secure badge */}
      <div style="background:#f0f4ff;padding:6px;text-align:center;font-size:var(--text-xs);color:var(--navy-600);display:flex;align-items:center;justify-content:center;gap:4px;">
        🔒 Messages are secured within the AdDU Alumni network
      </div>

      {/* Messages */}
      <div style="flex:1;overflow-y:auto;padding:16px;display:flex;flex-direction:column;gap:10px;">
        <For each={messages()}>
          {(m) => {
            if (m.sender === 'system') return (
              <div style="text-align:center;margin:4px 0;">
                <span style="background:rgba(34,197,94,0.12);color:var(--color-success);font-size:var(--text-xs);padding:4px 12px;border-radius:var(--radius-full);display:inline-flex;align-items:center;gap:5px;"><Icon name="check-circle" size={11} color="var(--color-success)" /> {m.text}</span>
              </div>
            );
            if (m.sender === 'self') return (
              <div style="display:flex;justify-content:flex-end;">
                <div style="max-width:75%;">
                  <div style="background:var(--navy-700);color:#fff;padding:12px 14px;border-radius:var(--radius-lg) var(--radius-lg) var(--radius-sm) var(--radius-lg);font-size:var(--text-sm);line-height:1.5;">{m.text}</div>
                  <div style="text-align:right;font-size:var(--text-xs);color:var(--text-muted);margin-top:3px;">{m.time} ✓✓</div>
                </div>
              </div>
            );
            return (
              <div style="display:flex;gap:8px;align-items:flex-end;">
                <Avatar initials={alumni.initials} size={28} />
                <div style="max-width:75%;">
                  <div style="background:#fff;color:var(--navy-900);padding:12px 14px;border-radius:var(--radius-lg) var(--radius-lg) var(--radius-lg) var(--radius-sm);font-size:var(--text-sm);line-height:1.5;box-shadow:var(--shadow-xs);">{m.text}</div>
                  <div style="font-size:var(--text-xs);color:var(--text-muted);margin-top:3px;">{m.time}</div>
                </div>
              </div>
            );
          }}
        </For>
        {/* Suggestion */}
        <div style="display:flex;justify-content:flex-start;padding:4px 0;">
          <button onClick={() => setMsg("I'd love to hear about your career journey.")} style="background:#fff;border:1.5px solid #e2e8f0;border-radius:var(--radius-full);padding:6px 14px;font-size:var(--text-xs);color:var(--navy-700);cursor:pointer;font-family:var(--font-body);">
            💡 Suggestion: "I'd love to hear about your career journey."
          </button>
        </div>
      </div>

      {/* Input */}
      <div style="background:#fff;padding:12px 14px;display:flex;gap:10px;align-items:center;border-top:1px solid var(--surface-2);">
        <button style="background:none;border:none;cursor:pointer;color:var(--text-muted);padding:4px;"><Icon name="paperclip" size={18} /></button>
        <input
          value={msg()} onInput={e => setMsg(e.target.value)}
          onKeyPress={e => e.key === 'Enter' && send()}
          placeholder="Type a message..."
          style="flex:1;background:var(--surface-1);border:1.5px solid #e2e8f0;border-radius:var(--radius-full);padding:10px 16px;font-size:var(--text-sm);font-family:var(--font-body);color:var(--navy-900);outline:none;"
        />
        <button onClick={send} style="background:var(--navy-700);border:none;border-radius:50%;width:36px;height:36px;display:flex;align-items:center;justify-content:center;cursor:pointer;"><Icon name="send" size={16} color="#fff" /></button>
      </div>
    </div>
  );
}

/**
 * Networking & Events Screen with 5 tabs.
 */
export function EventsScreen() {
  const [activeTab, setActiveTab] = createSignal('Upcoming');
  const [selectedEvent, setSelectedEvent] = createSignal(null);
  const [registerEvent, setRegisterEvent] = createSignal(null);
  const [chatAlumni, setChatAlumni] = createSignal(null);
  const [search, setSearch] = createSignal('');

  const filteredDirectory = createMemo(() =>
    alumniDirectory.filter(a =>
      !search() ||
      a.name.toLowerCase().includes(search().toLowerCase()) ||
      a.degree.toLowerCase().includes(search().toLowerCase()) ||
      a.batch.toLowerCase().includes(search().toLowerCase())
    )
  );

  const tabEvents = createMemo(() => {
    if (activeTab() === 'Teaching') return upcomingEvents.filter(e => e.category === 'teaching');
    if (activeTab() === 'Seminars') return upcomingEvents.filter(e => e.category === 'seminar');
    return [];
  });

  return (
    <div style="padding:0;max-width:720px;margin:0 auto;animation:fadeIn 0.4s var(--ease-out);">
      {/* Header */}
      <div style="background:linear-gradient(135deg,var(--navy-800),var(--navy-700));padding:20px 20px 0;">
        <div style="display:flex;align-items:center;gap:10px;margin-bottom:16px;">
          <button style="background:rgba(255,255,255,0.1);border:none;border-radius:var(--radius-md);width:32px;height:32px;display:flex;align-items:center;justify-content:center;cursor:pointer;color:#fff;"><Icon name="chevron-left" size={18} /></button>
          <h1 style="font-family:var(--font-display);font-weight:700;font-size:var(--text-lg);color:#fff;">Networking & Events</h1>
        </div>
        {/* Search */}
        <div style="position:relative;margin-bottom:16px;">
          <span style="position:absolute;left:14px;top:50%;transform:translateY(-50%);"><Icon name="search" size={16} color="rgba(255,255,255,0.5)" /></span>
          <input
            value={search()} onInput={e => setSearch(e.target.value)}
            placeholder={activeTab() === 'Directory' ? 'Search alumni, course, batch...' : 'Search events...'}
            style="width:100%;padding:10px 14px 10px 40px;background:rgba(255,255,255,0.1);border:1.5px solid rgba(255,255,255,0.12);border-radius:var(--radius-lg);font-size:var(--text-sm);font-family:var(--font-body);color:#fff;outline:none;"
          />
        </div>
        {/* Tabs */}
        <div style="display:flex;gap:2px;overflow-x:auto;scrollbar-width:none;">
          <For each={TABS}>
            {(tab) => {
              const isActive = () => activeTab() === tab;
              return (
                <button
                  onClick={() => setActiveTab(tab)}
                  style={`
                    padding:8px 16px;border-radius:var(--radius-md) var(--radius-md) 0 0;
                    background:${isActive() ? '#fff' : 'transparent'};
                    color:${isActive() ? 'var(--navy-900)' : 'rgba(255,255,255,0.7)'};
                    font-size:var(--text-xs);font-weight:${isActive() ? '700' : '500'};
                    font-family:var(--font-display);border:none;cursor:pointer;
                    white-space:nowrap;transition:all 150ms;
                  `}
                >{tab}</button>
              );
            }}
          </For>
        </div>
      </div>

      {/* Tab Content */}
      <div style="padding:16px;background:var(--surface-1);min-height:calc(100vh - 180px);">

        {/* UPCOMING TAB */}
        <Show when={activeTab() === 'Upcoming'}>
          <For each={upcomingEvents.filter(e => !e.category)}>
            {(ev, i) => (
              <div style={`border-radius:var(--radius-xl);overflow:hidden;background:#fff;margin-bottom:14px;box-shadow:var(--shadow-sm);cursor:pointer;transition:all 200ms;`}
                onMouseEnter={e => e.currentTarget.style.transform='translateY(-2px)'}
                onMouseLeave={e => e.currentTarget.style.transform='translateY(0)'}
                onClick={() => setSelectedEvent(ev)}
              >
                <div style="position:relative;height:180px;overflow:hidden;">
                  <img src={ev.image} alt={ev.title} style="width:100%;height:100%;object-fit:cover;" />
                  <div style="position:absolute;inset:0;background:linear-gradient(to bottom,transparent 40%,rgba(0,0,0,0.75));" />
                  <Show when={i() === 0}>
                    <span style="position:absolute;top:12px;left:12px;background:var(--gold-400);color:var(--navy-900);font-size:10px;font-weight:700;padding:3px 8px;border-radius:var(--radius-full);font-family:var(--font-display);">⭐ FEATURED</span>
                  </Show>
                  <span style="position:absolute;top:12px;right:12px;background:rgba(0,0,0,0.5);color:#fff;font-size:10px;padding:3px 8px;border-radius:var(--radius-full);">👥 {ev.attending} going</span>
                  <div style="position:absolute;bottom:12px;left:14px;right:14px;">
                    <h3 style="font-family:var(--font-display);font-weight:700;font-size:var(--text-base);color:#fff;line-height:1.2;">{ev.title}</h3>
                    <div style="display:flex;gap:8px;margin-top:4px;">
                      <span style="font-size:var(--text-xs);color:rgba(255,255,255,0.8);">📅 {ev.date}</span>
                      <span style="font-size:var(--text-xs);color:rgba(255,255,255,0.8);">{ev.type === 'online' ? '🌐' : '📍'} {ev.type === 'online' ? 'Online' : 'Onsite'}</span>
                    </div>
                  </div>
                </div>
                <div style="padding:14px 16px;">
                  <p style="font-size:var(--text-sm);color:var(--text-secondary);line-height:1.5;margin-bottom:10px;">{ev.description}</p>
                  <button onClick={() => setSelectedEvent(ev)} style="width:100%;background:var(--navy-700);color:#fff;border:none;border-radius:var(--radius-md);padding:10px;font-family:var(--font-display);font-weight:600;font-size:var(--text-sm);cursor:pointer;">
                    View Details →
                  </button>
                </div>
              </div>
            )}
          </For>
        </Show>

        {/* PAST TAB */}
        <Show when={activeTab() === 'Past'}>
          <div style="display:flex;align-items:center;gap:6px;margin-bottom:12px;">
            <Icon name="clock" size={16} color="var(--navy-500)" />
            <h3 style="font-family:var(--font-display);font-weight:700;font-size:var(--text-base);color:var(--navy-900);">Past Events</h3>
            <span style="margin-left:auto;font-size:var(--text-xs);color:var(--text-muted);">{pastEvents.length} events</span>
          </div>
          <For each={pastEvents}>
            {(ev) => (
              <div style="border-radius:var(--radius-xl);overflow:hidden;background:#fff;margin-bottom:14px;box-shadow:var(--shadow-sm);">
                <div style="position:relative;height:160px;overflow:hidden;">
                  <img src={ev.image} alt={ev.title} style="width:100%;height:100%;object-fit:cover;filter:saturate(0.7);" />
                  <div style="position:absolute;inset:0;background:linear-gradient(to bottom,transparent 30%,rgba(0,0,0,0.7));" />
                  <span style="position:absolute;top:10px;left:10px;background:rgba(34,197,94,0.8);color:#fff;font-size:10px;font-weight:700;padding:3px 8px;border-radius:var(--radius-full);">✓ Present</span>
                  <span style="position:absolute;top:10px;right:10px;background:rgba(0,0,0,0.5);color:#fff;font-size:10px;padding:3px 8px;border-radius:var(--radius-full);">📍 Onsite</span>
                  <span style="position:absolute;bottom:10px;right:10px;background:rgba(0,0,0,0.5);color:#fff;font-size:10px;padding:3px 8px;border-radius:var(--radius-full);">👥 {ev.attended} attended</span>
                </div>
                <div style="padding:14px 16px;">
                  <h3 style="font-family:var(--font-display);font-weight:700;font-size:var(--text-base);color:var(--navy-900);margin-bottom:4px;">{ev.title}</h3>
                  <div style="font-size:var(--text-xs);color:var(--text-muted);margin-bottom:3px;">📅 {ev.date} · {ev.time}</div>
                  <div style="font-size:var(--text-xs);color:var(--text-muted);margin-bottom:8px;">📍 {ev.location}</div>
                  <p style="font-size:var(--text-sm);color:var(--text-secondary);margin-bottom:10px;">{ev.description}</p>
                  <Show when={ev.userAttended}>
                    <div style="background:rgba(34,197,94,0.08);border-radius:var(--radius-md);padding:6px 10px;margin-bottom:10px;font-size:var(--text-xs);color:var(--color-success);display:flex;align-items:center;gap:5px;">
                      <Icon name="check-circle" size={12} color="var(--color-success)" /> You attended this event.
                    </div>
                  </Show>
                  <button style="width:100%;background:var(--navy-700);color:#fff;border:none;border-radius:var(--radius-md);padding:10px;font-family:var(--font-display);font-weight:600;font-size:var(--text-sm);cursor:pointer;">View Details →</button>
                </div>
              </div>
            )}
          </For>
        </Show>

        {/* TEACHING / SEMINARS TABS */}
        <Show when={activeTab() === 'Teaching' || activeTab() === 'Seminars'}>
          {/* Find a Mentor Banner */}
          <div style="background:var(--navy-700);border-radius:var(--radius-lg);padding:14px 16px;margin-bottom:14px;display:flex;align-items:center;gap:12px;cursor:pointer;"
            onClick={() => setActiveTab('Seminars')}
          >
            <div style="width:40px;height:40px;background:rgba(255,255,255,0.12);border-radius:var(--radius-md);display:flex;align-items:center;justify-content:center;"><Icon name="users" size={18} color="#fff" /></div>
            <div style="flex:1;"><div style="font-weight:600;font-size:var(--text-sm);color:#fff;">Find a Mentor</div><div style="font-size:var(--text-xs);color:rgba(255,255,255,0.7);margin-top:2px;">Connect with experienced alumni who can guide your career journey.</div></div>
            <Icon name="chevron-right" size={16} color="rgba(255,255,255,0.6)" />
          </div>
          <For each={tabEvents()}>
            {(ev) => (
              <div style="border-radius:var(--radius-xl);overflow:hidden;background:#fff;margin-bottom:14px;box-shadow:var(--shadow-sm);cursor:pointer;" onClick={() => setSelectedEvent(ev)}>
                <div style="position:relative;height:160px;overflow:hidden;">
                  <img src={ev.image} alt={ev.title} style="width:100%;height:100%;object-fit:cover;" />
                  <div style="position:absolute;inset:0;background:linear-gradient(to bottom,transparent 30%,rgba(0,0,0,0.6));" />
                  <span style="position:absolute;top:10px;right:10px;">{ev.type === 'online' ? <span style="background:rgba(59,130,246,0.8);color:#fff;font-size:10px;padding:3px 8px;border-radius:var(--radius-full);">🌐 Online</span> : <span style="background:rgba(16,185,129,0.8);color:#fff;font-size:10px;padding:3px 8px;border-radius:var(--radius-full);">📍 Onsite</span>}</span>
                  <span style="position:absolute;bottom:10px;right:10px;background:rgba(0,0,0,0.5);color:#fff;font-size:10px;padding:3px 8px;border-radius:var(--radius-full);">👥 {ev.attending}</span>
                </div>
                <div style="padding:14px 16px;">
                  <h3 style="font-family:var(--font-display);font-weight:700;font-size:var(--text-base);color:var(--navy-900);margin-bottom:4px;">{ev.title}</h3>
                  <div style="font-size:var(--text-xs);color:var(--text-muted);margin-bottom:2px;">📅 {ev.date} · {ev.time}</div>
                  <div style="font-size:var(--text-xs);color:var(--text-muted);margin-bottom:8px;">📍 {ev.location}</div>
                  <p style="font-size:var(--text-sm);color:var(--text-secondary);margin-bottom:10px;">{ev.description}</p>
                  <button style={`width:100%;background:${ev.category==='teaching'?'#d97706':'var(--navy-700)'};color:#fff;border:none;border-radius:var(--radius-md);padding:10px;font-family:var(--font-display);font-weight:600;font-size:var(--text-sm);cursor:pointer;`}
                    onClick={() => setSelectedEvent(ev)}>View Details →</button>
                </div>
              </div>
            )}
          </For>
        </Show>

        {/* DIRECTORY TAB */}
        <Show when={activeTab() === 'Directory'}>
          <div style="display:flex;align-items:center;gap:6px;margin-bottom:12px;">
            <Icon name="users" size={16} color="var(--navy-500)" />
            <h3 style="font-family:var(--font-display);font-weight:700;font-size:var(--text-base);color:var(--navy-900);">Alumni Directory</h3>
            <span style="margin-left:auto;font-size:var(--text-xs);color:var(--text-muted);">{filteredDirectory().length} alumni</span>
          </div>
          <For each={filteredDirectory()}>
            {(alumni) => (
              <div style="background:#fff;border-radius:var(--radius-xl);padding:16px;margin-bottom:10px;box-shadow:var(--shadow-sm);">
                <div style="display:flex;align-items:flex-start;gap:12px;margin-bottom:10px;">
                  <Avatar initials={alumni.initials} size={44} />
                  <div style="flex:1;min-width:0;">
                    <div style="display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:4px;">
                      <span style="font-weight:700;font-size:var(--text-sm);color:var(--navy-900);">{alumni.name}</span>
                      <span style="font-size:var(--text-xs);font-weight:600;color:var(--navy-600);background:rgba(34,53,192,0.08);padding:2px 8px;border-radius:var(--radius-full);">{alumni.batch}</span>
                    </div>
                    <p style="font-size:var(--text-xs);color:var(--text-secondary);margin-top:2px;">🎓 {alumni.degree}</p>
                    <p style="font-size:var(--text-xs);color:var(--text-secondary);">🏢 {alumni.job}</p>
                    <p style="font-size:var(--text-xs);color:var(--text-muted);">📍 {alumni.location}</p>
                  </div>
                </div>
                <div style="display:flex;gap:8px;">
                  <button onClick={() => setChatAlumni(alumni)} style="flex:1;display:flex;align-items:center;justify-content:center;gap:6px;background:var(--navy-700);color:#fff;border:none;border-radius:var(--radius-md);padding:8px;font-family:var(--font-display);font-weight:600;font-size:var(--text-sm);cursor:pointer;">
                    <Icon name="message-circle" size={14} /> Connect
                  </button>
                  <button style="width:36px;height:36px;display:flex;align-items:center;justify-content:center;background:var(--surface-1);border:1.5px solid var(--surface-2);border-radius:var(--radius-md);cursor:pointer;"><Icon name="mail" size={15} color="var(--navy-500)" /></button>
                </div>
              </div>
            )}
          </For>
        </Show>
      </div>

      {/* Modals */}
      <Show when={selectedEvent() && !registerEvent()}>
        <EventDetailModal
          event={selectedEvent()}
          onClose={() => setSelectedEvent(null)}
          onRegister={(ev) => { setRegisterEvent(ev); setSelectedEvent(null); }}
        />
      </Show>
      <Show when={registerEvent()}>
        <RegistrationModal event={registerEvent()} onClose={() => setRegisterEvent(null)} />
      </Show>
      <Show when={chatAlumni()}>
        <ChatModal alumni={chatAlumni()} onClose={() => setChatAlumni(null)} />
      </Show>
    </div>
  );
}

export default EventsScreen;
