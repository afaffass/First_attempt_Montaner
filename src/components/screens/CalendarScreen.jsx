// ============================================
// Alumni Calendar Screen
// ============================================
import { createSignal, For, Show } from 'solid-js';
import { Icon } from '../ui/Icons.jsx';
import { calendarEvents } from '../../data/mockData.js';

const DAYS = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
const MONTHS = ['January','February','March','April','May','June','July','August','September','October','November','December'];

function getDaysInMonth(year, month) {
  return new Date(year, month + 1, 0).getDate();
}
function getFirstDayOfMonth(year, month) {
  return new Date(year, month, 1).getDay();
}

const typeColor = {
  event:    '#3b82f6',
  deadline: '#f59e0b',
  holiday:  '#ef4444',
  meeting:  '#a855f7',
};

/**
 * Alumni Calendar screen with month view and event list.
 */
export function CalendarScreen() {
  const [year, setYear] = createSignal(2026);
  const [month, setMonth] = createSignal(1); // February = 1
  const [selectedDate, setSelectedDate] = createSignal(null);
  const [selectedEvent, setSelectedEvent] = createSignal(null);

  const daysInMonth = () => getDaysInMonth(year(), month());
  const firstDay = () => getFirstDayOfMonth(year(), month());

  const eventsForDate = (day) => {
    const dateStr = `${year()}-${String(month()+1).padStart(2,'0')}-${String(day).padStart(2,'0')}`;
    return calendarEvents.filter(e => e.date === dateStr);
  };

  const monthEvents = () => calendarEvents.filter(e => {
    const [y, m] = e.date.split('-').map(Number);
    return y === year() && m === month() + 1;
  });

  const prevMonth = () => {
    if (month() === 0) { setMonth(11); setYear(y => y - 1); }
    else setMonth(m => m - 1);
  };
  const nextMonth = () => {
    if (month() === 11) { setMonth(0); setYear(y => y + 1); }
    else setMonth(m => m + 1);
  };

  return (
    <div style="padding:20px;max-width:720px;margin:0 auto;animation:fadeIn 0.4s var(--ease-out);">
      {/* Header */}
      <div style="display:flex;align-items:center;gap:10px;margin-bottom:20px;">
        <Icon name="calendar" size={22} color="var(--gold-400)" />
        <div>
          <h1 style="font-family:var(--font-display);font-size:var(--text-xl);font-weight:800;color:#fff;">Alumni Calendar</h1>
          <p style="font-size:var(--text-xs);color:var(--navy-200);">2026 events and activities</p>
        </div>
      </div>

      {/* Calendar Widget */}
      <div style="background:rgba(255,255,255,0.05);border:1px solid rgba(255,255,255,0.08);border-radius:var(--radius-xl);padding:20px;margin-bottom:16px;">
        {/* Month Nav */}
        <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:16px;">
          <button onClick={prevMonth} style="background:rgba(255,255,255,0.1);border:none;border-radius:var(--radius-md);width:32px;height:32px;display:flex;align-items:center;justify-content:center;cursor:pointer;color:#fff;"><Icon name="chevron-left" size={16} /></button>
          <span style="font-family:var(--font-display);font-weight:600;font-size:var(--text-base);color:#fff;">{MONTHS[month()]} {year()}</span>
          <button onClick={nextMonth} style="background:rgba(255,255,255,0.1);border:none;border-radius:var(--radius-md);width:32px;height:32px;display:flex;align-items:center;justify-content:center;cursor:pointer;color:#fff;"><Icon name="chevron-right" size={16} /></button>
        </div>

        {/* Day Headers */}
        <div style="display:grid;grid-template-columns:repeat(7,1fr);margin-bottom:8px;">
          <For each={DAYS}>
            {(d) => <div style="text-align:center;font-size:var(--text-xs);font-weight:600;color:var(--navy-200);padding:4px 0;">{d}</div>}
          </For>
        </div>

        {/* Days Grid */}
        <div style="display:grid;grid-template-columns:repeat(7,1fr);gap:2px;">
          {/* Empty cells for first day */}
          <For each={Array(firstDay()).fill(null)}>
            {() => <div />}
          </For>
          <For each={Array.from({ length: daysInMonth() }, (_, i) => i + 1)}>
            {(day) => {
              const dayEvents = eventsForDate(day);
              const isSelected = () => selectedDate() === day;
              return (
                <button
                  onClick={() => { setSelectedDate(day === selectedDate() ? null : day); }}
                  style={`
                    aspect-ratio:1;border-radius:var(--radius-md);display:flex;flex-direction:column;
                    align-items:center;justify-content:flex-start;padding:4px 2px;
                    background:${isSelected() ? 'rgba(255,255,255,0.15)' : 'transparent'};
                    border:${isSelected() ? '1.5px solid rgba(255,255,255,0.3)' : '1px solid transparent'};
                    cursor:pointer;transition:all 150ms;color:#fff;font-size:var(--text-xs);font-family:var(--font-body);
                  `}
                  onMouseEnter={e => { if (!isSelected()) e.currentTarget.style.background='rgba(255,255,255,0.07)'; }}
                  onMouseLeave={e => { if (!isSelected()) e.currentTarget.style.background='transparent'; }}
                >
                  <span>{day}</span>
                  <Show when={dayEvents.length > 0}>
                    <div style="display:flex;gap:2px;flex-wrap:wrap;justify-content:center;margin-top:2px;">
                      <For each={dayEvents.slice(0, 2)}>
                        {(ev) => <span style={`width:5px;height:5px;border-radius:50%;background:${typeColor[ev.type]||'#fff'};flex-shrink:0;`} />}
                      </For>
                    </div>
                  </Show>
                </button>
              );
            }}
          </For>
        </div>
      </div>

      {/* Legend */}
      <div style="background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.06);border-radius:var(--radius-lg);padding:12px 16px;margin-bottom:16px;">
        <div style="font-weight:600;font-size:var(--text-xs);color:var(--navy-200);margin-bottom:8px;">Legend</div>
        <div style="display:flex;gap:16px;flex-wrap:wrap;">
          <For each={Object.entries(typeColor)}>
            {([type, color]) => (
              <div style="display:flex;align-items:center;gap:6px;">
                <span style={`width:8px;height:8px;border-radius:50%;background:${color};`} />
                <span style="font-size:var(--text-xs);color:rgba(255,255,255,0.7);text-transform:capitalize;">{type}</span>
              </div>
            )}
          </For>
        </div>
      </div>

      {/* Events List */}
      <div>
        <h3 style="font-family:var(--font-display);font-weight:700;font-size:var(--text-base);color:#fff;margin-bottom:12px;">Events in {MONTHS[month()]}</h3>
        <For each={monthEvents()}>
          {(ev) => (
            <button
              onClick={() => setSelectedEvent(ev)}
              style={`
                width:100%;display:flex;gap:14px;align-items:flex-start;
                padding:14px 16px;background:rgba(255,255,255,0.04);
                border:1px solid rgba(255,255,255,0.06);
                border-left:3px solid ${typeColor[ev.type]||'#fff'};
                border-radius:var(--radius-lg);margin-bottom:10px;
                cursor:pointer;text-align:left;transition:all 150ms;
              `}
              onMouseEnter={e => e.currentTarget.style.background='rgba(255,255,255,0.08)'}
              onMouseLeave={e => e.currentTarget.style.background='rgba(255,255,255,0.04)'}
            >
              <div style="flex:1;">
                <div style="display:flex;align-items:center;gap:8px;margin-bottom:4px;">
                  <span class={`badge badge-${ev.type}`}>{ev.type}</span>
                  <span style="font-size:var(--text-xs);color:var(--navy-200);">{ev.date.split('-').slice(1).reverse().join(' ').replace('-',' ')}</span>
                </div>
                <div style="font-weight:600;font-size:var(--text-sm);color:#fff;">{ev.title}</div>
                <Show when={ev.time && ev.time !== 'All Day'}>
                  <div style="font-size:var(--text-xs);color:var(--navy-200);margin-top:3px;">🕐 {ev.time}</div>
                </Show>
                <Show when={ev.location}>
                  <div style="font-size:var(--text-xs);color:var(--text-muted);margin-top:2px;">📍 {ev.location}</div>
                </Show>
              </div>
            </button>
          )}
        </For>
      </div>

      {/* Event Detail Modal */}
      <Show when={selectedEvent()}>
        <div style="position:fixed;inset:0;background:rgba(0,0,0,0.6);z-index:300;display:flex;align-items:flex-end;justify-content:center;padding:20px;" onClick={() => setSelectedEvent(null)}>
          <div style="background:#fff;border-radius:var(--radius-2xl) var(--radius-2xl) var(--radius-xl) var(--radius-xl);padding:24px;width:100%;max-width:480px;animation:fadeIn 0.2s var(--ease-out);" onClick={e => e.stopPropagation()}>
            <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:16px;">
              <h3 style="font-family:var(--font-display);font-weight:700;font-size:var(--text-lg);color:var(--navy-900);">Event Details</h3>
              <button onClick={() => setSelectedEvent(null)} style="background:var(--surface-2);border:none;border-radius:50%;width:30px;height:30px;display:flex;align-items:center;justify-content:center;cursor:pointer;"><Icon name="x" size={15} /></button>
            </div>
            <div style="display:flex;align-items:center;gap:8px;margin-bottom:14px;">
              <span class={`badge badge-${selectedEvent()?.type}`}>{selectedEvent()?.type}</span>
              <span style={`width:10px;height:10px;border-radius:50%;background:${typeColor[selectedEvent()?.type]};`} />
            </div>
            <h4 style="font-family:var(--font-display);font-weight:800;font-size:var(--text-xl);color:var(--navy-900);margin-bottom:16px;">{selectedEvent()?.title}</h4>
            {[
              { icon:'calendar', label:'Date', value: selectedEvent()?.date },
              { icon:'clock',    label:'Time', value: selectedEvent()?.time },
              { icon:'map-pin',  label:'Location', value: selectedEvent()?.location },
            ].filter(f => f.value).map(f => (
              <div style="display:flex;gap:12px;align-items:flex-start;margin-bottom:12px;">
                <div style="width:38px;height:38px;background:var(--surface-1);border-radius:var(--radius-md);display:flex;align-items:center;justify-content:center;flex-shrink:0;"><Icon name={f.icon} size={16} color="var(--navy-500)" /></div>
                <div><div style="font-size:var(--text-xs);color:var(--text-muted);">{f.label}</div><div style="font-weight:600;font-size:var(--text-sm);color:var(--navy-900);">{f.value}</div></div>
              </div>
            ))}
            <Show when={selectedEvent()?.description}>
              <div style="margin-bottom:14px;"><div style="font-size:var(--text-xs);font-weight:600;color:var(--text-muted);margin-bottom:4px;">Description</div><p style="font-size:var(--text-sm);color:var(--text-secondary);line-height:1.5;">{selectedEvent()?.description}</p></div>
            </Show>
            <div style="background:rgba(59,130,246,0.08);border-radius:var(--radius-md);padding:10px 12px;margin-bottom:16px;font-size:var(--text-xs);color:var(--navy-600);">
              <strong>Interested?</strong> Visit the Events tab to register for this event.
            </div>
            <button onClick={() => setSelectedEvent(null)} style="width:100%;background:var(--navy-800);color:#fff;border:none;border-radius:var(--radius-md);padding:13px;font-family:var(--font-display);font-weight:600;font-size:var(--text-sm);cursor:pointer;">Close</button>
          </div>
        </div>
      </Show>
    </div>
  );
}

export default CalendarScreen;
