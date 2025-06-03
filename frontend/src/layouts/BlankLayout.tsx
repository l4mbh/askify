import { Outlet, Link } from 'react-router-dom';
import { BackgroundContainer } from '../components/shared';

// Layout không có menu, có thể dùng cho trang xác thực hoặc trang đặc biệt
function BlankLayout() {
  return (
    <BackgroundContainer>
      {/* Action area: Nút quay lại home với acrylic style */}
      <div className="h-16 flex items-center px-4">
        <Link 
          to="/"
          className="acrylic-button flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-800 dark:text-gray-200 no-underline"
        >
          <span>←</span>
          Quay lại Home
        </Link>
      </div>
      <main className="flex-1 flex flex-col items-center justify-center">
        <Outlet />
      </main>
    </BackgroundContainer>
  );
}

export default BlankLayout; 