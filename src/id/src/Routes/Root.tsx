import "../styles/CSS/root.css";
import { useState } from "react";

function Root() {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const rootClass = isCollapsed
    ? "root-sidebar root-sidebar-collapsed"
    : "root-sidebar";

  return (
    <>
      <header className="root-header">
        <h1>tnz.ID</h1>
      </header>
      <aside className={rootClass}>
        <button onClick={() => setIsCollapsed(!isCollapsed)}>click</button>
      </aside>
      <main>{/* Main content goes here */}</main>
    </>
  );
}
export default Root;
