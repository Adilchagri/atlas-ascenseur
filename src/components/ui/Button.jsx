import { Link } from 'react-router-dom';

export default function Button({ children, to, variant = 'gold', className = '', ...props }) {
  const classes = `${variant === 'outline' ? 'btn-outline' : 'btn-gold'} ${className}`.trim();

  if (to) {
    return (
      <Link className={classes} to={to} {...props}>
        {children}
      </Link>
    );
  }

  return (
    <button className={classes} type="button" {...props}>
      {children}
    </button>
  );
}
