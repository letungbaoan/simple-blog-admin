'use client'

import { useState } from 'react'
import { User } from 'lucide-react'

export default function Greeting() {
  const [name, setName] = useState('Admin')

  return (
    <div>
      <p>
        Hello, {name}! <User size={20} style={{ verticalAlign: 'middle', marginLeft: '4px' }} />
      </p>
      <input
        type='text'
        placeholder='Enter your name'
        value={name}
        onChange={(e) => setName(e.target.value)}
        style={{ padding: '6px', marginTop: '8px' }}
      />
    </div>
  )
}
