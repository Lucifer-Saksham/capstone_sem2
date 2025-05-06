import "./globals.css";
import Link from "next/link";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <div className="app-container">
          <nav>
            <Link href="/">Home</Link>
            <Link href="/todo">To-Do List</Link>
            <Link href="/pomodoro">Pomodoro</Link>
            <Link href="/planner">Planner</Link>
          </nav>
          <div className="content">{children}</div>
        </div>
      </body>
    </html>
  );
}
