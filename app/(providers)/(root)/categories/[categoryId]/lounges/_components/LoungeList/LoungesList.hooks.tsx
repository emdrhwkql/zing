import api from "@/api/api";
import { Lounge } from "@/schema/lounges.schema";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

function useLoungesList() {
	const queryClient = useQueryClient();

	const { data: lounges } = useQuery({
		queryKey: ["lounges"],
		queryFn: api.lounges.getLounges,
		initialData: [],
	});

	const { mutate: toggleIsCompleted } = useMutation({
		mutationFn: api.lounges.toggleIsCompleted,
		onSuccess: () =>
			queryClient.invalidateQueries({ queryKey: ["lounges"] }),
	});

	const { mutate: deleteLounge } = useMutation({
		mutationFn: api.lounges.deleteLounge,
		onSuccess: () =>
			queryClient.invalidateQueries({
				queryKey: ["lounges"],
			}),
	});

	const handleClickLounge = async (lounge: Lounge) => {
		toggleIsCompleted(lounge);
	};

	const handleClickDeleteLounge = async (
		e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
		todo: Lounge
	) => {
		e.stopPropagation();
		deleteLounge(todo);
	};

	return { lounges, handleClickLounge, handleClickDeleteLounge };
}

export default useLoungesList;
