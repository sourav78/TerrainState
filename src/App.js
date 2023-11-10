import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom';
import './App.css';
import Layout from './Layout';
import Overview from './components/RouteComp/Overview';
import Analytics from './components/RouteComp/Analytics';
import Details from './components/RouteComp/Details';
import Maps from './components/RouteComp/Maps';

function App() {

  // These are Api keys fron .env.local file in the system
  // const key1 = process.env.REACT_APP_WEATHER_KEY1
  // const key2 = process.env.REACT_APP_WEATHER_KEY2
  // const key3 = process.env.REACT_APP_WEATHER_KEY3
  // const key4 = process.env.REACT_APP_WEATHER_KEY4

  // Create paths for router
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path='/' element={<Layout/>}>
        <Route path='' element={<Overview/>}/>
        <Route path='/analytics' element={<Analytics/>}/>
        <Route path='/details' element={<Details/>}/>
        <Route path='/maps' element={<Maps/>}/>
      </Route>
    )
  )

    return (
      <>
        <RouterProvider router={router}/>
      </>
    );
}

export default App;
