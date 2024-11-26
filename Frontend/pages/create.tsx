import { NextPage } from "next";
import CreateMarket from "../components/CreateMarket";
import styles from "../styles/Home.module.css";
import { AppBar } from "../components/AppBar";
import Head from "next/head";
import WalletContextProvider from "../components/WalletContextProvider";


const CreatePage: NextPage = () => {
  return (
    // <div>
    //   <h1>Create a Prediction Market</h1>
    //   <CreateMarket />
    // </div>
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
            <CreateMarket />
          </section>
        </div>
      </WalletContextProvider>
    </div>
  );
};

export default CreatePage;
