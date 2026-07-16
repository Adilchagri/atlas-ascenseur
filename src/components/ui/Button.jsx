import { Link } from 'react-router-dom';

export default function Button({ children, to, href, variant = 'gold', className = '', ...props }) {
  const classes = `${variant === 'outline' ? 'btn-outline' : 'btn-gold'} ${className}`.trim();

  if (to) {
    return (
      <Link className={classes} to={to} {...props}>
        {children}
      </Link>
    );
  }

  if (href) {
    return (
      <a className={classes} href={href} {...props}>
        {children}
      </a>
    );
  }

  return (
    <button className={classes} type="button" {...props}>
      {children}
    </button>
  );
}
