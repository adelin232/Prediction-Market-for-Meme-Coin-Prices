import { NextPage } from "next";
import MarketList from "../components/MarketList";
import styles from "../styles/Home.module.css";
import { AppBar } from "../components/AppBar";
import Head from "next/head";
import WalletContextProvider from "../components/WalletContextProvider";

const ListPage: NextPage = () => {
  return (
    <div className={styles.App}>
    {/* <Head>
      <title>Prediction Market</title>
      <meta name="description" content="Prediction Market for Meme Coins" />
    </Head> */}

    <WalletContextProvider>
      <AppBar />

      <div className={styles.AppBody}>
        {/* Create a new prediction market */}
        <section>
          <MarketList />
        </section>
      </div>
    </WalletContextProvider>
  </div>
  );
};

export default ListPage;
