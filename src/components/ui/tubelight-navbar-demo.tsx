import { Home, User, Briefcase, FileText } from 'lucide-react'
import { NavBar } from "@/components/ui/tubelight-navbar"

export function NavBarDemo() {
  const navItems = [
    { name: 'Home', url: '/', icon: Home },
    { name: 'About', url: '/about', icon: User },
    { name: 'Programs', url: '/programs', icon: Briefcase },
    { name: 'Events', url: '/events', icon: FileText }
  ]

  return <NavBar items={navItems} />
}
