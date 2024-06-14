import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'resumePage',
  title: 'Resume',
  type: 'document',
  fields: [
    defineField({
      name: 'resume',
      title: 'Resume',
      description: "Select or upload a PDF file.",
      type: 'file',
      options: {
        accept: '.pdf',
      },
      validation: Rule => Rule.required(),
    }),
  ],
  preview: {
    select: {
      title: 'title',
    },
  },
})
