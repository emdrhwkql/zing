import { CategoryIdPropsType } from "@/types/category.types";
import CategoryDetailForm from "../../_components/category/CategoryDetailForm/CategoryDetailForm";

// export const revalidate = 0;

async function CategoriesDetailPage(props: CategoryIdPropsType) {
  const categoryId = Number(props.params.categoryId);

  return <CategoryDetailForm categoryId={categoryId} />;
}

export default CategoriesDetailPage;
