export default function ProductCard({ name, description, price }) {
  return (
    <div className="bg-white rounded-2xl shadow-md p-6 transition hover:shadow-lg">
      <h2 className="text-lg font-semibold text-gray-800">{name}</h2>
      <p className="text-gray-500 mt-1">{description}</p>
      <p className="text-pink-600 text-xl font-bold mt-2">${price}</p>
      <button className="mt-4 w-full bg-pink-500 text-white py-2 rounded-xl hover:bg-pink-600 transition">
        Add to Cart
      </button>
    </div>
  );
}
