import axios from "axios";

type ClassApiTypes = {
  currentCount: number;
  data: Record<string, string | number>[];
};

const apiKey = process.env.DATA_GO_KR_API_KEY!;

export async function classApi() {
  const api = await axios.get<ClassApiTypes>(
    `https://api.odcloud.kr/api/15111397/v1/uddi:b2a81057-13be-4bdb-a368-b753c19d3d61?serviceKey=${apiKey}`
  );
  const classes = api.data;
  console.log(classes);

  return classes;
}

/*
사용 방법

async함수 {
	const response = await classApi();
	const classes = response.data;
	console.log(classes);
<ul>
				{classes.map(_class_ =>
                <li key={_class_["클래스 타이틀"]} className="mb-4 border-black border bg-green-700 text-white">
						{_class_["법정읍면동명칭"]} - 법정읍면동명칭<br />
						{_class_["시군구 명칭"]} - 시군구 명칭<br />
						{_class_["시군구 주소"]} - 시군구 주소<br />
						{_class_["시도 명칭"]} - 시도 명칭<br />
						{_class_["최종작성일"]} - 최종작성일<br />
						{_class_["카테고리1"]} - 카테고리 1<br />
						{_class_["카테고리2"]} - 카테고리 2<br />
						{_class_["카테고리3"]} - 카테고리 3<br />
						{_class_["클래스 시간"]} - 클래스 시간<br />
						{_class_["클래스 시간당 비용"]} - 클래스 시간당 비용<br />
						{_class_["클래스 요금"]} - 클래스 요금<br />
						{_class_["클래스 인원"]} - 클래스 인원<br />
						{_class_["클래스 커리큘럼"]} - 클래스 커리큘럼<br />
						{_class_["클래스 타이틀"]} - 클래스 타이틀
					<hr />
					
				</li>
			)}
			</ul>
}
*/
