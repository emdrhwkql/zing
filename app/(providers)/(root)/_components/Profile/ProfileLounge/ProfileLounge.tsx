import loungesAPI from "@/api/lounge.api";
import Link from "next/link";

type LoungeWithCategory = Exclude<
  Awaited<ReturnType<typeof loungesAPI.getMyLounges>>,
  null
>[number];

function ProfileLounge({ lounge }: { lounge: LoungeWithCategory }) {
  return (
    <li>
      <Link href={`/lounges/${lounge.id}`} className="">
        <img
          src={`https://vcvunmefpfrcskztejms.supabase.co/storage/v1/object/public/category_image/${lounge.category?.categoryImg}`}
          alt=""
          className="h-[130px] w-[130px] z-50 rounded-xl ml-[26px]"
        />
        <div className="relative">
          <div className="ml-3 flex flex-col">
            <p>{lounge.name}</p>
          </div>
        </div>
      </Link>
    </li>
  );
}

export default ProfileLounge;
