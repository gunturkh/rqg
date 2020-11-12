import Head from "next/head";
import styles from "./layout.module.css";
import utilStyles from "../styles/utils.module.css";
import Link from "next/link";

export const siteTitle = "Random Quotes Generator";

export default function Layout({ children, home, style }) {
  return (
    <div>
      <Head>
        <link rel="icon" href="/favicon.ico" />
        <meta name="description" content="Random Quotes Generator" />
        <meta
          property="og:image"
          content={`https://og-image.now.sh/${encodeURI(
            siteTitle
          )}.png?theme=light&md=0&fontSize=75px&images=https%3A%2F%2Fassets.zeit.co%2Fimage%2Fupload%2Ffront%2Fassets%2Fdesign%2Fnextjs-black-logo.svg`}
        />
        <meta name="og:title" content={siteTitle} />
        <meta name="twitter:card" content="summary_large_image" />
      </Head>
      <header className={styles.header}></header>
      <main>
        <title>{siteTitle}</title>
        {children}
      </main>
    </div>
  );
}
