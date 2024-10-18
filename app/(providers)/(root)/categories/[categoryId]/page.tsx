/* eslint-disable @typescript-eslint/no-empty-object-type */
import api from "@/api/api";
import Page from "@/components/Page";
import { CategoryIdPropsType } from "@/types/category.types";
import Link from "next/link";
import LoungesList from "../../_components/lounge/LoungesList/LoungesList";

export const revalidate = 0;

async function CategoriesDetailPage(props: CategoryIdPropsType) {
	const categoryId = props.params.categoryId;
	const lounges = await api.lounges.getLoungesByCategoryId(
		Number(categoryId)
	);

	// console.log(props);

	return (
		<Page>
			<div className="text-red-600">
				<Link href={`/categories/${categoryId}/lounges/new`}>
					새 라운지 만들기
				</Link>
			</div>
			카테고리 디테일 페이지 구상중
			{/* 카테고리에 대한 간단한 설명도 있으면 좋을 듯 */}
			{/* 현재 카테고리의 라운지 들만 보여줄 것 */}
			<LoungesList lounges={lounges} />
		</Page>
	);
}

export default CategoriesDetailPage;
