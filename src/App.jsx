import { useCallback, useState, useEffect, useRef } from 'react'

function Abc() {
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
      let char = Math.floor(Math.random() * str.length)
      pas += str.charAt(char)
    }
    setPassword(pas)
  }, [length, numberAllowed, characterAllowed])

  const copypasswordtoclipboard = useCallback(() => {
    window.navigator.clipboard.writeText(password)
    alert("Password copied to clipboard!")
  }, [password])

  useEffect(() => { passwordGenerator() }, [length, numberAllowed, characterAllowed, passwordGenerator])

  return (
    <>
      <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-gray-900 via-indigo-950 to-black text-white">
        <h1 className="text-5xl font-extrabold mb-8 bg-gradient-to-r from-teal-400 via-cyan-400 to-blue-400 text-transparent bg-clip-text drop-shadow-[0_0_15px_rgba(0,255,255,0.4)]">
          Password Generator
        </h1>

        <div className="w-full max-w-md shadow-[0_0_30px_rgba(0,255,180,0.2)] rounded-2xl p-6 bg-gradient-to-br from-gray-800 via-gray-900 to-black border border-teal-500/30 backdrop-blur-md">
          <div className="flex rounded-lg overflow-hidden shadow-md mb-6 border border-teal-400/20">
            <input
              type="text"
              value={password}
              readOnly
              ref={passwordRef}
              className="outline-none w-full py-3 px-3 text-center text-lg text-teal-100 bg-gradient-to-r from-gray-800 to-gray-700 placeholder:text-gray-400"
            />
            <button
              className="bg-gradient-to-r from-cyan-500 to-teal-600 hover:from-teal-500 hover:to-emerald-500 px-4 py-2 font-semibold transition-all duration-300 shadow-[0_0_10px_rgba(0,255,255,0.3)]"
              onClick={copypasswordtoclipboard}
            >
              Copy
            </button>
          </div>

          <div className="flex flex-col gap-y-4 text-sm text-gray-300">
            <div className="flex items-center justify-between">
              <label className="font-semibold">Length: <span className="text-teal-300">{length}</span></label>
              <input
                type="range"
                min={6}
                max={100}
                value={length}
                className="cursor-pointer accent-cyan-500 w-2/3"
                onChange={(e) => setlength(e.target.value)}
              />
            </div>

            <div className="flex items-center justify-between">
              <label htmlFor="numberInput" className="font-semibold">Include Numbers</label>
              <input
                type="checkbox"
                id="numberInput"
                checked={numberAllowed}
                onChange={() => setnumberAllowed((prev) => !prev)}
                className="w-5 h-5 accent-cyan-400 cursor-pointer"
              />
            </div>

            <div className="flex items-center justify-between">
              <label htmlFor="characterInput" className="font-semibold">Include Symbols</label>
              <input
                type="checkbox"
                id="characterInput"
                checked={characterAllowed}
                onChange={() => setCharacterAllowed((prev) => !prev)}
                className="w-5 h-5 accent-pink-500 cursor-pointer"
              />
            </div>
          </div>

          <button
            onClick={passwordGenerator}
            className="mt-6 w-full py-3 rounded-lg bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 hover:from-cyan-400 hover:to-green-400 font-bold text-lg text-white shadow-[0_0_20px_rgba(0,255,200,0.4)] transition-all duration-300"
          >
            Generate New Password
          </button>
        </div>
      </div>
    </>
  )
}

export default Abc
