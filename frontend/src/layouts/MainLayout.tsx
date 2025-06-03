import { Outlet } from 'react-router-dom';
import MainMenu from '../components/MainMenu';
import { BackgroundContainer } from '../components/shared';

// Layout chính với menu sticky và colorful animated background
function MainLayout() {
  return (
    <BackgroundContainer>
      <MainMenu />
      <main className="flex-1 flex flex-col items-center justify-start px-2 sm:px-0 pt-4">
        <Outlet />
      </main>
    </BackgroundContainer>
  );
}

export default MainLayout;
