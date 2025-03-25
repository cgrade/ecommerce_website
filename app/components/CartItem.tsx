import Image from "next/image";
import { CartItem as CartItemType } from "@/types/cart";

/**
 * @param {CartItemType} item - The cart item data.
 * @param {(id: string) => void} onRemove - Function to remove the item.
 * @param {(id: string, quantity: number) => void} onUpdateQuantity - Function to update quantity.
 * @returns {JSX.Element} The cart item component.
 * @description Renders a single item in the cart.
 */
export default function CartItem({
  item,
  onRemove,
  onUpdateQuantity,
}: {
  item: CartItemType;
  onRemove: (id: string) => void;
  onUpdateQuantity: (id: string, quantity: number) => void;
}) {
  return (
    <div className="flex items-center justify-between py-4 border-b">
      <div className="flex items-center">
        <Image
          src={item.image}
          alt={item.name}
          width={80}
          height={80}
          className="rounded"
        />
        <div className="ml-4">
          <h3 className="text-lg font-semibold">{item.name}</h3>
          <p className="text-gray-600">${item.price.toFixed(2)}</p>
        </div>
      </div>
      <div className="flex items-center">
        <input
          type="number"
          min="1"
          value={item.quantity}
          onChange={(e) => onUpdateQuantity(item.id, parseInt(e.target.value))}
          className="input input-bordered w-16"
        />
        <button
          onClick={() => onRemove(item.id)}
          className="btn btn-error ml-4"
        >
          Remove
        </button>
      </div>
    </div>
  );
}
