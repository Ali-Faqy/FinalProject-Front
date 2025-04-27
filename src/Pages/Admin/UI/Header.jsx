import React from "react";
import {Link} from "react-router-dom";
export default function Header({ theme, adminName }) {
  const name = adminName.split(" ");
  const firstNameCahr = name[0].charAt(0).toUpperCase();
  const lastNameChar = name[1].charAt(0).toUpperCase();
  const initials = `${firstNameCahr}${lastNameChar}`;
  return (
    <header className="bg-white border-b border-gray-200 shadow-sm relative">
      <div
        className={`absolute bottom-0 left-0 h-1 ${theme.primary} transition-all duration-1000 ease-in-out`}
        style={{ width: "100%" }}
      ></div>
      <div className="flex items-center justify-between p-4">
        <div className="flex items-center">
        
        </div>
        <div className="flex items-center space-x-4">
    
          <div className="flex items-center space-x-2 group">
            <div
              className={`w-8 h-8 rounded-full ${theme.secondary} flex items-center justify-center transition-all duration-500 group-hover:scale-110 group-hover:rotate-6`}
            >
              <span className={`text-sm font-medium ${theme.accent}`}>{initials}</span>
            </div>
            <span className="text-sm font-medium text-gray-700">{adminName}</span>
          </div>
        </div>
      </div>
    </header>
  );
}
