import React from 'react'

export default function ProductCard({ p, onToggleFav, isFav }) {
  const discountedPrice = p.discount > 0 ? Math.round(p.price * (1 - p.discount / 100)) : p.price

  return (
    <div className="border rounded overflow-hidden shadow-sm bg-white">
      <img src={p.image} alt={p.title} className="w-full h-48 object-cover" />
      <div className="p-3">
        <div className="flex justify-between items-start">
          <h3 className="font-semibold">{p.title}</h3>
          <button onClick={() => onToggleFav(p.id)} className="text-sm">
            {isFav ? '♥' : '♡'}
          </button>
        </div>
        <p className="text-sm text-gray-500">{p.category} • {p.color}</p>
        <div className="mt-2 flex items-center justify-between">
          <div>
            <div className="text-lg font-bold">
              {discountedPrice} {p.currency}
              {p.discount > 0 && (
                <span className="line-through text-gray-400 ml-2 text-sm">
                  {p.price} {p.currency}
                </span>
              )}
            </div>
            {p.discount > 0 && (
              <div className="text-sm text-green-600">{p.discount}% off</div>
            )}
          </div>
          {p.secondhand && (
            <div className="text-xs px-2 py-1 border rounded">2nd hand</div>
          )}
        </div>
      </div>
    </div>
  )
}
