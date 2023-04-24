export default function RootLayout({ children }) {
    return (
      <div>
        {/* create a nav bar component */}
        <nav id = "navbar-mainpage">
            <ul>
                <li><a href = "">Welcome</a></li>
                <li><a href = "">Schedule</a></li>
                <li><a href = "">About</a></li>
            </ul>
        </nav>

      </div>
    );
  }
  