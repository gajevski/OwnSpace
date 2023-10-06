const SideNav = () => {
    return (
        <aside id="default-sidebar" className="fixed top-0 left-0 z-40 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0" aria-label="Sidebar">
        <div className="h-full px-3 py-4 overflow-y-auto bg-gray-50 dark:bg-gray-800">
          <ul className="space-y-2 font-medium">
            <li>
              <a href="/welcome" className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                <span className="ml-3">Welcome</span>
              </a>
            </li>
            <li>
              <a href="/games" className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                <span className="ml-3">Games</span>
              </a>
            </li>
            <li>
              <a href="/books" className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                <span className="ml-3">Books</span>
              </a>
            </li>
            <li>
              <a href="/books" className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                <span className="ml-3">Thoughts</span>
              </a>
            </li>
            <li>
              <a href="/api/auth/signout" className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                <span className="ml-3">Sign Out</span>
              </a>
            </li>
          </ul>
        </div>
      </aside>
    )
};

export default SideNav;