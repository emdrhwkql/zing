import { LoungeIdPropsType } from "@/types/lounge.types";
import NewPostForm from "../../../../_components/post/NewPostForm/NewPostForm";

function NewPostPage(props: LoungeIdPropsType) {
  const loungeId = Number(props.params.loungeId);
  return <NewPostForm loungeId={loungeId} />;
}

export default NewPostPage;
