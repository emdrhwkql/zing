import Page from "@/components/Page";
import CategoriesList from "../_components/category/CategoryList/CategoriesList";

async function CategoriesListPage() {
	return (
		<Page>
			<CategoriesList isShowSeeMore={false} />
		</Page>
	);
}

export default CategoriesListPage;
