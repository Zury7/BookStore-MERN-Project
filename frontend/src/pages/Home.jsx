import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { AiOutlineEdit } from "react-icons/ai";
import { BsInfoCircle } from "react-icons/bs";
import { MdOutlineAddBox, MdOutlineDelete } from "react-icons/md";

const Home = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [view, setView] = useState("table");

  useEffect(() => {
    setLoading(true);
    axios
      .get("http://localhost:8000/books")
      .then((response) => {
        setBooks(response.data.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, []);

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">📚 Books List</h1>
        <Link to="/books/create">
          <MdOutlineAddBox className="text-green-600 text-4xl cursor-pointer hover:text-green-800 transition" />
        </Link>
      </div>

      {/* View Toggle Buttons */}
      <div className="flex justify-center gap-4 mb-6">
        <button
          className={`px-6 py-2 font-medium rounded-lg shadow-md transition ${
            view === "table"
              ? "bg-blue-600 text-white"
              : "bg-gray-200 hover:bg-gray-300"
          }`}
          onClick={() => setView("table")}
        >
          Table
        </button>
        <button
          className={`px-6 py-2 font-medium rounded-lg shadow-md transition ${
            view === "card"
              ? "bg-blue-600 text-white"
              : "bg-gray-200 hover:bg-gray-300"
          }`}
          onClick={() => setView("card")}
        >
          Card
        </button>
      </div>

      {/* Book List */}
      {loading ? (
        <p className="text-center text-lg text-gray-600">Loading...</p>
      ) : view === "table" ? (
        <table className="w-full bg-white shadow-md rounded-lg overflow-hidden">
          <thead className="bg-blue-500 text-white">
            <tr>
              <th className="px-4 py-3 border">No</th>
              <th className="px-4 py-3 border">Title</th>
              <th className="px-4 py-3 border">Author</th>
              <th className="px-4 py-3 border">Publish Year</th>
              <th className="px-4 py-3 border">Operations</th>
            </tr>
          </thead>
          <tbody>
            {books.map((book, index) => (
              <tr key={book._id} className="text-center border-t">
                <td className="px-4 py-3 border">{index + 1}</td>
                <td className="px-4 py-3 border">{book.title}</td>
                <td className="px-4 py-3 border">{book.author}</td>
                <td className="px-4 py-3 border">{book.publishYear}</td>
                <td className="px-4 py-3 border">
                  <div className="flex justify-center gap-3">
                    {/* Info Icon */}
                    <Link to={`/books/details/${book._id}`}>
                      <BsInfoCircle className="text-blue-500 text-xl cursor-pointer hover:text-blue-700 transition" />
                    </Link>
                    {/* Edit Icon */}
                    <Link to={`/books/edit/${book._id}`}>
                      <AiOutlineEdit className="text-yellow-500 text-xl cursor-pointer hover:text-yellow-700 transition" />
                    </Link>
                    {/* Delete Icon */}
                    <Link to={`/books/delete/${book._id}`}>
                      <MdOutlineDelete className="text-red-500 text-xl cursor-pointer hover:text-red-700 transition" />
                    </Link>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        // Card View (optional)
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {books.map((book) => (
            <div
              key={book._id}
              className="bg-white p-5 rounded-xl shadow-lg hover:shadow-2xl transition"
            >
              <h2 className="text-xl font-semibold text-gray-800">{book.title}</h2>
              <p className="text-gray-600">👨‍🎓 {book.author}</p>
              <p className="text-gray-500">📅 Published: {book.publishYear}</p>
              <div className="flex justify-center gap-4 mt-4">
                <Link to={`/books/details/${book._id}`}>
                  <BsInfoCircle className="text-blue-500 text-2xl cursor-pointer hover:text-blue-700 transition" />
                </Link>
                <Link to={`/books/edit/${book._id}`}>
                  <AiOutlineEdit className="text-yellow-500 text-2xl cursor-pointer hover:text-yellow-700 transition" />
                </Link>
                <Link to={`/books/delete/${book._id}`}>
                  <MdOutlineDelete className="text-red-500 text-2xl cursor-pointer hover:text-red-700 transition" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Home;
