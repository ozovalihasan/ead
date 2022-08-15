import saveJSON from './saveJSON';
import {
  EADLogo,
  GithubLogo,
} from "components";

import useCustomizationStore from 'zustandStore/customizationStore';
import useStore from 'zustandStore/store';

export const Navbar = () => {

  const { 
    resetStore,
    uploadStore,
    
  } = useStore();

  const { 
    navbarVisible,
    toggleNavbarVisibility
   } = useCustomizationStore()
  
  return (
    <div className='relative'>
      <nav className={`bg-transparent relative h-20 py-2 border-b border-solid border-first-500 ${navbarVisible || 'hidden'}`} >
        <div className='flex items-center gap-4' >
          <div className="flex items-center mr-8">
            <a className='h-16 w-16 mr-2 ml-8' href="#">
              <EADLogo />
            </a>
            <div className='text-first-500 text-end text-xs '>
              0.4.0
            </div>
          </div>
          <button
              className="rounded-md p-3 my-1 ml-0 btn-first"
              onClick={() => saveJSON(useStore.getState(), 'EAD.json')}
              type="button"
              title="Download EAD"
            >
              Download EAD
          </button>
      
          <label className='text-center p-3 rounded-md cursor-pointer btn-second' title="Upload an EAD file">
            Upload EAD
            <input
              className='hidden'
              onChange={uploadStore}
              type="file"
              accept=".json"
              title="Select an uploaded EAD"
            />
          </label>
      
          <button
            className="rounded-md p-3 my-1 mx-0 btn-second "
            onClick={resetStore}
            type="button"
            title="Reset"
          >
            Reset
          </button>
      
          <a className='w-8 h-8 mx-8 ml-auto' href="https://github.com/ozovalihasan/ead" target="_blank" title="The repository of the project">
            <GithubLogo />
          </a>
      
        </div>
      
      </nav>
    </div>
  )
}