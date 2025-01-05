import Timer from './components/Timer'
import Field from './components/Field'

function App() {

  return (
    <>
    <div className="container mx-auto">
      <h1 className='text-xl font-bold text-red-500'>Kanoodle</h1>
      <Timer seconds={120} />
      <Field />
      </div>
    </>
  )
}

export default App
