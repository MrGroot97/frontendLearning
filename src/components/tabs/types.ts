import { ReactNode } from 'react';

export interface TabProps {
  label: string;
  isSelected: boolean;
  index: number;
  onClick: (tabIndex: number) => void;
}

export interface Tab {
  label: string;
  content: ReactNode;
}

export interface TabsProps {
  tabs: Tab[];
  defaultTab?: number;
} 