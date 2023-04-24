export default function RootLayout({ children }) {
    return (
      <div>
        <nav id = "sidebar-landingpage">
            <ul id = "sidebar-list">
                <li><button class="button-landingpage" onclick="">WELCOME</button></li>
                <li><button class= "button-landingpage" onclick="">SCHEDULE</button></li>
                <li><button class= "button-landingpage" onclick="">ABOUT</button></li>
            </ul>
        </nav>
      </div>
    );
  }
  