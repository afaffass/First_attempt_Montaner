// ============================================
// Auth Screens — Login & Sign Up
// ============================================
import { createSignal, Show } from 'solid-js';
import { Icon } from '../ui/Icons.jsx';
import { Button } from '../ui/Button.jsx';

/**
 * Login screen with email/password form and social login options.
 */
export function LoginScreen({ onLogin, onGoSignUp }) {
  const [showPass, setShowPass] = createSignal(false);
  const [email, setEmail] = createSignal('');
  const [password, setPassword] = createSignal('');

  const handleLogin = (e) => {
    e.preventDefault();
    onLogin();
  };

  return (
    <div style={`
      min-height:100vh; display:flex; flex-direction:column;
      background: linear-gradient(160deg, var(--navy-900) 0%, var(--navy-800) 60%, #1a1060 100%);
      align-items:center; justify-content:center; padding:20px;
    `}>
      {/* Logo area */}
      <div style="text-align:center;margin-bottom:32px;animation:fadeIn 0.6s var(--ease-out);">
        <div style="width:80px;height:80px;background:rgba(255,255,255,0.1);border-radius:50%;display:flex;align-items:center;justify-content:center;margin:0 auto 16px;border:2px solid rgba(212,160,23,0.4);">
          <svg viewBox="0 0 80 80" width="80" height="80">
            <text x="40" y="54" text-anchor="middle" font-size="38" fill="#d4a017" font-family="serif" font-weight="bold">A</text>
          </svg>
        </div>
        <h1 style="font-family:var(--font-display);font-size:var(--text-xl);font-weight:800;color:#fff;margin-bottom:4px;">Alumni Career Hub</h1>
        <p style="font-size:var(--text-sm);color:var(--navy-200);">Ateneo de Davao University</p>
      </div>

      {/* Card */}
      <div style={`
        background:var(--surface-0); border-radius:var(--radius-2xl);
        padding:36px 32px; width:100%; max-width:440px;
        box-shadow:var(--shadow-xl);
        animation:scaleIn 0.5s var(--ease-out);
      `}>
        <h2 style="font-family:var(--font-display);font-size:var(--text-2xl);font-weight:700;color:var(--navy-900);margin-bottom:6px;">Welcome Back</h2>
        <p style="font-size:var(--text-sm);color:var(--text-secondary);margin-bottom:28px;">Sign in to continue to your career passport</p>

        <form onSubmit={handleLogin}>
          {/* Email */}
          <div style="margin-bottom:16px;">
            <label style="display:block;font-size:var(--text-sm);font-weight:600;color:var(--navy-800);margin-bottom:6px;">Email Address</label>
            <div style="position:relative;">
              <span style="position:absolute;left:14px;top:50%;transform:translateY(-50%);">
                <Icon name="mail" size={16} color="var(--navy-300)" />
              </span>
              <input
                type="email" placeholder="Enter your email"
                value={email()} onInput={e => setEmail(e.target.value)}
                style="width:100%;padding:12px 14px 12px 42px;border:1.5px solid #e2e8f0;border-radius:var(--radius-md);font-size:var(--text-sm);font-family:var(--font-body);color:var(--navy-900);background:var(--surface-1);transition:border-color 150ms;outline:none;"
                onFocus={e => e.target.style.borderColor='var(--navy-500)'}
                onBlur={e => e.target.style.borderColor='#e2e8f0'}
              />
            </div>
          </div>

          {/* Password */}
          <div style="margin-bottom:10px;">
            <label style="display:block;font-size:var(--text-sm);font-weight:600;color:var(--navy-800);margin-bottom:6px;">Password</label>
            <div style="position:relative;">
              <span style="position:absolute;left:14px;top:50%;transform:translateY(-50%);">
                <Icon name="eye-off" size={16} color="var(--navy-300)" />
              </span>
              <input
                type={showPass() ? 'text' : 'password'}
                placeholder="Enter your password"
                value={password()} onInput={e => setPassword(e.target.value)}
                style="width:100%;padding:12px 44px 12px 42px;border:1.5px solid #e2e8f0;border-radius:var(--radius-md);font-size:var(--text-sm);font-family:var(--font-body);color:var(--navy-900);background:var(--surface-1);outline:none;transition:border-color 150ms;"
                onFocus={e => e.target.style.borderColor='var(--navy-500)'}
                onBlur={e => e.target.style.borderColor='#e2e8f0'}
              />
              <button type="button" onClick={() => setShowPass(v => !v)}
                style="position:absolute;right:14px;top:50%;transform:translateY(-50%);background:none;border:none;cursor:pointer;">
                <Icon name={showPass() ? 'eye-off' : 'eye'} size={16} color="var(--navy-300)" />
              </button>
            </div>
          </div>

          {/* Remember / Forgot */}
          <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:20px;">
            <label style="display:flex;align-items:center;gap:8px;font-size:var(--text-xs);color:var(--text-secondary);cursor:pointer;">
              <input type="checkbox" style="accent-color:var(--navy-600);" />
              Remember me
            </label>
            <button type="button" style="background:none;border:none;font-size:var(--text-xs);font-weight:600;color:var(--navy-600);cursor:pointer;font-family:var(--font-body);">
              Forgot Password?
            </button>
          </div>

          <Button type="submit" variant="dark" fullWidth size="lg" style="margin-bottom:16px;">
            Sign In
          </Button>
        </form>

        {/* Divider */}
        <div style="display:flex;align-items:center;gap:12px;margin-bottom:16px;">
          <div style="flex:1;height:1px;background:#e2e8f0;" />
          <span style="font-size:var(--text-xs);color:var(--text-muted);">or continue with</span>
          <div style="flex:1;height:1px;background:#e2e8f0;" />
        </div>

        {/* Social */}
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-bottom:24px;">
          {['Google', 'Facebook'].map(p => (
            <button style="display:flex;align-items:center;justify-content:center;gap:8px;padding:10px;border:1.5px solid #e2e8f0;border-radius:var(--radius-md);background:#fff;font-size:var(--text-sm);font-weight:500;color:var(--navy-800);cursor:pointer;font-family:var(--font-body);transition:border-color 150ms;"
              onMouseEnter={e => e.currentTarget.style.borderColor='var(--navy-400)'}
              onMouseLeave={e => e.currentTarget.style.borderColor='#e2e8f0'}
            >
              {p}
            </button>
          ))}
        </div>

        <p style="text-align:center;font-size:var(--text-sm);color:var(--text-secondary);">
          Don't have an account?{' '}
          <button onClick={onGoSignUp} style="background:none;border:none;font-weight:700;color:var(--navy-700);cursor:pointer;font-family:var(--font-body);font-size:var(--text-sm);">
            Sign Up
          </button>
        </p>
      </div>
    </div>
  );
}

