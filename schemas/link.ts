import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'link',
  title: 'Link',
  type: 'object',
  fields: [
    defineField({
      name: "host",
      title: "Host",
      type: "string",
      options: {
        list: [
          {title: 'GitHub', value: 'github'},
          { title: 'Kaggle', value: 'kaggle'},
          { title: 'Tableau', value: 'tableau'},
          { title: 'Other', value: 'other'},
        ]
      },
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: "url",
      title: "URL",
      type: "url",
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'text',
      title: "Link text",
      type: "string",
      hidden: ({ parent }) => parent.host != 'other',
    }),
  ],
  preview: {
    select: {
      title: 'url',
    },
  },
})

