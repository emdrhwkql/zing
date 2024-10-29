"use client";

import api from "@/api/api";
import { useAuthStore } from "@/zustand/auth.store";
import { useQuery } from "@tanstack/react-query";

function ProfileModBaseImage() {
  const currentUser = useAuthStore((state) => state.currentUser);

  const { data: user } = useQuery({
    queryKey: ["users"],
    queryFn: async () => api.users.getUser(currentUser!),
  });
  const baseURL =
    "https://vcvunmefpfrcskztejms.supabase.co/storage/v1/object/public/user_images/base.png";

  const profileImage = user?.profileImg === baseURL;
  return (
    <div>
      {profileImage ? (
        <img
          src="https://vcvunmefpfrcskztejms.supabase.co/storage/v1/object/public/user_images/base.png"
          alt=""
        />
      ) : (
        <img src={user?.profileImg} alt="" />
      )}
    </div>
  );
}

export default ProfileModBaseImage;
