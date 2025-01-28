'use client';

import { SideNavigation } from './SideNavigation';

export function RemoveBackgroundNavigation(props: { mobile?: boolean }) {
  return <SideNavigation {...props} mode="remove-background-only" />;
}
