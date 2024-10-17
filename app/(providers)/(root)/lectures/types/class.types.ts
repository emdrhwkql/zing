import { Tables } from "@/supabase/database.types";

export type ClassApiTypes = {
  currentCount: number;
  data: HobbyClassListTypes[];
};

export type HobbyClassListTypes = {
  법정읍면동명칭: string;
  "시군구 명칭": string;
  "시군구 주소": string;
  "시도 명칭": string;
  최종작성일: string;
  카테고리1: string;
  카테고리2: string;
  카테고리3: string;
  "클래스 시간": number;
  "클래스 시간당 비용": number;
  "클래스 요금": number;
  "클래스 인원": string;
  "클래스 커리큘럼": string;
  "클래스 타이틀": string;
};

export type HobbyClassListTypes = {};

export type Lecture = Tables<"lectures">;
