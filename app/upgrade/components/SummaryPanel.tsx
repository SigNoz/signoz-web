import React from 'react';
import { UpgradePath, DeploymentType } from '../types/upgrade';
import { formatDate } from '../utils/upgradeUtils';

interface SummaryPanelProps {
  currentStep: UpgradePath;
  targetVersion: string;
  onMarkComplete: () => void;
  className?: string;
}

const SummaryPanel: React.FC<SummaryPanelProps> = ({
  currentStep,
  onMarkComplete,
  className
}) => {
  const { version, releaseInfo, isCompleted } = currentStep;

  return (
    <div className={`bg-signoz_ink-500 border border-primary-600 rounded-lg p-6 h-full ${className}`}>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-white">
          {version} - Summary
        </h3>
        {isCompleted && (
          <div className="flex items-center gap-2 text-signoz_forest-500 text-sm">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            Completed
          </div>
        )}
      </div>

      <div className="space-y-4">
        {/* Version Info */}
        <div className="p-3 bg-signoz_slate-400 rounded-lg flex flex-col">
          <span className="text-sm text-gray-300">
            <span className="font-medium text-white">Release Date:</span> {formatDate(releaseInfo.releaseDate)}
          </span>
          <span className="text-sm text-gray-300">
            <span className="font-medium text-white">Mandatory Stop:</span> {releaseInfo.isMandatoryStop ? 'Yes' : 'No'}
          </span>
        </div>

        {/* Instructions */}
        <div>
          <h4 className="font-medium text-white mb-2">Instructions</h4>
          <ul className="space-y-1">
            {releaseInfo.instructions.map((instruction, index) => (
              <li key={index} className="text-sm text-gray-300 flex items-start gap-2">
                <span className="text-signoz_robin-500 mt-1">•</span>
                {instruction}
              </li>
            ))}
          </ul>
        </div>

        {/* Warnings */}
        {releaseInfo.warnings.length > 0 && (
          <div>
            <h4 className="font-medium text-white mb-2">Warnings</h4>
            <div className="space-y-2">
              {releaseInfo.warnings.map((warning, index) => (
                <div key={index} className="p-3 bg-signoz_cherry-400/10 border border-signoz_cherry-400/20 rounded-lg">
                  <h5 className="font-medium text-signoz_cherry-400 mb-1">{warning.title}</h5>
                  <span className="text-sm text-gray-300">{warning.details}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Deprecations */}
        {releaseInfo.deprecations.length > 0 && (
          <div>
            <h4 className="font-medium text-white mb-2">Deprecations</h4>
            <div className="space-y-2">
              {releaseInfo.deprecations.map((deprecation, index) => (
                <div key={index} className="p-3 bg-signoz_amber-400/10 border border-signoz_amber-400/20 rounded-lg">
                  <h5 className="font-medium text-signoz_amber-400 mb-1">{deprecation.title}</h5>
                  <span className="text-sm text-gray-300">{deprecation.details}</span>
                  {deprecation.timeline && (
                    <span className="text-xs text-gray-400 mt-1">
                      Timeline: {deprecation.timeline}
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Completion Button */}
        <div className="pt-4 border-t border-primary-600">
          <button id="btn-get-started-website-navbar"
            onClick={onMarkComplete}
            disabled={isCompleted}
            className={`
              'start-free-trial-btn flex h-8 items-center justify-center gap-1.5 truncate rounded-full px-4 py-2 pl-4 pr-3 text-center text-sm font-medium not-italic leading-5 text-white no-underline outline-none hover:text-white transition-colors'
              ${isCompleted
                ? 'bg-signoz_forest-500/10 text-signoz_forest-500 cursor-not-allowed'
                : 'bg-signoz_robin-500 text-white hover:bg-signoz_robin-600'
              }
            `}
          >
            {isCompleted ? 'Step Completed' : 'Mark as Complete'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default SummaryPanel;