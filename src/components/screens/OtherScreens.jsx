// ============================================
// Mentorship Screen
// ============================================
import { createSignal, For, Show } from 'solid-js';
import { Icon } from '../ui/Icons.jsx';
import { Avatar } from '../ui/Avatar.jsx';
import { Button } from '../ui/Button.jsx';
import { mentors, jobs } from '../../data/mockData.js';

/**
 * Mentorship & Training screen with mentor cards.
 */
export function MentorshipScreen() {
  const [search, setSearch] = createSignal('');
  const [selectedMentor, setSelectedMentor] = createSignal(null);

  const filtered = () => !search()
    ? mentors
    : mentors.filter(m =>
        m.name.toLowerCase().includes(search().toLowerCase()) ||
        m.skills.some(s => s.toLowerCase().includes(search().toLowerCase()))
      );

  return (
    <div style="padding:0;max-width:720px;margin:0 auto;animation:fadeIn 0.4s var(--ease-out);">
      <div style="background:linear-gradient(135deg,var(--navy-800),var(--navy-700));padding:20px 20px 16px;">
        <div style="display:flex;align-items:center;gap:10px;margin-bottom:4px;">
          <button style="background:rgba(255,255,255,0.1);border:none;border-radius:var(--radius-md);width:32px;height:32px;display:flex;align-items:center;justify-content:center;cursor:pointer;color:#fff;"><Icon name="chevron-left" size={18} /></button>
          <h1 style="font-family:var(--font-display);font-weight:700;font-size:var(--text-lg);color:#fff;">Mentorship & Training</h1>
        </div>
        <p style="font-size:var(--text-xs);color:rgba(255,255,255,0.7);margin-bottom:14px;margin-left:42px;">Find experienced alumni mentors based on your career field and goals.</p>
        <div style="position:relative;margin-bottom:4px;">
          <span style="position:absolute;left:14px;top:50%;transform:translateY(-50%);"><Icon name="search" size={16} color="rgba(255,255,255,0.5)" /></span>
          <input value={search()} onInput={e => setSearch(e.target.value)} placeholder="Search by name, industry, or expertise..."
            style="width:100%;padding:10px 14px 10px 40px;background:rgba(255,255,255,0.1);border:1.5px solid rgba(255,255,255,0.12);border-radius:var(--radius-lg);font-size:var(--text-sm);font-family:var(--font-body);color:#fff;outline:none;" />
        </div>
      </div>

      <div style="padding:16px;background:var(--surface-1);">
        <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:12px;">
          <div style="display:flex;align-items:center;gap:6px;"><Icon name="users" size={16} color="var(--navy-500)" /><h3 style="font-family:var(--font-display);font-weight:700;font-size:var(--text-base);color:var(--navy-900);">Recommended Mentors</h3></div>
          <span style="font-size:var(--text-xs);color:var(--text-muted);">{filtered().length} mentors</span>
        </div>

        <For each={filtered()}>
          {(mentor) => (
            <div style="background:#fff;border-radius:var(--radius-xl);padding:16px;margin-bottom:12px;box-shadow:var(--shadow-sm);">
              <div style="display:flex;gap:12px;margin-bottom:12px;">
                <div style="width:56px;height:56px;border-radius:var(--radius-md);overflow:hidden;flex-shrink:0;">
                  <img src={mentor.image} alt={mentor.name} style="width:100%;height:100%;object-fit:cover;" />
                </div>
                <div style="flex:1;min-width:0;">
                  <div style="display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:4px;">
                    <span style="font-family:var(--font-display);font-weight:700;font-size:var(--text-sm);color:var(--navy-900);">{mentor.name}</span>
                    <div style="display:flex;align-items:center;gap:3px;"><Icon name="star" size={13} color="#f59e0b" /><span style="font-size:var(--text-xs);font-weight:700;color:var(--navy-900);">{mentor.rating}</span></div>
                  </div>
                  <p style="font-size:var(--text-xs);color:var(--text-secondary);">🏢 {mentor.title}</p>
                  <p style="font-size:var(--text-xs);color:var(--text-muted);">{mentor.company}</p>
                </div>
              </div>
              <div style="display:flex;flex-wrap:wrap;gap:8px;margin-bottom:10px;font-size:var(--text-xs);color:var(--text-muted);">
                <span>⏰ {mentor.experience}</span>
                <span>📍 {mentor.location}</span>
                <span style="color:var(--color-success);">🌐 {mentor.mode}</span>
                <span>👥 {mentor.mentees} mentees</span>
              </div>
              <div style="display:flex;flex-wrap:wrap;gap:6px;margin-bottom:10px;">
                <For each={mentor.skills}>
                  {(skill) => <span style="background:rgba(34,53,192,0.08);color:var(--navy-700);font-size:var(--text-xs);padding:3px 10px;border-radius:var(--radius-full);font-weight:500;">{skill}</span>}
                </For>
              </div>
              <p style="font-size:var(--text-xs);color:var(--text-secondary);line-height:1.5;margin-bottom:10px;">{mentor.bio}</p>
              <div style="font-size:var(--text-xs);color:var(--text-muted);margin-bottom:12px;">🎓 {mentor.degree} · 📅 {mentor.batch}</div>
              <div style="display:flex;gap:8px;">
                <button onClick={() => setSelectedMentor(mentor)} style="flex:1;padding:9px;background:var(--surface-1);border:1.5px solid var(--surface-2);border-radius:var(--radius-md);font-family:var(--font-display);font-weight:600;font-size:var(--text-xs);cursor:pointer;color:var(--navy-700);">View Profile →</button>
                <button style="flex:1;padding:9px;background:var(--navy-700);border:none;border-radius:var(--radius-md);font-family:var(--font-display);font-weight:600;font-size:var(--text-xs);cursor:pointer;color:#fff;display:flex;align-items:center;justify-content:center;gap:5px;">
                  <Icon name="send" size={12} /> Request Mentorship
                </button>
              </div>
            </div>
          )}
        </For>
      </div>

      {/* Mentor Detail Modal */}
      <Show when={selectedMentor()}>
        <div style="position:fixed;inset:0;background:rgba(0,0,0,0.6);z-index:300;display:flex;align-items:flex-end;" onClick={() => setSelectedMentor(null)}>
          <div style="background:#fff;border-radius:var(--radius-2xl) var(--radius-2xl) 0 0;padding:24px;width:100%;max-width:480px;margin:0 auto;max-height:80vh;overflow-y:auto;animation:fadeIn 0.2s var(--ease-out);" onClick={e => e.stopPropagation()}>
            <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:16px;">
              <h3 style="font-family:var(--font-display);font-weight:700;font-size:var(--text-lg);color:var(--navy-900);">Mentorship Request</h3>
              <button onClick={() => setSelectedMentor(null)} style="background:var(--surface-2);border:none;border-radius:50%;width:30px;height:30px;display:flex;align-items:center;justify-content:center;cursor:pointer;"><Icon name="x" size={15} /></button>
            </div>
            <div style="display:flex;gap:12px;align-items:center;background:var(--surface-1);padding:14px;border-radius:var(--radius-lg);margin-bottom:16px;">
              <img src={selectedMentor().image} alt="" style="width:52px;height:52px;border-radius:var(--radius-md);object-fit:cover;" />
              <div>
                <div style="font-weight:700;font-size:var(--text-sm);color:var(--navy-900);">{selectedMentor().name}</div>
                <div style="font-size:var(--text-xs);color:var(--text-secondary);">{selectedMentor().title}, {selectedMentor().company}</div>
              </div>
            </div>
            <div style="margin-bottom:14px;">
              <label style="display:block;font-size:var(--text-xs);font-weight:600;color:var(--navy-700);margin-bottom:5px;">Your Goal</label>
              <textarea placeholder="What do you hope to achieve from this mentorship?" style="width:100%;padding:10px 12px;border:1.5px solid #e2e8f0;border-radius:var(--radius-md);font-size:var(--text-sm);font-family:var(--font-body);color:var(--navy-900);background:var(--surface-1);outline:none;min-height:90px;resize:vertical;" onFocus={e=>e.target.style.borderColor='var(--navy-400)'} onBlur={e=>e.target.style.borderColor='#e2e8f0'} />
            </div>
            <button onClick={() => setSelectedMentor(null)} style="width:100%;background:var(--navy-700);color:#fff;border:none;border-radius:var(--radius-lg);padding:13px;font-family:var(--font-display);font-weight:700;font-size:var(--text-base);cursor:pointer;">Send Request</button>
          </div>
        </div>
      </Show>
    </div>
  );
}

