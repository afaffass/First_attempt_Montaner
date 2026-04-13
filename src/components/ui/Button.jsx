// ============================================
// Button Component
// ============================================
import { splitProps } from 'solid-js';

/**
 * Reusable button with multiple variants.
 * variants: 'primary' | 'secondary' | 'ghost' | 'danger' | 'gold'
 */
export function Button(props) {
  const [local, rest] = splitProps(props, ['variant', 'size', 'children', 'fullWidth', 'style']);
  const variant = () => local.variant || 'primary';
  const size = () => local.size || 'md';

  const base = `
    display: inline-flex; align-items: center; justify-content: center;
    gap: 8px; border-radius: var(--radius-md); font-family: var(--font-display);
    font-weight: 600; letter-spacing: 0.01em; transition: all var(--duration-base) var(--ease-out);
    cursor: pointer; border: none; white-space: nowrap;
    ${local.fullWidth ? 'width:100%;' : ''}
    ${local.style || ''}
  `;

  const sizes = {
    sm:  'padding: 6px 14px; font-size: var(--text-xs);',
    md:  'padding: 10px 20px; font-size: var(--text-sm);',
    lg:  'padding: 13px 28px; font-size: var(--text-base);',
    xl:  'padding: 16px 36px; font-size: var(--text-md);',
  };

  const variants = {
    primary:   `background: var(--navy-700); color: #fff;`,
    secondary: `background: rgba(255,255,255,0.08); color: rgba(255,255,255,0.85); border: 1px solid rgba(255,255,255,0.12);`,
    ghost:     `background: transparent; color: var(--navy-300);`,
    danger:    `background: rgba(239,68,68,0.15); color: #f87171; border: 1px solid rgba(239,68,68,0.2);`,
    gold:      `background: var(--gold-400); color: var(--navy-900);`,
    dark:      `background: var(--navy-900); color: #fff;`,
    outline:   `background: transparent; color: var(--navy-300); border: 1.5px solid var(--navy-400);`,
    orange:    `background: #d97706; color: #fff;`,
  };

  const hoverMap = {
    primary:   `filter:brightness(1.15)`,
    secondary: `background:rgba(255,255,255,0.14)`,
    ghost:     `background:rgba(255,255,255,0.06)`,
    danger:    `background:rgba(239,68,68,0.25)`,
    gold:      `filter:brightness(1.1)`,
    dark:      `filter:brightness(1.1)`,
    outline:   `background:rgba(255,255,255,0.06)`,
    orange:    `filter:brightness(1.1)`,
  };

  const style = () => `${base}${sizes[size()]}${variants[variant()]}`;

  return (
    <button
      style={style()}
      onMouseEnter={e => e.currentTarget.style.cssText = `${style()};${hoverMap[variant()] || ''}`}
      onMouseLeave={e => e.currentTarget.style.cssText = style()}
      onMouseDown={e => e.currentTarget.style.transform = 'scale(0.97)'}
      onMouseUp={e => e.currentTarget.style.transform = 'scale(1)'}
      {...rest}
    >
      {local.children}
    </button>
  );
}

export default Button;
