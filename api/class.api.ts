import { ClassApiTypes } from "@/schema/class.schema";
import axios from "axios";

const apiKey = process.env.NEXT_PUBLIC_DATA_GO_KR_API_KEY!;
export async function classApi() {
  const api = await axios.get<ClassApiTypes>(
    `https://api.odcloud.kr/api/15111397/v1/uddi:b2a81057-13be-4bdb-a368-b753c19d3d61?serviceKey=${apiKey}`
  );
  const classes = api.data;
  //   console.log(classes);
  return classes;
}
