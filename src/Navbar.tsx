import saveJSON from './components/saveJSON';
import EADLogo from './EADLogo';
import GithubLogo from './GithubLogo';
import useStore from './zustand/store';

const Navbar = () => {

  const { 
    resetStore,
    uploadStore,
  } = useStore();
  
  return (
    <nav className='bg-transparent relative h-20 py-2 border-b border-solid border-first-500'>
      <div className='flex items-center gap-4' >
        <div className="flex items-center">
          <div className='h-16 w-16 mr-2 ml-8 rounded-full'>
            <EADLogo />
          </div>
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
  )
}

export default Navbar;