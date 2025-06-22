import { CollectionConfig } from 'payload'
import CustomLexicalEditor from '@/components/CustomLexicalEditor'

export const Posts: CollectionConfig = {
  slug: 'posts',
  fields: [
    {
      name: 'title',
      type: 'text',
    },
    {
      name: 'content',
      type: 'ui',
      admin: {
        components: {
          Field: CustomLexicalEditor as any, // ✅ temporary type fix
        },
      },
    },
  ],
}
