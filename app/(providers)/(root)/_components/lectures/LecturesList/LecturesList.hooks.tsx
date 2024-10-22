import api from "@/api/api";
import { useQuery } from "@tanstack/react-query";

function useLecturesList() {
	const { data: lectures } = useQuery({
		queryKey: ["lectures"],
		queryFn: api.lectures.getAllLectures,
		initialData: [],
	});

	return { lectures };
}

export default useLecturesList;
