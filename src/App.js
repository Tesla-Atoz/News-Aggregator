import React, { useState, useEffect } from "react";
import alanBtn from "@alan-ai/alan-sdk-web";
import NewsCards from "./components/NewsCards/NewsCards";
import useStyles from "./styles";
import wordsToNumbers from "words-to-numbers";

const alanKey =
  "eb201f0743ea2c800c5bd5af03fb45fe2e956eca572e1d8b807a3e2338fdd0dc/stage";

const App = () => {
  const [newsArticles, setNewsArticles] = useState([]);
  const [activeArticle, setActiveArticle] = useState(-1);
  const classes = useStyles();

  useEffect(() => {
    alanBtn({
      key: alanKey, //to access the api we need a key
      onCommand: ({ command, articles, number }) => {
        if (command === "newHeadlines") {
          setNewsArticles(articles);
          setActiveArticle(-1);
        } else if (command === "highlight") {
          setNewsArticles(() => {
            setActiveArticle((prevActiveArticle) => prevActiveArticle + 1);
          });
        } else if (command === "open") {
          const parsedNumber = number.length > 2 ? wordsToNumbers() : number;
          const article = articles[parsedNumber - 1];
          if (parsedNumber > 20) {
            alanBtn().playText("Please try that again");
          } else if (article) {
            window.open(article.url, "_blank");
            alanBtn().playText("Opening ....");
          }
        }
      },
    });
  }, []);

  return (
    <div>
      <div className={classes.logoContainer}>
        <img
          src={"https://img.freepik.com/free-vector/awesome-voice-user-interface-command-concept-mobile-phone-with-sound-wave-equalizer_39422-986.jpg?size=626&ext=jpg"}
          className={classes.alanLogo}
          alt={"hello"}
        />
      </div>
      <NewsCards articles={newsArticles} activeArticle={activeArticle} />
    </div>
  );
};

export default App;
