"use client"
import { LogOut } from "lucide-react"

export default function Header({ theme, adminName, onLogout }) {
  const name = adminName.split(" ")
  const firstNameChar = name[0].charAt(0).toUpperCase()
  const lastNameChar = name[1]?.charAt(0).toUpperCase() || ""
  const initials = `${firstNameChar}${lastNameChar}`

  return (
    <header className="bg-white border-b border-gray-200 shadow-sm relative">
      <div
        className={`absolute bottom-0 left-0 h-1 ${theme.primary} transition-all duration-1000 ease-in-out`}
        style={{ width: "100%" }}
      ></div>
      <div className="flex items-center justify-between p-4">
        <div className="flex items-center">{/* Logo or brand content can go here */}</div>
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2 group">
            <div
              className={`w-8 h-8 rounded-full ${theme.secondary} flex items-center justify-center transition-all duration-500 group-hover:scale-110 group-hover:rotate-6`}
            >
              <span className={`text-sm font-medium ${theme.accent}`}>{initials}</span>
            </div>
            <span className="text-sm font-medium text-gray-700">{adminName}</span>
          </div>

          {/* Logout Button */}
          <button
            onClick={onLogout}
            className="flex items-center space-x-1 px-3 py-2 text-sm font-medium text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-md transition-all duration-200 group"
            title="Logout"
          >
            <LogOut className="w-4 h-4 transition-transform duration-200 group-hover:scale-110" />
            <span className="hidden sm:inline">Logout</span>
          </button>
        </div>
      </div>
    </header>
  )
}
