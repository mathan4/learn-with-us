import React from 'react'
import LoginPageComponent from './Components/LoginPageComponent/LoginPageComponent'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import GetYourLessonComponent from './Components/GetYourLessonComponent/GetYourLessonComponent'
import ViewYourPlanComponent from './Components/ViewYourPlanComponent/ViewYourPlanComponent'

const App = () => {
  return (
   <BrowserRouter>
    <Routes>
      <Route exact path="/" element={<LoginPageComponent/>}></Route>
      <Route path="/GetYourLesson" element={<GetYourLessonComponent/>}></Route>
      <Route path="/ViewYourPlan" element={<ViewYourPlanComponent/>}></Route>
    </Routes>
   </BrowserRouter>
  )
}

export default App
