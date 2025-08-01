import { useState, useCallback, useEffect, useRef  } from 'react'



function App() {
  const [length, setLength] = useState(8)
  const [numberAllowed, setNumberAllowed] = useState(false)
  const [charAllowed, setCharAllowed] = useState(false)
  const [password, setPassword] = useState("")

  const passwordRef = useRef(null)

  const passwordGenerator = useCallback(() => { 
    let pass = "i"
    let str = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"
    
    if(numberAllowed) str += "0123456789"
    if(charAllowed) str += "!@#$%^&*()_+[]{}|"
    
    
    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random()*str.length + 1 ) 
      pass += str.charAt(char)
      } 
    setPassword(pass)
    }, [
    length, numberAllowed, charAllowed, setPassword
  ]) 

  const copyPasswordtoClipboard = useCallback(()=> {
    passwordRef.current?.select()
    passwordRef.current?.setSelectionRange(0, 10);
  window.navigator.clipboard.writeText(password)
  }, [password])

  useEffect(()=> {
    passwordGenerator()
  }, [length, numberAllowed, charAllowed, passwordGenerator])


  return (
    <>
    <div className = "w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-3 my-8  bg-gray-800 text-orange-500">
      <h1 className = "text-white text-center text-3xl p-3 my-3 ">Password Generator</h1>
      <div className = "flex shadow rounded-lg overflow-hidden mb-4 bg-gray-100">
        <input
         type="text"
         value={password}
         className='outline-none w-full py-1 px-3'
         placeholder='Password'
         readOnly
         ref={passwordRef}
         />
        <button 
        onClick={copyPasswordtoClipboard}
        className='outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0  hover:bg-green-400'>copy</button>

      </div>
      <div className='flex text-sm gap-x-2'>
        <div className='flex items-center gap-x-1'>
          <input 
          type="range" 
          min={8}
          max={50}
          value={length}
          className='cursor-pointer'
          onChange={(e) => setLength(e.target.value)}
          />
          <label>Length: {length}</label>
        </div>
        <div className='flex items-center gap-x-1'>
          <input 
          type="checkbox" 
          checked={numberAllowed}
          id="numberInput"
          onChange={(e) => { 
            setNumberAllowed((prev)=> !prev); }} 
          />
          <label htmlFor="numberInput">Include Numbers</label></div>

        <div className='flex items-center gap-x-1'>
          <input 
          type="checkbox" 
          checked={charAllowed}
          id="characterInput"
          onChange={(e) => { 
            setCharAllowed((prev)=> !prev); }} 
          /> 
          <label htmlFor="characterInput">Characters</label> 
          </div>
        </div> 
      </div>
    </>
  )
}

export default App