/**
 * Sign Up screen.
 */
export function SignUpScreen({ onSignUp, onGoLogin }) {
  const [showPass, setShowPass] = createSignal(false);
  const [agreed, setAgreed] = createSignal(false);

  return (
    <div style={`
      min-height:100vh; display:flex; flex-direction:column;
      background: linear-gradient(160deg, var(--navy-900) 0%, var(--navy-800) 60%, #1a1060 100%);
      align-items:center; justify-content:center; padding:20px;
    `}>
      {/* Logo */}
      <div style="text-align:center;margin-bottom:24px;">
        <div style="width:70px;height:70px;background:rgba(255,255,255,0.1);border-radius:50%;display:flex;align-items:center;justify-content:center;margin:0 auto 12px;border:2px solid rgba(212,160,23,0.4);">
          <svg viewBox="0 0 70 70" width="70" height="70"><text x="35" y="48" text-anchor="middle" font-size="34" fill="#d4a017" font-family="serif" font-weight="bold">A</text></svg>
        </div>
        <h1 style="font-family:var(--font-display);font-size:var(--text-lg);font-weight:800;color:#fff;margin-bottom:2px;">Join the Alumni Network</h1>
        <p style="font-size:var(--text-xs);color:var(--navy-200);">Ateneo de Davao University</p>
      </div>

      {/* Card */}
      <div style="background:var(--surface-0);border-radius:var(--radius-2xl);padding:32px;width:100%;max-width:440px;box-shadow:var(--shadow-xl);">
        <h2 style="font-family:var(--font-display);font-size:var(--text-xl);font-weight:700;color:var(--navy-900);margin-bottom:20px;">Create Account</h2>

        {/* Full Name */}
        <div style="margin-bottom:14px;">
          <label style="display:block;font-size:var(--text-xs);font-weight:600;color:var(--navy-700);margin-bottom:5px;">Full Name</label>
          <div style="position:relative;">
            <span style="position:absolute;left:12px;top:50%;transform:translateY(-50%);"><Icon name="user" size={15} color="var(--navy-300)" /></span>
            <input placeholder="Juan dela Cruz" style="width:100%;padding:10px 12px 10px 36px;border:1.5px solid #e2e8f0;border-radius:var(--radius-md);font-size:var(--text-sm);font-family:var(--font-body);color:var(--navy-900);background:var(--surface-1);outline:none;" onFocus={e=>e.target.style.borderColor='var(--navy-500)'} onBlur={e=>e.target.style.borderColor='#e2e8f0'} />
          </div>
        </div>

        {/* Email */}
        <div style="margin-bottom:14px;">
          <label style="display:block;font-size:var(--text-xs);font-weight:600;color:var(--navy-700);margin-bottom:5px;">Email Address</label>
          <div style="position:relative;">
            <span style="position:absolute;left:12px;top:50%;transform:translateY(-50%);"><Icon name="mail" size={15} color="var(--navy-300)" /></span>
            <input type="email" placeholder="juan.delacruz@addu.edu.ph" style="width:100%;padding:10px 12px 10px 36px;border:1.5px solid #e2e8f0;border-radius:var(--radius-md);font-size:var(--text-sm);font-family:var(--font-body);color:var(--navy-900);background:var(--surface-1);outline:none;" onFocus={e=>e.target.style.borderColor='var(--navy-500)'} onBlur={e=>e.target.style.borderColor='#e2e8f0'} />
          </div>
        </div>

        {/* Student ID + Grad Year */}
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px;margin-bottom:14px;">
          <div>
            <label style="display:block;font-size:var(--text-xs);font-weight:600;color:var(--navy-700);margin-bottom:5px;">Student ID</label>
            <input placeholder="2018-1234" style="width:100%;padding:10px 12px;border:1.5px solid #e2e8f0;border-radius:var(--radius-md);font-size:var(--text-sm);font-family:var(--font-body);color:var(--navy-900);background:var(--surface-1);outline:none;" onFocus={e=>e.target.style.borderColor='var(--navy-500)'} onBlur={e=>e.target.style.borderColor='#e2e8f0'} />
          </div>
          <div>
            <label style="display:block;font-size:var(--text-xs);font-weight:600;color:var(--navy-700);margin-bottom:5px;">Grad Year</label>
            <input placeholder="2022" type="number" style="width:100%;padding:10px 12px;border:1.5px solid #e2e8f0;border-radius:var(--radius-md);font-size:var(--text-sm);font-family:var(--font-body);color:var(--navy-900);background:var(--surface-1);outline:none;" onFocus={e=>e.target.style.borderColor='var(--navy-500)'} onBlur={e=>e.target.style.borderColor='#e2e8f0'} />
          </div>
        </div>

        {/* Program */}
        <div style="margin-bottom:14px;">
          <label style="display:block;font-size:var(--text-xs);font-weight:600;color:var(--navy-700);margin-bottom:5px;">Program / Degree</label>
          <div style="position:relative;">
            <span style="position:absolute;left:12px;top:50%;transform:translateY(-50%);"><Icon name="graduation-cap" size={15} color="var(--navy-300)" /></span>
            <input placeholder="BS Computer Science" style="width:100%;padding:10px 12px 10px 36px;border:1.5px solid #e2e8f0;border-radius:var(--radius-md);font-size:var(--text-sm);font-family:var(--font-body);color:var(--navy-900);background:var(--surface-1);outline:none;" onFocus={e=>e.target.style.borderColor='var(--navy-500)'} onBlur={e=>e.target.style.borderColor='#e2e8f0'} />
          </div>
        </div>

        {/* Password */}
        <div style="margin-bottom:14px;">
          <label style="display:block;font-size:var(--text-xs);font-weight:600;color:var(--navy-700);margin-bottom:5px;">Password</label>
          <div style="position:relative;">
            <span style="position:absolute;left:12px;top:50%;transform:translateY(-50%);"><Icon name="eye-off" size={15} color="var(--navy-300)" /></span>
            <input type={showPass() ? 'text' : 'password'} placeholder="Create a password" style="width:100%;padding:10px 38px 10px 36px;border:1.5px solid #e2e8f0;border-radius:var(--radius-md);font-size:var(--text-sm);font-family:var(--font-body);color:var(--navy-900);background:var(--surface-1);outline:none;" onFocus={e=>e.target.style.borderColor='var(--navy-500)'} onBlur={e=>e.target.style.borderColor='#e2e8f0'} />
            <button type="button" onClick={() => setShowPass(v=>!v)} style="position:absolute;right:12px;top:50%;transform:translateY(-50%);background:none;border:none;cursor:pointer;"><Icon name={showPass()?'eye-off':'eye'} size={15} color="var(--navy-300)" /></button>
          </div>
        </div>

        {/* Confirm Password */}
        <div style="margin-bottom:18px;">
          <label style="display:block;font-size:var(--text-xs);font-weight:600;color:var(--navy-700);margin-bottom:5px;">Confirm Password</label>
          <div style="position:relative;">
            <span style="position:absolute;left:12px;top:50%;transform:translateY(-50%);"><Icon name="eye-off" size={15} color="var(--navy-300)" /></span>
            <input type="password" placeholder="Re-enter your password" style="width:100%;padding:10px 12px 10px 36px;border:1.5px solid #e2e8f0;border-radius:var(--radius-md);font-size:var(--text-sm);font-family:var(--font-body);color:var(--navy-900);background:var(--surface-1);outline:none;" onFocus={e=>e.target.style.borderColor='var(--navy-500)'} onBlur={e=>e.target.style.borderColor='#e2e8f0'} />
          </div>
        </div>

        {/* Terms */}
        <label style="display:flex;align-items:flex-start;gap:10px;margin-bottom:20px;cursor:pointer;">
          <input type="checkbox" checked={agreed()} onChange={e => setAgreed(e.target.checked)} style="margin-top:2px;accent-color:var(--navy-600);flex-shrink:0;" />
          <span style="font-size:var(--text-xs);color:var(--text-secondary);line-height:1.5;">
            I agree to the{' '}
            <span style="font-weight:700;color:var(--navy-700);">Terms and Conditions</span>
            {' '}and{' '}
            <span style="font-weight:700;color:var(--navy-700);">Privacy Policy</span>
          </span>
        </label>

        <Button variant="dark" fullWidth size="lg" style="margin-bottom:14px;" onClick={onSignUp}>
          Create Account
        </Button>

        {/* Divider */}
        <div style="display:flex;align-items:center;gap:12px;margin-bottom:14px;">
          <div style="flex:1;height:1px;background:#e2e8f0;" /><span style="font-size:var(--text-xs);color:var(--text-muted);">or sign up with</span><div style="flex:1;height:1px;background:#e2e8f0;" />
        </div>
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-bottom:20px;">
          {['Google', 'Facebook'].map(p => (<button style="padding:10px;border:1.5px solid #e2e8f0;border-radius:var(--radius-md);background:#fff;font-size:var(--text-sm);font-weight:500;color:var(--navy-800);cursor:pointer;font-family:var(--font-body);">{p}</button>))}
        </div>

        <p style="text-align:center;font-size:var(--text-sm);color:var(--text-secondary);">
          Already have an account?{' '}
          <button onClick={onGoLogin} style="background:none;border:none;font-weight:700;color:var(--navy-700);cursor:pointer;font-family:var(--font-body);font-size:var(--text-sm);">Sign In</button>
        </p>
      </div>
    </div>
  );
}
