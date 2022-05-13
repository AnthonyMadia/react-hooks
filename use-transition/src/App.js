import React, { useState, useTransition } from 'react'

export default function App() {

  const [isPending, startTransition] = useTransition()

  const [input, setInput] = useState("")
  const [list, setList] = useState([])

  const LIST_SIZE = 20000

  function handleChange(e) {
    setInput(e.target.value)
    startTransition(() => {
      const l = []
      for (let i = 0; i < LIST_SIZE; i++) {
        l.push(e.target.value)
        
      }
      setList(l)
    })
  }


  return (
    <>
      <input type="text" value={input} onChange={handleChange}/> 
      {isPending ? "loading..." : list.map((item, idx) => {
        return <div key={idx}>{item}</div>
      })}
    </>
  ) 
}

// if app is slow or unresponsive, users will leave immediately

// useTransition hook is made to speed up site!

// by default all state changes are high priority and useTransition and change that priority
// we are wrapping all the logic for our list inside of a transition to tell code that that is a low priority piece of information

// setInput() is high priority 
// and whatever is in startTransition is low priority

// only use when you absolutlely need it because you are doing more renders than usual!