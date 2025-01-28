'use client';

import { SideNavigation } from './SideNavigation';

export function ChangeBackgroundNavigation(props: { mobile?: boolean }) {
  return <SideNavigation {...props} mode="change-background-only" />;
}