/**
 * Jobs Screen.
 */
export function JobsScreen() {
  return (
    <div style="padding:24px 20px;max-width:720px;margin:0 auto;animation:fadeIn 0.4s var(--ease-out);">
      <div style="margin-bottom:20px;">
        <h1 style="font-family:var(--font-display);font-size:var(--text-2xl);font-weight:800;color:#fff;">Job Opportunities</h1>
        <p style="font-size:var(--text-sm);color:var(--navy-200);margin-top:3px;">Curated jobs for AdDU alumni</p>
      </div>
      <For each={jobs}>
        {(job) => (
          <div style="background:rgba(255,255,255,0.05);border:1px solid rgba(255,255,255,0.08);border-radius:var(--radius-xl);padding:18px;margin-bottom:12px;cursor:pointer;transition:all 200ms;"
            onMouseEnter={e => { e.currentTarget.style.background='rgba(255,255,255,0.09)'; e.currentTarget.style.transform='translateY(-2px)'; }}
            onMouseLeave={e => { e.currentTarget.style.background='rgba(255,255,255,0.05)'; e.currentTarget.style.transform='translateY(0)'; }}
          >
            <div style="display:flex;align-items:flex-start;justify-content:space-between;gap:10px;margin-bottom:8px;">
              <h3 style="font-family:var(--font-display);font-weight:700;font-size:var(--text-base);color:#fff;">{job.title}</h3>
              <span style="font-size:var(--text-xs);color:var(--text-muted);white-space:nowrap;flex-shrink:0;">{job.posted}</span>
            </div>
            <p style="font-size:var(--text-sm);font-weight:500;color:var(--navy-200);margin-bottom:4px;">{job.company}</p>
            <div style="display:flex;flex-wrap:wrap;gap:8px;font-size:var(--text-xs);color:var(--text-muted);margin-bottom:8px;">
              <span>📍 {job.location}</span>
              <span>💼 {job.type}</span>
              <span style="color:var(--gold-300);">💰 {job.salary}</span>
            </div>
            <p style="font-size:var(--text-sm);color:var(--navy-200);margin-bottom:10px;line-height:1.5;">{job.description}</p>
            <div style="display:flex;flex-wrap:wrap;gap:6px;margin-bottom:12px;">
              <For each={job.tags}>
                {(tag) => <span style="background:rgba(255,255,255,0.1);color:rgba(255,255,255,0.7);font-size:var(--text-xs);padding:3px 10px;border-radius:var(--radius-full);">{tag}</span>}
              </For>
            </div>
            <button style="background:var(--navy-500);color:#fff;border:none;border-radius:var(--radius-md);padding:8px 20px;font-family:var(--font-display);font-weight:600;font-size:var(--text-sm);cursor:pointer;">Apply Now</button>
          </div>
        )}
      </For>
    </div>
  );
}

