import React from 'react'
import Form from '../../components/form'
import { useMutation } from '@tanstack/react-query'
import api from '../../utils/api'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'

const Create = () => {
  const navigate = useNavigate()
const {isPending, mutate } = useMutation({
    mutationFn: (recipeData) => api.post('/api/recipes', recipeData),
    onSuccess: () => {
      toast.success('Tarif oluşturuldu')
      navigate('/recipes')
    },
    onError: () => {
      toast.error('Tarif oluşturulamadı')
    }
  })
      

  return (
    <div className='max-w-5xl mx-auto p-4'>
      <h1 className='text-2xl font-bold text-stone-800'>Yeni Tarif Oluştur</h1>
      <p>Yeni tarif oluşturmak için aşağıdaki formu doldurun.</p>
      <Form mutate={mutate} isPending={isPending} />
      </div>
  )
}

export default Create