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
      ad_clicks: {
        Row: {
          ad_id: string | null
          clicked_at: string
          id: string
          referrer: string | null
          user_agent: string | null
          user_ip: string | null
        }
        Insert: {
          ad_id?: string | null
          clicked_at?: string
          id?: string
          referrer?: string | null
          user_agent?: string | null
          user_ip?: string | null
        }
        Update: {
          ad_id?: string | null
          clicked_at?: string
          id?: string
          referrer?: string | null
          user_agent?: string | null
          user_ip?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "ad_clicks_ad_id_fkey"
            columns: ["ad_id"]
            isOneToOne: false
            referencedRelation: "ads"
            referencedColumns: ["id"]
          },
        ]
      }
      ads: {
        Row: {
          content: string
          created_at: string
          end_date: string | null
          id: string
          is_active: boolean
          position: string
          priority: number
          size: string
          start_date: string | null
          title: string
          updated_at: string
          url: string | null
        }
        Insert: {
          content: string
          created_at?: string
          end_date?: string | null
          id?: string
          is_active?: boolean
          position: string
          priority?: number
          size: string
          start_date?: string | null
          title: string
          updated_at?: string
          url?: string | null
        }
        Update: {
          content?: string
          created_at?: string
          end_date?: string | null
          id?: string
          is_active?: boolean
          position?: string
          priority?: number
          size?: string
          start_date?: string | null
          title?: string
          updated_at?: string
          url?: string | null
        }
        Relationships: []
      }
      categories: {
        Row: {
          created_at: string | null
          description: string | null
          id: number
          name: string
          order: number | null
          slug: string
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          id?: number
          name: string
          order?: number | null
          slug: string
        }
        Update: {
          created_at?: string | null
          description?: string | null
          id?: number
          name?: string
          order?: number | null
          slug?: string
        }
        Relationships: []
      }
      category_translations: {
        Row: {
          category_id: number
          description: string | null
          id: number
          language_code: string
          name: string
        }
        Insert: {
          category_id: number
          description?: string | null
          id?: number
          language_code: string
          name: string
        }
        Update: {
          category_id?: number
          description?: string | null
          id?: number
          language_code?: string
          name?: string
        }
        Relationships: [
          {
            foreignKeyName: "category_translations_category_id_fkey"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "categories"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "category_translations_language_code_fkey"
            columns: ["language_code"]
            isOneToOne: false
            referencedRelation: "languages"
            referencedColumns: ["code"]
          },
        ]
      }
      donation_methods: {
        Row: {
          active: boolean
          created_at: string | null
          id: number
          image_url: string
          link: string | null
          name: string
        }
        Insert: {
          active?: boolean
          created_at?: string | null
          id?: number
          image_url: string
          link?: string | null
          name: string
        }
        Update: {
          active?: boolean
          created_at?: string | null
          id?: number
          image_url?: string
          link?: string | null
          name?: string
        }
        Relationships: []
      }
      import_tasks: {
        Row: {
          completed_at: string | null
          created_at: string
          error_count: number
          errors: Json | null
          filename: string
          id: string
          status: string
          success_count: number
          total_count: number
        }
        Insert: {
          completed_at?: string | null
          created_at?: string
          error_count?: number
          errors?: Json | null
          filename: string
          id?: string
          status?: string
          success_count?: number
          total_count?: number
        }
        Update: {
          completed_at?: string | null
          created_at?: string
          error_count?: number
          errors?: Json | null
          filename?: string
          id?: string
          status?: string
          success_count?: number
          total_count?: number
        }
        Relationships: []
      }
      languages: {
        Row: {
          active: boolean
          code: string
          default: boolean
          name: string
          native_name: string
          rtl: boolean
        }
        Insert: {
          active?: boolean
          code: string
          default?: boolean
          name: string
          native_name: string
          rtl?: boolean
        }
        Update: {
          active?: boolean
          code?: string
          default?: boolean
          name?: string
          native_name?: string
          rtl?: boolean
        }
        Relationships: []
      }
      nav_menu: {
        Row: {
          active: boolean
          id: number
          name: string
          order: number
          parent_id: number | null
          url: string
        }
        Insert: {
          active?: boolean
          id?: number
          name: string
          order?: number
          parent_id?: number | null
          url: string
        }
        Update: {
          active?: boolean
          id?: number
          name?: string
          order?: number
          parent_id?: number | null
          url?: string
        }
        Relationships: [
          {
            foreignKeyName: "nav_menu_parent_id_fkey"
            columns: ["parent_id"]
            isOneToOne: false
            referencedRelation: "nav_menu"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "nav_menu_parent_id_nav_menu_id_fk"
            columns: ["parent_id"]
            isOneToOne: false
            referencedRelation: "nav_menu"
            referencedColumns: ["id"]
          },
        ]
      }
      nav_menu_translations: {
        Row: {
          id: number
          language_code: string
          menu_id: number
          name: string
        }
        Insert: {
          id?: number
          language_code: string
          menu_id: number
          name: string
        }
        Update: {
          id?: number
          language_code?: string
          menu_id?: number
          name?: string
        }
        Relationships: [
          {
            foreignKeyName: "nav_menu_translations_language_code_fkey"
            columns: ["language_code"]
            isOneToOne: false
            referencedRelation: "languages"
            referencedColumns: ["code"]
          },
          {
            foreignKeyName: "nav_menu_translations_menu_id_fkey"
            columns: ["menu_id"]
            isOneToOne: false
            referencedRelation: "nav_menu"
            referencedColumns: ["id"]
          },
        ]
      }
      post_categories: {
        Row: {
          category_id: number
          post_id: number
        }
        Insert: {
          category_id: number
          post_id: number
        }
        Update: {
          category_id?: number
          post_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "post_categories_category_id_categories_id_fk"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "categories"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "post_categories_category_id_fkey"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "categories"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "post_categories_post_id_fkey"
            columns: ["post_id"]
            isOneToOne: false
            referencedRelation: "posts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "post_categories_post_id_posts_id_fk"
            columns: ["post_id"]
            isOneToOne: false
            referencedRelation: "posts"
            referencedColumns: ["id"]
          },
        ]
      }
      post_comments: {
        Row: {
          approved: boolean
          author_email: string | null
          author_name: string | null
          content: string
          created_at: string | null
          id: number
          parent_id: number | null
          post_id: number
          user_id: string | null
        }
        Insert: {
          approved?: boolean
          author_email?: string | null
          author_name?: string | null
          content: string
          created_at?: string | null
          id?: number
          parent_id?: number | null
          post_id: number
          user_id?: string | null
        }
        Update: {
          approved?: boolean
          author_email?: string | null
          author_name?: string | null
          content?: string
          created_at?: string | null
          id?: number
          parent_id?: number | null
          post_id?: number
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "post_comments_parent_id_fkey"
            columns: ["parent_id"]
            isOneToOne: false
            referencedRelation: "post_comments"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "post_comments_post_id_fkey"
            columns: ["post_id"]
            isOneToOne: false
            referencedRelation: "posts"
            referencedColumns: ["id"]
          },
        ]
      }
      post_tags: {
        Row: {
          post_id: number
          tag_id: number
        }
        Insert: {
          post_id: number
          tag_id: number
        }
        Update: {
          post_id?: number
          tag_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "post_tags_post_id_fkey"
            columns: ["post_id"]
            isOneToOne: false
            referencedRelation: "posts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "post_tags_post_id_posts_id_fk"
            columns: ["post_id"]
            isOneToOne: false
            referencedRelation: "posts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "post_tags_tag_id_fkey"
            columns: ["tag_id"]
            isOneToOne: false
            referencedRelation: "tags"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "post_tags_tag_id_tags_id_fk"
            columns: ["tag_id"]
            isOneToOne: false
            referencedRelation: "tags"
            referencedColumns: ["id"]
          },
        ]
      }
      post_translations: {
        Row: {
          content: string
          excerpt: string | null
          id: number
          language_code: string
          post_id: number
          slug: string
          title: string
        }
        Insert: {
          content: string
          excerpt?: string | null
          id?: number
          language_code: string
          post_id: number
          slug: string
          title: string
        }
        Update: {
          content?: string
          excerpt?: string | null
          id?: number
          language_code?: string
          post_id?: number
          slug?: string
          title?: string
        }
        Relationships: [
          {
            foreignKeyName: "post_translations_language_code_fkey"
            columns: ["language_code"]
            isOneToOne: false
            referencedRelation: "languages"
            referencedColumns: ["code"]
          },
          {
            foreignKeyName: "post_translations_post_id_fkey"
            columns: ["post_id"]
            isOneToOne: false
            referencedRelation: "posts"
            referencedColumns: ["id"]
          },
        ]
      }
      posts: {
        Row: {
          author_id: string
          created_at: string | null
          featured_image: string | null
          id: number
          published_at: string | null
          status: string
          updated_at: string | null
        }
        Insert: {
          author_id: string
          created_at?: string | null
          featured_image?: string | null
          id?: number
          published_at?: string | null
          status?: string
          updated_at?: string | null
        }
        Update: {
          author_id?: string
          created_at?: string | null
          featured_image?: string | null
          id?: number
          published_at?: string | null
          status?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      scrape_tasks: {
        Row: {
          completed_at: string | null
          created_at: string
          error_message: string | null
          id: string
          result: Json | null
          status: string
          url: string
        }
        Insert: {
          completed_at?: string | null
          created_at?: string
          error_message?: string | null
          id?: string
          result?: Json | null
          status?: string
          url: string
        }
        Update: {
          completed_at?: string | null
          created_at?: string
          error_message?: string | null
          id?: string
          result?: Json | null
          status?: string
          url?: string
        }
        Relationships: []
      }
      site_settings: {
        Row: {
          created_at: string | null
          id: number
          key: string
          updated_at: string | null
          value: Json
        }
        Insert: {
          created_at?: string | null
          id?: number
          key: string
          updated_at?: string | null
          value: Json
        }
        Update: {
          created_at?: string | null
          id?: number
          key?: string
          updated_at?: string | null
          value?: Json
        }
        Relationships: []
      }
      social_media: {
        Row: {
          active: boolean
          created_at: string | null
          icon: string
          id: number
          platform: string
          url: string
        }
        Insert: {
          active?: boolean
          created_at?: string | null
          icon: string
          id?: number
          platform: string
          url: string
        }
        Update: {
          active?: boolean
          created_at?: string | null
          icon?: string
          id?: number
          platform?: string
          url?: string
        }
        Relationships: []
      }
      subscribers: {
        Row: {
          email: string
          id: string
          is_active: boolean
          subscribed_at: string
          tags: string[] | null
          unsubscribed_at: string | null
        }
        Insert: {
          email: string
          id?: string
          is_active?: boolean
          subscribed_at?: string
          tags?: string[] | null
          unsubscribed_at?: string | null
        }
        Update: {
          email?: string
          id?: string
          is_active?: boolean
          subscribed_at?: string
          tags?: string[] | null
          unsubscribed_at?: string | null
        }
        Relationships: []
      }
      tag_translations: {
        Row: {
          id: number
          language_code: string
          name: string
          tag_id: number
        }
        Insert: {
          id?: number
          language_code: string
          name: string
          tag_id: number
        }
        Update: {
          id?: number
          language_code?: string
          name?: string
          tag_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "tag_translations_language_code_fkey"
            columns: ["language_code"]
            isOneToOne: false
            referencedRelation: "languages"
            referencedColumns: ["code"]
          },
          {
            foreignKeyName: "tag_translations_tag_id_fkey"
            columns: ["tag_id"]
            isOneToOne: false
            referencedRelation: "tags"
            referencedColumns: ["id"]
          },
        ]
      }
      tags: {
        Row: {
          created_at: string | null
          id: number
          name: string
          slug: string
        }
        Insert: {
          created_at?: string | null
          id?: number
          name: string
          slug: string
        }
        Update: {
          created_at?: string | null
          id?: number
          name?: string
          slug?: string
        }
        Relationships: []
      }
      tool_categories: {
        Row: {
          category_id: number
          tool_id: number
        }
        Insert: {
          category_id: number
          tool_id: number
        }
        Update: {
          category_id?: number
          tool_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "tool_categories_category_id_categories_id_fk"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "categories"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "tool_categories_category_id_fkey"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "categories"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "tool_categories_tool_id_fkey"
            columns: ["tool_id"]
            isOneToOne: false
            referencedRelation: "tools"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "tool_categories_tool_id_tools_id_fk"
            columns: ["tool_id"]
            isOneToOne: false
            referencedRelation: "tools"
            referencedColumns: ["id"]
          },
        ]
      }
      tool_tags: {
        Row: {
          tag_id: number
          tool_id: number
        }
        Insert: {
          tag_id: number
          tool_id: number
        }
        Update: {
          tag_id?: number
          tool_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "tool_tags_tag_id_fkey"
            columns: ["tag_id"]
            isOneToOne: false
            referencedRelation: "tags"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "tool_tags_tag_id_tags_id_fk"
            columns: ["tag_id"]
            isOneToOne: false
            referencedRelation: "tags"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "tool_tags_tool_id_fkey"
            columns: ["tool_id"]
            isOneToOne: false
            referencedRelation: "tools"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "tool_tags_tool_id_tools_id_fk"
            columns: ["tool_id"]
            isOneToOne: false
            referencedRelation: "tools"
            referencedColumns: ["id"]
          },
        ]
      }
      tool_translations: {
        Row: {
          description: string | null
          id: number
          language_code: string
          name: string
          tool_id: number
        }
        Insert: {
          description?: string | null
          id?: number
          language_code: string
          name: string
          tool_id: number
        }
        Update: {
          description?: string | null
          id?: number
          language_code?: string
          name?: string
          tool_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "tool_translations_language_code_fkey"
            columns: ["language_code"]
            isOneToOne: false
            referencedRelation: "languages"
            referencedColumns: ["code"]
          },
          {
            foreignKeyName: "tool_translations_tool_id_fkey"
            columns: ["tool_id"]
            isOneToOne: false
            referencedRelation: "tools"
            referencedColumns: ["id"]
          },
        ]
      }
      tools: {
        Row: {
          approved: boolean
          created_at: string | null
          favicon: string | null
          id: number
          is_featured: boolean
          submitted_by: string | null
          updated_at: string | null
          url: string
        }
        Insert: {
          approved?: boolean
          created_at?: string | null
          favicon?: string | null
          id?: number
          is_featured?: boolean
          submitted_by?: string | null
          updated_at?: string | null
          url: string
        }
        Update: {
          approved?: boolean
          created_at?: string | null
          favicon?: string | null
          id?: number
          is_featured?: boolean
          submitted_by?: string | null
          updated_at?: string | null
          url?: string
        }
        Relationships: []
      }
      user_profiles: {
        Row: {
          avatar_url: string | null
          bio: string | null
          created_at: string | null
          full_name: string | null
          id: string
          updated_at: string | null
          website: string | null
        }
        Insert: {
          avatar_url?: string | null
          bio?: string | null
          created_at?: string | null
          full_name?: string | null
          id: string
          updated_at?: string | null
          website?: string | null
        }
        Update: {
          avatar_url?: string | null
          bio?: string | null
          created_at?: string | null
          full_name?: string | null
          id?: string
          updated_at?: string | null
          website?: string | null
        }
        Relationships: []
      }
      user_tool_categories: {
        Row: {
          category_id: number
          created_at: string
          id: number
          user_tool_id: number
        }
        Insert: {
          category_id: number
          created_at?: string
          id?: number
          user_tool_id: number
        }
        Update: {
          category_id?: number
          created_at?: string
          id?: number
          user_tool_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "user_tool_categories_category_id_categories_id_fk"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "categories"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "user_tool_categories_user_tool_id_user_tools_id_fk"
            columns: ["user_tool_id"]
            isOneToOne: false
            referencedRelation: "user_tools"
            referencedColumns: ["id"]
          },
        ]
      }
      user_tools: {
        Row: {
          created_at: string
          description: string | null
          id: number
          locale: string
          name: string
          review_note: string | null
          reviewed_by: number | null
          status: string
          updated_at: string
          url: string
          user_id: number | null
        }
        Insert: {
          created_at?: string
          description?: string | null
          id?: number
          locale?: string
          name: string
          review_note?: string | null
          reviewed_by?: number | null
          status?: string
          updated_at?: string
          url: string
          user_id?: number | null
        }
        Update: {
          created_at?: string
          description?: string | null
          id?: number
          locale?: string
          name?: string
          review_note?: string | null
          reviewed_by?: number | null
          status?: string
          updated_at?: string
          url?: string
          user_id?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "user_tools_reviewed_by_users_id_fk"
            columns: ["reviewed_by"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "user_tools_user_id_users_id_fk"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      users: {
        Row: {
          avatar: string | null
          created_at: string
          email: string
          id: number
          is_active: boolean
          name: string
          password: string
          role: string
          updated_at: string
        }
        Insert: {
          avatar?: string | null
          created_at?: string
          email: string
          id?: number
          is_active?: boolean
          name: string
          password: string
          role?: string
          updated_at?: string
        }
        Update: {
          avatar?: string | null
          created_at?: string
          email?: string
          id?: number
          is_active?: boolean
          name?: string
          password?: string
          role?: string
          updated_at?: string
        }
        Relationships: []
      }
      webhooks: {
        Row: {
          created_at: string
          events: string[]
          id: string
          is_active: boolean
          name: string
          secret: string | null
          url: string
        }
        Insert: {
          created_at?: string
          events: string[]
          id?: string
          is_active?: boolean
          name: string
          secret?: string | null
          url: string
        }
        Update: {
          created_at?: string
          events?: string[]
          id?: string
          is_active?: boolean
          name?: string
          secret?: string | null
          url?: string
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

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
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
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
