import Head from "next/head";
import Layout, { siteTitle } from "../components/layout";
import utilStyles from "../styles/utils.module.css";
import { getSortedPostsData } from "../lib/posts";
import Link from "next/link";
import Date from "../components/date";
import { useState } from "react";

export default function Home({ allPostsData }) {
  const [toggle, setToggle] = useState(false);
  const [quote, setQuote] = useState(
    "Welcome to Random Quote Generator by GunturKH!"
  );
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
          <h1 style={{ textAlign: "center" }}>{quote}</h1>
          <div>{/* <p>{quote}</p> */}</div>
          <button
            className="generate-button"
            onClick={() => {
              console.log("New Quote!");
              fetch("https://type.fit/api/quotes")
                .then((res) => {
                  console.log("res: ", res);
                  return res.json();
                })
                .then((json) => {
                  console.log("Json: ", json);
                  setQuote(
                    json[Math.floor(Math.random() * json.length - 1)].text
                  );
                });
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