/**
 * Documents Screen placeholder.
 */
export function DocumentsScreen() {
  const docTypes = ['Transcript of Records','Certificate of Graduation','Certificate of Good Moral','Diploma Copy','Academic Calendar','Student ID Replacement'];
  return (
    <div style="padding:24px 20px;max-width:720px;margin:0 auto;animation:fadeIn 0.4s var(--ease-out);">
      <h1 style="font-family:var(--font-display);font-size:var(--text-2xl);font-weight:800;color:#fff;margin-bottom:4px;">Document Request</h1>
      <p style="font-size:var(--text-sm);color:var(--navy-200);margin-bottom:20px;">Request official university documents</p>
      <div style="background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.07);border-radius:var(--radius-xl);overflow:hidden;">
        <For each={docTypes}>
          {(doc, i) => (
            <button style={`width:100%;display:flex;align-items:center;gap:12px;padding:16px 18px;background:transparent;border:none;${i()<docTypes.length-1?'border-bottom:1px solid rgba(255,255,255,0.06);':''}cursor:pointer;text-align:left;transition:background 150ms;`}
              onMouseEnter={e => e.currentTarget.style.background='rgba(255,255,255,0.07)'}
              onMouseLeave={e => e.currentTarget.style.background='transparent'}
            >
              <div style="width:36px;height:36px;background:rgba(34,53,192,0.2);border-radius:var(--radius-md);display:flex;align-items:center;justify-content:center;flex-shrink:0;"><Icon name="file-text" size={17} color="var(--navy-300)" /></div>
              <span style="flex:1;font-size:var(--text-sm);font-weight:500;color:rgba(255,255,255,0.85);">{doc}</span>
              <Icon name="chevron-right" size={15} color="var(--navy-300)" />
            </button>
          )}
        </For>
      </div>
    </div>
  );
}

