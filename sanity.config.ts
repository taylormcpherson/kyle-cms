import { defineConfig } from 'sanity'
import { deskTool } from 'sanity/desk'
import { schemaTypes } from './schemas'
import { markdownSchema } from 'sanity-plugin-markdown'
import { media } from 'sanity-plugin-media'

const singletonActions = new Set(["publish", "discardChanges", "restore"])
const singletonTypes = new Set(["resumePage"])

export default defineConfig({
  name: 'default',
  title: 'kyle-portfolio',
  projectId: '38t6rk2v',
  dataset: 'production',
  plugins: [deskTool(
    {
      structure: (S) =>
      S.list()
        .title("Content")
        .items([
          // Our singleton type has a list item with a custom child
          S.listItem().title("Resume").id("resumePage").
            child(
              // Instead of rendering a list of documents, we render a single
              // document, specifying the `documentId` manually to ensure
              // that we're editing the single instance of the document
              S.document()
                .schemaType("resumePage")
                .documentId("resumePage")
           
            ),
          // Regular document types
          S.documentTypeListItem("page").title("Pages"),
          S.documentTypeListItem("project").title("Projects"),
        ]),
    }
  ), markdownSchema(), media()],

  schema: {
    types: schemaTypes,
    // Filter out singleton types from the global “New document” menu options
    templates: (templates) =>
      templates.filter(({ schemaType }) => !singletonTypes.has(schemaType)),
  },

  document: {
    actions: (input, context) =>
      singletonTypes.has(context.schemaType)
        ? input.filter(({ action }) => action && singletonActions.has(action))
        : input,
  },

})
