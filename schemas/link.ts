import {defineField, defineType} from 'sanity'

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
      }
    }),
    defineField({
      name: 'text',
      title: "Link text",
      type: "string",
      hidden: ({ parent }) => parent.host != 'other',
    }),
    defineField({
      name: "url",
      title: "URL",
      type: "url"
    }),
  ],

  
})

