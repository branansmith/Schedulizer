import Calendar from '../components/Calendar'
import {CalendarTitleProvider} from '../components/CalendarTitleContext'

function App() {

  return (
    <>
    <CalendarTitleProvider>
      <Calendar/>
      </CalendarTitleProvider>
    </>
  )
}

export default App
