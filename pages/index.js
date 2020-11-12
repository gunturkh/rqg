import Head from "next/head";
import Layout, { siteTitle } from "../components/layout";
import utilStyles from "../styles/utils.module.css";
import { getSortedPostsData } from "../lib/posts";
import Link from "next/link";
import Date from "../components/date";
import { useEffect, useState } from "react";

export default function Home({ allPostsData }) {
  const [toggle, setToggle] = useState(false);
  const [quote, setQuote] = useState({
    author: "GunturKH",
    text: "Welcome to Random Quote Generator by GunturKH!",
  });
  const { author, text } = quote;
  return (
    <Layout home>
      <div
        className="browser"
        style={{ background: toggle ? "black" : "white" }}
      >
        <div className="browser__header">
          <i></i>
          <i></i>
          <i></i>
        </div>

        <div
          className="browser__content"
          style={{ color: toggle ? "white" : "black" }}
        >
          <h1 style={{ textAlign: "center" }}>{text}</h1>
          <h3>-{author}-</h3>
          <button
            className="generate-button"
            onClick={() => {
              const ls = JSON.parse(localStorage.getItem("quotes"));
              if (ls) {
                const { author: quoteAuthor, text: quoteText } = ls[
                  Math.floor(Math.random() * ls.length - 1)
                ];
                setQuote({ author: quoteAuthor, text: quoteText });
              } else {
                fetch("https://type.fit/api/quotes")
                  .then((res) => {
                    return res.json();
                  })
                  .then((json) => {
                    const { author: quoteAuthor, text: quoteText } = json[
                      Math.floor(Math.random() * json.length - 1)
                    ];
                    localStorage.setItem("quotes", JSON.stringify(json));
                    setQuote({ author: quoteAuthor, text: quoteText });
                  });
              }
            }}
            style={{
              marginTop: 20,
              background: toggle ? "white" : "black",
              color: toggle ? "black" : "white",
            }}
          >
            Generate New Quote!
          </button>
        </div>

        <div className="toggle">
          <input
            type="checkbox"
            id="toggle"
            onClick={() => {
              setToggle(!toggle);
            }}
          />
          <label
            htmlFor="toggle"
            style={{ background: toggle ? "white" : "black" }}
          />
        </div>
      </div>
      <p style={{ textAlign: "center" }}> Random Quote Generator By GunturKH</p>
    </Layout>
  );
}

export async function getStaticProps() {
  const allPostsData = getSortedPostsData();
  return {
    props: {
      allPostsData,
    },
  };
}
