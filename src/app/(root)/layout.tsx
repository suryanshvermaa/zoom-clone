import StreamVideoProvider from '@/providers/SreamClientProvider'
import React, { ReactNode } from 'react'

function RootLayout({children}:{children:ReactNode}) {
  return (
   
      <main>
        <StreamVideoProvider>
        {children}
        </StreamVideoProvider>
        
    </main>
   

  )
}

export default RootLayout