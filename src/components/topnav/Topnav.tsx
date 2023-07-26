import { useContext } from 'react';
import Menu5LineIcon from 'remixicon-react/Menu5LineIcon';
import MoonClearLineIcon from 'remixicon-react/MoonClearLineIcon';
import SunLineIcon from 'remixicon-react/SunLineIcon';
import { ThemeContext } from '../../contexts/ThemeContext';

interface TopnavProps {
  sidebarEnabled?: boolean;
  toggleSidebar: () => void;
}

const Topnav = ({ toggleSidebar, sidebarEnabled }: TopnavProps) => {
  const { darkMode, toggleDarkMode } = useContext(ThemeContext);

  return (
    <nav className="w-screen p-5 z-50 max-h-[64px] flex bg-red-200 dark  text-black">
      {sidebarEnabled && (
        <button onClick={toggleSidebar}>
          <Menu5LineIcon />
        </button>
      )}
      <h2 className="pl-4">GolpoGuccho Photography</h2>
      <div className="ml-auto">
        <button onClick={toggleDarkMode}>
          {!darkMode ? <SunLineIcon /> : <MoonClearLineIcon />}
        </button>
      </div>
    </nav>
  );
};

export default Topnav;
