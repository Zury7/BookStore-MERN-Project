import React, { useEffect, useState} from 'react'
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Backbutton from '../components/Backbutton';
import Spinner from '../components/Spinner';

const ShowBook = () => {
    const [book, setBook] = useState({});
    const [loading, setLoading] = useState(false);
    const { id } = useParams();

    useEffect(() => {
        setLoading(true);
        axios
            .get('http://localhost:5555/books/${id}')
            .then((response) => {
                setBook(response.data);
                setLoading(false);
            })
            .catch((error) => {
                console.log(error);
                setLoading(false);
            })
    })
    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100 p-6">
          <div className="bg-white shadow-md rounded-lg border border-gray-300 w-full max-w-lg p-6">
            <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2 mb-4">
              📖 Show Book
            </h2>
    
            <div className="border border-gray-400 rounded-md p-4 space-y-4">
              <div className="flex items-center">
                <p className="text-gray-700 font-medium w-28"><b>Id:  </b></p>

              </div>
    
              <div className="flex items-center">
                <p className="text-gray-700 font-medium w-28"><b>Title:  </b></p>

              </div>
    
              <div className="flex items-center">
                <p className="text-gray-700 font-medium w-28"><b>Author:  </b></p>

              </div>
    
              <div className="flex items-center">
                <p className="text-gray-700 font-medium w-28"><b>Publish Year:  </b></p>
               
              </div>
    
              <div className="pt-2 border-t border-gray-300">
                <div className="flex items-center">
                  <p className="text-gray-700 font-medium w-28"><b>Create Time:  </b></p>
                </div>
              </div>
    
              <div>
                <div className="flex items-center">
                  <p className="text-gray-700 font-medium w-28"><b>Last Update:  </b></p>

                </div>
              </div>
            </div>
          </div>
        </div>
      );
}

export default ShowBook