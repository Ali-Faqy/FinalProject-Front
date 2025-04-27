import { useState } from "react";
import { Card, CardContent } from "../../../UI/Card.jsx";
import { Buttons } from "../../../UI/Buttons.jsx";
import { Badge } from "../../../UI/Badge.jsx";
import { Plus } from "lucide-react";

export default function AddressesTab() {
  const [addresses, setAddresses] = useState([
    {
      name: "Home",
      details: "123 Main Street, Ramallah, Palestine",
      phone: "+970 599 123 456",
    },
    {
      name: "Work",
      details: "Office 45, Business Tower, Ramallah",
      phone: "+970 599 987 654",
    },
  ]);

  return (
    <Card className="border-0 shadow-md bg-white overflow-hidden">
      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Your Addresses</h2>
          <Buttons className="bg-teal-500 text-white hover:bg-teal-600">
            <Plus className="h-4 w-4 mr-2" />
            Add New Address
          </Buttons>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {addresses.map((address, index) => (
            <div
              key={index}
              className="bg-white rounded-xl p-4 border border-gray-200 hover:border-teal-400 transition-all duration-200"
            >
              <div className="flex flex-col gap-4">
                <div className="flex flex-col gap-2">
                  <h3 className="text-lg font-semibold text-gray-800">{address.name}</h3>
                  <p className="text-sm text-gray-600">{address.details}</p>
                  <p className="text-sm text-gray-500">{address.phone}</p>
                </div>

                <div className="border-t border-gray-200"></div>

                <div className="flex gap-2 flex-wrap justify-start pt-2">
                  <Buttons
                    variant="outline"
                    size="xs"
                    className="bg-teal-500 hover:bg-teal-600 text-white text-xs py-1 px-2"
                  >
                    Edit
                  </Buttons>
                  <Buttons
                    variant="outline"
                    size="xs"
                    className="bg-teal-500 hover:bg-teal-600 text-white text-xs py-1 px-2"
                  >
                    Delete
                  </Buttons>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
}
