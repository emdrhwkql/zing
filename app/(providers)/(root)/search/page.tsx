import { Database } from '@/supabase/database.types'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

type Post = Database['public']['Tables']['posts']['Row']
type Lounge = Database['public']['Tables']['lounges']['Row']

export default async function SearchPage({
    searchParams
}: {
    searchParams: { q: string }
}) {
    const searchTerm = searchParams.q

    const [postsResult, loungesResult] = await Promise.all([
        supabase
            .from('posts')
            .select('*')
            .ilike('title', `%${searchTerm}%`),
        supabase
            .from('lounges')
            .select('*')
            .ilike('name', `%${searchTerm}%`)
    ])

    let posts: Post[] = []
    let lounges: Lounge[] = []

    if (postsResult.error) {
        console.error('포스트 검색 중 오류 발생:', postsResult.error)
    } else {
        posts = postsResult.data
    }

    if (loungesResult.error) {
        console.error('라운지 검색 중 오류 발생:', loungesResult.error)
    } else {
        lounges = loungesResult.data
    }

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4 items-center justify-center">검색 결과: {searchTerm}</h1>
            <div className="flex justify-between">
                {/* 포스트 검색 결과 */}
                <div className="w-1/2 pr-4">
                    <h2 className="text-xl font-semibold mb-4">포스트 검색 결과</h2>
                    {posts.length > 0 ? (
                        <ul className="space-y-4">
                            {posts.map((post) => (
                                <li key={post.id} className="border p-4 rounded-md">
                                    <h3 className="text-lg font-semibold">{post.title}</h3>
                                    <p className="mt-2">{post.content}</p>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p>포스트 검색 결과가 없습니다.</p>
                    )}
                </div>

                {/* 라운지 검색 결과 */}
                <div className="w-1/2 pl-4">
                    <h2 className="text-xl font-semibold mb-4">라운지 검색 결과</h2>
                    {lounges.length > 0 ? (
                        <ul className="space-y-4">
                            {lounges.map((lounge) => (
                                <li key={lounge.id} className="border p-4 rounded-md">
                                    <h3 className="text-lg font-semibold">{lounge.name}</h3>
                                    <p className="mt-2">{lounge.introduction}</p>
                                    <p className="mt-2 text-sm text-gray-600">
                                        카테고리 ID: {lounge.categoryId},
                                        완료 여부: {lounge.isCompleted ? '완료' : '미완료'},
                                        좋아요 여부: {lounge.isLiked ? '좋아요' : '좋아요 안함'}
                                    </p>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p>라운지 검색 결과가 없습니다.</p>
                    )}
                </div>
            </div>
        </div>
    )
}
