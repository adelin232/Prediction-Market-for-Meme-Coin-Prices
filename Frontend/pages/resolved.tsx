import { NextPage } from "next";
import ResolvedMarkets from "../components/ResolvedMarkets";
import styles from "../styles/Home.module.css";
import { AppBar } from "../components/AppBar";
import Head from "next/head";
import WalletContextProvider from "../components/WalletContextProvider";

const ResolvedPage: NextPage = () => {
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
          <ResolvedMarkets />
        </section>
      </div>
    </WalletContextProvider>
  </div>
  );
};

export default ResolvedPage;
