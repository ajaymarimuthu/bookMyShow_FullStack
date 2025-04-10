
import { useEffect, useState } from "react";
import { GetAllMovies } from "../../api/movies";
import MovieForm from "./MovieForm";

import { Table, Button } from "antd";

function MovieList() {
  const [movies, setMovies] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const getData = async () => {
    const response = await GetAllMovies();
    let allMovies = response.data;
    allMovies = allMovies.map(function (item) {
      return { ...item, key: `movie${item._id}` };
    })
    setMovies(
      allMovies
    );
  }

  useEffect(() => {
    getData();
  }, [])

  const tableHeadings = [
    {
      title: "Poster",
      dataIndex: "poster",
      render: (text, data) => {
        return (
          <img src={data.poster} width="75" height="115" />
        )
      },
    },
    {
      title: "Movie Name",
      dataIndex: "title",
    },
    {
      title: "Description",
      dataIndex: "description",
    },
    {
      title: "Duration",
      dataIndex: "duration",
    },
    {
      title: "Genre",
      dataIndex: "genre",
    },
    {
      title: "Release Date",
      dataIndex: "releaseDate",
      render: (text) => {
        let newDate = new Date(text);
        const formattedDate = newDate.toDateString();
        return (
          <span>{formattedDate}</span>
        )
      }
    },
    {
      title: "Language",
      dataIndex: "language",
    },
  ]

  return (
    <>
      <div className="d-flex justify-content-end">
        <Button
          onClick={() => {
            setIsModalOpen(true);
          }}
        >
          Add Movie
        </Button>
      </div>
        {
          isModalOpen &&
          <MovieForm
            isModalOpen={isModalOpen}
            setIsModalOpen={setIsModalOpen}
          
          />
        }
        <Table columns={tableHeadings} dataSource={movies} />
    </>
  )

}

export default MovieList;