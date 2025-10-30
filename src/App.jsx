import { use, useCallback, useState, useEffect, useRef } from 'react'

function App() {
  const [length, setlength] = useState(10)
  const [numberAllowed, setnumberAllowed] = useState(true)
  const [characterAllowed, setCharacterAllowed] = useState(false)
  const [password, setPassword] = useState("")
  const passwordRef = useRef(null)
  const passwordGenerator = useCallback(() => {
    let pas = ""
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"

    if (numberAllowed) str += "0123456789"
    if (characterAllowed) str += "!~@#$%^&*()_+?><|?"

    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length + 1)
      pas += str.charAt(char)
    }
    setPassword(pas)
  }, [length, numberAllowed, characterAllowed, setPassword])
  const copypasswordtoclipboard = useCallback(()=>{window.navigator.clipboard.writeText(password)
    alert("passwordCopiedtoclipboard")
  },[password])
  useEffect(()=>{passwordGenerator()},[length,numberAllowed,characterAllowed, passwordGenerator])
  return (
    <>
      <div className="flex flex-col items-center justify-center min-h-screen bg-green-900">
        <h1 className="text-4xl text-center text-white mb-6">Password Generator</h1>

        <div className="w-full max-w-md shadow-md rounded-lg px-4 py-6 text-orange-500 bg-green-800 text-center">
          <div className="flex shadow-lg rounded-lg overflow-hidden">
            <input
              type="text"
              value={password}
              ref={passwordRef}
              className="outline-none w-full py-2 px-3 text-center"
            /><button className='outline-none text-white px-3 py-0.5 shrink-0' onClick={copypasswordtoclipboard}>Copy</button>
          </div>
          <div className='flex text-sm gap-x-2'><div className='flex items-center gap-x-1'>
          <input 
          type='range'
          min={6}
          max={100}
          value={length}
          className='cursor-pointer ' 
          onChange={(e)=>{setlength(e.target.value)}}
          />
          <label>Length:{length}</label>
          </div>
          <div className='items-center flex gap-x-1'>
          <input 
          type='checkbox'
          defaultChecked={numberAllowed}
          id='numberInput'
          onChange={()=>
            setnumberAllowed((prev)=>!prev)
          }
          /><label htmlFor='numberInput'>Numbers</label>
          </div>

          <div className='items-center flex gap-x-1'>
          <input 
          type='checkbox'
          defaultChecked={characterAllowed}
          id='characterInput'
          onChange={()=>
            setCharacterAllowed((prev)=>!prev)}
          /><label htmlFor='characterInput'>Character</label>
          </div>

          </div>
        </div>
      </div>
    </>
  )
}

export default App
