import { FC, useState } from "react";
import styles from "../styles/Home.module.css";
import Image from "next/image";
import Link from "next/link";
import { Drawer } from "./Drawer"; // Import the Drawer component
import WalletContextProvider from "./WalletContextProvider";
import dynamic from "next/dynamic";

// Dynamically load WalletMultiButton with no SSR
const DynamicWalletMultiButton = dynamic(
  () =>
    import("@solana/wallet-adapter-react-ui").then(
      (mod) => mod.WalletMultiButton
    ),
  { ssr: false }
);

export const AppBar: FC = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const toggleDrawer = () => {
    setIsDrawerOpen((prev) => !prev);
  };

  return (
    <div className={styles.AppHeader}>
      <button onClick={toggleDrawer} className={styles.menuButton}>
        ☰
      </button>
      <Drawer isOpen={isDrawerOpen} toggleDrawer={toggleDrawer} />
      <Image src="/solanaLogo.png" height={30} width={200} alt="solana-logo" />
      <span>Meme Coin Prediction Market</span>
      <DynamicWalletMultiButton />
    </div>
  );
};
