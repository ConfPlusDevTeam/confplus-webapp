import Image from "next/image";
import { Inter } from "next/font/google";
import styles from "./page.module.scss";
import SidebarMenu from "./components/Sidebar/SidebarMenu";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <>
      <main>
        <aside id="sectionIndicator">
          <p>WELCOME</p>
          <p>SCHEDULE</p>
          <p>ABOUT</p>
        </aside>
        <section id="card"></section>
      </main>

      <div id="sign-in">
        <aside></aside>
        <section>
          <p>Hi There, Welcome to ConfPlus</p>
          <form action="submit">
            <label htmlFor="email"></label>
            <input
              type="email"
              name="email"
              id="email"
              placeholder="Enter your Email"
            />
            <label htmlFor="password"></label>
            <input
              type="password"
              name="password"
              id="password"
              placeholder="Enter your Password"
            />
            <button type="submit">Sign In</button>
          </form>
        </section>
      </div>
      <SidebarMenu></SidebarMenu>

      <footer id="scroll">
        <p></p>
        <image src="../assets/test.png" class="test" alt="scroll"></image>
      </footer>
    </>
  );
}
