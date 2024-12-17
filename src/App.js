import { useState, useCallback, useEffect, useRef } from 'react';

function App() {

  const [length, setlength] = useState(8);
  const [num_Allow, setnum_Allow] = useState(false);
  const [char_Allow, setchar_Allow] = useState(false);
  const [password, setpassword] = useState("");
  const [color, setcolor] = useState("")

  const passRef = useRef(null);

  const passwordGenerator = useCallback(() => {
    let pass = ""
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"

    if (num_Allow) {
      str += "0123456789"
      if (char_Allow) {
        str += "!@#$%^&*()_+"
      }
    }

    if (char_Allow) {
      str += "!@#$%^&*()_+"
      if (num_Allow) {
        str += "0123456789"
      }
    }

    for (let i = 1; i <= length; i++) {                                                                //Password Generator Method
      let char = Math.floor(Math.random() * str.length + 1)
      // console.log("char::", char);
      pass += str.charAt(char)
    }
    setpassword(pass)
  }, [length, num_Allow, char_Allow, setpassword])

  const CopyPassToClipBoard = useCallback(() => {
    passRef.current?.select()
    //passRef.current?.setSelectionRange(0,3) 
    window.navigator.clipboard.writeText(password)
  }, [password])

  useEffect(() => {                                                              //This is usewd for the Password Generation.....
    passwordGenerator()
  }, [length, num_Allow, char_Allow, passwordGenerator])

  const SetButtonColor = (() => {
    setcolor("red")
  })

  const ChangeColor = (() => {
    setcolor("blue")
  })

  return (

    <div className='w-full max-w-md mx-auto shadow-md rounded-lg px-4 my-20 text-orange-500 bg-gray-700'>
      <h1 className='text-4xl text-center py-10 text-white'>
        Password Generator
      </h1>
      <div className='flex shadow rounded-lg overflow-hidden mb-4'>
        <input type='text' value={password} className='outline-none w-full py-1 px-3' placeholder='password' readOnly ref={passRef} />
        <button onClick={CopyPassToClipBoard} onMouseOver={SetButtonColor} onMouseOut={ChangeColor} style={{ backgroundColor: color }} className='outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0'>
          Copy
        </button>
      </div>

      <div className='flex text-sm gap-x-2 pb-5'>
        <div className='flex items-center gap-x-1'>
          <input type='range' min={8} max={20} value={length} className='cuursor-pointer' onChange={(e) => { setlength(e.target.value) }} />
          <label>Length : {length}</label>
        </div>

        <div className='flex items-center gap-x-1'>
          <input type='checkbox' defaultChecked={num_Allow} id="numInput" onChange={() => {
            setnum_Allow((prev) => !prev)     //Number ByDefault false , now it will change to false and vice-versa....
          }} />
          <label>Numbers</label>
        </div>

        <div className='flex items-center gap-x-1'>
          <input type='checkbox' defaultChecked={char_Allow} id="charInput" onChange={() => {
            setchar_Allow((prev) => !prev)
          }} />
          <label>Characters</label>
        </div>
      </div>
    </div>

  );
}

export default App;
