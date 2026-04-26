interface ScrollableScreenProps {
  /** Pinned to the top of the column (e.g. AppHeader). */
  header?: React.ReactNode;
  /** Pinned to the bottom of the column (e.g. NotchedTabBar, sticky CTA). */
  footer?: React.ReactNode;
  /** Scrollable middle area. */
  children: React.ReactNode;
  /** Extra classes for the scrollable middle. */
  contentClassName?: string;
}

/**
 * Layout shell for app pages rendered inside `LandingFrame`.
 * Header and footer stay pinned, only `children` scrolls.
 */
export function ScrollableScreen({
  header,
  footer,
  children,
  contentClassName = '',
}: ScrollableScreenProps) {
  return (
    <div className="flex h-full flex-col">
      {header ? <div className="shrink-0">{header}</div> : null}
      <div className={`scrollbar-thin flex-1 overflow-y-auto ${contentClassName}`}>
        {children}
      </div>
      {footer ? <div className="shrink-0">{footer}</div> : null}
    </div>
  );
}
