// ============================================
// Profile Screen
// ============================================
import { createSignal, For, Show } from 'solid-js';
import { Icon } from '../ui/Icons.jsx';
import { Avatar } from '../ui/Avatar.jsx';
import { Button } from '../ui/Button.jsx';
import { currentUser, careerMilestones } from '../../data/mockData.js';

/**
 * My Profile screen with personal info, academic records, and career milestones tabs.
 */
export function ProfileScreen() {
  const [subScreen, setSubScreen] = createSignal('main'); // 'main' | 'academic' | 'career'
  const [editing, setEditing] = createSignal(false);
  const [milestones, setMilestones] = createSignal(careerMilestones);
  const [showAddMilestone, setShowAddMilestone] = createSignal(false);
  const [newTitle, setNewTitle] = createSignal('');
  const [newCompany, setNewCompany] = createSignal('');

  const addMilestone = () => {
    if (!newTitle()) return;
    setMilestones(prev => [{ id: `cm${Date.now()}`, title: newTitle(), company: newCompany(), period: '2024 – Present', description: '' }, ...prev]);
    setNewTitle(''); setNewCompany(''); setShowAddMilestone(false);
  };

  const deleteMilestone = (id) => setMilestones(prev => prev.filter(m => m.id !== id));

  // Sub-screens
  if (subScreen() === 'academic') {
    return (
      <div style="padding:0;max-width:720px;margin:0 auto;animation:fadeIn 0.3s var(--ease-out);">
        <div style="background:linear-gradient(135deg,var(--navy-800),var(--navy-700));padding:20px 20px 28px;">
          <button onClick={() => setSubScreen('main')} style="background:rgba(255,255,255,0.1);border:none;border-radius:var(--radius-md);width:34px;height:34px;display:flex;align-items:center;justify-content:center;cursor:pointer;color:#fff;margin-bottom:16px;"><Icon name="chevron-left" size={18} /></button>
          <div style="display:flex;align-items:center;gap:14px;">
            <Avatar initials={currentUser.initials} size={52} />
            <div>
              <h2 style="font-family:var(--font-display);font-weight:700;font-size:var(--text-md);color:#fff;">{currentUser.name}</h2>
              <p style="font-size:var(--text-xs);color:var(--navy-200);">#{currentUser.studentId}</p>
              <p style="font-size:var(--text-xs);color:var(--navy-200);">🎓 {currentUser.degree}</p>
            </div>
          </div>
        </div>
        <div style="padding:20px;background:var(--surface-1);min-height:calc(100vh - 200px);">
          {/* Saved Info */}
          <div style="background:#fff;border-radius:var(--radius-xl);padding:18px;margin-bottom:16px;box-shadow:var(--shadow-sm);">
            <div style="display:flex;align-items:center;gap:10px;margin-bottom:14px;">
              <div style="width:36px;height:36px;background:rgba(34,53,192,0.1);border-radius:var(--radius-md);display:flex;align-items:center;justify-content:center;"><Icon name="graduation-cap" size={18} color="var(--navy-600)" /></div>
              <div><div style="font-weight:600;font-size:var(--text-sm);color:var(--navy-900);">Saved Academic Information</div><div style="font-size:var(--text-xs);color:var(--text-muted);">Auto-synced from university records</div></div>
            </div>
            {[{ label:'Student ID', icon:'#', value:currentUser.studentId }, { label:'Degree Program', icon:'🎓', value:currentUser.degree }].map(f => (
              <div style="display:flex;align-items:center;gap:10px;padding:12px 14px;background:var(--surface-1);border-radius:var(--radius-md);margin-bottom:8px;">
                <span style="font-size:14px;flex-shrink:0;">{f.icon}</span>
                <div style="flex:1;min-width:0;">
                  <div style="font-size:var(--text-xs);color:var(--text-muted);">{f.label}</div>
                  <div style="font-size:var(--text-sm);font-weight:600;color:var(--navy-900);overflow:hidden;text-overflow:ellipsis;white-space:nowrap;">{f.value}</div>
                </div>
                <span style="font-size:var(--text-xs);font-weight:600;color:var(--text-muted);background:var(--surface-2);padding:3px 8px;border-radius:var(--radius-full);">Read-only</span>
              </div>
            ))}
          </div>

          {/* Honors */}
          <div style="background:#fff;border-radius:var(--radius-xl);padding:18px;margin-bottom:16px;box-shadow:var(--shadow-sm);">
            <div style="display:flex;align-items:center;gap:10px;margin-bottom:14px;">
              <div style="width:36px;height:36px;background:rgba(212,160,23,0.15);border-radius:var(--radius-md);display:flex;align-items:center;justify-content:center;"><Icon name="award" size={18} color="#b8860b" /></div>
              <div style="font-weight:600;font-size:var(--text-sm);color:var(--navy-900);">Honors & Awards</div>
            </div>
            <For each={currentUser.honors}>
              {(h, i) => (
                <div style="display:flex;align-items:center;gap:10px;padding:10px 14px;background:var(--surface-1);border-radius:var(--radius-md);margin-bottom:8px;">
                  <span>{i() === 0 ? '🏅' : '⭐'}</span>
                  <span style="font-size:var(--text-sm);font-weight:500;color:var(--navy-800);">{h}</span>
                </div>
              )}
            </For>
          </div>

          <div style="background:rgba(59,130,246,0.08);border-radius:var(--radius-md);padding:12px 14px;margin-bottom:16px;display:flex;gap:8px;">
            <Icon name="info" size={14} color="#60a5fa" style="flex-shrink:0;margin-top:1px;" />
            <p style="font-size:var(--text-xs);color:#93c5fd;line-height:1.5;">This information will be automatically used when applying for alumni services.</p>
          </div>

          <Button variant="dark" fullWidth size="lg">📄 Use This Information for Applications</Button>
          <button style="display:block;width:100%;margin-top:10px;background:none;border:none;color:var(--navy-600);font-size:var(--text-sm);cursor:pointer;font-family:var(--font-body);">✏️ Request a Record Update</button>
        </div>
      </div>
    );
  }

  if (subScreen() === 'career') {
    return (
      <div style="padding:0;max-width:720px;margin:0 auto;animation:fadeIn 0.3s var(--ease-out);">
        <div style="background:linear-gradient(135deg,var(--navy-800),var(--navy-700));padding:20px 20px 28px;">
          <button onClick={() => setSubScreen('main')} style="background:rgba(255,255,255,0.1);border:none;border-radius:var(--radius-md);width:34px;height:34px;display:flex;align-items:center;justify-content:center;cursor:pointer;color:#fff;margin-bottom:16px;"><Icon name="chevron-left" size={18} /></button>
          <div style="display:flex;align-items:center;gap:14px;">
            <Avatar initials={currentUser.initials} size={52} />
            <div>
              <h2 style="font-family:var(--font-display);font-weight:700;font-size:var(--text-md);color:#fff;">{currentUser.name}</h2>
              <p style="font-size:var(--text-xs);color:var(--navy-200);">🎓 {currentUser.degree}</p>
            </div>
          </div>
        </div>
        <div style="padding:20px;background:var(--surface-1);min-height:calc(100vh-200px);">
          <div style="background:#fff;border-radius:var(--radius-xl);padding:18px;box-shadow:var(--shadow-sm);">
            <div style="display:flex;align-items:center;margin-bottom:16px;">
              <div style="display:flex;align-items:center;gap:10px;flex:1;">
                <div style="width:36px;height:36px;background:rgba(212,160,23,0.12);border-radius:var(--radius-md);display:flex;align-items:center;justify-content:center;"><Icon name="briefcase" size={17} color="#b8860b" /></div>
                <div><div style="font-weight:600;font-size:var(--text-sm);color:var(--navy-900);">My Career Milestones</div><div style="font-size:var(--text-xs);color:var(--text-muted);">Track your professional journey</div></div>
              </div>
              <button onClick={() => setShowAddMilestone(true)} style="display:flex;align-items:center;gap:5px;background:var(--navy-700);color:#fff;border:none;border-radius:var(--radius-md);padding:7px 14px;font-size:var(--text-xs);font-weight:600;cursor:pointer;font-family:var(--font-display);">
                <Icon name="plus" size={13} /> Add
              </button>
            </div>

            <Show when={showAddMilestone()}>
              <div style="background:var(--surface-1);border-radius:var(--radius-md);padding:14px;margin-bottom:12px;border:1.5px solid var(--navy-200);">
                <input placeholder="Job Title" value={newTitle()} onInput={e=>setNewTitle(e.target.value)} style="width:100%;padding:8px 12px;border:1.5px solid #e2e8f0;border-radius:var(--radius-md);font-size:var(--text-sm);font-family:var(--font-body);margin-bottom:8px;outline:none;" />
                <input placeholder="Company" value={newCompany()} onInput={e=>setNewCompany(e.target.value)} style="width:100%;padding:8px 12px;border:1.5px solid #e2e8f0;border-radius:var(--radius-md);font-size:var(--text-sm);font-family:var(--font-body);margin-bottom:10px;outline:none;" />
                <div style="display:flex;gap:8px;">
                  <button onClick={addMilestone} style="flex:1;background:var(--navy-700);color:#fff;border:none;border-radius:var(--radius-md);padding:8px;font-size:var(--text-xs);font-weight:600;cursor:pointer;">Save</button>
                  <button onClick={() => setShowAddMilestone(false)} style="background:var(--surface-2);border:none;border-radius:var(--radius-md);padding:8px 14px;font-size:var(--text-xs);cursor:pointer;">Cancel</button>
                </div>
              </div>
            </Show>

            <For each={milestones()}>
              {(m) => (
                <div style="padding:14px;background:var(--surface-1);border-radius:var(--radius-md);margin-bottom:10px;">
                  <div style="display:flex;align-items:flex-start;justify-content:space-between;margin-bottom:4px;">
                    <h4 style="font-weight:700;font-size:var(--text-sm);color:var(--navy-900);">{m.title}</h4>
                    <div style="display:flex;gap:6px;flex-shrink:0;">
                      <button style="background:none;border:none;cursor:pointer;padding:2px;"><Icon name="edit" size={14} color="#93c5fd" /></button>
                      <button onClick={() => deleteMilestone(m.id)} style="background:none;border:none;cursor:pointer;padding:2px;"><Icon name="trash" size={14} color="#fca5a5" /></button>
                    </div>
                  </div>
                  <p style="font-size:var(--text-xs);color:var(--text-secondary);margin-bottom:3px;">🏢 {m.company}</p>
                  <p style="font-size:var(--text-xs);color:var(--text-muted);margin-bottom:6px;">📅 {m.period}</p>
                  <Show when={m.description}>
                    <p style="font-size:var(--text-xs);color:var(--text-secondary);line-height:1.5;">{m.description}</p>
                  </Show>
                </div>
              )}
            </For>

            <div style="background:rgba(59,130,246,0.08);border-radius:var(--radius-md);padding:12px;margin-top:8px;display:flex;gap:8px;">
              <Icon name="info" size={13} color="#60a5fa" style="flex-shrink:0;margin-top:1px;" />
              <p style="font-size:var(--text-xs);color:#93c5fd;">Your milestones help strengthen your alumni profile.</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Main profile
  return (
    <div style="padding:0;max-width:720px;margin:0 auto;animation:fadeIn 0.4s var(--ease-out);">
      {/* Header Banner */}
      <div style="background:linear-gradient(135deg,var(--navy-800),var(--navy-700));padding:20px 20px 28px;position:relative;">
        <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:16px;">
          <h1 style="font-family:var(--font-display);font-weight:700;font-size:var(--text-lg);color:#fff;">My Profile</h1>
          <button onClick={() => setEditing(v=>!v)} style="display:flex;align-items:center;gap:6px;background:var(--navy-500);color:#fff;border:none;border-radius:var(--radius-md);padding:8px 14px;font-size:var(--text-xs);font-weight:600;cursor:pointer;font-family:var(--font-display);">
            <Icon name="edit" size={13} /> {editing() ? 'Save' : 'Edit Profile'}
          </button>
        </div>
        <div style="display:flex;align-items:center;gap:14px;">
          <Avatar initials={currentUser.initials} size={64} />
          <div>
            <h2 style="font-family:var(--font-display);font-weight:700;font-size:var(--text-md);color:#fff;">{currentUser.name}</h2>
            <p style="font-size:var(--text-xs);color:var(--navy-200);margin-top:2px;">{currentUser.batch} • {currentUser.degree.replace('Bachelor of Science in','BS')}</p>
            <div style="display:flex;flex-wrap:wrap;gap:10px;margin-top:6px;">
              {[currentUser.email, currentUser.phone, currentUser.location, currentUser.currentJob].map(v => (
                <span style="font-size:var(--text-xs);color:var(--navy-200);overflow:hidden;text-overflow:ellipsis;white-space:nowrap;max-width:180px;">{v}</span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Personal Info Form */}
      <div style="padding:20px;background:var(--surface-1);">
        <div style="background:#fff;border-radius:var(--radius-xl);padding:20px;margin-bottom:14px;box-shadow:var(--shadow-sm);">
          <h3 style="font-family:var(--font-display);font-weight:700;font-size:var(--text-md);color:var(--navy-900);margin-bottom:16px;">Personal Information</h3>
          <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px;margin-bottom:12px;">
            {[{ label:'First Name', value:'Juan' }, { label:'Last Name', value:'Dela Cruz' }].map(f => (
              <div>
                <label style="display:block;font-size:var(--text-xs);font-weight:600;color:var(--navy-700);margin-bottom:4px;">{f.label}</label>
                <input value={f.value} disabled={!editing()} style={`width:100%;padding:10px 12px;border:1.5px solid ${editing()?'var(--navy-400)':'#e2e8f0'};border-radius:var(--radius-md);font-size:var(--text-sm);font-family:var(--font-body);color:var(--navy-900);background:${editing()?'#fff':'var(--surface-1)'};outline:none;`} />
              </div>
            ))}
          </div>
          <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px;margin-bottom:12px;">
            <div>
              <label style="display:block;font-size:var(--text-xs);font-weight:600;color:var(--navy-700);margin-bottom:4px;">Email Address</label>
              <input value={currentUser.email} disabled={!editing()} style={`width:100%;padding:10px 12px;border:1.5px solid ${editing()?'var(--navy-400)':'#e2e8f0'};border-radius:var(--radius-md);font-size:var(--text-sm);font-family:var(--font-body);color:var(--navy-900);background:${editing()?'#fff':'var(--surface-1)'};outline:none;`} />
            </div>
            <div>
              <label style="display:block;font-size:var(--text-xs);font-weight:600;color:var(--navy-700);margin-bottom:4px;">Phone Number</label>
              <input value={currentUser.phone} disabled={!editing()} style={`width:100%;padding:10px 12px;border:1.5px solid ${editing()?'var(--navy-400)':'#e2e8f0'};border-radius:var(--radius-md);font-size:var(--text-sm);font-family:var(--font-body);color:var(--navy-900);background:${editing()?'#fff':'var(--surface-1)'};outline:none;`} />
            </div>
          </div>
          <div>
            <label style="display:block;font-size:var(--text-xs);font-weight:600;color:var(--navy-700);margin-bottom:4px;">Address</label>
            <input value={currentUser.address} disabled={!editing()} style={`width:100%;padding:10px 12px;border:1.5px solid ${editing()?'var(--navy-400)':'#e2e8f0'};border-radius:var(--radius-md);font-size:var(--text-sm);font-family:var(--font-body);color:var(--navy-900);background:${editing()?'#fff':'var(--surface-1)'};outline:none;`} />
          </div>
        </div>

        {/* Linked Sections */}
        <div style="background:#fff;border-radius:var(--radius-xl);overflow:hidden;box-shadow:var(--shadow-sm);">
          {[
            { icon:'graduation-cap', color:'rgba(34,53,192,0.12)', iconColor:'var(--navy-600)', label:'Academic Records', sub:'View your saved academic information', action:'academic' },
            { icon:'briefcase',      color:'rgba(212,160,23,0.12)', iconColor:'#b8860b',          label:'Career Milestones', sub:'Resume, certificates & credentials',  action:'career' },
            { icon:'settings',      color:'rgba(16,185,129,0.12)', iconColor:'#059669',           label:'Account Settings', sub:'Privacy, security & preferences',       action:'settings' },
          ].map((row, i) => (
            <button
              onClick={() => setSubScreen(row.action)}
              style={`width:100%;display:flex;align-items:center;gap:12px;padding:16px 18px;background:transparent;border:none;cursor:pointer;text-align:left;transition:background 150ms;${i < 2 ? 'border-bottom:1px solid var(--surface-2);' : ''}`}
              onMouseEnter={e => e.currentTarget.style.background='var(--surface-1)'}
              onMouseLeave={e => e.currentTarget.style.background='transparent'}
            >
              <div style={`width:38px;height:38px;border-radius:var(--radius-md);background:${row.color};display:flex;align-items:center;justify-content:center;flex-shrink:0;`}><Icon name={row.icon} size={17} color={row.iconColor} /></div>
              <div style="flex:1;"><div style="font-weight:600;font-size:var(--text-sm);color:var(--navy-900);">{row.label}</div><div style="font-size:var(--text-xs);color:var(--text-muted);margin-top:1px;">{row.sub}</div></div>
              <Icon name="chevron-right" size={16} color="var(--text-muted)" />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ProfileScreen;
