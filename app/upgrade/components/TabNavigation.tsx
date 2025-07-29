// components/TabNavigation.tsx
import React from 'react';
import { UpgradePath } from '../types/upgrade';
import { formatDate } from '../utils/upgradeUtils';
import { Button } from '@/components/ui/Button';

interface TabNavigationProps {
  upgradePath: UpgradePath[];
  currentStep: number;
  onStepChange: (stepIndex: number) => void;
}

const TabNavigation: React.FC<TabNavigationProps> = ({
  upgradePath,
  currentStep,
  onStepChange
}) => {
  if (upgradePath.length === 0) {
    return null;
  }

  return (
    <div className="w-full bg-signoz_ink-500 border border-primary-600 rounded-lg p-6">
      <h3 className="text-lg font-semibold text-white mb-4">
        Upgrade Path
      </h3>
      
      <div className="flex flex-wrap items-center gap-2 overflow-x-auto">
        {upgradePath.map((step, index) => (
          <React.Fragment key={step.version}>
            <Button id="btn-get-started-website-navbar"
              onClick={() => onStepChange(index)}
              rounded="default"
              className={`flex-shrink-0 px-4 py-3 rounded-lg border-2 text-sm font-medium transition-all duration-200 min-w-0 relative ${currentStep === index ? 'border-signoz_robin-500 bg-signoz_robin-500/10 text-signoz_robin-500' : 'border-primary-600 bg-signoz_slate-400 text-gray-300 hover:border-signoz_robin-400 hover:bg-signoz_slate-300'}`}
            >
              <div className="flex items-center gap-2">
                {step.isCompleted && (
                  <div className="w-5 h-5 bg-signoz_forest-500 rounded-full flex items-center justify-center">
                    <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                )}
                <div className="text-left">
                  <div className="font-semibold">{step.version}</div>
                  <div className="text-xs text-gray-400">
                    {formatDate(step.releaseInfo.releaseDate)}
                  </div>
                </div>
              </div>
            </Button>
            
            {index < upgradePath.length - 1 && (
              <div className="flex-shrink-0 flex items-center px-2">
                <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            )}
          </React.Fragment>
        ))}
      </div>
      
      <div className="mt-4 text-sm text-gray-300">
        <p>
          <span className="font-medium">Current Step:</span> {upgradePath[currentStep]?.version || 'None selected'}
        </p>
      </div>
    </div>
  );
};

export default TabNavigation;