/**
 * Donation Screen.
 */
export function DonationScreen() {
  const [amount, setAmount] = createSignal('');
  const presets = ['500', '1,000', '2,500', '5,000'];
  return (
    <div style="padding:24px 20px;max-width:720px;margin:0 auto;animation:fadeIn 0.4s var(--ease-out);">
      <div style="text-align:center;margin-bottom:28px;">
        <div style="width:64px;height:64px;background:rgba(220,38,38,0.15);border-radius:50%;display:flex;align-items:center;justify-content:center;margin:0 auto 12px;"><Icon name="heart" size={28} color="#f87171" /></div>
        <h1 style="font-family:var(--font-display);font-size:var(--text-2xl);font-weight:800;color:#fff;">Support AdDU</h1>
        <p style="font-size:var(--text-sm);color:var(--navy-200);margin-top:4px;">Your contribution helps shape the next generation of Ateneans</p>
      </div>
      <div style="background:rgba(255,255,255,0.05);border:1px solid rgba(255,255,255,0.08);border-radius:var(--radius-xl);padding:24px;margin-bottom:16px;">
        <h3 style="font-family:var(--font-display);font-weight:700;font-size:var(--text-base);color:#fff;margin-bottom:14px;">Choose Amount</h3>
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-bottom:14px;">
          <For each={presets}>
            {(p) => (
              <button onClick={() => setAmount(p)} style={`padding:12px;border-radius:var(--radius-md);font-family:var(--font-display);font-weight:600;font-size:var(--text-sm);cursor:pointer;border:1.5px solid ${amount()===p?'var(--gold-400)':'rgba(255,255,255,0.15)'};background:${amount()===p?'rgba(212,160,23,0.15)':'rgba(255,255,255,0.05)'};color:${amount()===p?'var(--gold-300)':'rgba(255,255,255,0.8)'};`}>
                ₱{p}
              </button>
            )}
          </For>
        </div>
        <input placeholder="Or enter custom amount" value={amount()} onInput={e => setAmount(e.target.value)}
          style="width:100%;padding:12px 14px;background:rgba(255,255,255,0.08);border:1.5px solid rgba(255,255,255,0.12);border-radius:var(--radius-md);font-size:var(--text-sm);font-family:var(--font-body);color:#fff;outline:none;margin-bottom:16px;"
        />
        <button style="width:100%;background:linear-gradient(135deg,#dc2626,#b91c1c);color:#fff;border:none;border-radius:var(--radius-lg);padding:14px;font-family:var(--font-display);font-weight:700;font-size:var(--text-base);cursor:pointer;display:flex;align-items:center;justify-content:center;gap:8px;">
          <Icon name="heart" size={18} /> Donate {amount() ? `₱${amount()}` : 'Now'}
        </button>
      </div>
    </div>
  );
}

/**
 * Generic placeholder screen for settings etc.
 */
export function PlaceholderScreen({ title, icon, description }) {
  return (
    <div style="padding:24px 20px;max-width:720px;margin:0 auto;display:flex;flex-direction:column;align-items:center;justify-content:center;min-height:60vh;text-align:center;animation:fadeIn 0.4s var(--ease-out);">
      <div style="width:80px;height:80px;background:rgba(255,255,255,0.06);border-radius:50%;display:flex;align-items:center;justify-content:center;margin-bottom:16px;">
        <Icon name={icon || 'info'} size={36} color="var(--navy-300)" />
      </div>
      <h2 style="font-family:var(--font-display);font-size:var(--text-xl);font-weight:700;color:#fff;margin-bottom:8px;">{title}</h2>
      <p style="font-size:var(--text-sm);color:var(--navy-200);max-width:300px;line-height:1.6;">{description || 'This section is coming soon.'}</p>
    </div>
  );
}
