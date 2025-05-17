import React, { useState, useCallback, useRef, KeyboardEvent } from 'react';
import { TabsProps, TabProps, Tab as TabType } from '@/components/tabs/types';

export const Tab: React.FC<TabProps> = ({ label, isSelected, onClick, index }) => {
  return (
    <button
      role="tab"
      aria-selected={isSelected}
      aria-controls={`panel-${index}`}
      id={`tab-${index}`}
      tabIndex={isSelected ? 0 : -1}
      onClick={() => onClick(index)}
      className={`
        tab-button !bg-transparent
        flex-1 px-6 py-3 text-base transition-colors duration-200
        relative text-center border-none cursor-pointer
        ${isSelected ? `
          !text-blue-600 dark:!text-blue-400
          !bg-white dark:!bg-gray-900
          font-medium
          after:absolute after:bottom-0 after:inset-x-0
          after:h-0.5 after:bg-blue-600 dark:after:bg-blue-400
        ` : `
          !text-gray-600 dark:!text-gray-400
          hover:!text-blue-600 dark:hover:!text-gray-200
          hover:!bg-gray-50 dark:hover:!bg-gray-800/50
          after:absolute after:bottom-0 after:inset-x-0
          after:h-0.5 after:bg-transparent
        `}
        focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-blue-500/50 dark:focus-visible:ring-blue-400/50
      `}
    >
      {label}
    </button>
  );
};

export const Tabs: React.FC<TabsProps> = ({ tabs, defaultTab = 0 }) => {
  const [selectedTab, setSelectedTab] = useState(defaultTab);
  const tabsRef = useRef<HTMLDivElement>(null);

  const handleTabClick = useCallback((index: number) => {
    setSelectedTab(index);
  }, []);

  const handleKeyboard = useCallback((event: KeyboardEvent) => {
    const tabCount = tabs.length;
    
    switch (event.key) {
      case 'ArrowLeft':
        setSelectedTab((prev: number) => (prev - 1 + tabCount) % tabCount);
        break;
      case 'ArrowRight':
        setSelectedTab((prev: number) => (prev + 1) % tabCount);
        break;
      case 'Home':
        setSelectedTab(0);
        break;
      case 'End':
        setSelectedTab(tabCount - 1);
        break;
      default:
        return;
    }
    event.preventDefault();
  }, [tabs.length]);

  return (
    <div className="w-full max-w-3xl mx-auto">
      {/* Tabs List */}
      <div 
        ref={tabsRef}
        role="tablist"
        aria-label="Tabs Example"
        onKeyDown={handleKeyboard}
        className="flex border-b border-gray-200 dark:border-gray-700 bg-transparent"
      >
        {tabs.map((tab: TabType, index: number) => (
          <Tab
            key={index}
            label={tab.label}
            isSelected={selectedTab === index}
            onClick={handleTabClick}
            index={index}
          />
        ))}
      </div>

      {/* Tab Panels */}
      {tabs.map((tab: TabType, index: number) => (
        <div
          key={index}
          role="tabpanel"
          id={`panel-${index}`}
          aria-labelledby={`tab-${index}`}
          hidden={selectedTab !== index}
          className="bg-white dark:bg-gray-900 p-5 rounded-b-lg animate-fadeIn"
        >
          {tab.content}
        </div>
      ))}
    </div>
  );
}; 