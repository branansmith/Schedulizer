import CalendarTitle from '../components/CalendarTitle'
import Calendar from '../components/Calendar'
import {CalendarTitleProvider} from '../components/CalendarTitleContext'

function App() {

  return (
    <>
    <CalendarTitleProvider>
      <CalendarTitle/>
      <Calendar/>
      </CalendarTitleProvider>
    </>
  )
}

export default App
