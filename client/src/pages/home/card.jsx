import { Clock } from 'lucide-react'
import { Link } from 'react-router-dom';

const Card = ({recipe}) => {
  return (
    <Link to={`/tarif/${recipe.id}`} className='group card p-4'>
        <div className='overflow-hidden rounded-lg relative '>
            <img src={recipe.image} alt={recipe.title} className='w-full h-45 rounded-lg object-cover transition-transform duration-300 group-hover:scale-105' />

           <span className='text-sm text-stone-600 mt-2 flex items-center bg-white/90 absolute bottom-2 left-2 text-stone-700 rounded-full px-2 py-1'>
            <Clock className='inline size-4 mr-1 text-stone-600' />
            {recipe.time} dk
           </span>
        </div>
        <div className='mt-3'>
             <h2 className='text-lg font-semibold text-stone-800 group-hover:text-stone-600 transition-colors duration-300'>{recipe.name}</h2>
            <p className=' text-stone-500 text-sm mt-1'>{recipe.category}</p>

            <div className='flex gap-2 mt-3 flex-wrap'>
                {recipe.ingredients.slice(0,2).map((ingredient, index) => (
                    <span key={index} className='text-xs bg-stone-100 text-stone-600 rounded-full px-2.5 py-1'>{ingredient} </span>
                ))}
            </div>
        </div>
    </Link>
  )
}

export default Card