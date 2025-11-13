import {Route, Routes} from 'react-router-dom'
import About from './pages/About'
import WithoutState from './pages/WithoutState'
import WithState from './pages/WithState'


export default function Router(){
  return (
    <Routes>
        <Route path='/about' element={<About/>}/>
        <Route path='/without_state/:id' element={<WithoutState/>}/>
        <Route path='/with_state/:id' element={<WithState/>}/>
    </Routes>
  )
}