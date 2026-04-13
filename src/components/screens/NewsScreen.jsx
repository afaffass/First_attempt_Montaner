// ============================================
// News & Updates Screen
// ============================================
import { createSignal, For, Show } from 'solid-js';
import { newsItems } from '../../data/mockData.js';

const TABS = ['All News', 'University', 'Alumni', 'Achievements'];
const TAB_KEYS = ['all', 'university', 'alumni', 'achievement'];

function NewsCard({ item, featured }) {
  if (featured) {
    return (
      <div style={`
        border-radius:var(--radius-xl); overflow:hidden;
        background:rgba(255,255,255,0.05);border:1px solid rgba(255,255,255,0.07);
        margin-bottom:14px; cursor:pointer; transition:all 200ms;
      `}
        onMouseEnter={e => e.currentTarget.style.transform='translateY(-2px)'}
        onMouseLeave={e => e.currentTarget.style.transform='translateY(0)'}
      >
        <div style="position:relative;height:200px;overflow:hidden;">
          <img src={item.image} alt={item.title} style="width:100%;height:100%;object-fit:cover;" loading="lazy" />
          <div style="position:absolute;inset:0;background:linear-gradient(to top,rgba(10,14,42,0.9) 0%,transparent 60%);" />
          <div style="position:absolute;bottom:14px;left:16px;right:16px;">
            <div style="display:flex;align-items:center;gap:8px;margin-bottom:6px;">
              <span class={`badge badge-${item.category}`}>{item.category}</span>
              <span style="font-size:var(--text-xs);color:rgba(255,255,255,0.6);">{item.date}</span>
            </div>
            <h3 style="font-family:var(--font-display);font-weight:700;font-size:var(--text-md);color:#fff;line-height:1.3;">{item.title}</h3>
          </div>
        </div>
        <div style="padding:14px 16px;">
          <p style="font-size:var(--text-sm);color:var(--navy-200);line-height:1.6;margin-bottom:10px;">{item.excerpt}</p>
          <div style="display:flex;align-items:center;gap:6px;">
            <span style="font-size:var(--text-xs);color:var(--text-muted);">👤 {item.author}</span>
            <span style="color:var(--gold-400);font-size:var(--text-xs);font-weight:600;margin-left:auto;">Read more →</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={`
      display:flex;gap:12px;padding:14px;
      background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.06);
      border-radius:var(--radius-lg);cursor:pointer;margin-bottom:10px;transition:all 200ms;
    `}
      onMouseEnter={e => e.currentTarget.style.background='rgba(255,255,255,0.08)'}
      onMouseLeave={e => e.currentTarget.style.background='rgba(255,255,255,0.04)'}
    >
      <div style="width:80px;height:72px;border-radius:var(--radius-md);overflow:hidden;flex-shrink:0;">
        <img src={item.image} alt={item.title} style="width:100%;height:100%;object-fit:cover;" loading="lazy" />
      </div>
      <div style="flex:1;min-width:0;">
        <div style="display:flex;align-items:center;gap:6px;margin-bottom:5px;">
          <span class={`badge badge-${item.category}`}>{item.category}</span>
          <span style="font-size:var(--text-xs);color:var(--text-muted);">→</span>
        </div>
        <h3 style="font-family:var(--font-display);font-weight:600;font-size:var(--text-sm);color:#fff;line-height:1.3;margin-bottom:4px;overflow:hidden;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;">{item.title}</h3>
        <p style="font-size:var(--text-xs);color:var(--navy-200);overflow:hidden;white-space:nowrap;text-overflow:ellipsis;">{item.excerpt}</p>
        <span style="font-size:var(--text-xs);color:var(--text-muted);margin-top:3px;display:block;">🕐 {item.date}</span>
      </div>
    </div>
  );
}

/**
 * News & Updates screen with category tabs.
 */
export function NewsScreen() {
  const [activeTab, setActiveTab] = createSignal('all');

  const filtered = () => {
    if (activeTab() === 'all') return newsItems;
    return newsItems.filter(n => n.category === activeTab());
  };

  const featuredItem = () => filtered().find(n => n.featured) || filtered()[0];
  const otherItems = () => filtered().filter(n => n !== featuredItem());

  const tabLabel = () => TABS[TAB_KEYS.indexOf(activeTab())];

  return (
    <div style="padding:24px 20px;max-width:720px;margin:0 auto;animation:fadeIn 0.4s var(--ease-out);">
      {/* Header */}
      <div style="display:flex;align-items:center;justify-content:center;margin-bottom:20px;">
        <div style="text-align:center;">
          <h1 style="font-family:var(--font-display);font-size:var(--text-xl);font-weight:800;color:#fff;">News & Updates</h1>
          <p style="font-size:var(--text-xs);color:var(--navy-200);margin-top:3px;">Stay informed with the latest from AdDU</p>
        </div>
      </div>

      {/* Tabs */}
      <div style="display:flex;gap:8px;overflow-x:auto;padding-bottom:4px;margin-bottom:20px;scrollbar-width:none;">
        <For each={TABS}>
          {(tab, i) => {
            const key = () => TAB_KEYS[i()];
            const isActive = () => activeTab() === key();
            return (
              <button
                onClick={() => setActiveTab(key())}
                style={`
                  padding:6px 16px;border-radius:var(--radius-full);
                  font-size:var(--text-xs);font-weight:600;font-family:var(--font-display);
                  white-space:nowrap;cursor:pointer;border:none;transition:all 150ms;
                  background:${isActive() ? 'var(--gold-400)' : 'rgba(255,255,255,0.08)'};
                  color:${isActive() ? 'var(--navy-900)' : 'rgba(255,255,255,0.7)'};
                `}
              >{tab}</button>
            );
          }}
        </For>
      </div>

      {/* Content */}
      <Show when={activeTab() === 'all'}>
        <div style="font-family:var(--font-display);font-weight:700;font-size:var(--text-sm);color:var(--navy-200);text-transform:uppercase;letter-spacing:0.08em;margin-bottom:14px;">Featured Stories</div>
      </Show>
      <Show when={activeTab() !== 'all'}>
        <div style="font-family:var(--font-display);font-weight:700;font-size:var(--text-md);color:#fff;margin-bottom:14px;">{tabLabel()}</div>
      </Show>

      <Show when={activeTab() === 'all' && featuredItem()}>
        <NewsCard item={featuredItem()} featured />
      </Show>

      <For each={activeTab() === 'all' ? otherItems() : filtered()}>
        {(item) => <NewsCard item={item} />}
      </For>
    </div>
  );
}

export default NewsScreen;
