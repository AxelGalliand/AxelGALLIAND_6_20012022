import {getPhotographers} from "./index.js"

const getPhotographersData = async () => {
  const data = await getPhotographers ();
  return data.photographers;
}

const getMediaData = async () => {
  const data = await getPhotographers ();
  return data.media;
}

const photographerId = new URLSearchParams(window.location.search).get("id");

