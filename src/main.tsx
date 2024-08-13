import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.scss'
import { QuizProvider } from './QuizContext.tsx'
//import { useContext } from 'react'

ReactDOM.createRoot(document.getElementById('root')!).render(
    <QuizProvider>
        <App />
    </QuizProvider>
)

