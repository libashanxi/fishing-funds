import React, { PropsWithChildren, ReactNode } from 'react';
import clsx from 'clsx';
import styles from './index.module.css';

export interface StandCardProps {
  icon?: ReactNode;
  title?: string;
  extra?: ReactNode;
  className?: string;
  onClick?: any;
  onDoubleClick?: any;
}

export const StandCard: React.FC<PropsWithChildren<StandCardProps>> = ({
  title,
  icon,
  extra,
  onClick,
  onDoubleClick,
  className = {},
  children,
}) => {
  return (
    <aside className={clsx(styles.content, className)} onClick={onClick} onDoubleClick={onDoubleClick}>
      {(icon || title) && (
        <div className={styles.header}>
          {icon && <div className={styles.icon}>{icon}</div>}
          <div className={styles.title}>{title}</div>
          <div className={styles.extra}>{extra}</div>
        </div>
      )}
      {children}
    </aside>
  );
};
export default StandCard;
