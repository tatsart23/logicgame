import { Link } from 'react-router-dom'

const Infopanel = () => {
  return (
    <>
      <div className="fixed top-0 left-0 bg-blue-500 w-96 h-full border-r-4 border-r-gray-500 ">
        <h2 className="text-white text-lg font-bold p-4">Kanoodle</h2>
        <div className="p-4 text-black bg-white m-2 rounded font-semibold">
          <p className="mb-2">Kanoodle on pulmapeli, jossa tavoitteena on sijoittaa palikoita pelilaudalle.</p>
          <p className="mb-2">Peli päättyy, kun palikoita ei enää mahdu laudalle.</p>
          <p className="mb-2">Peli alkaa, kun painat aloita-painiketta.</p>
          <p className="mb-2">Peli loppuu, kun aika loppuu tai pelilauta on täynnä.</p>
          <p className="mb-2">Peliä voi pelata myös mobiililaitteilla.</p>
        </div>

        <Link to="/">
          <button className="absolute bottom-4 border-4 left-4 bg-white text-black-500 border-gray-500 font-bold py-2 px-4 rounded">To Homepage</button>
        </Link>
      </div>
    </>
  )
}

export default Infopanel
