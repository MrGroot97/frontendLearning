import React from 'react';
import { Tabs } from '@/components/tabs/Tabs';

const TabsDemo: React.FC = () => {
  return (
    <div className="max-w-3xl mx-auto p-6 bg-white dark:bg-gray-900">
      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
          Tabs Component Demo
        </h2>
        <p className="text-gray-600 dark:text-gray-300">
          A reusable and accessible tabs component with keyboard navigation and ARIA support.
        </p>
      </div>
      <Tabs tabs={[
        {
          label: 'Features',
          content: (
            <div className="space-y-4 text-gray-800 dark:text-gray-200">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                Key Features
              </h3>
              <ul className="list-disc pl-5 space-y-2">
                <li>Accessible tab navigation with ARIA support</li>
                <li>Keyboard navigation (Left/Right arrows, Home/End)</li>
                <li>Smooth transitions between tabs</li>
                <li>Responsive design</li>
                <li>Dark mode support</li>
              </ul>
            </div>
          ),
        },
        {
          label: 'Usage',
          content: (
            <div className="space-y-4 text-gray-800 dark:text-gray-200">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                How to Use
              </h3>
              <div className="p-4 rounded-md bg-gray-100 dark:bg-gray-800">
                <pre className="text-sm overflow-x-auto">
                  {`import { Tabs } from '@/components/tabs/Tabs';

const MyComponent = () => {
  const tabs = [
    { label: 'Tab 1', content: <div>Content 1</div> },
    { label: 'Tab 2', content: <div>Content 2</div> }
  ];

  return <Tabs tabs={tabs} defaultTab={0} />;
};`}
                </pre>
              </div>
            </div>
          ),
        },
        {
          label: 'Accessibility',
          content: (
            <div className="space-y-4 text-gray-800 dark:text-gray-200">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                Accessibility Features
              </h3>
              <ul className="list-disc pl-5 space-y-2">
                <li>Proper ARIA roles and attributes</li>
                <li>Keyboard navigation support</li>
                <li>Focus management</li>
                <li>Screen reader friendly</li>
              </ul>
              <div className="mt-4 p-4 rounded-md bg-blue-50 text-blue-800 dark:bg-blue-900/30 dark:text-blue-200">
                <p className="text-sm">
                  Try using keyboard navigation: Arrow keys to move between tabs, 
                  Home/End to jump to first/last tab.
                </p>
              </div>
            </div>
          ),
        },
      ]} defaultTab={0} />
    </div>
  );
};

export default TabsDemo; 