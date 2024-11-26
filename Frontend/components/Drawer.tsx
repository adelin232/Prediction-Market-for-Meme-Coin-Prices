import { FC } from "react";
import Link from "next/link";
import styles from "../styles/Drawer.module.css";

interface DrawerProps {
  isOpen: boolean;
  toggleDrawer: () => void;
}

export const Drawer: FC<DrawerProps> = ({ isOpen, toggleDrawer }) => {
  return (
    <div className={`${styles.drawer} ${isOpen ? styles.open : ""}`}>
      <button onClick={toggleDrawer} className={styles.closeButton}>
        ×
      </button>
      <nav className={styles.nav}>
        <ul>
          <li>
            <Link href="/" onClick={toggleDrawer}>
              Home
            </Link>
          </li>
          <li>
            <Link href="/create" onClick={toggleDrawer}>
              Create Market
            </Link>
          </li>
          <li>
            <Link href="/list" onClick={toggleDrawer}>
              Active Markets
            </Link>
          </li>
          <li>
            <Link href="/resolved" onClick={toggleDrawer}>
              Resolved Markets
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};
