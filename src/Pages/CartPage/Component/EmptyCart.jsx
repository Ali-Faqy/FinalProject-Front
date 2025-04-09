import {Link} from 'react-router-dom';
import { ShoppingBag } from "lucide-react";
function EmptyCart() {
  return (
    <div className="flex flex-col items-center justify-center py-12">
      <div className="bg-muted rounded-full p-6 mb-6">
        <ShoppingBag className="h-12 w-12 text-muted-foreground" />
      </div>
      <h2 className="text-2xl font-semibold mb-2">Your cart is empty</h2>
      <p className="text-muted-foreground mb-6 text-center max-w-md">
        Looks like you haven't added anything to your cart yet. Browse our collection and find something you'll love.
      </p>
      <button className="bg-teal-600 text-white py-2 px-4 rounded-md hover:bg-teal-700 transition-colors">
        <Link to="/products">Continue Shopping</Link>
      </button>
    </div>
  );
}
export default EmptyCart;