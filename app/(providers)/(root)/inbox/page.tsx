'use client'

import supabase from '@/supabase/client'
import Link from 'next/link'
import React from 'react'

type Notification = {
    content: string
    createdAt: string
    id: number
    title: string
    userId: string
}

const categorizeNotifications = (notifications: Notification[]) => {
    const now = new Date()
    const today: Notification[] = []
    const lastWeek: Notification[] = []
    const lastMonth: Notification[] = []

    notifications.forEach((notification) => {
        const createdAt = new Date(notification.createdAt)
        const timeDiff = now.getTime() - createdAt.getTime()
        const dayDiff = timeDiff / (1000 * 60 * 60 * 24)

        if (dayDiff < 1) {
            today.push(notification)
        } else if (dayDiff < 7) {
            lastWeek.push(notification)
        } else if (dayDiff < 30) {
            lastMonth.push(notification)
        }
    })

    return { today, lastWeek, lastMonth }
}

export default function Component() {
    const [notifications, setNotifications] = React.useState<Notification[]>([])
    const [error, setError] = React.useState<string | null>(null)
    const [isAuthorized, setIsAuthorized] = React.useState(false)

    React.useEffect(() => {
        async function fetchNotifications() {
            const { data: sessionData } = await supabase.auth.getSession()

            if (sessionData.session) {
                const userId = sessionData.session.user.id

                //고유 아이디 쓰는 곳
                const authorizedUserIds = ['6dcc9a07-6f08-4d49-831f-34b52380cacb', '4e407f49-86d4-4c64-ac4f-ef2f2bf53296', "64401503-2de6-4eea-bef4-5ac232d5c22c"]

                setIsAuthorized(authorizedUserIds.includes(userId))
            }

            const { data, error } = await supabase.from('inbox').select("*")

            if (error) {
                console.error('Error fetching notifications:', error)
                setError('알림을 가져오는 중 오류가 발생했습니다.')
            } else if (data) {
                const sortedData = data.sort((a, b) =>
                    new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
                )
                setNotifications(sortedData)
            }
        }

        fetchNotifications()
    }, [])

    if (error) {
        return <div className="min-h-screen bg-gray-50 flex items-center justify-center">{error}</div>
    }

    if (notifications.length === 0) {
        return <div className="min-h-screen bg-gray-50 flex items-center justify-center">알림이 없습니다.</div>
    }

    const categorizedNotifications = categorizeNotifications(notifications)

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="max-w-2xl mx-auto mt-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">공지사항</h2>
                <div className="bg-white rounded-lg shadow-sm p-6">
                    <div className="flex justify-between items-center mb-6">
                        {isAuthorized && (
                            <Link
                                href='/inbox/new'
                                className="text-sm text-gray-500 hover:text-gray-700 transition-colors"
                            >
                                공지 글 쓰기
                            </Link>
                        )}
                    </div>
                    {/* 공지에 오늘,최근 일주일, 최근 한달 쓸 필요가 없어서 지웟음 */}
                    <div className="space-y-6">
                        {notifications.map((notification) => (
                            <Link
                                key={notification.id}
                                href={`/posts/${notification.id}`}
                                className="flex items-start gap-4 p-3 hover:bg-gray-50 rounded-lg transition-colors"
                            >
                                <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center flex-shrink-0">
                                    <img src="image/zii.png" alt="" className="w-full h-full rounded-full object-cover" />
                                </div>

                                <div className="flex-1 min-w-0">
                                    <div className="flex justify-between items-start gap-2">
                                        <h3 className="font-medium text-sm text-gray-900">
                                            {notification.title}
                                        </h3>
                                        <span className="text-xs text-gray-500 whitespace-nowrap">
                                            {new Date(notification.createdAt).toLocaleDateString('ko-KR', {
                                                month: '2-digit',
                                                day: '2-digit'
                                            }).replace(/\./g, '').trim()}
                                        </span>
                                    </div>
                                    <p className="text-sm text-gray-600 mt-1 line-clamp-2">
                                        {notification.content}
                                    </p>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </div>

    )
}
