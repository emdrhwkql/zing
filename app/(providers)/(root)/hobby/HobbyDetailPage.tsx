'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import supabase from "@/supabase/client"
import { Loader2 } from 'lucide-react'

type Lecture = {
  id: number
  imageUrl: string | null
  lectureTitle: string
  lectureCost: number
  lectureCharge: number
  lecturePersonnel: string
}

type HobbyClassListDetailProps = {
  params: {
    classId: string;
  }
}

export default function HobbyDetailPage({ params }: HobbyClassListDetailProps) {
  const [lecture, setLecture] = useState<Lecture | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchLecture() {
      setIsLoading(true)

      // Ensure the ID is a number
      const lectureId = parseInt(params.classId, 10)

      if (isNaN(lectureId)) {
        setError('유효하지 않은 강의 ID입니다.')
        setIsLoading(false)
        return
      }

      const { data, error } = await supabase
        .from("lectures")
        .select("*")
        .eq("id", lectureId)
        .single()

      if (error) {
        console.error(error)
        setError('강의를 불러오는 중 오류가 발생했습니다.')
      } else if (data) {
        setLecture(data)
      } else {
        setError('강의를 찾을 수 없습니다.')
      }

      setIsLoading(false)
    }

    fetchLecture()
  }, [params.classId]) // classId로 변경

  if (isLoading) return (
    <div className="flex justify-center items-center h-screen">
      <Loader2 className="h-8 w-8 animate-spin" />
      <span className="ml-2">로딩 중...</span>
    </div>
  )

  if (error) return <div className="text-center text-red-600 mt-8">{error}</div>
  if (!lecture) return <div className="text-center mt-8">강의가 없습니다.</div>

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="md:flex">
          <div className="md:w-2/3">
            {lecture.imageUrl ? (
              <Image
                src={`https://vcvunmefpfrcskztejms.supabase.co/storage/v1/object/public/_class_images/${lecture.imageUrl}`}
                alt={lecture.lectureTitle}
                width={850}
                height={467}
                className="w-full h-[467px] object-cover"
              />
            ) : (
              <div className="w-full h-[467px] bg-gray-200 flex items-center justify-center">
                <span className="text-gray-500">이미지 없음</span>
              </div>
            )}
          </div>
          <div className="md:w-1/3 p-6">
            <h1 className="text-3xl font-bold mb-4 border-b pb-2">
              {lecture.lectureTitle}
            </h1>
            <div className="space-y-4">
              <p className="flex justify-between items-center">
                <span className="text-xl">시간당 강습료</span>
                <span className="text-2xl font-semibold">{lecture.lectureCost.toLocaleString()}원</span>
              </p>
              <p className="flex justify-between items-center">
                <span className="text-xl">총 강습료</span>
                <span className="text-2xl font-bold text-red-600">
                  {lecture.lectureCharge.toLocaleString()}
                  <span className="text-black font-normal ml-1">원</span>
                </span>
              </p>
              <p className="flex justify-between items-center">
                <span className="text-xl">클래스 인원</span>
                <span className="text-xl">{lecture.lecturePersonnel}</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
