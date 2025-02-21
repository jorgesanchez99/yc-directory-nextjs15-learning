import React from 'react'
import { Skeleton } from './ui/skeleton'
import { cn } from '@/lib/utils'

export const StartUpSkeleton = () => {
  return (
    <>
        {[0,1,2,3,4,5].map((index:number) => (
            <li key={cn("skeleton" , index)}>
                <Skeleton className='startup-card_skeleton'/>
            </li>
        ))

        }
    </>
  )
}
