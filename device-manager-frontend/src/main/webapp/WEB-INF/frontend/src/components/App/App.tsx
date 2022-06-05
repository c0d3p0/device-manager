import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import About from '../About/About'
import DeviceFirmwareForm from '../DeviceFirmwareForm/DeviceFirmwareForm'
import DeviceForm from '../DeviceForm/DeviceForm'
import DeviceList from '../DeviceList/DeviceList'
import FirmwareForm from '../FirmwareForm/FirmwareForm'
import FirmwareList from '../FirmwareList/FirmwareList'
import Footer from '../Footer/Footer'
import Header from '../Header/Header'
import InvalidUrl from '../InvalidUrl/InvalidUrl'

import './App.css'


function App()
{
  return (
    <Router>
      <div className="app">
        <Header />
        <div className="page-content">
          <Routes>
            <Route path="/" element={<About />} />
            <Route path="/device/*" element={<DeviceList />} />
            <Route path="/firmware/*" element={<FirmwareList />} />
            <Route path="/about/*" element={<About />} />
            <Route path="/device-form/*" element={<DeviceForm />} />
            <Route path="/firmware-form/*" element={<FirmwareForm />} />
            <Route path="/device-firmware-form/*" element={<DeviceFirmwareForm />} />
            <Route path="/index/*" element={<About />} />
            <Route path="*" element={<InvalidUrl />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  )
}

export default App
