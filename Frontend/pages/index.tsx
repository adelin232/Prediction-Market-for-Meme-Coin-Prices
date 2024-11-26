import { NextPage } from "next";
import styles from "../styles/Home.module.css";
import { AppBar } from "../components/AppBar";
import Head from "next/head";
import WalletContextProvider from "../components/WalletContextProvider";
import Image from "next/image";
import CreateMarket from "../components/CreateMarket";
import MarketList from "../components/MarketList";
import ResolvedMarkets from "../components/ResolvedMarkets";

const Home: NextPage = () => {
  return (
    <div className={styles.App}>
      <Head>
        <title>Prediction Market</title>
        <meta name="description" content="Prediction Market for Meme Coins" />
      </Head>

      <WalletContextProvider>
        <AppBar />

        <div className={styles.AppBody}>
          {/* Create a new prediction market */}
          {/* <section>
            <CreateMarket />
          </section> */}

          {/* Display active markets */}
          {/* <section>
            <MarketList />
          </section> */}

          {/* Display resolved markets */}
          {/* <section>
            <ResolvedMarkets />
          </section> */}
          <Image src="/Dogecoin_Logo.png" height={200} width={200} alt="dogecoin-logo" />
          <b/>
          <Image src="/Shiba_Inu_coin_logo.png" height={200} width={200} alt="shibainu-logo" />
          <b/>
          <Image src="/bonk1-bonk-logo.png" height={200} width={200} alt="bonk-logo" />
          {/* <Image src="/safemoon_logo.png" height={30} width={200} alt="safemoon-logo" />
          <Image src="/elonmusk_logo.png" height={30} width={200} alt="elonmusk-logo" /> */}

        </div>
      </WalletContextProvider>
    </div>
  );
};

export default Home;
