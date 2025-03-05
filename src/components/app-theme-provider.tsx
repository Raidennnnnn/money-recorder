// import { useRef, useState } from "react"
// import { Theme, ThemeProviderContext } from "./app-theme-context"

// type ThemeProviderProps = {
//   children: React.ReactNode
//   defaultTheme?: Theme
//   storageKey?: string
// }

// export function ThemeProvider({
//   children,
//   defaultTheme = "dark",
//   storageKey = "vite-ui-theme",
//   ...props
// }: ThemeProviderProps) {
//   const firstMount = useRef<boolean>(true);
//   const [theme, setTheme] = useState<Theme>(
//     () => (localStorage.getItem(storageKey) as Theme) || defaultTheme
//   );

//   /**
//    * 初次加载直接设置主题，如果在useEffect中设置主题，会导致屏闪
//    */
//   if (firstMount.current) {
//     const theme = localStorage.getItem(storageKey) as Theme || defaultTheme;
//     changeTheme(theme)
//     firstMount.current = false;
//   }

//   const value = {
//     theme,
//     setTheme: (theme: Theme) => {
//       localStorage.setItem(storageKey, theme)
//       changeTheme(theme)
//       setTheme(theme)
//     },
//   }

//   return (
//     <ThemeProviderContext.Provider {...props} value={value}>
//       {children}
//     </ThemeProviderContext.Provider>
//   )

//   function changeTheme(theme: Theme) {
//     const root = window.document.documentElement
//     root.classList.remove("light", "dark")
//     root.classList.add(theme)
//   }
// }

