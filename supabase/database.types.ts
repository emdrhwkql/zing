export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      addition: {
        Row: {
          content: string
          createdAt: string
          id: number
          title: string
        }
        Insert: {
          content?: string
          createdAt?: string
          id?: number
          title?: string
        }
        Update: {
          content?: string
          createdAt?: string
          id?: number
          title?: string
        }
        Relationships: []
      }
      categories: {
        Row: {
          categoryImg: string | null
          categoryName: string
          id: number
          isCompleted: boolean
        }
        Insert: {
          categoryImg?: string | null
          categoryName: string
          id?: number
          isCompleted?: boolean
        }
        Update: {
          categoryImg?: string | null
          categoryName?: string
          id?: number
          isCompleted?: boolean
        }
        Relationships: []
      }
      inbox: {
        Row: {
          content: string
          createdAt: string
          id: number
          title: string
          userId: string
        }
        Insert: {
          content?: string
          createdAt?: string
          id?: number
          title?: string
          userId?: string
        }
        Update: {
          content?: string
          createdAt?: string
          id?: number
          title?: string
          userId?: string
        }
        Relationships: []
      }
      lectures: {
        Row: {
          categoryOne: string
          categoryThree: string
          categoryTwo: string
          cityAddress: string
          cityName: string
          createdAt: string
          finalSaved: string
          id: number
          imageUrl: string | null
          lectureCharge: number
          lectureCost: number
          lectureCurriculum: string
          lecturePersonnel: string
          lectureTime: number
          lectureTitle: string
          locationName: string
          provinceName: string
        }
        Insert: {
          categoryOne: string
          categoryThree: string
          categoryTwo: string
          cityAddress: string
          cityName: string
          createdAt?: string
          finalSaved: string
          id?: number
          imageUrl?: string | null
          lectureCharge: number
          lectureCost: number
          lectureCurriculum: string
          lecturePersonnel: string
          lectureTime: number
          lectureTitle: string
          locationName: string
          provinceName: string
        }
        Update: {
          categoryOne?: string
          categoryThree?: string
          categoryTwo?: string
          cityAddress?: string
          cityName?: string
          createdAt?: string
          finalSaved?: string
          id?: number
          imageUrl?: string | null
          lectureCharge?: number
          lectureCost?: number
          lectureCurriculum?: string
          lecturePersonnel?: string
          lectureTime?: number
          lectureTitle?: string
          locationName?: string
          provinceName?: string
        }
        Relationships: []
      }
      lounges: {
        Row: {
          categoryId: number
          createdAt: string
          id: number
          introduction: string
          isCompleted: boolean
          isLiked: boolean
          name: string
          userId: string | null
        }
        Insert: {
          categoryId: number
          createdAt?: string
          id?: number
          introduction: string
          isCompleted?: boolean
          isLiked?: boolean
          name: string
          userId?: string | null
        }
        Update: {
          categoryId?: number
          createdAt?: string
          id?: number
          introduction?: string
          isCompleted?: boolean
          isLiked?: boolean
          name?: string
          userId?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "lounges_categoryId_fkey"
            columns: ["categoryId"]
            isOneToOne: false
            referencedRelation: "categories"
            referencedColumns: ["id"]
          },
        ]
      }
      posts: {
        Row: {
          content: string
          createdAt: string
          id: number
          loungeId: number
          title: string
          userId: string
        }
        Insert: {
          content?: string
          createdAt?: string
          id?: number
          loungeId: number
          title?: string
          userId?: string
        }
        Update: {
          content?: string
          createdAt?: string
          id?: number
          loungeId?: number
          title?: string
          userId?: string
        }
        Relationships: [
          {
            foreignKeyName: "posts_loungeId_fkey"
            columns: ["loungeId"]
            isOneToOne: false
            referencedRelation: "lounges"
            referencedColumns: ["id"]
          },
        ]
      }
      profile: {
        Row: {
          createdAt: string
          id: number
          profileDesc: string
          profileImg: string
          userId: string
          userName: string
        }
        Insert: {
          createdAt?: string
          id?: number
          profileDesc?: string
          profileImg?: string
          userId?: string
          userName?: string
        }
        Update: {
          createdAt?: string
          id?: number
          profileDesc?: string
          profileImg?: string
          userId?: string
          userName?: string
        }
        Relationships: []
      }
      users: {
        Row: {
          content: string
          createdAt: string
          id: number
          string: string
          title: string
        }
        Insert: {
          content?: string
          createdAt?: string
          id?: number
          string?: string
          title?: string
        }
        Update: {
          content?: string
          createdAt?: string
          id?: number
          string?: string
          title?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof PublicSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof PublicSchema["CompositeTypes"]
    ? PublicSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never
