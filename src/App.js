import React, { useState, useEffect } from "react";
import ImageCard from "./components/ImageCard";
import ImageSearch from "./components/ImageSearch";
import "./app.css";

function App() {
  const [images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [term, setTerm] = useState("");
  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch(
          `https://pixabay.com/api/?key=${process.env.REACT_APP_PIXABAY_API_KEY}&q=${term}&image_type=photo`
        );
        const data = await res.json();

        setImages(data.hits);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    }
    fetchData();
  }, [term]);
  return (
    <div className="container mx-auto">
      <h2 className="text-center font-semibold text-4xl">My Image Gallery</h2>
      <ImageSearch searchText={(text) => setTerm(text)} />
      {!isLoading && images.length === 0 && (
        <h1 className="text-center mt-32 text-4xl ">No Images Found</h1>
      )}
      {isLoading ? (
        <h1 className="text-center mt-32 text-6xl text-center">Loading...</h1>
      ) : (
        <div className="grid gap-4 custom-styles">
          {images.map((image) => (
            <ImageCard key={image.id} image={image} />
          ))}
        </div>
      )}
    </div>
  );
}

export default App;
