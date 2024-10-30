"use client"

import supabase from '@/supabase/client';
import Link from 'next/link';
import React from 'react';

type Notification = {
    content: string
    createdAt: string
    id: number
    title: string
    userId: string
};

const categorizeNotifications = (notifications: Notification[]) => {
    const now = new Date();
    const today: Notification[] = [];
    const lastWeek: Notification[] = [];
    const lastMonth: Notification[] = [];

    notifications.forEach((notification) => {
        const createdAt = new Date(notification.createdAt);
        const timeDiff = now.getTime() - createdAt.getTime();
        const dayDiff = timeDiff / (1000 * 60 * 60 * 24);

        if (dayDiff < 1) {
            today.push(notification);
        } else if (dayDiff < 7) {
            lastWeek.push(notification);
        } else if (dayDiff < 30) {
            lastMonth.push(notification);
        }
    });

    return { today, lastWeek, lastMonth };
};

export default function Component() {
    const [notifications, setNotifications] = React.useState<Notification[]>([]);
    const [error, setError] = React.useState<string | null>(null);

    React.useEffect(() => {
        async function fetchNotifications() {
            const { data, error } = await supabase
                .from('inbox')
                .select("*")

            if (error) {
                console.error('Error fetching notifications:', error);
                setError('알림을 가져오는 중 오류가 발생했습니다.');
            } else if (data) {
                setNotifications(data);
            }
        }

        fetchNotifications();
    }, []);

    if (error) {
        return <div className="min-h-screen bg-gray-50 flex items-center justify-center">{error}</div>;
    }

    if (notifications.length === 0) {
        return <div className="min-h-screen bg-gray-50 flex items-center justify-center">알림이 없습니다.</div>;
    }

    const categorizedNotifications = categorizeNotifications(notifications);

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="container mx-auto p-6">
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold">공지사항</h1>
                    <Link href='/inbox/new' className="text-blue-600 hover:text-blue-800">공지 글 쓰기</Link>
                </div>

                <div className="bg-white rounded-lg shadow p-6">
                    <div className="mb-4">
                        <h2 className="text-lg font-semibold mb-2">오늘</h2>
                        {categorizedNotifications.today.map((notification) => (
                            <div key={notification.id} className="border-b pb-2 mb-2">
                                <Link href={`/posts/${notification.id}`} className="block hover:bg-gray-100 rounded p-2 transition duration-200">
                                    <h3 className='text-gray-700 font-semibold'>{notification.title}</h3>
                                    <p className="text-gray-600">{notification.content}</p>
                                </Link>
                                <span className="text-gray-500 text-sm">{new Date(notification.createdAt).toLocaleDateString()}</span>
                            </div>
                        ))}
                    </div>

                    <div className="mb-4">
                        <h2 className="text-lg font-semibold mb-2">최근 일주일</h2>
                        {categorizedNotifications.lastWeek.map((notification) => (
                            <div key={notification.id} className="border-b pb-2 mb-2">
                                <Link href={`/posts/${notification.id}`} className="block hover:bg-gray-100 rounded p-2 transition duration-200">
                                    <h3 className='text-gray-700 font-semibold'>{notification.title}</h3>
                                    <p className="text-gray-600">{notification.content}</p>
                                </Link>
                                <span className="text-gray-500 text-sm">{new Date(notification.createdAt).toLocaleDateString()}</span>
                            </div>
                        ))}
                    </div>

                    <div>
                        <h2 className="text-lg font-semibold mb-2">최근 한달</h2>
                        {categorizedNotifications.lastMonth.map((notification) => (
                            <div key={notification.id} className="border-b pb-2 mb-2">
                                <Link href={`/post/${notification.id}`} className="block hover:bg-gray-100 rounded p-2 transition duration-200">
                                    <h3 className='text-gray-700 font-semibold'>{notification.title}</h3>
                                    <p className="text-gray-600">{notification.content}</p>
                                </Link>
                                <span className="text-gray-500 text-sm">{new Date(notification.createdAt).toLocaleDateString()}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}