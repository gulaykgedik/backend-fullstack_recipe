import { useQuery } from '@tanstack/react-query'
import React, { useState } from 'react'
import api from '../../utils/api';
import Loader from '../../components/Loader';
import Error from '../../components/Error';
import Sort from './sort';
import Card from './card';
import Filter from './filter';
import { useDebounce } from "@uidotdev/usehooks";


const Home = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [order, setOrder] = useState(null);
    const debouncedSearchTerm = useDebounce(searchTerm, 300);

  // Debounce


  const params = {
    order,
    search: debouncedSearchTerm
  }

  const { isLoading, data, error, refetch } = useQuery({
    queryKey: ["recipes", order, debouncedSearchTerm],
    queryFn: () => api.get("/api/recipes", { params }),
    select: (res) => res.data.data,
  });



  return (
    <div className='max-w-7xl mx-auto '>
      <Filter setSearchTerm={setSearchTerm} />

      <section className='mt-8'>
        {
          isLoading ? (
            <Loader className="animate-spin mx-auto" />
          ) : error ? (
            <Error message={error.message} refetch={refetch} />
          ) : (
            <>
              <div className='flex items-center justify-between mb-5'>
                <div className=''>
                  <h1 className='text-2xl font-semibold text-stone-800'>Tarifler</h1>
                  <p className='text-stone-500 mt-1'>{data.length} tarif bulundu</p>

                </div>
                <Sort setOrder={setOrder} />
              </div>

              <div className='mt-5 grid md:grid-cols-2 xl:grid-cols-3 gap-5 '>
                {data.map((recipe) => (
                  <Card key={recipe.id} recipe={recipe} />
                ))}
              </div>
            </>
          )
        }
      </section>
    </div>
  )
}

export default Home