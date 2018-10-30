import App from './App'
import LandingPage from './components/marketing/LandingPage'
import About from './components/marketing/AboutPage'
import Login from './components/auth/Login'
import Register from './components/auth/register'

const routes = [
  { path: '/', component: LandingPage },
  { path: '/todo', component: App },
  { path: '/about', component: About },
  { path: '/login', component: Login },
  { path: '/register', component: Register },
]

export default routes
