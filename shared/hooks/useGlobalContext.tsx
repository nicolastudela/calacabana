import { createContext, FC, useCallback, useContext, useEffect, useState } from 'react'
import { isMobile as isMobileFn } from "is-mobile"

export interface IGlobalContext {
  isMobile: boolean
}

const GlobalContext = createContext<IGlobalContext>({
  isMobile: true,
})

interface ProviderProps {
  children: React.ReactNode
}

export const GlobalContextProvider: FC<ProviderProps> = ({
  children,
}) => {
  const [isMobile, setIsMobile] = useState<boolean>(true);

  useEffect(() => {
    const mobile = isMobileFn(); 
    !mobile && setIsMobile(false);
  },[])
  
  return (<GlobalContext.Provider
    value={{
      isMobile,
    }}
  >
    {children}
  </GlobalContext.Provider>
  )
  }

export const useGlobalContext = () => useContext(GlobalContext)

export default useGlobalContext
