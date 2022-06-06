import { useState, useEffect, useTransition } from 'react'
import axios from 'axios'
import { NavBar } from './NavBar'

export const Concurrent = () => {
  const [photos, setPhotos] = useState([])
  const [input, setInput] = useState('') // urgent
  const [serachKey, setSearchKey] = useState('') // not urgent
  const [isPending, startTransition] = useTransition()

  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get('https://jsonplaceholder.typicode.com/photos')
      setPhotos(res.data)
    }
    fetchData()
  }, [])
  const filteredPhotos = photos.filter((photo) => {
    return photo.title.includes(serachKey)
  })
  const updateHandler = (e) => {
    setInput(e.target.value)
    startTransition(() => {
      setSearchKey(e.target.value)
    })
  }
  return (
    <div className="flex flex-col items-center font-mono text-gray-600">
      <NavBar />
      <p
        className={`my-3 text-xl font-bold ${
          isPending ? 'text-pink-500' : 'text-blue-500'
        }`}
      >
        startTransition (concurrent feature)
      </p>
      <input
        type="text"
        value={input}
        onChange={updateHandler}
        className="mb-5 rounded border border-gray-300 py-1 px-3 text-xs"
      />
      {filteredPhotos.map((photo) => (
        <p className="mb-2 text-xs" key={photo.id}>
          {photo.title}
        </p>
      ))}
    </div>
  )
}
