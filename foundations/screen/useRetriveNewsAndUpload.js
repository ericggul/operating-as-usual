import { useEffect, useState } from "react";
import axios from "axios";
import getImage from "./stableDiffusionGetImage";

//during development phase, minimise unncecessary calls to api
const NEWS_NUMBER = 5;

export default function useRetriveNewsAndUpload() {
  const [newsNeedsUpdate, setNewsNeedsUpdate] = useState(false);

  //first, check if News Needs to be updated or not
  useEffect(() => {
    getLatestNews();
  }, []);

  async function getLatestNews() {
    try {
      const { data } = await axios.get("/api/prisma/altering-headline/retrive-latest-news");
      let dataWithNews = data.filter((datum) => datum.news.length > 0);
      const latestDate = new Date(dataWithNews[0].createdAt);
      if (Date.now() - latestDate < 1000 * 60 * 60 * 24) {
        setNewsNeedsUpdate(false);
      } else {
        setNewsNeedsUpdate(true);
      }
    } catch (e) {
      console.log(e);
    }
  }

  const [news, setNews] = useState([]);

  useEffect(() => {
    if (newsNeedsUpdate) {
      retriveNews();
    }
  }, [newsNeedsUpdate]);

  async function retriveNews() {
    try {
      const { data } = await axios.get("/api/nyt/popular");
      setNews(data.results);
    } catch (e) {
      console.log(e);
    }
  }

  //prediction and error result from API
  const [prediction, setPrediction] = useState(null);
  const [error, setError] = useState(null);

  // if news is ready get images from API
  const [retrivingNewsIdx, setRetrivingNewsIdx] = useState(0);

  useEffect(() => {
    if (newsNeedsUpdate && news && news.length > 0) {
      if (retrivingNewsIdx < NEWS_NUMBER) {
        getSingleImage(news[retrivingNewsIdx].title);
      } else {
        setNewsNeedsUpdate(false);
      }
    }
  }, [newsNeedsUpdate, news, retrivingNewsIdx]);

  async function getSingleImage(text) {
    await getImage(text, setError, setPrediction);
  }

  ///////DB OPERATIONS//////
  //As Prediction is updated, upload information to DB//

  //latest news id on db
  const [latestNewsId, setLatestNewsId] = useState(null);

  useEffect(() => {
    if (newsNeedsUpdate && news && news.length > 0 && prediction && prediction.status === "succeeded" && latestNewsId !== null) {
      uploadSingleNews(news[retrivingNewsIdx].title, prediction.output[0]);
      setRetrivingNewsIdx((idx) => idx + 1);
      setPrediction(null);
    }
  }, [newsNeedsUpdate, news, retrivingNewsIdx, prediction, latestNewsId]);

  //DB Init: Create Latest News Bundle
  useEffect(() => {
    if (newsNeedsUpdate) {
      createLatestNewsBundle();
    }
  }, [newsNeedsUpdate]);

  async function createLatestNewsBundle() {
    try {
      const { data } = await axios.post("/api/prisma/altering-headline/create-latest-news", {});
      setLatestNewsId(data.id);
    } catch (e) {
      console.log(e);
    }
  }

  async function uploadSingleNews(headline, imgUrl) {
    try {
      const { data } = await axios.post("/api/prisma/altering-headline/upload-single-news", {
        latestNewsId,
        headline,
        imgUrl,
      });
      console.log(data);
    } catch (e) {
      console.log(e);
    }
  }
}
