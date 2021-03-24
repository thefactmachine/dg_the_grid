

myTag <- div(class = "parent", "contents of div")
otherTag <- span("contents of span")
myTag <- tagAppendChild(myTag, otherTag)

myTag





tagList(tags$h1("Title"),
       tags$h2("Header text"),
       tags$p("Text here"))



# Can also convert a regular list to a tagList (internal data structure isn't
# exactly the same, but when rendered to HTML, the output is the same).
x <- list(tags$h1("Title"),
          tags$h2("Header text"),
          tags$p("Text here"))

tagList(x)

# suppress the whitespace between tags
oneline <- tag("span",
               tag("strong", "Super strong", .noWS="outside")
)
cat(as.character(oneline))