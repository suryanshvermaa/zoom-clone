'use client'
import React, { useState } from 'react'
import HomeCard from './HomeCard'
import { useRouter } from 'next/navigation';
import MeetingModal from './MeetingModal';
import { useUser } from '@clerk/nextjs';
import { Call, useStreamVideoClient } from '@stream-io/video-react-sdk';
import { useToast } from "@/components/ui/use-toast"

const MeetingTypeList=()=> {
  const { toast } = useToast()
   const [meetingState,setMeetingState]=useState<'isScheduledMeeting'|'isJoiningMeeting'|'isInstantMeeting'| undefined>();
   const router=useRouter();
   const {user}=useUser();
   const [values,setValues]=useState({
    dateTime:new Date(),
    description:'',
    link:''
   })
   const [callDetails,setCallDetails]=useState<Call>()
   const client=useStreamVideoClient()
   const createMeeting=async()=>{
     if(!client || !user) return;
     try {
      if(!values.dateTime){
        toast({
          title:'Please Date and time'
        })
      }
      const id = crypto.randomUUID();
      const call=client.call('default',id);
      if(!call) throw new Error('Failed to create call')
        const startedAt=values.dateTime.toISOString() || new Date(Date.now()).toISOString();
      const description=values.description || 'Instant Meeting';
      await call.getOrCreate({
        data:{
          starts_at:startedAt,
          custom:{
            description
          }
        }
      })
      setCallDetails(call);
      if(!values.description){
        router.push(`/meeting/${call.id}`)
      }
      toast({
        title:'Meeting created'
      })
      
     } catch (error:any) {
      console.log(error.message);
      toast({
        title:'Failed to create meeting'
      })
     }
   }
   console.log(meetingState);
   
  return (
    <section className='grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4'>
       <HomeCard
       img='/icons/add-meeting.svg'
       title='New Meeting'
       description='Start an instant meeting'
       handleClick={()=>setMeetingState('isInstantMeeting')}
       className='bg-orange-600'
       />
         <HomeCard
       img='/icons/schedule.svg'
       title='Schedule Meeting'
       description='Plan your meeting'
       handleClick={()=>setMeetingState('isScheduledMeeting')}
       className='bg-blue-600'
       />
         <HomeCard
       img='/icons/recordings.svg'
       title='View Recordings'
       description='Check out your recordings'
       handleClick={()=>router.push('/recordings')}
       className='bg-purple-600'
       />
         <HomeCard
       img='/icons/join-meeting.svg'
       title='Join Meeting'
       description='Via invitation Link'
       handleClick={()=>setMeetingState('isJoiningMeeting')}
       className='bg-yellow-600'
       />
      
        <MeetingModal
         isOpen={meetingState==='isInstantMeeting'}
        onClose={()=>setMeetingState(undefined)}
        title="Start an instant meeting"
        className="text-center"
        buttonText="Start Meeting"
        handleClick={()=>createMeeting()}
        />
      
    </section>
  )
}

export default MeetingTypeList