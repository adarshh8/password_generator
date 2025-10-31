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

  const copypasswordtoclipboard = useCallback(() => {
    window.navigator.clipboard.writeText(password)
    alert("Password copied to clipboard!")
  }, [password])

  useEffect(() => { passwordGenerator() }, [length, numberAllowed, characterAllowed, passwordGenerator])

  return (
    <>
      <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-green-800 text-white">
        <h1 className="text-5xl font-bold mb-8 bg-gradient-to-r from-yellow-400 via-pink-400 to-blue-500 text-transparent bg-clip-text drop-shadow-md">
          Password Generator
        </h1>

        <div className="w-full max-w-md shadow-2xl rounded-2xl p-6 bg-gradient-to-br from-green-700 via-green-800 to-teal-900 border border-green-500/40 backdrop-blur-sm">
          <div className="flex rounded-lg overflow-hidden shadow-md mb-6">
            <input
              type="text"
              value={password}
              readOnly
              ref={passwordRef}
              className="outline-none w-full py-3 px-3 text-center text-lg text-gray-100 bg-gradient-to-r from-gray-800 to-gray-700"
            />
            <button
              className="bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-purple-600 hover:to-pink-500 px-4 py-2 font-semibold transition-all duration-200"
              onClick={copypasswordtoclipboard}
            >
              Copy
            </button>
          </div>

          <div className="flex flex-col gap-y-4 text-sm text-gray-200">
            <div className="flex items-center justify-between">
              <label className="font-semibold">Length: {length}</label>
              <input
                type="range"
                min={6}
                max={100}
                value={length}
                className="cursor-pointer accent-pink-500 w-2/3"
                onChange={(e) => setlength(e.target.value)}
              />
            </div>

            <div className="flex items-center justify-between">
              <label htmlFor="numberInput" className="font-semibold">Include Numbers</label>
              <input
                type="checkbox"
                id="numberInput"
                defaultChecked={numberAllowed}
                onChange={() => setnumberAllowed((prev) => !prev)}
                className="w-5 h-5 accent-yellow-400 cursor-pointer"
              />
            </div>

            <div className="flex items-center justify-between">
              <label htmlFor="characterInput" className="font-semibold">Include Symbols</label>
              <input
                type="checkbox"
                id="characterInput"
                defaultChecked={characterAllowed}
                onChange={() => setCharacterAllowed((prev) => !prev)}
                className="w-5 h-5 accent-pink-400 cursor-pointer"
              />
            </div>
          </div>

          <button
            onClick={passwordGenerator}
            className="mt-6 w-full py-3 rounded-lg bg-gradient-to-r from-green-500 to-emerald-600 hover:from-emerald-500 hover:to-green-600 font-bold text-lg text-white shadow-lg transition-all duration-200"
          >
            Generate New Password
          </button>
        </div>
      </div>
    </>
  )
}

export default App
