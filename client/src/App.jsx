import { useState, useEffect } from 'react'
import axios from 'axios'

function App() {
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Fetch data from backend API
    const fetchData = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/`)
        setMessage(response.data.message)
        setLoading(false)
      } catch (error) {
        console.error('Error fetching data:', error)
        setMessage('Error connecting to backend')
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
      <div className="bg-white rounded-lg shadow-2xl p-8 max-w-md w-full">
        <h1 className="text-4xl font-bold text-gray-800 mb-4 text-center">
          bitWisdom
        </h1>
        <p className="text-gray-600 text-center mb-6">
          MERN Stack Application
        </p>

        <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-6">
          <p className="text-sm text-blue-700 font-semibold">Backend Status:</p>
          {loading ? (
            <p className="text-blue-600">Loading...</p>
          ) : (
            <p className="text-blue-800">{message}</p>
          )}
        </div>

        <div className="space-y-2 text-sm text-gray-600">
          <p className="flex items-center">
            <span className="w-3 h-3 bg-green-500 rounded-full mr-2"></span>
            React + Vite
          </p>
          <p className="flex items-center">
            <span className="w-3 h-3 bg-green-500 rounded-full mr-2"></span>
            Tailwind CSS
          </p>
          <p className="flex items-center">
            <span className="w-3 h-3 bg-green-500 rounded-full mr-2"></span>
            Express + MongoDB
          </p>
          <p className="flex items-center">
            <span className="w-3 h-3 bg-green-500 rounded-full mr-2"></span>
            AWS Ready
          </p>
        </div>
      </div>
    </div>
  )
}

export default App
