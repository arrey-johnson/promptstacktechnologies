import type { StructureResolver } from "sanity/structure";

export const structure: StructureResolver = (S) =>
  S.list()
    .title("Promptstack Content")
    .items([
      S.listItem()
        .title("Work")
        .child(
          S.documentTypeList("caseStudy").title("Case Studies"),
        ),
      S.listItem()
        .title("Insights")
        .child(S.documentTypeList("insight").title("Insights")),
      S.listItem()
        .title("Academy")
        .child(
          S.documentTypeList("academyProgram").title("Academy Programs"),
        ),
      S.divider(),
      S.listItem()
        .title("Site Settings")
        .child(
          S.document()
            .schemaType("siteSettings")
            .documentId("siteSettings")
            .title("Site Settings"),
        ),
    ]);
