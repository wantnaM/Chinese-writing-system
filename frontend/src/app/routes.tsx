import { createBrowserRouter } from "react-router";
import { Home } from "./pages/Home";
import LessonList from "./pages/LessonList";
import Lesson1 from "./pages/Lesson1";

// 错误页面组件
function ErrorPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-orange-50 flex items-center justify-center">
      <div className="text-center p-8">
        <h1 className="text-4xl font-bold text-red-900 mb-4">出错了</h1>
        <p className="text-red-700 mb-6">抱歉，页面出现了错误</p>
        <a
          href="/"
          className="inline-block px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
        >
          返回首页
        </a>
      </div>
    </div>
  );
}

// 404 页面组件
function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-50 flex items-center justify-center">
      <div className="text-center p-8">
        <h1 className="text-4xl font-bold text-amber-900 mb-4">页面未找到</h1>
        <p className="text-amber-700 mb-6">抱歉，您访问的页面不存在</p>
        <a
          href="/"
          className="inline-block px-6 py-3 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition-colors"
        >
          返回首页
        </a>
      </div>
    </div>
  );
}

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Home,
    errorElement: <ErrorPage />,
  },
  {
    path: "/unit/:unitId",
    Component: LessonList,
    errorElement: <ErrorPage />,
  },
  {
    path: "/unit/:unitId/lesson/:lessonId",
    Component: Lesson1,
    errorElement: <ErrorPage />,
  },
  {
    path: "*",
    Component: NotFound,
  },
]);