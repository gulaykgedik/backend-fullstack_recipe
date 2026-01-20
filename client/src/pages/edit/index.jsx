import { useNavigate, useParams } from "react-router-dom";
import { useMutation, useQuery } from "@tanstack/react-query";
import api from "../../utils/api";
import { toast } from "react-toastify";
import Loader from "../../components/loader";
import Form from "../../components/form";

const Edit = () => {
  const navigate = useNavigate();

  // url'den id parametresini al
  const { id } = useParams();

  // düzenlenicek tarifin verilerini API'dan al
  const { data, isLoading } = useQuery({
    queryKey: ["recipe", id],
    queryFn: () => api.get(`/api/recipes/${id}`),
    select: (res) => res.data.data,
  });

  // form gönderilince atılacak api isteğini hazırla
  const { isPending, mutate } = useMutation({
    mutationFn: (recipeData) => api.patch(`/api/recipes/${id}`, recipeData),
    onSuccess: (res) => {
      toast.success("Tarif güncellendi");
      navigate(`/tarif/${res.data.data.id}`);
    },
    onError: () => {
      toast.error("İşlem başarısız");
    },
  });

  if (isLoading) return <Loader />;

  return (
    <div className="max-w-5xl mx-auto">
      <h1 className="text-2xl font-bold text-stone-800">Tarifi Düzenle</h1>
      <p className="text-stone-500 mt-1">Tarif bilgilerini güncelleyin</p>

      <Form recipeData={data} isPending={isPending} mutate={mutate} />
    </div>
  );
};

export default Edit;