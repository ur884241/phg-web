import React from 'react';
import { useDeviceDetect } from './DeviceDetector';
import DesktopApp from './DesktopApp';
import MobileApp from './MobileApp';

function App() {
  const { isMobile } = useDeviceDetect();
  
  return isMobile ? <MobileApp /> : <DesktopApp />;
}

export default App;
