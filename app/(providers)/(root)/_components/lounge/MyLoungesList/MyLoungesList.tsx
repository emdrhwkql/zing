import api from "@/api/api";
import MainBox from "@/components/MainBox";
import { useAuthStore } from "@/zustand/auth.store";
import { useQuery } from "@tanstack/react-query";

function MyLoungesList() {
  const currentUser = useAuthStore((state) => state.currentUser);
  const { data: lounges } = useQuery({
    queryKey: ["lounges"],
    queryFn: async () => api.posts.getLoungesICreated(currentUser!),
  });

  return (
    <MainBox>
      <p>sfasfasfsdfasfasfs</p>

      <ul className="text-black bg-red-500">
        {lounges?.map((lounge) => (
          <li key={lounge.id}>
            <div>{lounge.categoryId}</div>
            <div>{lounge.createdAt}</div>
            <div>{lounge.imageUrl}</div>
            <div>{lounge.introduction}</div>
            <div>{lounge.name}</div>
          </li>
        ))}
      </ul>
    </MainBox>
  );
}

export default MyLoungesList;
