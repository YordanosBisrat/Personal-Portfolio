export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.5"
  }
  public: {
    Tables: {
      certificates: {
        Row: {
          credential_url: string | null
          file_path: string
          file_url: string
          id: string
          issue_date: string
          issuer: string
          sort_order: number
          title: string
        }
        Insert: {
          credential_url?: string | null
          file_path: string
          file_url: string
          id?: string
          issue_date: string
          issuer: string
          sort_order?: number
          title: string
        }
        Update: {
          credential_url?: string | null
          file_path?: string
          file_url?: string
          id?: string
          issue_date?: string
          issuer?: string
          sort_order?: number
          title?: string
        }
        Relationships: []
      }
      contact_messages: {
        Row: {
          created_at: string
          email: string
          id: string
          is_read: boolean
          message: string
          name: string
          subject: string
        }
        Insert: {
          created_at?: string
          email: string
          id?: string
          is_read?: boolean
          message: string
          name: string
          subject: string
        }
        Update: {
          created_at?: string
          email?: string
          id?: string
          is_read?: boolean
          message?: string
          name?: string
          subject?: string
        }
        Relationships: []
      }
      profile: {
        Row: {
          avatar_path: string | null
          avatar_url: string | null
          bio: string
          email: string
          full_name: string
          id: string
          location: string
          resume_path: string | null
          resume_url: string | null
          title: string
          updated_at: string
          years_learning: number
        }
        Insert: {
          avatar_path?: string | null
          avatar_url?: string | null
          bio: string
          email: string
          full_name: string
          id?: string
          location: string
          resume_path?: string | null
          resume_url?: string | null
          title: string
          updated_at?: string
          years_learning?: number
        }
        Update: {
          avatar_path?: string | null
          avatar_url?: string | null
          bio?: string
          email?: string
          full_name?: string
          id?: string
          location?: string
          resume_path?: string | null
          resume_url?: string | null
          title?: string
          updated_at?: string
          years_learning?: number
        }
        Relationships: []
      }
      projects: {
        Row: {
          category: string
          challenges: string
          cover_image_url: string | null
          demo_url: string | null
          features: Json
          github_url: string | null
          id: string
          is_featured: boolean
          lessons: string
          problem: string
          published_at: string | null
          slug: string
          solution: string
          sort_order: number
          status: string
          summary: string
          tech_stack: Json
          title: string
        }
        Insert: {
          category: string
          challenges: string
          cover_image_url?: string | null
          demo_url?: string | null
          features?: Json
          github_url?: string | null
          id?: string
          is_featured?: boolean
          lessons: string
          problem: string
          published_at?: string | null
          slug: string
          solution: string
          sort_order?: number
          status?: string
          summary: string
          tech_stack?: Json
          title: string
        }
        Update: {
          category?: string
          challenges?: string
          cover_image_url?: string | null
          demo_url?: string | null
          features?: Json
          github_url?: string | null
          id?: string
          is_featured?: boolean
          lessons?: string
          problem?: string
          published_at?: string | null
          slug?: string
          solution?: string
          sort_order?: number
          status?: string
          summary?: string
          tech_stack?: Json
          title?: string
        }
        Relationships: []
      }
      skills: {
        Row: {
          category: string
          id: string
          name: string
          proficiency: number
          sort_order: number
        }
        Insert: {
          category: string
          id?: string
          name: string
          proficiency: number
          sort_order?: number
        }
        Update: {
          category?: string
          id?: string
          name?: string
          proficiency?: number
          sort_order?: number
        }
        Relationships: []
      }
      social_links: {
        Row: {
          id: string
          label: string
          platform: string
          sort_order: number
          url: string
        }
        Insert: {
          id?: string
          label: string
          platform: string
          sort_order?: number
          url: string
        }
        Update: {
          id?: string
          label?: string
          platform?: string
          sort_order?: number
          url?: string
        }
        Relationships: []
      }
      statistics: {
        Row: {
          id: string
          label: string
          sort_order: number
          suffix: string | null
          value: number
        }
        Insert: {
          id?: string
          label: string
          sort_order?: number
          suffix?: string | null
          value: number
        }
        Update: {
          id?: string
          label?: string
          sort_order?: number
          suffix?: string | null
          value?: number
        }
        Relationships: []
      }
      timeline: {
        Row: {
          date: string
          description: string | null
          id: string
          label: string
          sort_order: number
        }
        Insert: {
          date: string
          description?: string | null
          id?: string
          label: string
          sort_order?: number
        }
        Update: {
          date?: string
          description?: string | null
          id?: string
          label?: string
          sort_order?: number
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      is_admin: { Args: never; Returns: boolean }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
