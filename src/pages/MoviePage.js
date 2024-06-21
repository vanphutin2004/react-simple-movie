import React, { useEffect, useState } from "react";
import MovieList from "../components/movies/MovieList";
import useSWR from "swr";
import { API_KEY, fetcher } from "../config";
import MovieCart from "../components/movies/MovieCart";
import { IoIosSearch } from "react-icons/io";
import useDebounce from "../hooks/useDebounce";
import { MdNavigateNext } from "react-icons/md";
import { GrFormPrevious } from "react-icons/gr";

//
const MoviePage = () => {
  const [filter, setFilter] = useState("");
  const filterDebounce = useDebounce(filter, 500);
  const [url, setUrl] = useState(
    "https://api.themoviedb.org/3/movie/popular?api_key=5870f3c945af319893fa3a4452cc3991"
  );
  const { data, error } = useSWR(url, fetcher);
  const movies = data?.results || [];
  const handleFilterChanger = (e) => {
    setFilter(e.target.value);
  };
  useEffect(() => {
    if (filterDebounce) {
      setUrl(
        `https://api.themoviedb.org/3/search/movie?${API_KEY}&query=${filterDebounce}`
      );
    } else {
      setUrl(
        "https://api.themoviedb.org/3/movie/popular?api_key=5870f3c945af319893fa3a4452cc3991"
      );
    }
  }, [filterDebounce]);
  const isLoading = !data && !error;
  return (
    <div className="p-10 page-container">
      <div
        className="flex mb-10
      "
      >
        <div className="flex-1">
          <input
            type="text"
            className="w-full p-4 bg-slate-800 text-white outline-none"
            placeholder="Type here t osearch ..."
            onChange={handleFilterChanger}
          />
        </div>
        <button
          className="p-4
           bg-primary text-white"
        >
          <IoIosSearch />
        </button>
      </div>
      {isLoading && (
        <div className="w-10 h-10 rounded-full border-4 border-primary border-t-transparent border-t-4 mx-auto animate-spin"></div>
      )}
      <div className="grid grid-cols-4 gap-10">
        {!isLoading &&
          movies &&
          movies.length > 0 &&
          movies.map((item, index) => (
            <MovieCart key={index + 1} item={item} />
          ))}
      </div>
      <div className="flex items-center justify-center mb-10 gap-x-5 pt-5">
        <span className="cursor-pointer">
          <GrFormPrevious className="text-3xl" />
        </span>
        <span className="cursor-pointer leading-none inline-block p-3 bg-white text-slate-900 rounded ">
          1
        </span>

        <span className="cursor-pointer">
          <MdNavigateNext className="text-3xl" />
        </span>
      </div>
    </div>
  );
};

export default MoviePage;
