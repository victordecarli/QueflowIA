'use client';

import { SideNavigation } from './SideNavigation';

export function ShapeNavigation(props: { mobile?: boolean }) {
  return <SideNavigation {...props} mode="shapes-only" />;
}
