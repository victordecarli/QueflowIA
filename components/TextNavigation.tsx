'use client';

import { SideNavigation } from './SideNavigation';

export function TextNavigation(props: { mobile?: boolean }) {
  return <SideNavigation {...props} mode="text-only" />;
}
