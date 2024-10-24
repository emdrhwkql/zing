import { LoungeIdPropsType } from "@/types/lounge.types";
import FreeLoungeDetailForm from "../../_components/lounge/LoungeDetailForm/FreeLoungeDetailForm";
import LoungeDetailForm from "../../_components/lounge/LoungeDetailForm/LoungeDetailForm";

export const revalidate = 0;

async function LoungeDetailPage(props: LoungeIdPropsType) {
	const loungeId = +props.params.loungeId;

	return (
		<div>
			{/* 자유게시판인 경우 자유게시판 디테일을 보여줌(loungeId: 0 = 자유게시판) */}
			{loungeId === 0 ? (
				<FreeLoungeDetailForm loungeId={loungeId} />
			) : (
				<LoungeDetailForm loungeId={loungeId} />
			)}
		</div>
	);
}

export default LoungeDetailPage;
