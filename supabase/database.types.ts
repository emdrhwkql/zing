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
      message: {
        Row: {
          created_at: string
          id: number
          id_deleted: boolean
          receiver: string
          sender: string
        }
        Insert: {
          created_at?: string
          id?: number
          id_deleted: boolean
          receiver: string
          sender: string
        }
        Update: {
          created_at?: string
          id?: number
          id_deleted?: boolean
          receiver?: string
          sender?: string
        }
        Relationships: []
      }
      post_one: {
        Row: {
          content: string
          createdAt: string
          id: number
          isCompleted: boolean
        }
        Insert: {
          content: string
          createdAt?: string
          id: number
          isCompleted?: boolean
        }
        Update: {
          content?: string
          createdAt?: string
          id?: number
          isCompleted?: boolean
        }
        Relationships: []
      }
      user: {
        Row: {
          createdAt: string
          email: string
          id: string
          nickname: string
          password: string
        }
        Insert: {
          createdAt?: string
          email: string
          id: string
          nickname: string
          password: string
        }
        Update: {
          createdAt?: string
          email?: string
          id?: string
          nickname?: string
          password?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_id_fkey"
            columns: ["id"]
            isOneToOne: true
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      userinfo: {
        Row: {
          email: string | null
          id: string
          image_url: string | null
          message: string | null
          username: string | null
        }
        Insert: {
          email?: string | null
          id: string
          image_url?: string | null
          message?: string | null
          username?: string | null
        }
        Update: {
          email?: string | null
          id?: string
          image_url?: string | null
          message?: string | null
          username?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "userinfo_id_fkey"
            columns: ["id"]
            isOneToOne: true
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
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
