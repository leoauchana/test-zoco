import './TabNavigation.css';

interface TabNavigationProps {
  activeTab: 'venues' | 'logs';
  onTabChange: (tab: 'venues' | 'logs') => void;
}

export function TabNavigation({ activeTab, onTabChange }: TabNavigationProps) {
  return (
    <nav className="tab-nav">
      <button
        className={`tab-btn ${activeTab === 'venues' ? 'tab-btn--active' : ''}`}
        onClick={() => onTabChange('venues')}
      >
        Bares
      </button>
      <button
        className={`tab-btn ${activeTab === 'logs' ? 'tab-btn--active' : ''}`}
        onClick={() => onTabChange('logs')}
      >
        Registros
      </button>
    </nav>
  );
}
