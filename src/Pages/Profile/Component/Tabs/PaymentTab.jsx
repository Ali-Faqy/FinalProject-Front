import { Card, CardContent } from "../../../UI/Card.jsx";
import { Buttons } from "../../../UI/Buttons.jsx";
import { Plus, CreditCard, Wallet } from "lucide-react";

export default function PaymentTab() {
  const paymentMethods = [
    {
      type: "Visa Card",
      details: "**** **** **** 1234",
      icon: CreditCard,
    },
    {
      type: "PayPal",
      details: "user@example.com",
      icon: Wallet,
    },
  ];

  return (
    <Card className="border-0 shadow-md bg-white overflow-hidden">
      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Payment Methods</h2>
          <Buttons className="bg-teal-500 text-white hover:bg-teal-600">
            <Plus className="h-4 w-4 mr-2" />
            Add Payment Method
          </Buttons>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {paymentMethods.length > 0 ? (
            paymentMethods.map((method, index) => (
              <div
                key={index}
                className="border rounded-xl p-4 flex items-center gap-4 hover:border-teal-400 transition-all duration-200"
              >
                <method.icon className="h-6 w-6 text-teal-600" />
                <div>
                  <h3 className="font-semibold text-gray-800">{method.type}</h3>
                  <p className="text-gray-600 text-sm">{method.details}</p>
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-700">No payment methods added.</p>
          )}
        </div>
      </div>
    </Card>
  );
}
