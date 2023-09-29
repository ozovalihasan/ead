import saveJSON from './saveJSON';
import {
  EADLogo,
  GithubLogo,
  Settings
} from "@/components";

import {
  UpArrow, 
  AngleDown
} from "@/icons";
import { useCustomizationStore } from '@/zustandStore/customizationStore';
import { useStore } from '@/zustandStore';

export const Navbar = () => {

  
  const resetStore = useStore(store => store.resetStore)
  const uploadStore = useStore(store => store.uploadStore)

  const navbarVisible = useCustomizationStore(store => store.navbarVisible)
  const toggleNavbarVisibility = useCustomizationStore(store => store.toggleNavbarVisibility)


  return (
    <div className='relative'>
      <nav className={`bg-transparent relative h-20 py-2 border-b general-border ${navbarVisible ? "" : 'hidden'}`} >
        <div className='flex items-center gap-4' >
          <div className="flex items-center mr-8">
            <a className='h-16 w-16 mr-2 ml-8' href="#">
              <EADLogo />
            </a>
            <div className='text-first-500 text-end text-xs '>
              0.4.7
            </div>
          </div>
          <button
              className="rounded-md p-3 my-1 ml-0 btn-first"
              onClick={() => saveJSON(useStore.getState())}
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

          <div className='ml-auto'>
            <Settings />
          </div>
      
          <a className='w-8 h-8 mx-8 ml-8' href="https://github.com/ozovalihasan/ead" target="_blank" title="The repository of the project">
            <GithubLogo />
          </a>
      
        </div>
      
      </nav>
      <button 
        title="Click to show/hide the navbar" 
        className="absolute left-0 -bottom-8 h-6 w-6 z-50 m-2 btn-third rounded-full" 
        onClick={toggleNavbarVisibility} 
      >
        <div className="stroke-[40] w-3 h-3">
          {
            navbarVisible ? <UpArrow /> : <AngleDown />
          }
        </div>
      </button>
    </div>
  )
}