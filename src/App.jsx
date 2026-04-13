// ============================================
// App.jsx — Root application shell
// Manages global navigation state, sidebar,
// topbar, and screen routing.
// ============================================
import { createSignal, Show, Switch, Match } from 'solid-js';

// Layout
import { Sidebar }             from './components/layout/Sidebar.jsx';
import { Topbar }              from './components/layout/Topbar.jsx';
import { NotificationsPanel }  from './components/ui/NotificationsPanel.jsx';

// Auth
import { LoginScreen, SignUpScreen } from './components/screens/AuthScreens.jsx';

// App screens
import { DashboardScreen }   from './components/screens/DashboardScreen.jsx';
import { NewsScreen }        from './components/screens/NewsScreen.jsx';
import { ProfileScreen }     from './components/screens/ProfileScreen.jsx';
import { CalendarScreen }    from './components/screens/CalendarScreen.jsx';
import { EventsScreen }      from './components/screens/EventsScreen.jsx';
import {
  MentorshipScreen,
  JobsScreen,
  DocumentsScreen,
  DonationScreen,
  PlaceholderScreen,
} from './components/screens/OtherScreens.jsx';

import { notifications } from './data/mockData.js';

/** Top-level screen titles for the Topbar */
const SCREEN_TITLES = {
  dashboard:  'Home',
  news:       'News & Updates',
  profile:    'My Profile',
  calendar:   'Alumni Calendar',
  events:     'Networking & Events',
  documents:  'Document Request',
  jobs:       'Job Opportunities',
  career:     'Career Opportunities',
  donation:   'Donation',
  mentorship: 'Mentorship',
  settings:   'Settings',
};

export default function App() {
  // ── Auth state ──────────────────────────────────────
  const [authScreen, setAuthScreen] = createSignal('login'); // 'login' | 'signup' | 'app'

  // ── Navigation ──────────────────────────────────────
  const [activeScreen, setActiveScreen] = createSignal('dashboard');
  const [sidebarOpen, setSidebarOpen]   = createSignal(false);
  const [showNotifs,  setShowNotifs]    = createSignal(false);

  const unreadCount = () => notifications.filter(n => n.unread).length;

  const navigate = (screen) => {
    if (screen === 'login') { setAuthScreen('login'); return; }
    setActiveScreen(screen);
  };

  // ── Auth screens ────────────────────────────────────
  return (
    <Show
      when={authScreen() === 'app'}
      fallback={
        <Switch>
          <Match when={authScreen() === 'signup'}>
            <SignUpScreen
              onSignUp={() => setAuthScreen('app')}
              onGoLogin={() => setAuthScreen('login')}
            />
          </Match>
          <Match when={authScreen() === 'login'}>
            <LoginScreen
              onLogin={() => setAuthScreen('app')}
              onGoSignUp={() => setAuthScreen('signup')}
            />
          </Match>
        </Switch>
      }
    >
      {/* ── App Shell ─────────────────────────────── */}
      <div style="display:flex;width:100%;min-height:100vh;background:var(--navy-900);">

        {/* Sidebar */}
        <Sidebar
          activeScreen={activeScreen}
          onNavigate={navigate}
          isOpen={sidebarOpen()}
          onClose={() => setSidebarOpen(false)}
        />

        {/* Main content area */}
        <div style="flex:1;display:flex;flex-direction:column;min-width:0;min-height:100vh;">

          {/* Topbar */}
          <Topbar
            onMenuClick={() => setSidebarOpen(true)}
            onNotificationsClick={() => setShowNotifs(v => !v)}
            unreadCount={unreadCount()}
            title={SCREEN_TITLES[activeScreen()]}
          />

          {/* Screen content */}
          <main style="flex:1;overflow-y:auto;overflow-x:hidden;">
            <Switch fallback={
              <PlaceholderScreen
                title={SCREEN_TITLES[activeScreen()] || 'Coming Soon'}
                icon="info"
                description="This section is under development and will be available soon."
              />
            }>
              <Match when={activeScreen() === 'dashboard'}>
                <DashboardScreen onNavigate={navigate} />
              </Match>
              <Match when={activeScreen() === 'news'}>
                <NewsScreen />
              </Match>
              <Match when={activeScreen() === 'profile'}>
                <ProfileScreen />
              </Match>
              <Match when={activeScreen() === 'calendar'}>
                <CalendarScreen />
              </Match>
              <Match when={activeScreen() === 'events'}>
                <EventsScreen />
              </Match>
              <Match when={activeScreen() === 'documents'}>
                <DocumentsScreen />
              </Match>
              <Match when={activeScreen() === 'jobs'}>
                <JobsScreen />
              </Match>
              <Match when={activeScreen() === 'career'}>
                <MentorshipScreen />
              </Match>
              <Match when={activeScreen() === 'donation'}>
                <DonationScreen />
              </Match>
              <Match when={activeScreen() === 'settings'}>
                <PlaceholderScreen
                  title="Account Settings"
                  icon="settings"
                  description="Manage your account preferences, privacy settings, and notifications."
                />
              </Match>
            </Switch>
          </main>
        </div>

        {/* Notifications panel overlay */}
        <Show when={showNotifs()}>
          <NotificationsPanel onClose={() => setShowNotifs(false)} />
        </Show>
      </div>
    </Show>
  );
}
