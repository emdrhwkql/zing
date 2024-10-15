function CategoryList() {
	return (
		<ul className="h-[150px] flex flex-row gap-x-4 justify-around">
			<li>
				<img
					src="https://i.pinimg.com/enabled/564x/99/20/44/992044581a498f43300921ac32e2ebde.jpg"
					className="w-32 h-32 bg-[#fdfbfc] rounded-full opacity-90"
				/>
				<p className="font-bold text-2xl text-white text-center pt-2 object-cover">
					요리
				</p>
			</li>

			<li>
				<img
					src="https://i.pinimg.com/564x/cf/ed/bc/cfedbcac4069997595cda8afd34d6a78.jpg"
					className="w-32 h-32 bg-[#fdfbfc] rounded-full opacity-90 object-cover"
				/>
				<p className="font-bold text-2xl text-white text-center pt-2">
					러닝
				</p>
			</li>

			<li>
				<img
					src="https://i.pinimg.com/enabled/736x/bb/4a/ad/bb4aad265340923a5421377a08546708.jpg"
					className="w-32 h-32 bg-[#fdfbfc] rounded-full opacity-90 object-cover"
				/>
				<p className="font-bold text-2xl text-white text-center pt-2">
					독서
				</p>
			</li>

			<li>
				<img
					src="https://i.pinimg.com/736x/3d/f6/5e/3df65e35b52998112f2260b476f73b96.jpg"
					className="w-32 h-32 bg-[#fdfbfc] rounded-full opacity-90 object-cover"
				/>
				<p className="font-bold text-2xl text-white text-center pt-2">
					게임
				</p>
			</li>

			<li>
				<img
					src="https://i.pinimg.com/enabled/564x/ff/8b/41/ff8b4188e297210466af204866393f33.jpg"
					className="w-32 h-32 bg-[#fdfbfc] rounded-full opacity-90 object-cover"
				/>
				<p className="font-bold text-2xl text-white text-center pt-2">
					원예
				</p>
			</li>

			<li>
				<img
					src="https://i.pinimg.com/enabled/564x/f6/a1/6e/f6a16e235a9c1a8b67c678a3da0647ef.jpg"
					className="w-32 h-32 bg-[#fdfbfc] rounded-full opacity-90 object-cover"
				/>
				<p className="font-bold text-2xl text-white text-center pt-2">
					영화
				</p>
			</li>
		</ul>
	);
}

export default CategoryList;
