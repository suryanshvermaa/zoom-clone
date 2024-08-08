'use client'
import { DeviceSettings, useCall, VideoPreview } from '@stream-io/video-react-sdk';
import React,{useEffect, useState} from 'react'
import { Button } from './ui/button';

const MeetingSetup=({setIsSetUpComplete}:{setIsSetUpComplete:(value:boolean)=>void})=> {
  const [isMicCamToggleOn, setisMicCamToggleOn] = useState<boolean>(false)
  const call=useCall();
  if(!call){
    throw new Error('useCall must be used in StreamCall component')
  }
  useEffect(()=>{
      if(isMicCamToggleOn){
        call?.camera.disable();
        call?.microphone.disable();
      }else{
        call?.camera.enable();
        call?.microphone.enable();
      }
  },[isMicCamToggleOn,call?.camera,call?.microphone])
  return (
    <div className='flex h-screen w-full flex-col items-center justify-center gap-3 text-white'>
      <h1 className='text-2xl font-bold'>Setup</h1>
      <VideoPreview/>
      <div className='flex flex-col h-16 items-center justify-center gap-3'>
         <label className='flex items-center justify-center gap-2 font-medium'>
          <input type="checkbox" onChange={(e)=>setisMicCamToggleOn(e.target.checked)} />
          Join Camera and Mic
         </label>
         <DeviceSettings/>
         <Button className='rounded bg-green-500 px-4 py-2.5 ' onClick={()=>{
          call.join()
          setIsSetUpComplete(true)
         }}>
          Join Meeting
         </Button>
      </div>
    </div>
  )
}

export default MeetingSetup;