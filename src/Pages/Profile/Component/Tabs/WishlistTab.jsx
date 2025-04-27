import { Card, CardContent } from "../../../UI/Card.jsx";
import { Buttons } from "../../../UI/Buttons.jsx";

export default function WishlistTab() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {[1, 2, 3].map((item) => (
        <Card key={item} className="shadow-md hover:shadow-lg transition-all duration-300">
          <CardContent className="p-4">
            <div className="h-40 bg-gray-100 rounded mb-4" />
            <p className="font-medium text-gray-900">Favorite Item {item}</p>
            <p className="text-sm text-gray-500">Description of the item goes here.</p>
            <Buttons className="mt-4 w-full">View</Buttons>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
